'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import { Home, MessageSquare, Users, Send, LayoutGrid, type LucideIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { haptic } from '@/lib/haptics';
import { useLiveCounts } from '@/hooks/useLiveCounts';
import { useChatOpen } from '@/stores/chat-open-store';
import MobileDrawer from './MobileDrawer';

type Tab = { key: string; href: string; icon: LucideIcon; live?: boolean };

// Reading order: Home first. The bar follows the document direction, so in
// Arabic Home sits at the right edge — where an Arabic reader starts — exactly
// as the platform tab bars on iOS and Android mirror.
const TABS: readonly Tab[] = [
  { key: 'dashboard',     href: '/dashboard',     icon: Home },
  { key: 'conversations', href: '/conversations', icon: MessageSquare, live: true },
  { key: 'contacts',      href: '/contacts',      icon: Users },
  { key: 'broadcasts',    href: '/broadcasts',    icon: Send },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { openConversations } = useLiveCounts();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useTranslation('sidebar');
  const chatWindowOpen = useChatOpen((s) => s.isOpen);
  const reduceMotion = useReducedMotion();

  // A chat owns the whole screen on a phone — its composer sits where this bar
  // would. Full-screen editors hide the bar themselves via setNavHidden(true).
  if (chatWindowOpen) return null;

  // Any screen that isn't one of the four tabs lives under "More".
  const onMore = !TABS.some((tab) => pathname?.startsWith(tab.href));
  const spring = reduceMotion ? { duration: 0 } : { type: 'spring' as const, stiffness: 520, damping: 38 };
  const cell = 'press relative flex h-14 flex-1 select-none flex-col items-center justify-center gap-1';

  function Glyph({ Icon, active, badge }: { Icon: LucideIcon; active: boolean; badge?: number }) {
    return (
      <span className="relative flex h-7 w-12 items-center justify-center">
        {active && (
          // The selected tab is lit: a lime lozenge that glides between tabs.
          <motion.span
            layoutId="tab-pill"
            className="absolute inset-0 rounded-full bg-brand shadow-[inset_0_1px_0_rgb(255_255_255/0.45),0_0_14px_-2px_rgb(var(--brand)/0.7)]"
            transition={spring}
            aria-hidden="true"
          />
        )}
        <Icon
          className={cn('relative h-[19px] w-[19px] transition-colors duration-fast', active ? 'text-brand-fg' : 'text-ink-3')}
          aria-hidden="true"
        />
        {!!badge && badge > 0 && (
          <span className={cn(
            'absolute -top-1.5 end-0 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-bold tabular-nums ring-2 ring-surface',
            active ? 'bg-neon-deep text-brand-400' : 'bg-brand text-brand-fg',
          )}>
            {badge > 99 ? '99+' : badge}
          </span>
        )}
      </span>
    );
  }

  return (
    <>
      {/* A floating glass bar, inset from the edges and lifted off the home
          indicator — the way the platform's own tab bars now sit. */}
      <nav
        className="glass-chrome fixed inset-x-3 bottom-[max(0.5rem,calc(env(safe-area-inset-bottom)-0.625rem))] z-30 rounded-[26px] shadow-[inset_0_1px_0_rgb(255_255_255/var(--glass-hi)),0_0_0_1px_rgb(var(--glass-edge)/0.09),0_14px_34px_-12px_rgb(var(--shadow)/0.32)] sm:hidden"
        aria-label="Primary"
      >
        <div className="flex items-stretch">
          {TABS.map(({ key, href, icon, live }) => {
            const active = !!pathname?.startsWith(href);
            return (
              <Link
                key={key}
                href={href}
                onClick={() => { if (!active) haptic('selection'); }}
                aria-current={active ? 'page' : undefined}
                className={cell}
              >
                <Glyph Icon={icon} active={active} badge={live ? openConversations ?? 0 : 0} />
                <span className={cn('text-[10px] leading-none transition-colors duration-fast', active ? 'font-semibold text-ink' : 'font-medium text-ink-3')}>
                  {t(`nav.${key}`)}
                </span>
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => { haptic('selection'); setDrawerOpen(true); }}
            aria-label={t('nav.more')}
            aria-expanded={drawerOpen}
            className={cell}
          >
            <Glyph Icon={LayoutGrid} active={onMore} />
            <span className={cn('text-[10px] leading-none', onMore ? 'font-semibold text-ink' : 'font-medium text-ink-3')}>{t('nav.more')}</span>
          </button>
        </div>
      </nav>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
