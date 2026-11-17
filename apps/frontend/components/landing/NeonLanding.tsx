import type { CSSProperties } from 'react'
import Image from 'next/image'
import { ArrowRight, Check, Plus, ShieldCheck } from 'lucide-react'
import { LANDING, type LandingContent, type LandingLang } from './content'
import { neonFont } from './fonts'
import { NeonSign, Wordmark, WhatsAppGlyph, waLink } from './Brand'
import { Nav, RevealRoot, MobileDock, LangLink } from './Interactive'
import HeroDemo from './HeroDemo'
import HeroFibers from './HeroFibers'
import { InstallButton } from './InstallButton'
import { InboxMock, RulesMock, LeadCard, CampaignMock, PhoneMock } from './Mocks'
import './neon.css'

/*
 * NEON landing page — server-rendered in the visitor's language (/ is Arabic,
 * /en is English), with small client islands for the nav, the fibres, the
 * live demo, the scroll reveals and the install button.
 *
 * Sells the way Saudi consumer brands do: one big promise, the problem in the
 * customer's own words, the product in every block, three steps to start, and
 * a call to action that's never more than a scroll away.
 */

const delay = (ms: number) => ({ '--d': `${ms}ms` }) as CSSProperties
const Tick = () => <Check className="ne-tick" strokeWidth={3.5} aria-hidden />

/** 3D character renders, cut out to transparent WebP (public/marketing/characters). */
const CHAR = {
  hero: { src: '/marketing/characters/hero-v2.webp', w: 557, h: 877 },
  ai: { src: '/marketing/characters/ai-v2.webp', w: 780, h: 1004 },
  lead: { src: '/marketing/characters/lead-v2.webp', w: 508, h: 1002 },
  campaigns: { src: '/marketing/characters/campaigns-v2.webp', w: 335, h: 848 },
  inbox: { src: '/marketing/characters/inbox-v2.webp', w: 446, h: 705 },
  pair: { src: '/marketing/characters/pair-v2.webp', w: 584, h: 998 },
}

function Character({ name, alt, sizes, className = '', priority = false }: {
  name: keyof typeof CHAR; alt: string; sizes: string; className?: string; priority?: boolean
}) {
  const c = CHAR[name]
  return (
    <Image src={c.src} alt={alt} width={c.w} height={c.h} sizes={sizes} priority={priority}
      draggable={false} className={`ne-char h-auto select-none ${className}`} />
  )
}

function StartCta({ t, className = '', ink = false }: { t: LandingContent; className?: string; ink?: boolean }) {
  return (
    <a href={waLink(t.cta.start)} target="_blank" rel="noopener noreferrer" className={`ne-btn ${ink ? 'ne-btn-ink' : 'ne-btn-primary'} ${className}`}>
      <WhatsAppGlyph />
      {t.sell.cta}
    </a>
  )
}

// ─── Hero: a dark panel with the fibres, the promise, and the product live ──
function Hero({ t }: { t: LandingContent }) {
  const s = t.sell
  return (
    <section className="ne-hero ne-dark" aria-labelledby="ne-hero-title">
      <HeroFibers />
      <span className="ne-hero__shade" aria-hidden />
      <div className="ne-wrap ne-hero__grid">
        <div>
          <h1 id="ne-hero-title" className="ne-h1">
            <span className="ne-rise block" style={delay(80)}><span className="ne-hl">{s.titleHi}</span></span>
            <span className="ne-rise block" style={delay(160)}>{s.titleRest}</span>
          </h1>
          <p className="ne-lede ne-rise mt-6" style={delay(260)}>{s.sub}</p>
          <div className="ne-rise mt-9 flex flex-col gap-3 sm:flex-row" style={delay(340)}>
            <StartCta t={t} />
            <a href="#product" className="ne-btn ne-btn-ghost">
              {t.hero.secondary}
              <ArrowRight className="ne-arrow h-4 w-4" aria-hidden />
            </a>
          </div>
          <ul className="ne-checks ne-rise mt-8" style={delay(420)}>
            {s.checks.map((c) => <li key={c}><Check strokeWidth={3.5} aria-hidden />{c}</li>)}
          </ul>
        </div>
        <div className="ne-rise mx-auto w-full max-w-[34rem]" style={delay(300)}>
          <Character name="hero" alt={t.chars.hero} sizes="(max-width: 1024px) 70vw, 360px" priority className="mx-auto w-[min(22rem,78%)]" />
        </div>
      </div>
    </section>
  )
}

