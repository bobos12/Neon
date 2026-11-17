import type { Metadata, Viewport } from 'next'
import NeonLanding from '@/components/landing/NeonLanding'
import { landingMetadata, landingViewport } from '@/components/landing/metadata'

export const metadata: Metadata = landingMetadata('en')
export const viewport: Viewport = landingViewport

export default function Page() {
  return <NeonLanding lang="en" />
}
