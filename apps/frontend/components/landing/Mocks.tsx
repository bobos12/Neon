import type { CSSProperties } from 'react'
import {
  Search, Sparkles, CheckCheck, Pin, StickyNote, Bot, Hand, ShieldCheck, Package, PauseCircle,
  Users, FileCheck2, Signal, Mic, Paperclip, Smile, Send, ChevronLeft, Bell,
} from 'lucide-react'
import { NeonMark } from './Brand'
import type { LandingContent } from './content'

/*
 * The product, drawn in HTML from the real screens' structure: the same
 * panes, fields and states the CRM shows, in the visitor's own language.
 * They are illustrations of the product, so they are hidden from assistive
 * tech as a whole and summarised by the section copy around them.
 */

const initial = (name: string) => name.trim().charAt(0)

// ─── Shared inbox ───────────────────────────────────────────────────────────
export function InboxMock({ t }: { t: LandingContent }) {
  const m = t.inbox.mock
  const d = t.demo
  return (
    <div className="ne-frame overflow-hidden" aria-hidden>
      <div className="grid h-[34rem] md:grid-cols-[16rem_1fr] lg:grid-cols-[17rem_1fr_15rem]">
        {/* List */}
        <div className="hidden min-h-0 flex-col border-e border-[var(--ne-line)] md:flex">
          <div className="p-3">
            <div className="flex items-center gap-2 rounded-lg bg-[rgb(255_255_255/0.05)] px-3 py-2 text-[0.8125rem] text-[var(--ne-text-3)]">
              <Search className="h-4 w-4" />{m.search}
            </div>
            <div className="mt-3 flex gap-1.5">
              {m.tabs.map((tab, i) => (
                <span key={tab} className={`ne-chip ${i === 0 ? 'ne-chip--lime' : ''}`}>{tab}</span>
              ))}
            </div>
          </div>
          <ul className="min-h-0 flex-1 overflow-hidden">
            {m.chats.map((c, i) => (
              <li key={c.name} className={`flex gap-3 px-3 py-3 ${i === 0 ? 'bg-[rgb(var(--ne-glow)/0.06)] shadow-[inset_2px_0_0_var(--ne-lime)] rtl:shadow-[inset_-2px_0_0_var(--ne-lime)]' : ''}`}>
                <span className="ne-avatar">{initial(c.name)}</span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-[0.875rem] font-medium">{c.name}</span>
                    <span className={`shrink-0 text-[0.6875rem] ${c.unread ? 'text-[var(--ne-lime)]' : 'text-[var(--ne-text-3)]'}`}>{c.time}</span>
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[0.8125rem] text-[var(--ne-text-3)]">
                    {c.bot && <Bot className="h-3.5 w-3.5 shrink-0 text-[var(--ne-lime)]" />}
                    <span className="truncate">{c.msg}</span>
                    {c.unread && (
                      <span className="ms-auto grid h-[1.15rem] min-w-[1.15rem] shrink-0 place-items-center rounded-full bg-[var(--ne-lime)] px-1 text-[0.6875rem] font-semibold text-[var(--ne-lime-ink)]">{c.unread}</span>
                    )}
                  </span>
                  {c.tag && <span className={`ne-chip mt-1.5 ${c.hot ? 'ne-chip--hot' : ''}`}>{c.tag}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Conversation */}
        <div className="flex min-h-0 min-w-0 flex-col bg-[rgb(3_14_8/0.55)]">
          <div className="flex items-center gap-3 border-b border-[var(--ne-line)] px-4 py-3">
            <ChevronLeft className="h-5 w-5 text-[var(--ne-text-3)] md:hidden rtl:rotate-180" />
            <span className="ne-avatar">{d.initial}</span>
            <span className="min-w-0 flex-1 leading-tight">
              <span className="block truncate text-[0.9375rem] font-medium">{d.contact}</span>
              <span className="mt-0.5 block text-xs text-[var(--ne-text-3)]">{m.assignedTo}</span>
            </span>
            <Pin className="h-4 w-4 text-[var(--ne-text-3)]" />
          </div>
          <div className="ne-chat min-h-0 flex-1 justify-end overflow-hidden">
            <span className="ne-sys">{m.autoAssigned}</span>
            <div className="ne-bubble ne-bubble--in">{d.m1}<span className="ne-bubble__meta">{d.t1}</span></div>
            <div className="ne-bubble ne-bubble--out">
              <span className="ne-bubble__label"><Sparkles className="h-3 w-3" />{d.aiLabel}</span>
              {d.m2}
              <span className="ne-bubble__meta">{d.t2}<CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" /></span>
            </div>
            <div className="ne-bubble ne-bubble--in">{d.m3}<span className="ne-bubble__meta">{d.t3}</span></div>
            <span className="ne-sys">{m.botPaused}</span>
            <div className="ne-bubble ne-bubble--out">
              {m.fahadMsg}
              <span className="ne-bubble__meta">{m.fahadTime}<CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" /></span>
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-[var(--ne-line)] px-3 py-2.5 text-[var(--ne-text-3)]">
            <Smile className="h-[18px] w-[18px]" />
            <Paperclip className="h-[18px] w-[18px]" />
            <span className="flex-1 truncate rounded-full bg-[rgb(255_255_255/0.05)] px-3.5 py-2 text-[0.8125rem]">{d.composer}</span>
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ne-lime)] text-[var(--ne-lime-ink)]"><Mic className="h-4 w-4" /></span>
          </div>
        </div>

        {/* Customer context */}
        <div className="hidden min-h-0 flex-col gap-4 overflow-hidden border-s border-[var(--ne-line)] bg-[var(--ne-panel)] p-4 text-[0.8125rem] lg:flex">
          <div className="flex flex-col items-center gap-2 border-b border-[var(--ne-line)] pb-4 text-center">
            <span className="ne-avatar h-14 w-14 text-lg">{d.initial}</span>
            <span className="font-medium">{d.contact}</span>
            <span className="text-xs text-[var(--ne-text-3)]" dir="ltr">{m.phone}</span>
            <span className="flex gap-1.5">{m.tags.map((tag) => <span key={tag} className="ne-chip">{tag}</span>)}</span>
          </div>
          <dl className="space-y-2.5">
            <div className="flex items-center justify-between">
              <dt className="text-[var(--ne-text-3)]">{m.score}</dt>
              <dd className="flex items-center gap-2"><span className="ne-chip ne-chip--hot">{m.hot}</span><b className="font-semibold">86</b></dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--ne-text-3)]">{m.stage}</dt>
              <dd>{m.stageValue}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-[var(--ne-text-3)]">{d.owner}</dt>
              <dd>{d.ownerName}</dd>
            </div>
          </dl>
          <div className="rounded-lg border border-[rgb(255_191_92/0.2)] bg-[rgb(255_191_92/0.06)] p-3">
            <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--ne-amber)]"><StickyNote className="h-3.5 w-3.5" />{m.note}</p>
            <p className="mt-1.5 leading-relaxed text-[var(--ne-text-2)]">{m.noteBody}</p>
            <p className="mt-1.5 text-xs text-[var(--ne-text-3)]">— {m.noteBy}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Assistant rules ────────────────────────────────────────────────────────