function Trust({ t }: { t: LandingContent }) {
  return (
    <div className="ne-wrap flex flex-col items-center gap-3 py-8 text-center sm:flex-row sm:justify-center sm:gap-8">
      <p className="flex items-center gap-2 text-sm font-bold">
        <ShieldCheck className="h-5 w-5 shrink-0" aria-hidden />
        {t.trust.lead}
      </p>
      <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 text-sm text-[var(--ne-text-3)]">
        {t.trust.items.map((i) => <li key={i}>{i}</li>)}
      </ul>
    </div>
  )
}

// ─── The problem, in the customer's own words ───────────────────────────────
type WallItem = string | { msg: string; tag: string }

function WallRow({ items }: { items: WallItem[] }) {
  return (
    <div>
      {items.map((m, i) =>
        typeof m === 'string'
          ? <span key={i} className="ne-msg">{m}</span>
          : <span key={i} className="ne-msg ne-msg--lit">{m.msg}<span className="ne-msg__tag">{m.tag}</span></span>,
      )}
    </div>
  )
}

function Wall({ t }: { t: LandingContent }) {
  const w = t.wall
  // Three drifting rows of unanswered messages, each with one that NEON caught.
  const rows = [0, 1, 2].map((r) => {
    const msgs = w.messages.filter((_, i) => i % 3 === r)
    const at = 2 + r
    return [...msgs.slice(0, at), w.lit[r], ...msgs.slice(at)] as WallItem[]
  })
  return (
    <section id="why" className="ne-block ne-block--lime ne-light ne-inset py-16 lg:py-24" aria-labelledby="ne-wall-title">
      <div className="ne-wrap text-center">
        <h2 id="ne-wall-title" className="ne-h2 mx-auto max-w-4xl" data-reveal>{w.title}</h2>
        <p className="ne-lede mx-auto mt-5 !text-[rgba(11,26,2,0.75)]" data-reveal style={delay(80)}>{w.sub}</p>
      </div>
      <div className="ne-wall mt-12" aria-hidden>
        {rows.map((items, r) => (
          // Each row holds its content twice so a -50% drift loops seamlessly.
          <div key={r} className={`ne-wall__row ${r === 1 ? 'ne-wall__row--back' : ''}`} style={{ '--t': `${70 + r * 16}s` } as CSSProperties}>
            <WallRow items={items} />
            <WallRow items={items} />
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center px-5" data-reveal>
        <StartCta t={t} ink />
      </div>
    </section>
  )
}

// ─── Bento: every feature shows its own screen ──────────────────────────────
function Bento({ t }: { t: LandingContent }) {
  const s = t.sell
  return (
    <section id="product" className="ne-section scroll-mt-20" aria-labelledby="ne-bento-title">
      <div className="ne-wrap">
        <div className="max-w-3xl" data-reveal>
          <h2 id="ne-bento-title" className="ne-h2">{s.bentoTitle}</h2>
          <p className="ne-lede mt-4">{s.bentoSub}</p>
        </div>
        <div className="ne-bento mt-12">
          <div className="ne-block ne-block--dark ne-dark ne-bento__wide" data-reveal>
            <div className="mb-8 max-w-2xl">
              <h3 className="ne-h3">{s.bento.inbox.title}</h3>
              <p className="mt-2 text-[var(--ne-text-2)]">{s.bento.inbox.desc}</p>
            </div>
            <InboxMock t={t} />
          </div>
          <div id="ai" className="ne-block ne-block--lime ne-light ne-bento__wide scroll-mt-20" data-reveal>
            <div className="max-w-2xl">
              <h3 className="ne-h3">{s.bento.ai.title}</h3>
              <p className="mt-2 text-[rgba(11,26,2,0.75)]">{s.bento.ai.desc}</p>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-center">
              <div className="pt-6"><HeroDemo d={t.demo} /></div>
              <RulesMock t={t} />
            </div>
          </div>
          <div className="ne-block ne-block--white ne-bento__wide grid items-end gap-8 lg:grid-cols-[1fr_1fr_0.7fr]" data-reveal>
            <div className="self-center">
              <h3 className="ne-h3">{s.bento.lead.title}</h3>
              <p className="mt-2 text-[var(--ne-text-2)]">{s.bento.lead.desc}</p>
            </div>
            <div className="self-center"><LeadCard t={t} /></div>
            <Character name="lead" alt={t.chars.lead} sizes="(max-width: 1024px) 60vw, 300px" className="mx-auto w-[min(16rem,70%)] lg:w-full" />
          </div>
          <div id="campaigns" className="ne-block ne-block--sand ne-bento__wide scroll-mt-20 grid items-end gap-8 lg:grid-cols-[1fr_0.8fr_1.1fr]" data-reveal>
            <div className="self-center">
              <h3 className="ne-h3">{s.bento.camp.title}</h3>
              <p className="mt-2 text-[var(--ne-text-2)]">{s.bento.camp.desc}</p>
              <ul className="mt-6 space-y-3">
                {t.campaigns.points.slice(0, 4).map((p) => (
                  <li key={p.title} className="flex gap-3"><Tick /><span><b>{p.title}</b> <span className="text-[var(--ne-text-2)]">{p.desc}</span></span></li>
                ))}
              </ul>
            </div>
            <Character name="campaigns" alt={t.chars.campaigns} sizes="(max-width: 1024px) 70vw, 340px" className="mx-auto w-[min(11rem,55%)] lg:w-[min(13rem,80%)]" />
            <div className="self-center"><CampaignMock t={t} /></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Three steps ────────────────────────────────────────────────────────────
function Steps({ t }: { t: LandingContent }) {
  const s = t.sell
  return (
    <section className="ne-section !pt-0" aria-labelledby="ne-steps-title">
      <div className="ne-wrap">
        <h2 id="ne-steps-title" className="ne-h2" data-reveal>{s.stepsTitle}</h2>
        <ol className="ne-steps mt-10">
          {s.steps.map((st, i) => (
            <li key={st.title} data-reveal style={delay(i * 90)}>
              <span className="ne-steps__n">{i + 1}</span>
              <p className="ne-h3 mt-5 !text-xl">{st.title}</p>
              <p className="mt-2 text-[var(--ne-text-2)]">{st.desc}</p>
            </li>
          ))}
        </ol>
        <div className="mt-10" data-reveal><StartCta t={t} /></div>
      </div>
    </section>
  )
}

// ─── Built for here: two moments of a working day ───────────────────────────
function Local({ t, isAr }: { t: LandingContent; isAr: boolean }) {
  const s = t.sell
  return (
    <section className="ne-section !pt-0" aria-labelledby="ne-local-title">
      <div className="ne-wrap">
        <div className="max-w-3xl" data-reveal>
          <h2 id="ne-local-title" className="ne-h2">{s.localTitle}</h2>
          <p className="ne-lede mt-4">{s.localSub}</p>
        </div>
        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <article className="ne-block ne-block--sand grid grid-cols-[1fr_0.8fr] items-end gap-4 p-7 sm:p-10" data-reveal>
            <div>
              <p className="ne-time" dir={isAr ? 'rtl' : 'ltr'}>{s.morning.time}<small>{s.morning.suffix}</small></p>
              <h3 className="ne-h3 mt-4 !text-xl">{s.morning.title}</h3>
              <p className="mt-2 text-[var(--ne-text-2)]">{s.morning.desc}</p>
            </div>
            <Character name="inbox" alt={t.chars.inbox} sizes="(max-width: 1024px) 40vw, 240px" className="w-full" />
          </article>
          <article className="ne-block ne-block--dark ne-dark grid grid-cols-[1fr_0.8fr] items-end gap-4 p-7 sm:p-10" data-reveal style={delay(100)}>
            <div>
              <p className="ne-time text-[var(--ne-lime)]" dir={isAr ? 'rtl' : 'ltr'}>{s.night.time}<small>{s.night.suffix}</small></p>
              <h3 className="ne-h3 mt-4 !text-xl">{s.night.title}</h3>
              <p className="mt-2 text-[var(--ne-text-2)]">{s.night.desc}</p>
            </div>
            <Character name="ai" alt={t.chars.ai} sizes="(max-width: 1024px) 40vw, 240px" className="w-full" />
          </article>
        </div>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {s.localPoints.map((p, i) => (
            <li key={p} className="flex items-start gap-3 rounded-2xl bg-white p-5 font-bold" data-reveal style={delay(i * 60)}><Tick />{p}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Everything else ────────────────────────────────────────────────────────
function Everything({ t }: { t: LandingContent }) {
  const s = t.index
  return (
    <section className="ne-section !pt-0" aria-labelledby="ne-all-title">
      <div className="ne-wrap">
        <div className="ne-block ne-block--white p-7 sm:p-12">
          <h2 id="ne-all-title" className="ne-h2 max-w-3xl !text-[clamp(1.75rem,3.4vw,2.75rem)]" data-reveal>{s.title}</h2>
          <div className="ne-index mt-10">
            {s.groups.map((g, i) => (
              <div key={g.title} data-reveal style={delay(i * 70)}>
                <h3>{g.title}</h3>
                <ul>{g.items.map((it) => <li key={it}><Tick />{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── The app ────────────────────────────────────────────────────────────────
function Mobile({ t, lang }: { t: LandingContent; lang: LandingLang }) {
  const s = t.mobile
  return (
    <section className="ne-block ne-block--lime ne-light ne-inset overflow-hidden" aria-labelledby="ne-app-title">
      <div className="ne-wrap grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-0">
        <div className="lg:py-20">
          <h2 id="ne-app-title" className="ne-h2" data-reveal>{t.sell.appTitle}</h2>
          <p className="ne-lede mt-5 !text-[rgba(11,26,2,0.78)]" data-reveal>{s.sub}</p>
          <ul className="mt-7 space-y-3">
            {s.points.map((p, i) => <li key={p} className="flex items-start gap-3 font-bold" data-reveal style={delay(i * 60)}><Tick />{p}</li>)}
          </ul>
          <div className="mt-9" data-reveal>
            <InstallButton lang={lang} label={s.install} hint={s.hint} installedLabel={s.installed} texts={t.install} />
          </div>
        </div>
        <div className="flex justify-center lg:translate-y-16 lg:self-end" data-reveal style={delay(120)}>
          <PhoneMock t={t} />
        </div>
      </div>
    </section>
  )
}

// ─── FAQ ────────────────────────────────────────────────────────────────────
function Faq({ t }: { t: LandingContent }) {
  const s = t.faq
  return (
    <section id="faq" className="ne-section scroll-mt-20" aria-labelledby="ne-faq-title">
      <div className="ne-wrap grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div data-reveal>
          <h2 id="ne-faq-title" className="ne-h2">{s.title}</h2>
          <p className="mt-4 text-[var(--ne-text-2)]">{s.sub}</p>
          <a href={waLink(t.cta.question)} target="_blank" rel="noopener noreferrer" className="ne-link mt-6">
            <WhatsAppGlyph className="h-5 w-5" />
            {s.ask}
          </a>
        </div>
        <div className="ne-faq" data-reveal style={delay(100)}>
          {s.items.map((item, i) => (
            <details key={item.q} open={i === 0}>
              <summary>
                {item.q}
                <Plus className="ne-plus" strokeWidth={3} aria-hidden />
              </summary>
              <div><p>{item.a}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Final call ─────────────────────────────────────────────────────────────
function Final({ t, lang }: { t: LandingContent; lang: LandingLang }) {
  return (
    // Neon reveal: a tube along the top ignites, its light pours down the block,
    // and the content surfaces out of the dark as the light reaches it. The
    // whole sequence is driven by the block's own .is-in (see neon.css).
    <section className="ne-block ne-block--dark ne-dark ne-inset ne-reveal text-center" data-neon aria-labelledby="ne-final-title">
      <span className="ne-reveal__light" aria-hidden />
      <span className="ne-reveal__tube" aria-hidden />
      <div className="ne-wrap relative flex flex-col items-center pb-20 pt-28 lg:pb-28 lg:pt-36">
        <div className="ne-signwrap ne-reveal__item" style={{ '--i': 0 } as CSSProperties}><NeonSign /></div>
        <h2 id="ne-final-title" className="ne-h1 ne-reveal__item mt-8 max-w-4xl" style={{ '--i': 1 } as CSSProperties}>{t.sell.finalTitle}</h2>
        <p className="ne-lede ne-reveal__item mx-auto mt-5 text-center" style={{ '--i': 2 } as CSSProperties}>{t.final.sub}</p>
        <div className="ne-reveal__item mt-9 flex flex-col items-center gap-4" style={{ '--i': 3 } as CSSProperties}>
          <StartCta t={t} className="w-full sm:w-auto" />
          <LangLink href="/login" lang={lang} className="text-sm font-bold text-[var(--ne-text-3)] hover:text-[var(--ne-text)]">{t.final.signIn}</LangLink>
        </div>
      </div>
    </section>
  )
}

function Footer({ t, lang }: { t: LandingContent; lang: LandingLang }) {
  const other: LandingLang = lang === 'ar' ? 'en' : 'ar'
  return (
    <footer className="ne-light pb-28 pt-14 lg:pb-12">
      <div className="ne-wrap grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-[var(--ne-text-3)]">{t.footer.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-bold">{t.footer.product}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--ne-text-2)]">
            {t.nav.links.map((l) => <li key={l.id}><a href={`#${l.id}`} className="hover:text-[var(--ne-text)]">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold">{t.footer.account}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-[var(--ne-text-2)]">
            <li><LangLink href="/login" lang={lang} className="hover:text-[var(--ne-text)]">{t.nav.signIn}</LangLink></li>
            <li><a href={waLink(t.cta.start)} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--ne-text)]">{t.nav.cta}</a></li>
            <li><LangLink href={t.nav.switchHref} lang={other} className="hover:text-[var(--ne-text)]"><span lang={other}>{t.nav.switchLabel}</span></LangLink></li>
          </ul>
        </div>
      </div>
      <div className="ne-wrap mt-12 flex flex-col gap-2 border-t border-[var(--ne-line)] pt-6 text-xs text-[var(--ne-text-3)] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} NEON. {t.footer.rights}</p>
        <p>{t.footer.legal}</p>
      </div>
    </footer>
  )
}

// ═══════════════════════════════════════════════════════════════════════════
export default function NeonLanding({ lang }: { lang: LandingLang }) {
  const t = LANDING[lang]
  const isAr = lang === 'ar'
  return (
    <div className={`ne ${neonFont.variable}`} lang={lang} dir={isAr ? 'rtl' : 'ltr'}>
      <a href="#main" className="ne-skip">{t.nav.skip}</a>
      <Nav t={t} lang={lang} />
      <main id="main">
        <Hero t={t} />
        <Trust t={t} />
        <Wall t={t} />
        <Bento t={t} />
        <Steps t={t} />
        <Local t={t} isAr={isAr} />
        <Everything t={t} />
        <Mobile t={t} lang={lang} />
        <Faq t={t} />
        <Final t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
      <MobileDock label={t.sell.cta} message={t.cta.start} />
      <RevealRoot />
    </div>
  )
}
