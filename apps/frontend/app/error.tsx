'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

/**
 * Root error boundary for the entire app.
 * Caught by Next.js when any descendant throws.
 *
 * Note: kept dependency-free of i18next/useTranslation because the
 * I18nProvider tree may itself have crashed. Strings are short and
 * the message comes from the error itself.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to monitoring; safe in browsers, no-op on server
    if (typeof window !== 'undefined') {
      console.error('[GlobalError]', error);
    }
  }, [error]);

  return (
    <div className="nx-wash flex min-h-screen items-center justify-center px-4">
      <div className="dialog-enter w-full max-w-md rounded-3xl bg-surface p-8 text-center shadow-pop">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-inset ring-red-500/15">
          <AlertTriangle className="h-7 w-7 text-red-500 dark:text-red-400" aria-hidden="true" />
        </div>
        <h1 className="display text-[22px]">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-ink-3">
          An unexpected error occurred. You can try again or return to the dashboard.
        </p>
        {error.message && (
          <pre
            dir="ltr"
            className="mt-4 max-h-32 overflow-auto rounded-xl bg-raised px-3 py-2 text-start text-xs text-red-600 dark:text-red-300"
          >
            {error.message}
          </pre>
        )}
        {error.digest && (
          <p className="mt-2 font-mono text-[10px] text-ink-4">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-6 flex flex-col items-stretch gap-2 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-primary inline-flex justify-center"
          >
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className="btn btn-secondary"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
