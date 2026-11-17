import type { Metadata, Viewport } from 'next'
import { LANDING, type LandingLang } from './content'

export function landingMetadata(lang: LandingLang): Metadata {
  const t = LANDING[lang].meta
  const path = lang === 'ar' ? '/' : '/en'
  const image = { url: `/marketing/neon-og-${lang}.png`, width: 1200, height: 630, alt: t.ogAlt }
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: {
      canonical: path,
      languages: { ar: '/', en: '/en', 'x-default': '/' },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: path,
      siteName: 'NEON',
      type: 'website',
      locale: lang === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: lang === 'ar' ? ['en_US'] : ['ar_SA'],
      images: [image],
    },
    twitter: { card: 'summary_large_image', title: t.title, description: t.description, images: [image.url] },
  }
}

/** The page is dark from the first byte; the browser chrome matches it. */
export const landingViewport: Viewport = { themeColor: '#020c06', colorScheme: 'dark' }
