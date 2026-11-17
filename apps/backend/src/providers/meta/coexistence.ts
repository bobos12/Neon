import { randomUUID } from 'node:crypto';
import type { MessageStatus, NormalizedMessage } from '@crm/messaging-schema';
import { prisma } from '../../lib/prisma';
import { logger } from '../../lib/logger';
import { normalizePhone } from '../../lib/phone';
import { emitRealtime } from '../../realtime/socket';
import { compileRenderable } from '../../messaging/compile-renderable';
import { getCapabilities } from '../../messaging/capabilities';
import { persistNormalizedMessage } from '../../messaging/persist';
import {
  findMatchingContact,
  getOrCreateConversationByPhone,
  resolveDefaultTeamId,
} from '../../conversations/conversation-resolver';
import type { ResolvedChannel } from '../channel.service';
import { graphRequest } from './graph';
import { buildInboundPayload } from './webhook';

/**
 * WhatsApp Business app coexistence.
 *
 * A number onboarded with `featureType: whatsapp_business_app_onboarding` stays
 * live in the WhatsApp Business app on the owner's phone while also being on the
 * Cloud API. Meta then sends three extra webhook fields:
 *
 *  - `smb_message_echoes` — a message the owner sent from the phone app. Without
 *    it the CRM shows customers talking to nobody.
 *  - `history` — up to six months of past chats, delivered once in chunks after
 *    onboarding (only if the owner agreed to share it on the phone).
 *  - `smb_app_state_sync` — the phone's contact list, plus later adds/edits.
 *
 * None of these are new customer messages, so none of them trigger automations,
 * the AI bot, unread counts or notifications.
 */

type MirrorDirection = 'inbound' | 'outbound';

/** Meta's history_context.status for a past message → our status. */
const HISTORY_STATUS: Record<string, MessageStatus> = {
  PENDING: 'sending',
  SENT: 'server_confirmed',
  DELIVERED: 'delivered',
  READ: 'read',
  PLAYED: 'read',
  ERROR: 'failed',
};

/**
 * Store a message that already happened, in the right conversation and
 * direction. Idempotent by (externalId, sessionId) like the inbound path —
 * history and echoes are both re-delivered on webhook retries.
 */
async function mirrorMessage(params: {
  message: any;
  customerPhone: string;
  direction: MirrorDirection;
  status: MessageStatus;
  channel: ResolvedChannel;
  sessionId: string;
  historical: boolean;
}): Promise<string | null> {
  const { message, direction, status, channel, sessionId, historical } = params;
  const phone = normalizePhone(params.customerPhone);
  if (!phone || !message?.id) return null;

  const existing = await prisma.message.findFirst({
    where: { externalId: String(message.id), sessionId },
    select: { id: true },
  });
  if (existing) return null;

  // Reuses the inbound parser (text, captions, media download); only the
  // counterparty and direction differ.
  const payload = await buildInboundPayload({ ...message, from: phone }, channel);
  if (!payload) return null;

  const { contact, conversation } = (await getOrCreateConversationByPhone(phone, undefined, prisma)) as any;

  let replyToId: string | null = null;
  let replyToBody: string | null = null;
  if (payload.replyToExternalId) {
    const quoted = await prisma.message
      .findFirst({ where: { externalId: payload.replyToExternalId, sessionId }, select: { id: true, body: true } })
      .catch(() => null);
    replyToId = quoted?.id ?? null;
    replyToBody = quoted?.body ?? null;
  }

  const timestamp = new Date(Number(message.timestamp) * 1000).toISOString();
  const content =
    payload.mediaUrl && payload.type !== 'TEXT'
      ? {
          kind: 'media' as const,
          media: {
            mediaType: payload.isVoiceNote
              ? ('voice' as const)
              : payload.type === 'IMAGE'
                ? (payload.mediaMimeType === 'image/webp' ? ('sticker' as const) : ('image' as const))
                : payload.type === 'VIDEO'
                  ? ('video' as const)
                  : payload.type === 'AUDIO'
                    ? ('audio' as const)
                    : ('document' as const),
            mime: payload.mediaMimeType ?? 'application/octet-stream',
            url: payload.mediaUrl,
            providerMediaId: null,
            fileName: payload.mediaFileName ?? null,
            sizeBytes: null,
            durationSec: null,
            width: null,
            height: null,
            thumbnailUrl: null,
          },
          caption: payload.mediaCaption ?? undefined,
        }
      : { kind: 'text' as const, body: payload.content ?? '', previewUrl: false };

  const nMsg: NormalizedMessage = {
    schemaVersion: 1,
    id: null,
    clientId: randomUUID(),
    externalId: String(message.id),
    provider: 'meta',
    sessionId,
    conversationId: conversation.id,
    contactPhone: phone,
    teamId: conversation.teamId ?? null,
    direction,
    content,
    status,
    metadata: {
      sequenceNumber: 0,
      traceId: randomUUID(),
      attemptCount: 0,
      errorReason: null,
      errorCode: null,
      compatibilityMode: 'cloud_api',
      timestamps: { [status]: timestamp },
      // Sent by a person, just not from inside the CRM.
      origin: direction === 'outbound' ? 'agent' : null,
      originRef: null,
      rawRetained: true,
    },
    reply: payload.replyToExternalId
      ? { messageId: replyToId, externalId: payload.replyToExternalId, preview: replyToBody ?? '', kind: 'text' }
      : null,
    timestamp,
    raw: { ...message, coexistence: historical ? 'history' : 'echo' },
  };

  const renderable = compileRenderable(nMsg, getCapabilities('meta').defaultMode);
  await persistNormalizedMessage(nMsg, renderable, { contactName: contact.name ?? null, historical });
  return conversation.id;
}

