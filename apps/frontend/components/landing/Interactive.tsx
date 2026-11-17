'use client'

import Link from 'next/link'
import { useEffect, useState, type ReactNode } from 'react'
import { Menu, X, Globe } from 'lucide-react'
import { useLanguage } from '@/components/providers/I18nProvider'
import { Wordmark, WhatsAppGlyph, waLink } from './Brand'
import type { LandingContent, LandingLang } from './content'

/**
 * Arms the scroll reveals and the section tubes. Anything already on screen is
 * marked lit *before* html.ne-js goes on, so nothing visible blinks out and
 * back; everything below the fold then waits to be scrolled to.
 */
export function RevealRoot() {
  useEffect(() => {
    const root = document.documentElement
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal], [data-neon], .ne-tube'))
    const vh = window.innerHeight
    const pending: HTMLElement[] = []
    for (const el of els) {
      const r = el.getBoundingClientRect()
      if (r.top < vh * 0.92 && r.bottom > 0) el.classList.add('is-in')
      else pending.push(el)
    }
    root.classList.add('ne-js')
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          e.target.classList.add('is-in')
          io.unobserve(e.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    )
    pending.forEach((el) => io.observe(el))
    return () => {
      io.disconnect()
      root.classList.remove('ne-js')
    }
  }, [])
  return null
}

/** A link that also makes this page's language the app's language, so signing
 *  in from the Arabic page opens the CRM in Arabic. */
export function LangLink({ href, lang, className, children, onClick }: {
  href: string
  lang: LandingLang
  className?: string
  children: ReactNode
  onClick?: () => void
}) {
  const { setLanguage } = useLanguage()
  return (
    <Link href={href} className={className} hrefLang={lang} onClick={() => { setLanguage(lang); onClick?.() }}>
      {children}
    </Link>
  )
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  const key = ids.join(',')
  useEffect(() => {
    const els = key.split(',').map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [key])
  return active
}

export function Nav({ t, lang }: { t: LandingContent; lang: LandingLang }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(t.nav.links.map((l) => l.id))
  const other: LandingLang = lang === 'ar' ? 'en' : 'ar'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const close = () => setOpen(false)

  return (
    <header className={`ne-nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <nav className="ne-wrap ne-nav__bar" aria-label="NEON">
        <Link href={lang === 'ar' ? '/' : '/en'} aria-label="NEON" className="flex shrink-0 items-center"><Wordmark /></Link>

        <div className="hidden items-center gap-1 lg:flex">
          {t.nav.links.map((l) => (
            <a key={l.id} href={`#${l.id}`} className="ne-nav__link" aria-current={active === l.id ? 'true' : undefined}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <LangLink href={t.nav.switchHref} lang={other} className="ne-nav__link hidden items-center gap-1.5 sm:inline-flex">
            <Globe className="h-4 w-4" aria-hidden />
            <span lang={other}>{t.nav.switchLabel}</span>
          </LangLink>
          <LangLink href="/login" lang={lang} className="ne-nav__link hidden lg:inline-flex">{t.nav.signIn}</LangLink>
          <a href={waLink(t.cta.start)} target="_blank" rel="noopener noreferrer" className="ne-btn ne-btn-primary ne-btn-sm">
            {t.nav.cta}
          </a>
          <button
            type="button"
            className="ne-iconbtn lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="ne-menu"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div id="ne-menu" className="ne-nav__panel lg:hidden">
        <div>
          <div className="ne-wrap pb-5">
            {t.nav.links.map((l) => (
              <a key={l.id} href={`#${l.id}`} onClick={close} tabIndex={open ? 0 : -1}
                className="flex h-12 items-center border-b border-[var(--ne-line)] text-base">
                {l.label}
              </a>
            ))}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <LangLink href="/login" lang={lang} onClick={close} className="ne-btn ne-btn-ghost">{t.nav.signIn}</LangLink>
              <LangLink href={t.nav.switchHref} lang={other} onClick={close} className="ne-btn ne-btn-ghost">
                <Globe className="h-4 w-4" aria-hidden />
                <span lang={other}>{t.nav.switchLabel}</span>
              </LangLink>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

/** Phones: once the hero's CTA scrolls away, WhatsApp stays one tap away. */
export function MobileDock({ label, message }: { label: string; message: string }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => {
      const fromBottom = document.documentElement.scrollHeight - window.scrollY - window.innerHeight
      setShow(window.scrollY > 640 && fromBottom > 720)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`ne-dock ${show ? 'is-on' : ''}`} aria-hidden={!show}>
      <a href={waLink(message)} target="_blank" rel="noopener noreferrer" tabIndex={show ? 0 : -1} className="ne-btn ne-btn-primary w-full">
        <WhatsAppGlyph />
        {label}
      </a>
    </div>
  )
}
