'use client'

import dynamic from 'next/dynamic'

// WebGL, so browser-only — and loaded after the headline has painted, so the
// hero's words never wait on the canvas.
const GhostFibers = dynamic(() => import('@/components/reactbits/GhostFibers'), { ssr: false })

export default function HeroFibers() {
  return (
    <div className="ne-fibers" aria-hidden>
      <GhostFibers
        glowColor="#5cf671"
        layers={3}
        twist={1.2}
        threads={72}
        fiberStyle="dots"
        depthOfField={0.85}
        hoverEffect="focus"
        intro
        mouseInteraction
        lineColor="#58c54a"
        secondaryColor="#5cf671"
        // Soft, glowing threads don't need full retina density; 1.5 keeps
        // them crisp at well under the GPU cost on phones.
        dpr={1.5}
      />
    </div>
  )
}
