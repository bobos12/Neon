import { Inter, IBM_Plex_Sans_Arabic } from 'next/font/google'

// The product's two scripts, one stack. Inter carries Latin, figures and
// punctuation; IBM Plex Sans Arabic picks up every Arabic glyph Inter doesn't
// have. Plex was chosen over the marketing site's Almarai for the app itself:
// it has true 500/600 weights and a UI-sized x-height, so a dense Arabic list
// reads at the same size and weight as its English twin.
export const fontLatin = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false,
})

// Turbopack emits an "Inter Fallback" face (local Arial, every code point) and
// bakes it into --font-inter whatever adjustFontFallback says. Second in the
// stack it caught every Arabic glyph before Plex, so Arabic rendered in Arial.
// The stacks use Inter's bare family name instead (set on <html> as --font-inter-face).
export const latinFace = fontLatin.style.fontFamily.split(',')[0].trim()

export const fontArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-ar',
  display: 'swap',
})