// ── smb_message_echoes ───────────────────────────────────────────────────────

export async function handleMessageEchoes(value: any, channel: ResolvedChannel): Promise<void> {
  const sessionId = String(value?.metadata?.phone_number_id ?? channel.cloud?.phoneNumberId ?? '');
  for (const echo of value?.message_echoes ?? []) {
    try {
      if (echo?.type === 'reaction') continue;
      await mirrorMessage({
        message: echo,
        customerPhone: String(echo?.to ?? ''),
        direction: 'outbound',
        status: 'server_confirmed',
        channel,
        sessionId,
        historical: false,
      });
    } catch (err) {
      logger.error('coexistence.echo_failed', { messageId: echo?.id, error: err instanceof Error ? err.message : String(err) });
    }
  }
}

// ── history ──────────────────────────────────────────────────────────────────

export async function handleHistory(value: any, channel: ResolvedChannel): Promise<void> {
  const sessionId = String(value?.metadata?.phone_number_id ?? channel.cloud?.phoneNumberId ?? '');
  const touched = new Set<string>();
  let imported = 0;

  for (const chunk of value?.history ?? []) {
    if (chunk?.errors?.length) {
      // 2593109: the owner declined to share chat history on the phone.
      logger.warn('coexistence.history_unavailable', { errors: chunk.errors });
      emitRealtime('wa:history_sync', { status: 'declined' });
      continue;
    }

    for (const thread of chunk?.threads ?? []) {
      const customer = String(thread?.id ?? '');
      const messages = [...(thread?.messages ?? [])].sort((a, b) => Number(a?.timestamp) - Number(b?.timestamp));
      for (const message of messages) {
        try {
          const inbound = String(message?.from ?? '') === customer;
          const conversationId = await mirrorMessage({
            message,
            customerPhone: customer,
            direction: inbound ? 'inbound' : 'outbound',
            status: inbound
              ? 'processed'
              : HISTORY_STATUS[String(message?.history_context?.status ?? '').toUpperCase()] ?? 'delivered',
            channel,
            sessionId,
            historical: true,
          });
          if (conversationId) {
            touched.add(conversationId);
            imported++;
          }
        } catch (err) {
          logger.error('coexistence.history_message_failed', {
            messageId: message?.id,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }

    const meta = chunk?.metadata ?? {};
    logger.info('coexistence.history_chunk', { phase: meta.phase, chunk: meta.chunk_order, progress: meta.progress, imported });
    emitRealtime('wa:history_sync', { status: 'importing', phase: meta.phase ?? null, progress: meta.progress ?? null });
  }

  // One refresh per affected chat instead of one event per imported message.
  for (const conversationId of touched) {
    const conv = await prisma.conversation.findUnique({
      where: { id: conversationId },
      select: { lastMessageAt: true, lastMessagePreview: true, teamId: true },
    });
    if (!conv) continue;
    emitRealtime(
      'conversation:updated',
      { conversationId, lastMessageAt: conv.lastMessageAt?.toISOString() ?? null, lastMessagePreview: conv.lastMessagePreview },
      conv.teamId,
    );
  }
}

// ── smb_app_state_sync (contacts) ────────────────────────────────────────────

/**
 * Bring the phone's contact names into the CRM. Adds and edits only: a contact
 * removed from the phone keeps its CRM record and history, and a name someone
 * already set in the CRM is never overwritten by the phone's.
 */
export async function handleStateSync(value: any): Promise<void> {
  const teamId = await resolveDefaultTeamId(prisma).catch(() => null);
  for (const item of value?.state_sync ?? []) {
    if (item?.type !== 'contact' || item?.action === 'remove') continue;
    const phone = normalizePhone(String(item?.contact?.phone_number ?? ''));
    const name = String(item?.contact?.full_name || item?.contact?.first_name || '').trim() || null;
    if (!phone) continue;
    try {
      const existing = await findMatchingContact(prisma, phone, teamId);
      if (existing) {
        if (name && (!existing.name || existing.name === existing.phone)) {
          await prisma.contact.update({ where: { id: existing.id }, data: { name } });
        }
      } else {
        await prisma.contact.create({
          data: { phone, name, source: 'whatsapp_app', ...(teamId ? { teamId } : {}) },
        });
      }
    } catch (err) {
      logger.warn('coexistence.contact_sync_failed', { error: err instanceof Error ? err.message : String(err) });
    }
  }
}

// ── Kick off the sync after onboarding ───────────────────────────────────────

/**
 * Ask Meta to start sending the phone's contacts and chat history. Must happen
 * within 24 hours of onboarding, and each sync type can be requested once.
 * Contacts first: history threads then land on named contacts.
 */
export async function requestAppDataSync(accessToken: string, phoneNumberId: string): Promise<void> {
  for (const syncType of ['smb_app_state_sync', 'history'] as const) {
    try {
      await graphRequest({
        path: `/${phoneNumberId}/smb_app_data`,
        accessToken,
        method: 'POST',
        body: { messaging_product: 'whatsapp', sync_type: syncType },
        maxAttempts: 2,
      });
      logger.info('coexistence.sync_requested', { phoneNumberId, syncType });
    } catch (err) {
      logger.warn('coexistence.sync_request_failed', {
        phoneNumberId,
        syncType,
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }
}
