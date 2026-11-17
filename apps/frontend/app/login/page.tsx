'use client';

import { useState, useEffect } from 'react';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Eye, EyeOff, Lock, Loader,
  Sun, Moon, Globe, ArrowRight,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useLanguage } from '@/components/providers/I18nProvider';
import AppUpdateBanner from '@/components/layout/AppUpdateBanner';
import NeonMark from '@/components/brand/NeonMark';

export default function LoginPage() {
  const { t, i18n } = useTranslation('auth');
  const { t: tCommon } = useTranslation('common');
  const { theme, toggle: toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', { email, password, redirect: false });

      if (result?.error) {
        setError(t('login.error.invalidCredentials'));
      } else {
        const session = await getSession();
        if (session?.accessToken && typeof window !== 'undefined') {
          window.localStorage.setItem('accessToken', session.accessToken);
        }
        if (session?.refreshToken && typeof window !== 'undefined') {
          window.localStorage.setItem('refreshToken', session.refreshToken);
        }
        if (rememberMe && typeof window !== 'undefined') {
          window.localStorage.setItem('rememberMe', 'true');
        }
        router.push('/dashboard');
      }
    } catch {
      setError(t('login.error.generic'));
    } finally {
      setLoading(false);
    }
  };


  if (!mounted) {
    return (
      <div className="min-h-screen bg-canvas" />
    );
  }

  const toggles = (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
        className="btn btn-ghost btn-sm"
        aria-label="Toggle language"
      >
        <Globe aria-hidden="true" />
        <span>{language === 'en' ? 'العربية' : 'EN'}</span>
      </button>
      <button
        type="button"
        onClick={toggleTheme}
        className="btn btn-ghost btn-icon btn-sm"
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      </button>
    </div>
  );

  return (
    <div className="nx-wash min-h-dvh overflow-hidden">
      <AppUpdateBanner />

      <div className="relative flex min-h-dvh flex-col lg:flex-row">
        {/* ── The neon room (desktop): the product's signature dark glass, with
            the mark lit inside it. One headline, three words of proof — no
            feature cards, nothing to read before signing in. ── */}
        <aside className="relative m-3 hidden flex-col justify-between overflow-hidden rounded-[28px] bg-neon-deep p-12 text-[#ECF3ED] shadow-[inset_0_1px_0_rgb(255_255_255/0.07),0_30px_60px_-30px_rgb(0_0_0/0.5)] lg:flex lg:w-[46%]">
          <div aria-hidden="true" className="pointer-events-none absolute -start-32 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgb(216_252_52/0.16),transparent)]" />
          <div aria-hidden="true" className="chat-doodle pointer-events-none absolute inset-0 !opacity-[0.04] [filter:invert(1)]" />

          <div className="relative flex items-center gap-3" dir="ltr">
            <NeonMark glow className="h-8 w-auto" />
            <span className="text-[17px] font-bold tracking-[0.18em]">NEON</span>
          </div>

          <div className="relative max-w-md">
            <div className="relative mb-10 flex h-24 w-24 items-center justify-center">
              <span aria-hidden="true" className="app-splash__halo !-inset-10" />
              <NeonMark glow className="relative h-20 w-auto" />
            </div>
            <h1 className="text-[40px] font-semibold leading-[1.1] tracking-[-0.03em]">{t('login.heroTitle')}</h1>
            <p className="mt-4 text-[15px] leading-7 text-[#ECF3ED]/65">{t('login.heroSubtitle')}</p>
            <ul className="mt-8 flex flex-wrap items-center gap-2">
              {(['inbox', 'ai', 'campaigns'] as const).map((k) => (
                <li key={k} className="inline-flex h-8 items-center gap-2 rounded-full bg-white/[0.06] px-3.5 text-[13px] font-medium text-[#ECF3ED]/85 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.07)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-400 shadow-[0_0_8px_rgb(216_252_52/0.9)]" aria-hidden="true" />
                  {t(`login.points.${k}`)}
                </li>
              ))}
            </ul>
          </div>

          <p className="relative flex items-center gap-2 text-xs text-[#ECF3ED]/55">
            <Lock className="h-3.5 w-3.5 text-brand-400" aria-hidden="true" />
            {t('login.security')}
          </p>
        </aside>

        {/* ── Sign in ── */}
        <main className="flex flex-1 flex-col px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-8">
          {/* Phones and tablets: the mark and the toggles share the top line. */}
          <div className="flex items-center justify-between lg:justify-end">
            <div className="flex items-center gap-2.5 lg:hidden" dir="ltr">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-neon-deep shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
                <NeonMark className="h-5 w-auto" />
              </span>
              <span className="text-[15px] font-bold tracking-[0.16em] text-ink">NEON</span>
            </div>
            {toggles}
          </div>

          <div className="flex flex-1 items-center justify-center py-10">
            <div className="enter w-full max-w-[400px]">
              <h2 className="display text-[30px] leading-tight">{t('login.title')}</h2>
              <p className="mt-2 text-[15px] text-ink-3">{t('login.subtitle')}</p>

              <div className="mt-8 rounded-3xl bg-surface p-6 shadow-pop sm:p-7">
                {/* Error alert */}
                {error && (
                  <div role="alert" className="pop-enter mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-500/30 dark:bg-red-500/10">
                    <p className="text-sm font-medium text-red-700 dark:text-red-300">{error}</p>
                  </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email" className="label text-[13px]">{t('login.emailLabel')}</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      disabled={loading}
                      dir="ltr"
                      className="field h-11 text-[15px]"
                      placeholder={t('login.emailPlaceholder')}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="label text-[13px]">{t('login.passwordLabel')}</label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        autoComplete="current-password"
                        disabled={loading}
                        className="field h-11 pe-12 text-[15px]"
                        placeholder={t('login.passwordPlaceholder')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="press-icon absolute end-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-ink-4 transition-colors hover:bg-raised hover:text-ink"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
                      </button>
                    </div>
                  </div>

                  <label className="flex w-fit cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      disabled={loading}
                      className="h-4 w-4 cursor-pointer rounded accent-brand disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <span className="text-[13px] font-medium text-ink-2">{t('login.rememberMe')}</span>
                  </label>

                  <button type="submit" disabled={loading} className="btn btn-primary btn-lg group h-11 w-full text-[15px]">
                    {loading ? (
                      <>
                        <Loader className="animate-spin" aria-hidden="true" />
                        <span>{t('login.signingIn')}</span>
                      </>
                    ) : (
                      <>
                        <span>{t('login.submitButton')}</span>
                        <ArrowRight className="icon-mirror transition-transform duration-base ease-out group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" aria-hidden="true" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 px-1 text-xs text-ink-3">
                <p className="flex items-center gap-1.5 lg:hidden">
                  <Lock className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {t('login.security')}
                </p>
                <div className="ms-auto flex items-center gap-4">
                  <a href="/privacy" className="transition-colors hover:text-ink">{t('login.privacy')}</a>
                  <a href="/terms" className="transition-colors hover:text-ink">{t('login.terms')}</a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