function Group({ icon: Icon, title, children }: { icon: typeof Bot; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-[var(--ne-line)] px-5 py-4">
      <p className="mb-2.5 flex items-center gap-2 text-xs font-medium text-[var(--ne-text-3)]"><Icon className="h-3.5 w-3.5 text-[var(--ne-lime)]" />{title}</p>
      {children}
    </div>
  )
}

export function RulesMock({ t }: { t: LandingContent }) {
  const r = t.ai.rules
  return (
    <div className="ne-frame overflow-hidden text-[0.875rem]" aria-hidden>
      <div className="flex items-center justify-between px-5 py-4">
        <span className="flex items-center gap-2.5 font-medium"><Bot className="h-[18px] w-[18px] text-[var(--ne-lime)]" />{r.title}</span>
        <span className="flex items-center gap-2 text-xs text-[var(--ne-text-2)]">
          {r.on}
          <span className="relative h-5 w-9 rounded-full bg-[var(--ne-lime)] shadow-[0_0_12px_rgb(216_252_52/0.5)]">
            <span className="absolute top-0.5 h-4 w-4 rounded-full bg-[var(--ne-lime-ink)] [inset-inline-end:0.125rem]" />
          </span>
        </span>
      </div>
      <dl className="grid grid-cols-3 border-t border-[var(--ne-line)]">
        {r.identity.map((f, i) => (
          <div key={f.k} className={`px-5 py-3 ${i ? 'border-s border-[var(--ne-line)]' : ''}`}>
            <dt className="text-xs text-[var(--ne-text-3)]">{f.k}</dt>
            <dd className="mt-0.5 truncate font-medium">{f.v}</dd>
          </div>
        ))}
      </dl>
      <Group icon={Package} title={r.productsTitle}>
        <ul className="space-y-1.5">{r.products.map((p) => <li key={p} className="text-[var(--ne-text-2)]">{p}</li>)}</ul>
      </Group>
      <Group icon={ShieldCheck} title={r.rulesTitle}>
        <ul className="space-y-1.5">{r.rules.map((p) => <li key={p} className="text-[var(--ne-text-2)]">{p}</li>)}</ul>
      </Group>
      <Group icon={Hand} title={r.handoffTitle}>
        <div className="flex flex-wrap gap-1.5">{r.handoff.map((h) => <span key={h} className="ne-chip">{h}</span>)}</div>
      </Group>
      <div className="flex items-center gap-2.5 border-t border-[var(--ne-line)] bg-[rgb(var(--ne-glow)/0.05)] px-5 py-3.5 text-[0.8125rem] text-[var(--ne-text-2)]">
        <PauseCircle className="h-4 w-4 shrink-0 text-[var(--ne-lime)]" />{r.pause}
      </div>
    </div>
  )
}

