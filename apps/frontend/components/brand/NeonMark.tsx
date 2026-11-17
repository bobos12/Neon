import { cn } from '@/lib/utils';

// The NEON mark as geometry: two identical halves, each the other turned 180°
// about the centre — the chat bubble and the bolt in one shape. Same path as
// the marketing site's, drawn here for UI sizes and coloured by `currentColor`.
const HALF = 'M55.2 2.2V26.8L24.6 57.4H44.8V73.6H40.8A23.6 23.6 0 0 1 24.11 33.31Z';

export default function NeonMark({ className, glow = false }: { className?: string; glow?: boolean }) {
  return (
    <svg
      viewBox="15 0 70 100"
      aria-hidden="true"
      className={cn('text-brand-400', glow && 'drop-shadow-[0_0_6px_rgb(216_252_52/0.55)]', className)}
    >
      <path d={HALF} fill="currentColor" />
      <path d={HALF} fill="currentColor" transform="rotate(180 50 50)" />
    </svg>
  );
}
