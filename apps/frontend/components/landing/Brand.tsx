/**
 * The NEON mark, rebuilt as geometry rather than traced: two identical halves,
 * each the other turned 180° about the centre. Each half is a 45° band cut
 * from a disc (r 23.6) — the chat bubble and the bolt in one shape.
 */
const HALF = 'M55.2 2.2V26.8L24.6 57.4H44.8V73.6H40.8A23.6 23.6 0 0 1 24.11 33.31Z'

export function NeonMark({ className = '', glow = false, title }: { className?: string; glow?: boolean; title?: string }) {
  return (
    <svg
      viewBox="15 0 70 100"
      className={`ne-mark ${glow ? 'ne-mark--glow' : ''} ${className}`}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round">
        <path d={HALF} />
        <path d={HALF} transform="rotate(180 50 50)" />
      </g>
    </svg>
  )
}

/** The mark drawn as a neon tube outline for the closing sign. */
export function NeonSign({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="12 -2 76 104" className={`ne-sign ${className}`} aria-hidden>
      <defs>
        <filter id="ne-sign-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.9" result="a" />
          <feFlood floodColor="#d8fc34" />
          <feComposite in2="a" operator="in" result="g1" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="b" />
          <feFlood floodColor="#d8fc34" floodOpacity="0.55" />
          <feComposite in2="b" operator="in" result="g2" />
          <feMerge>
            <feMergeNode in="g2" />
            <feMergeNode in="g1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#ne-sign-glow)">
        <path d={HALF} />
        <path d={HALF} transform="rotate(180 50 50)" />
      </g>
    </svg>
  )
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} dir="ltr">
      <NeonMark className="h-7 w-auto" glow />
      <span className="ne-wordmark">NEON</span>
    </span>
  )
}

export function WhatsAppGlyph({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 004.74 1.21c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15a8.2 8.2 0 01-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 01-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.25 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29z" />
    </svg>
  )
}

/** Every CTA opens a WhatsApp chat with the team: accounts are set up by hand. */
const WHATSAPP_NUMBER = '201115655645'
export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
