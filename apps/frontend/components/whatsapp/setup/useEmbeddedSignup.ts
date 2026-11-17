'use client';

/**
 * Meta's Embedded Signup: the customer logs into Facebook in Meta's own popup,
 * picks or creates their business and number there, and we receive a one-time
 * code. Nothing to copy, nothing to paste.
 */

import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}

export interface SignupConfig {
  enabled: boolean;
  appId?: string;
  configId?: string;
  graphVersion?: string;
}

export interface SignupResult {
  code: string;
  wabaId: string | null;
  phoneNumberId: string | null;
  /** The number stays in the WhatsApp Business app on the phone (coexistence). */
  coexistence: boolean;
}

/** The person closed the popup before finishing. Not an error worth shouting about. */
export class SignupCancelled extends Error {
  constructor() {
    super('cancelled');
  }
}

let sdk: Promise<void> | null = null;

function loadSdk(appId: string, version: string, locale: string): Promise<void> {
  if (sdk) return sdk;
  sdk = new Promise<void>((resolve, reject) => {
    const init = () => {
      window.FB.init({ appId, autoLogAppEvents: true, xfbml: false, version });
      resolve();
    };
    if (window.FB) return init();
    window.fbAsyncInit = init;
    const script = document.createElement('script');
    script.src = `https://connect.facebook.net/${locale}/sdk.js`;
    script.async = true;
    script.defer = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => {
      sdk = null;
      reject(new Error('sdk'));
    };
    document.body.appendChild(script);
  });
  return sdk;
}

function fromFacebook(origin: string): boolean {
  try {
    return /(^|\.)facebook\.com$/.test(new URL(origin).hostname);
  } catch {
    return false;
  }
}

export function useEmbeddedSignup(language: string) {
  // undefined while loading; { enabled: false } when the server has no platform app.
  const [config, setConfig] = useState<SignupConfig | undefined>(undefined);
  const [ready, setReady] = useState(false);
  const [sdkFailed, setSdkFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    api
      .get<SignupConfig>('/api/channel/signup-config')
      .then((c) => alive && setConfig(c))
      .catch(() => alive && setConfig({ enabled: false }));
    return () => {
      alive = false;
    };
  }, []);

  // Loaded ahead of the click: browsers only allow a popup opened directly
  // from the click itself, so the SDK has to be there already.
  useEffect(() => {
    if (!config?.enabled || !config.appId) return;
    loadSdk(config.appId, config.graphVersion ?? 'v21.0', language.startsWith('ar') ? 'ar_AR' : 'en_US')
      .then(() => setReady(true))
      .catch(() => setSdkFailed(true));
  }, [config, language]);

  const launch = useCallback(
    (opts?: { coexistence?: boolean }) =>
      new Promise<SignupResult>((resolve, reject) => {
        if (!window.FB || !config?.configId) return reject(new Error('sdk'));
        let session: { wabaId: string | null; phoneNumberId: string | null; businessApp: boolean } | null = null;
        let metaError: string | null = null;

        const onMessage = (ev: MessageEvent) => {
          if (!fromFacebook(ev.origin)) return;
          let data: any;
          try {
            data = typeof ev.data === 'string' ? JSON.parse(ev.data) : ev.data;
          } catch {
            return;
          }
          if (data?.type !== 'WA_EMBEDDED_SIGNUP') return;
          if (String(data.event).startsWith('FINISH')) {
            session = {
              wabaId: data.data?.waba_id ?? null,
              phoneNumberId: data.data?.phone_number_id ?? null,
              businessApp: data.event === 'FINISH_WHATSAPP_BUSINESS_APP_ONBOARDING',
            };
          } else if (data.event === 'ERROR') {
            metaError = data.data?.error_message ?? null;
          }
        };
        window.addEventListener('message', onMessage);

        // The SDK refuses an async callback, so this stays a plain function.
        window.FB.login(
          (response: any) => {
            const code: string | undefined = response?.authResponse?.code;
            const done = () => {
              window.removeEventListener('message', onMessage);
              if (code) {
                resolve({
                  code,
                  wabaId: session?.wabaId ?? null,
                  phoneNumberId: session?.phoneNumberId ?? null,
                  coexistence: Boolean(opts?.coexistence || session?.businessApp),
                });
              }
              else reject(metaError ? new Error(metaError) : new SignupCancelled());
            };
            // The session message can land just after the callback; the server
            // can find the number without it, but it's quicker with it.
            if (code && !session) setTimeout(done, 1200);
            else done();
          },
          {
            config_id: config.configId,
            response_type: 'code',
            override_default_response_type: true,
            // Business-app numbers get Meta's coexistence flow: the number stays on the
            // phone and is also connected here.
            extras: {
              setup: {},
              featureType: opts?.coexistence ? 'whatsapp_business_app_onboarding' : '',
              sessionInfoVersion: '3',
            },
          },
        );
      }),
    [config],
  );

  return { config, ready, sdkFailed, launch };
}
