import type { Metadata, Viewport } from 'next'
import NeonLanding from '@/components/landing/NeonLanding'
import { landingMetadata, landingViewport } from '@/components/landing/metadata'

// Arabic is the primary audience, so it owns the root URL; English is /en.
export const metadata: Metadata = landingMetadata('ar')
export const viewport: Viewport = landingViewport

export default function Page() {
  return <NeonLanding lang="ar" />
}
