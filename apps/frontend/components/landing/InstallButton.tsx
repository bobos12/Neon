'use client'

import { useState, useEffect, type ReactNode } from 'react'
import { Download, RefreshCw, Share, MoreVertical, ArrowDown, Check } from 'lucide-react'
import { hardRefresh } from '@/lib/hard-refresh'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type Platform = 'android' | 'ios' | 'desktop' | 'unknown'

function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'unknown'
  const ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) return 'ios'
  // iPadOS reports itself as a Mac — touch support gives it away.
  if (/macintosh/.test(ua) && navigator.maxTouchPoints > 1) return 'ios'
  if (/android/.test(ua)) return 'android'
  return 'desktop'
}

type Guide = 'ios' | 'android' | 'chromium' | 'safari-mac' | 'unsupported'

function desktopGuide(): Guide {
  const ua = navigator.userAgent
  if (/Edg\/|Chrome\//.test(ua) && !/OPR\//.test(ua)) return 'chromium'
  if (/Safari\//.test(ua) && !/Chrome|Firefox/.test(ua)) return 'safari-mac'
  return 'unsupported'
}

// WhatsApp / Instagram / Facebook etc. open links in their own browser, which
// can't install apps — so the button first hops the user into the real one.
function isInAppBrowser(platform: Platform): boolean {
  const ua = navigator.userAgent
  if (/FBAN|FBAV|FB_IAB|Instagram|Line\/|Snapchat|TikTok|musical_ly|Bytedance|Twitter|LinkedInApp|WhatsApp/i.test(ua)) return true
  if (platform === 'ios') return !/Safari\//.test(ua)
  if (platform === 'android') return /; wv\)/.test(ua)
  return false
}

function withInstallFlag(): URL {
  const url = new URL(window.location.href)
  url.searchParams.set('install', '1')
  return url
}

function openInSystemBrowser(platform: Platform) {
  const url = withInstallFlag()
  if (platform === 'ios') {
    window.location.href = `x-safari-${url.href}`
  } else {
    const fallback = encodeURIComponent(url.href)
    window.location.href = `intent://${url.host}${url.pathname}${url.search}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${fallback};end`
  }
}

interface InstallButtonProps {
  lang: 'ar' | 'en'
  className?: string
  label: string
  hint: string
  installedLabel: string
  texts: { homeTitle: string; desktopTitle: string; updating: string; update: string }
}

export function InstallButton({ lang, className = '', label, hint, installedLabel, texts }: InstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [platform, setPlatform] = useState<Platform>('unknown')
  const [guide, setGuide] = useState<Guide | null>(null)
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    const p = detectPlatform()
    setPlatform(p)

    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone === true
    if (standalone) setIsInstalled(true)

    // Arrived from an in-app browser hop: show the final step straight away.
    const params = new URLSearchParams(window.location.search)
    if (params.get('install') === '1') {
      params.delete('install')
      const qs = params.toString()
      window.history.replaceState(null, '', window.location.pathname + (qs ? `?${qs}` : '') + window.location.hash)
      if (!standalone && p === 'ios') setGuide('ios')
    }

    // Captured early by bootstrap.js; shared by every Install button on the page.
    const syncPrompt = () => setInstallPrompt((window as any).__installPrompt ?? null)
    syncPrompt()

    // React when the SW registration announces a newer version (or one is
    // already waiting from a previous visit) so the button flips to "Update".
    if ((window as any).__swUpdateAvailable) setUpdateAvailable(true)
    const onUpdate = () => setUpdateAvailable(true)

    const onInstalled = () => setIsInstalled(true)
    window.addEventListener('install-prompt-ready', syncPrompt)
    window.addEventListener('appinstalled', onInstalled)
    window.addEventListener('sw-update-available', onUpdate)

    return () => {
      window.removeEventListener('install-prompt-ready', syncPrompt)
      window.removeEventListener('appinstalled', onInstalled)
      window.removeEventListener('sw-update-available', onUpdate)
    }
  }, [])

  // Full hard refresh: activates the waiting SW, clears Cache Storage, then
  // reloads — guarantees the newest deployed build, not a stale cached shell.
  function applyUpdate() {
    if (updating) return
    setUpdating(true)
    void hardRefresh()
  }

  function handleClick() {
    if ((platform === 'ios' || platform === 'android') && !installPrompt && isInAppBrowser(platform)) {
      openInSystemBrowser(platform)
      return
    }

    if (platform === 'ios') {
      setGuide('ios')
      return
    }

    if (installPrompt) {
      installPrompt.prompt()
      installPrompt.userChoice.then(({ outcome }) => {
        if (outcome === 'accepted') setIsInstalled(true)
      })
      ;(window as any).__installPrompt = null
      setInstallPrompt(null)
      return
    }

    // No native prompt (browser without it, or the app is already installed):
    // show the short manual path. Never just reload the page.
    setGuide(platform === 'android' ? 'android' : desktopGuide())
  }

  const steps = GUIDE_STEPS[lang]

  if (isInstalled) {
    if (updateAvailable) {
      return (
        <button type="button" onClick={applyUpdate} disabled={updating} className={`ne-btn ne-btn-ghost disabled:cursor-wait ${className}`}>
          <RefreshCw className={`h-4 w-4 ${updating ? 'animate-spin' : ''}`} />
          {updating ? texts.updating : texts.update}
        </button>
      )
    }
    return (
      <span className={`inline-flex min-h-[3.25rem] items-center gap-2 font-medium text-[var(--ne-lime)] ${className}`}>
        <Check className="h-4 w-4" aria-hidden />
        {installedLabel}
      </span>
    )
  }

  return (
    <>
      <button type="button" onClick={handleClick} className={`ne-btn ne-btn-app ${className}`}>
        <span className="ne-btn-app__icon">
          <Download className="h-5 w-5" />
        </span>
        <span className="flex flex-col items-start leading-tight">
          <span className="font-medium">{label}</span>
          <span className="text-xs text-[var(--ne-text-3)]">{hint}</span>
        </span>
      </button>

      {guide && (
        <div className="ne-sheet-backdrop" onClick={() => setGuide(null)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="ne-install-title"
            className={`ne-sheet ${guide === 'ios' ? 'mb-24' : 'sm:mb-auto sm:mt-[20vh]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <p id="ne-install-title" className="mb-4 font-medium">
              {guide === 'ios' || guide === 'android' ? texts.homeTitle : texts.desktopTitle}
            </p>
            <ol className="space-y-3 text-sm text-[var(--ne-text-2)]">
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10">
                  {guide === 'ios' ? <Share className="h-4 w-4 text-[var(--ne-lime)]" /> : <MoreVertical className="h-4 w-4 text-[var(--ne-lime)]" />}
                </span>
                {steps[guide][0]}
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white/10">
                  <Download className="h-4 w-4 text-[var(--ne-lime)]" />
                </span>
                {steps[guide][1]}
              </li>
            </ol>
          </div>
          {guide === 'ios' && (
            <ArrowDown className="pointer-events-none absolute bottom-6 left-1/2 h-8 w-8 -translate-x-1/2 animate-bounce text-[var(--ne-lime)] motion-reduce:animate-none" />
          )}
        </div>
      )}
    </>
  )
}

const b = (t: string) => <strong className="font-medium text-[var(--ne-text)]">{t}</strong>
const q = (t: string) => <span className="text-[var(--ne-text-3)]">{t}</span>

const GUIDE_STEPS: Record<'ar' | 'en', Record<Guide, [ReactNode, ReactNode]>> = {
  en: {
    ios: [
      <span key="1">Tap {b('Share')} below {q('(inside ⋯ on newer iPhones)')}</span>,
      <span key="2">Tap {b('Add to Home Screen')}</span>,
    ],
    android: [
      <span key="1">Tap the browser menu {b('⋮')}</span>,
      <span key="2">Tap {b('Install app')} {q('(or Add to Home screen)')}</span>,
    ],
    chromium: [
      <span key="1">Click the install icon at the end of the {b('address bar')}</span>,
      <span key="2">Click {b('Install')} {q('(already installed? it says Open in app)')}</span>,
    ],
    'safari-mac': [
      <span key="1">Open Safari&apos;s {b('File')} menu</span>,
      <span key="2">Choose {b('Add to Dock')}</span>,
    ],
    unsupported: [
      <span key="1">This browser can&apos;t install apps. Open this page in {b('Chrome')} or {b('Edge')}</span>,
      <span key="2">Click {b('Download the app')} again</span>,
    ],
  },
  ar: {
    ios: [
      <span key="1">اضغط {b('مشاركة')} في الأسفل {q('(داخل ⋯ في الآيفونات الأحدث)')}</span>,
      <span key="2">اختر {b('إضافة إلى الشاشة الرئيسية')}</span>,
    ],
    android: [
      <span key="1">اضغط قائمة المتصفح {b('⋮')}</span>,
      <span key="2">اختر {b('تثبيت التطبيق')} {q('(أو إضافة إلى الشاشة الرئيسية)')}</span>,
    ],
    chromium: [
      <span key="1">اضغط أيقونة التثبيت في طرف {b('شريط العنوان')}</span>,
      <span key="2">اضغط {b('تثبيت')} {q('(إن كان مثبتًا ستجد: فتح في التطبيق)')}</span>,
    ],
    'safari-mac': [
      <span key="1">افتح قائمة {b('ملف')} في سفاري</span>,
      <span key="2">اختر {b('إضافة إلى Dock')}</span>,
    ],
    unsupported: [
      <span key="1">هذا المتصفح لا يثبّت التطبيقات. افتح الصفحة في {b('Chrome')} أو {b('Edge')}</span>,
      <span key="2">ثم اضغط {b('حمّل التطبيق')} مرة أخرى</span>,
    ],
  },
}
