'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Search, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useChatOpen } from '@/stores/chat-open-store';
import { useHeaderHidden } from '@/stores/header-hidden-store';
import { cn } from '@/lib/utils';
import { useSyncStatus } from '@/hooks/useSyncStatus';
import NotificationBell from '@/components/notifications/NotificationBell';
import AccountMenu from './AccountMenu';
import { NAV_GROUPS, SETTINGS_ITEM, isActive } from './nav-config';
import { openCommandPalette } from './CommandPalette';
import NeonMark from '../brand/NeonMark';

/**
 * Phone-only top bar. On tablet and desktop the sidebar carries everything this
 * used to hold (search, alerts, account, connection), so the workspace gets the
 * full height of the window.
 *
 * It names the screen you are on — the bottom bar shows five places, and the
 * other ten need an answer to "where am I?".
 */
export default function Header() {
  const pathname = usePathname();
  const chatWindowOpen = useChatOpen((s) => s.isOpen);
  const headerHidden = useHeaderHidden((s) => s.hidden);
  const { t } = useTranslation('sidebar');
  const { t: tCommon } = useTranslation('common');
  const { connection } = useSyncStatus();

  const current = [...NAV_GROUPS.flatMap((g) => g.items), SETTINGS_ITEM].find((i) => isActive(pathname, i));
  const title = current ? t(`nav.${current.key}`) : t('appName');

  // The inbox list carries its own header on a phone, as WhatsApp's does.
  if (headerHidden || chatWindowOpen || pathname?.startsWith('/conversations')) return null;

  return (
    <header className="glass-chrome sticky top-0 z-40 pt-safe shadow-[0_1px_0_rgb(var(--line)/0.8)] sm:hidden">
      <div className="flex h-14 items-center gap-2 px-3">
        <Link href="/dashboard" className="flex min-w-0 flex-1 items-center gap-2.5" aria-label={t('appName')}>
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-neon-deep shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
            <NeonMark className="h-[18px] w-auto" />
          </span>
          <span className="truncate text-[17px] font-semibold tracking-[-0.02em] text-ink">{title}</span>
          <span
            className={cn(
              'h-1.5 w-1.5 shrink-0 rounded-full',
              connection === 'connected' ? 'bg-success-500' : connection === 'connecting' ? 'bg-amber-400' : 'bg-red-500',
            )}
            title={tCommon(`status.${connection === 'connected' ? 'connected' : connection === 'connecting' ? 'connecting' : 'disconnected'}`)}
            aria-hidden="true"
          />
        </Link>

        <button
          type="button"
          onClick={openCommandPalette}
          aria-label={tCommon('palette.placeholder')}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-3 transition-colors hover:bg-raised hover:text-ink"
        >
          <Search className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => document.dispatchEvent(new CustomEvent('toggle-crm-assistant'))}
          aria-label="AI Assistant"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-3 transition-colors hover:bg-raised hover:text-ink"
        >
          <Bot className="h-[18px] w-[18px]" aria-hidden="true" />
        </button>
        <NotificationBell placement="bar" />
        <AccountMenu variant="bar" compact />
      </div>
    </header>
  );
}
