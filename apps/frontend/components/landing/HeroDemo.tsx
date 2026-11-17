'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { Sparkles, Mic, Paperclip, Smile, CheckCheck } from 'lucide-react'
import { NeonMark } from './Brand'
import type { LandingContent } from './content'

/**
 * The product's promise in ten seconds: a customer writes late at night, the
 * assistant answers by the shop's rules, and the customer card beside it
 * scores her, lights her buying signals and hands her to a salesperson —
 * whose phone gets the notification.
 *
 * Every element is laid out from the first frame (only invisible), so nothing
 * shifts while it plays. It loops only while on screen; reduced motion and the
 * server render both show the finished state's layout.
 */
const TIMELINE = [700, 1500, 3100, 3700, 4900, 5600, 6300, 7200] as const
const LAST = TIMELINE.length
const HOLD_MS = 5200

export default function HeroDemo({ d }: { d: LandingContent['demo'] }) {
  const ref = useRef<HTMLDivElement>(null)
  const [step, setStep] = useState(0)
  const [inView, setInView] = useState(true)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.15 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (reduced) { setStep(LAST); return }
    if (!inView) return
    const timers: number[] = []
    const run = () => {
      setStep(0)
      TIMELINE.forEach((ms, i) => timers.push(window.setTimeout(() => setStep(i + 1), ms)))
      timers.push(window.setTimeout(run, TIMELINE[LAST - 1] + HOLD_MS))
    }
    run()
    return () => timers.forEach(clearTimeout)
  }, [inView, reduced])

  const on = (n: number) => (step >= n ? 'is-on' : '')
  // 1 asks · 2 typing · 3 answer · 4 first signal · 5 says yes · 6 hot · 7 owner · 8 notification
  const score = step >= 6 ? 86 : step >= 4 ? 41 : 0

  return (
    <div ref={ref} className="ne-floor relative mx-auto w-full max-w-[36rem]">
      {/* Fahad's phone gets the hand-off. */}
      <div className={`ne-toast ${on(8)}`} role="status" aria-live="off">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[0.6rem] bg-[#06140b] ring-1 ring-[var(--ne-line-2)]">
          <NeonMark className="h-5 w-auto" />
        </span>
        <span className="min-w-0 flex-1 leading-tight">
          <span className="flex items-center justify-between gap-2 text-[0.8125rem] font-medium text-[var(--ne-text)]">
            {d.toastTitle}
            <span className="text-[0.6875rem] font-normal text-[var(--ne-text-3)]">{d.now}</span>
          </span>
          <span className="mt-0.5 block truncate text-xs text-[var(--ne-text-2)]">{d.toastBody}</span>
        </span>
      </div>

      <div className="ne-frame overflow-hidden">
        <div className="grid sm:grid-cols-[1fr_11.5rem]">
          {/* ── Conversation ── */}
          <div className="flex min-w-0 flex-col bg-[rgb(3_14_8/0.6)]">
            <div className="flex items-center gap-3 border-b border-[var(--ne-line)] px-4 py-3">
              <span className="ne-avatar">{d.initial}</span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[0.9375rem] font-medium">{d.contact}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--ne-text-3)]">
                  <span className="ne-dot ne-dot--live" />
                  {d.online}
                </span>
              </span>
            </div>

            <div className="ne-chat min-h-[18.5rem]">
              <span className="ne-sys">{d.today}</span>
              <div className={`ne-bubble ne-bubble--in ne-step ${on(1)}`}>
                {d.m1}
                <span className="ne-bubble__meta">{d.t1}</span>
              </div>

              {/* Typing and the answer share one slot, so the thread never jumps. */}
              <div className="grid">
                <div className={`ne-bubble ne-bubble--out ne-step col-start-1 row-start-1 ${step === 2 ? 'is-on' : ''}`} aria-hidden>
                  <span className="ne-bubble__label"><Sparkles className="h-3 w-3" />{d.aiLabel}</span>
                  <span className="ne-typing py-1"><i /><i /><i /></span>
                </div>
                <div className={`ne-bubble ne-bubble--out ne-step col-start-1 row-start-1 ${on(3)}`}>
                  <span className="ne-bubble__label"><Sparkles className="h-3 w-3" />{d.aiLabel}</span>
                  {d.m2}
                  <span className="ne-bubble__meta">
                    {d.t2}
                    <CheckCheck className={`h-3.5 w-3.5 transition-colors duration-500 ${step >= 5 ? 'text-[#53bdeb]' : ''}`} aria-hidden />
                  </span>
                </div>
              </div>

              <div className={`ne-bubble ne-bubble--in ne-step ${on(5)}`}>
                {d.m3}
                <span className="ne-bubble__meta">{d.t3}</span>
              </div>
            </div>

            <div className="mt-auto flex items-center gap-2 border-t border-[var(--ne-line)] px-3 py-2.5 text-[var(--ne-text-3)]" aria-hidden>
              <Smile className="h-[18px] w-[18px]" />
              <Paperclip className="h-[18px] w-[18px]" />
              <span className="flex-1 truncate rounded-full bg-[rgb(255_255_255/0.05)] px-3.5 py-2 text-[0.8125rem]">{d.composer}</span>
              <Mic className="h-[18px] w-[18px]" />
            </div>
          </div>

          {/* ── Customer card ── */}
          <aside className="border-t border-[var(--ne-line)] bg-[var(--ne-panel)] px-4 py-4 text-[0.8125rem] sm:border-t-0 sm:border-s" aria-label={d.card}>
            <p className="text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[var(--ne-text-3)]">{d.card}</p>

            <div className="mt-3 flex items-center gap-3 sm:flex-col sm:items-start">
              <ScoreRing value={score} label={d.score} />
              <div className="min-w-0 space-y-1.5">
                <span className={`ne-chip ne-chip--hot ne-step ${on(6)}`}>{d.status}</span>
                <p className={`ne-step text-[var(--ne-text-2)] ${on(7)}`}>
                  <span className="text-[var(--ne-text-3)]">{d.owner}: </span>{d.ownerName}
                </p>
              </div>
            </div>

            <p className="mt-4 text-[0.6875rem] text-[var(--ne-text-3)]">{d.signals}</p>
            <ul className="mt-1.5 space-y-1.5 max-sm:flex max-sm:gap-4 max-sm:space-y-0">
              <li className={`ne-lamp ${step >= 4 ? 'is-on' : ''}`}>{d.s1}</li>
              <li className={`ne-lamp ${step >= 6 ? 'is-on' : ''}`}>{d.s2}</li>
            </ul>

            <p className={`ne-step mt-4 hidden border-t border-[var(--ne-line)] pt-3 leading-relaxed text-[var(--ne-text-2)] sm:block ${on(6)}`}>
              {d.summary}
            </p>
          </aside>
        </div>
      </div>
    </div>
  )
}

function ScoreRing({ value, label }: { value: number; label: string }) {
  return (
    <div className="relative grid h-[4.5rem] w-[4.5rem] shrink-0 place-items-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r="42" fill="none" stroke="rgb(255 255 255 / 0.07)" strokeWidth="7" />
        <circle
          cx="50" cy="50" r="42" fill="none" stroke="var(--ne-lime)" strokeWidth="7" strokeLinecap="round"
          className="ne-ring ne-ring__arc is-on transition-opacity"
          strokeOpacity={value ? 1 : 0}
          style={{ '--ne-to': value, filter: 'drop-shadow(0 0 4px rgb(216 252 52 / 0.7))' } as CSSProperties}
        />
      </svg>
      <span className="text-center leading-none">
        <span className="ne-count is-on block text-xl font-semibold" style={{ '--ne-to': value } as CSSProperties} aria-hidden />
        <span className="sr-only">{label}: {value}</span>
        <span className="mt-1 block text-[0.625rem] text-[var(--ne-text-3)]" aria-hidden>{label}</span>
      </span>
    </div>
  )
}
