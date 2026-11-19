/** @type {import('tailwindcss').Config} */

// Semantic colours resolve to CSS variables (RGB triplets, defined per theme in
// globals.css) so one class — `bg-surface`, `text-ink-3` — is correct in both
// light and dark, and opacity modifiers (`bg-brand/10`) still work.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;
// Glass: the backgrounds also multiply by a per-token alpha (`--surface-a`), so
// every `bg-surface` in the product is translucent over the ambient light, and a
// floating context can turn it solid again just by resetting that variable.
const glass = (name) => `rgb(var(--${name}) / calc(<alpha-value> * var(--${name}-a, 1)))`;

module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // Class maps also live in lib/ (stage tones, role badges) and hooks/.
    './lib/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      /**
       * Colour-opacity modifiers (`bg-white/8`) resolve against this scale. A value
       * that isn't in it emits **no CSS at all**, silently — and the UI leaned on
       * these subtle tints in ~140 places, every one of them dead.
       *
       * The worst offender was table rows: `hover:bg-gray-50 dark:hover:bg-white/3`.
       * With `/3` missing, the dark rule never existed, so the un-gated light rule
       * applied in dark mode too — hovering a row turned it near-white and swallowed
       * the white text and buttons sitting on it.
       *
       * Every value below is one the design already uses. Extending the scale once
       * beats rewriting `bg-white/[0.03]` at 140 call sites.
       */
      opacity: {
        3: '0.03',
        4: '0.04',
        6: '0.06',
        7: '0.07',
        8: '0.08',
        12: '0.12',
        18: '0.18',
        92: '0.92',
        98: '0.98',
      },
      fontFamily: {
        // Inter for Latin, Almarai (the brand's Arabic face) for Arabic — one
        // stack, so mixed-script lines never jump between fallbacks.
        sans: ['var(--font-inter-face, var(--font-inter))', 'var(--font-plex-ar)', 'system-ui', '-apple-system', '"SF Arabic"', '"Segoe UI"', 'sans-serif'],
        arabic: ['var(--font-inter-face, var(--font-inter))', 'var(--font-plex-ar)', 'system-ui', '-apple-system', '"SF Arabic"', '"Segoe UI"', 'sans-serif'],
        mono: ['"SF Mono"', 'ui-monospace', '"Cascadia Code"', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      colors: {
        /* ── NEON semantic tokens ──────────────────────────────────────── */
        canvas: v('canvas'),
        surface: v('surface'),
        raised: v('raised'),
        overlay: v('overlay'),
        line: { DEFAULT: v('line'), strong: v('line-strong') },
        ink: { DEFAULT: v('ink'), 2: v('ink-2'), 3: v('ink-3'), 4: v('ink-4') },
        /* The neon itself. `bg-brand` is the lime fill (always carrying
           `text-brand-fg`, deep ink); text, borders and rings use `brand-ink`
           through the per-utility maps below, so lime never sits on white as text. */
        brand: {
          DEFAULT: v('brand'),
          strong: v('brand-strong'),
          fg: v('brand-fg'),
          soft: v('brand-soft'),
          ink: v('brand-ink'),
          // Static lime scale for charts and illustration, identical in both themes.
          50: '#F8FEE6', 100: '#EFFCC6', 200: '#E3FB8E', 300: '#DCFC5C', 400: '#D8FC34',
          500: '#B9E11A', 600: '#8DB30C', 700: '#5F8209', 800: '#456209', 900: '#33490B', 950: '#192802',
        },
        neon: { DEFAULT: '#D8FC34', ink: '#0B1A02', deep: '#0B1A10' },
        bubble: { out: v('bubble-out'), in: v('bubble-in') },
        chat: v('chat-bg'),
        nav: { DEFAULT: v('nav'), ink: v('nav-ink'), muted: v('nav-muted'), line: v('nav-line'), hover: v('nav-hover') },
        // Neutral ramp re-tuned onto the brand's green-grey axis. Every existing
        // `gray-*` in the app moves with it, so legacy screens already sit in
        // the same family as the redesigned ones.
        gray: {
          50: '#F6F7F6', 100: '#EFF1F0', 200: '#E3E7E5', 300: '#CDD3D0', 400: '#9AA39E',
          500: '#69736E', 600: '#525C57', 700: '#3D4641', 800: '#262D2A', 900: '#151A17', 950: '#0B0F0D',
        },

        /* Shadcn UI CSS-variable-based tokens */
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: { 50: '#EDFBF2', 500: '#1DAE60', 700: '#0F6A39' },
        warning: { 50: '#FEF8EC', 500: '#D98E04', 700: '#9A5B00' },
        error:   { 50: '#FDF1F1', 500: '#DC4444', 700: '#A92A2A' },
      },
      backgroundColor: {
        surface: glass('surface'),
        raised: glass('raised'),
      },
      textColor: {
        brand: { DEFAULT: v('brand-ink'), strong: v('brand-ink-strong') },
      },
      borderColor: {
        brand: { DEFAULT: v('brand-ink') },
      },
      ringColor: {
        brand: { DEFAULT: v('brand-ink') },
      },
      outlineColor: {
        brand: { DEFAULT: v('brand-ink') },
      },
      accentColor: {
        brand: { DEFAULT: v('brand-ink') },
      },
      // Elevation is light, not darkness: glass carries a 1px top highlight and
      // a hairline edge; only things that genuinely float cast a shadow.
      boxShadow: {
        soft:  '0 1px 2px rgb(var(--shadow) / 0.06)',
        card:  '0 1px 2px rgb(var(--shadow) / 0.05), 0 1px 1px rgb(var(--shadow) / 0.03)',
        lift:  '0 2px 4px rgb(var(--shadow) / 0.06), 0 12px 32px -12px rgb(var(--shadow) / 0.22)',
        glass: 'inset 0 1px 0 rgb(255 255 255 / var(--glass-hi)), 0 0 0 1px rgb(var(--glass-edge) / var(--glass-edge-a)), 0 1px 2px rgb(var(--shadow) / 0.04)',
        pop:   'inset 0 1px 0 rgb(255 255 255 / var(--glass-hi)), 0 0 0 1px rgb(var(--glass-edge) / calc(var(--glass-edge-a) + 0.04)), 0 24px 48px -12px rgb(var(--shadow) / 0.30), 0 6px 14px -6px rgb(var(--shadow) / 0.14)',
        brand: 'inset 0 1px 0 rgb(255 255 255 / 0.45), inset 0 0 0 1px rgb(var(--brand-edge) / 0.35), 0 1px 2px rgb(var(--shadow) / 0.12)',
        neon:  '0 0 0 1px rgb(var(--brand) / 0.55), 0 0 18px -2px rgb(var(--brand) / 0.55)',
        'wa-sm': '0 1px 2px rgb(var(--shadow) / 0.06)',
        'wa-md': '0 2px 4px rgb(var(--shadow) / 0.06), 0 8px 24px -8px rgb(var(--shadow) / 0.14)',
      },
      // Continuous, Apple-proportioned corners: controls 10px, panels 16px,
      // sheets and dialogs 22px — nested radii step down with the padding.
      borderRadius: {
        lg:   '0.625rem',
        xl:   '0.875rem',
        '2xl':'1.125rem',
        '3xl':'1.375rem',
        '4xl':'1.75rem',
      },
      backdropBlur: {
        glass: '24px',
        thick: '40px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.45, 0.64, 1)',
        swift: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        fast: '140ms',
        base: '220ms',
        slow: '400ms',
      },
      animation: {
        'fade-in':  'fadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.24s cubic-bezier(0.16, 1, 0.3, 1)',
        'enter':    'enter 0.36s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pop':      'pop 0.18s cubic-bezier(0.16, 1, 0.3, 1) both',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        enter: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        pop: {
          from: { opacity: '0', transform: 'translateY(4px) scale(0.98)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      spacing: {
        'xs': '0.25rem',
        'sm': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.5rem',
        '2xl': '2rem',
      },
    },
  },
  plugins: [],
}
