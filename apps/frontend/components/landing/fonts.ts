import { Almarai } from 'next/font/google'

// Almarai: the heavy, friendly Arabic face Saudi commercial brands sell in.
// One family for both scripts and every size, self-hosted by next/font and
// scoped to the landing page through a CSS variable.
export const neonFont = Almarai({
  subsets: ['arabic', 'latin'],
  weight: ['400', '700', '800'],
  variable: '--ne-font',
  display: 'swap',
})