// ─── Lead scoring ───────────────────────────────────────────────────────────
export function LeadCard({ t }: { t: LandingContent }) {
  const l = t.ai.lead
  return (
    <div className="ne-frame p-5 text-[0.875rem] sm:p-6" data-reveal aria-hidden>
      <div className="flex items-center gap-4">
        <div className="relative grid h-24 w-24 shrink-0 place-items-center">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="var(--ne-lime)" strokeWidth="6" strokeLinecap="round"
              className="ne-ring ne-ring__arc" style={{ '--ne-to': 86, filter: 'drop-shadow(0 0 5px rgb(216 252 52 / 0.7))' } as CSSProperties} />
          </svg>
          <span className="text-center leading-none">
            <span className="ne-count block text-[1.75rem] font-semibold" style={{ '--ne-to': 86 } as CSSProperties} />
            <span className="mt-1 block text-[0.625rem] text-[var(--ne-text-3)]">/ 100</span>
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-xs text-[var(--ne-text-3)]">{l.scoreLabel}</p>
          <p className="mt-0.5 truncate text-lg font-medium">{l.name}</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            <span className="ne-chip ne-chip--hot">{l.status}</span>
            <span className="ne-chip">{l.priority}</span>
          </div>
        </div>
      </div>

      <p className="mt-6 text-xs text-[var(--ne-text-3)]">{l.signalsLabel}</p>
      <ul className="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
        {l.signals.map((s, i) => (
          <li key={s.label} className={`ne-lamp ${s.on ? 'ne-lamp--js' : ''}`} style={{ transitionDelay: `${300 + i * 180}ms` }}>
            {s.label}
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-4 border-t border-[var(--ne-line)] pt-5 sm:grid-cols-2">
        <div>
          <p className="text-xs text-[var(--ne-text-3)]">{l.summaryLabel}</p>
          <p className="mt-1 leading-relaxed text-[var(--ne-text-2)]">{l.summary}</p>
        </div>
        <div>
          <p className="text-xs text-[var(--ne-lime)]">{l.recLabel}</p>
          <p className="mt-1 leading-relaxed">{l.rec}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Campaign monitor ───────────────────────────────────────────────────────
export function CampaignMock({ t }: { t: LandingContent }) {
  const m = t.campaigns.mock
  return (
    <div className="ne-frame overflow-hidden text-[0.875rem]" data-reveal aria-hidden>
      <div className="flex items-center justify-between gap-3 px-5 py-4">
        <span className="truncate text-base font-medium">{m.name}</span>
        <span className="ne-chip ne-chip--lime shrink-0"><span className="ne-dot ne-dot--live animate-pulse" />{m.status}</span>
      </div>
      <dl className="grid border-t border-[var(--ne-line)] sm:grid-cols-2">
        <div className="px-5 py-3.5">
          <dt className="flex items-center gap-1.5 text-xs text-[var(--ne-text-3)]"><Users className="h-3.5 w-3.5" />{m.audience}</dt>
          <dd className="mt-2 flex flex-wrap items-center gap-1.5">
            {m.chips.map((c) => <span key={c} className="ne-chip">{c}</span>)}
            <span className="text-xs text-[var(--ne-text-2)]">· {m.recipients}</span>
          </dd>
        </div>
        <div className="border-t border-[var(--ne-line)] px-5 py-3.5 sm:border-s sm:border-t-0">
          <dt className="flex items-center gap-1.5 text-xs text-[var(--ne-text-3)]"><FileCheck2 className="h-3.5 w-3.5" />{m.template}</dt>
          <dd className="mt-2"><span className="ne-chip ne-chip--lime">{m.approved}</span></dd>
        </div>
      </dl>
      <div className="space-y-4 border-t border-[var(--ne-line)] px-5 py-5">
        {m.stats.map((s, i) => (
          <div key={s.label}>
            <div className="mb-1.5 flex justify-between text-[0.8125rem]">
              <span className="text-[var(--ne-text-2)]">{s.label}</span>
              <b className="font-medium">{s.value}</b>
            </div>
            <div className="ne-bar"><i style={{ width: `${s.pct}%`, '--d': `${200 + i * 160}ms` } as CSSProperties} /></div>
          </div>
        ))}
      </div>
      <div className="border-t border-[var(--ne-line)] px-5 py-4">
        <p className="text-xs font-medium text-[var(--ne-amber)]">{m.failuresTitle}</p>
        <ul className="mt-2 space-y-1.5 text-[0.8125rem]">
          {m.failures.map((f) => (
            <li key={f.reason} className="flex justify-between gap-3 text-[var(--ne-text-2)]"><span>{f.reason}</span><span>{f.count}</span></li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-between gap-3 border-t border-[var(--ne-line)] bg-[rgb(var(--ne-glow)/0.05)] px-5 py-3.5 text-[0.8125rem]">
        <span className="flex items-center gap-2 text-[var(--ne-text-2)]"><Signal className="h-4 w-4 text-[var(--ne-lime)]" />{m.limit}</span>
        <b className="font-medium" dir="ltr">{m.limitValue}</b>
      </div>
    </div>
  )
}

// ─── Phone ──────────────────────────────────────────────────────────────────
export function PhoneMock({ t }: { t: LandingContent }) {
  const p = t.mobile.phone
  return (
    <div className="ne-phone mx-auto" aria-hidden>
      <div className="ne-phone__screen">
        <span className="ne-phone__island" />
        {/* The push that lands while the phone is in your pocket. */}
        <div className="absolute inset-x-2.5 top-10 z-[3] flex items-center gap-2.5 rounded-2xl border border-[var(--ne-line-2)] bg-[rgb(18_36_26/0.92)] p-2.5 shadow-[0_16px_30px_-12px_rgb(0_0_0/0.9)] backdrop-blur" data-reveal style={{ '--d': '500ms' } as CSSProperties}>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#06140b] ring-1 ring-[var(--ne-line-2)]"><NeonMark className="h-4 w-auto" /></span>
          <span className="min-w-0 leading-tight">
            <span className="flex items-center gap-1.5 text-[0.6875rem] font-semibold"><Bell className="h-3 w-3 text-[var(--ne-lime)]" />{p.push}</span>
            <span className="mt-0.5 block truncate text-[0.6875rem] text-[var(--ne-text-2)]">{p.pushBody}</span>
          </span>
        </div>
        <div className="px-4 pb-2 pt-[6.5rem]">
          <p className="text-xl font-semibold">{p.title}</p>
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-[rgb(255_255_255/0.05)] px-3 py-1.5 text-xs text-[var(--ne-text-3)]"><Search className="h-3.5 w-3.5" />{t.inbox.mock.search}</div>
        </div>
        <ul>
          {p.chats.map((c) => (
            <li key={c.name} className="flex items-center gap-2.5 px-4 py-2.5">
              <span className="ne-avatar ne-avatar--sm">{initial(c.name)}</span>
              <span className="min-w-0 flex-1 border-b border-[var(--ne-line)] pb-2.5">
                <span className="flex justify-between gap-2 text-[0.8125rem] font-medium">
                  <span className="truncate">{c.name}</span>
                  <span className={`shrink-0 text-[0.625rem] font-normal ${c.unread ? 'text-[var(--ne-lime)]' : 'text-[var(--ne-text-3)]'}`}>{c.time}</span>
                </span>
                <span className="mt-0.5 flex items-center gap-2 text-xs text-[var(--ne-text-3)]">
                  <span className="truncate">{c.msg}</span>
                  {c.unread && <span className="ms-auto grid h-4 min-w-4 place-items-center rounded-full bg-[var(--ne-lime)] px-1 text-[0.625rem] font-semibold text-[var(--ne-lime-ink)]">{c.unread}</span>}
                </span>
              </span>
            </li>
          ))}
        </ul>
        <div className="absolute bottom-5 grid h-12 w-12 place-items-center rounded-2xl bg-[var(--ne-lime)] text-[var(--ne-lime-ink)] shadow-[0_0_24px_rgb(216_252_52/0.45)] [inset-inline-end:1rem]">
          <Send className="h-5 w-5 rtl:-scale-x-100" />
        </div>
      </div>
    </div>
  )
}
