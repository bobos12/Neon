import Link from 'next/link';
import NeonMark from '@/components/brand/NeonMark';
import { Home } from 'lucide-react';

/**
 * Renders for any unknown route. Kept i18n-free so it works
 * even before the language provider mounts.
 */
export default function NotFound() {
  return (
    <div className="nx-wash flex min-h-screen items-center justify-center px-4">
      <div className="dialog-enter w-full max-w-md rounded-3xl bg-surface p-8 text-center shadow-pop">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-neon-deep shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_12px_30px_-12px_rgb(var(--shadow)/0.5)]">
          <NeonMark glow className="h-7 w-auto" />
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-ink-4">
          404
        </p>
        <h1 className="display mt-1 text-[24px]">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-ink-3">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
        </p>
        <Link
          href="/dashboard"
          className="btn btn-primary mt-6 inline-flex justify-center"
        >
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
