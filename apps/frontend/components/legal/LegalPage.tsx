import Link from 'next/link';
import NeonMark from '@/components/brand/NeonMark';

/**
 * Public legal pages (privacy, terms, data deletion). Plain server-rendered
 * text: Meta's reviewers and customers must be able to read them without an
 * account, JavaScript or a working backend.
 */

export const LEGAL = {
  company: 'Trace Studio',
  location: 'Dubai, United Arab Emirates',
  locationAr: 'دبي، الإمارات العربية المتحدة',
  product: 'Neon',
  email: '2smyahmed@gmail.com',
  updated: '11 November 2026',
  updatedAr: '١١ نوفمبر ٢٠٢٦',
};

export interface LegalSection {
  heading: string;
  body: (string | string[])[];
}

export interface LegalDoc {
  title: string;
  intro: string;
  sections: LegalSection[];
}

function Doc({ doc, dir, updated }: { doc: LegalDoc; dir: 'ltr' | 'rtl'; updated: string }) {
  return (
    <article dir={dir} lang={dir === 'rtl' ? 'ar' : 'en'} className="py-10">
      <h1 className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-[28px]">{doc.title}</h1>
      <p className="mt-1 text-xs text-ink-3">{updated}</p>
      <p className="mt-5 text-[15px] leading-7 text-ink-2">{doc.intro}</p>
      {doc.sections.map((s) => (
        <section key={s.heading} className="mt-8">
          <h2 className="text-base font-semibold text-ink">{s.heading}</h2>
          {s.body.map((b, i) =>
            Array.isArray(b) ? (
              <ul key={i} className="mt-3 list-disc space-y-1.5 ps-5 text-[15px] leading-7 text-ink-2">
                {b.map((li) => <li key={li}>{li}</li>)}
              </ul>
            ) : (
              <p key={i} className="mt-3 text-[15px] leading-7 text-ink-2">{b}</p>
            ),
          )}
        </section>
      ))}
    </article>
  );
}

export default function LegalPage({ en, ar }: { en: LegalDoc; ar: LegalDoc }) {
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="border-b border-line">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-neon-deep">
              <NeonMark className="h-4 w-auto" />
            </span>
            <span dir="ltr" className="text-sm font-bold tracking-[0.16em] text-ink">NEON</span>
          </Link>
          <nav className="flex items-center gap-4 text-xs text-ink-3">
            <Link href="/privacy" className="hover:text-ink">Privacy</Link>
            <Link href="/terms" className="hover:text-ink">Terms</Link>
            <Link href="/data-deletion" className="hover:text-ink">Data deletion</Link>
            <a href="#ar" className="hover:text-ink">العربية</a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 pb-16 sm:px-6">
        <Doc doc={en} dir="ltr" updated={`Last updated: ${LEGAL.updated}`} />
        <div id="ar" className="border-t border-line">
          <Doc doc={ar} dir="rtl" updated={`آخر تحديث: ${LEGAL.updatedAr}`} />
        </div>
      </main>
    </div>
  );
}
