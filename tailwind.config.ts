import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', sm: '1.5rem', lg: '2rem' },
      screens: { '2xl': '1400px' },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-host-grotesk)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-libre-baskerville)', 'ui-serif', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)'],
      },
      colors: {
        // ── Semantic neutral scale ──────────────────────────────
        // Single source of truth for every neutral in the UI.
        // Each token is a CSS variable (see globals.css) that
        // resolves to a specific shade. Retune the whole site by
        // editing the variables — no need to touch components.
        // Works with any utility prefix: text-*, bg-*, border-*,
        // from-*, to-*, ring-*, divide-*, outline-*.
        canvas: 'var(--canvas)', // page background (white)
        surface: 'var(--surface)', // section / card backgrounds
        mist: 'var(--mist)', // subtle backgrounds & subtle borders
        line: 'var(--line)', // default borders
        edge: 'var(--edge)', // strong borders
        faint: 'var(--faint)', // faint text (often on dark)
        muted: 'var(--muted)', // muted / secondary text
        body: 'var(--body)', // body text
        ink: {
          DEFAULT: 'var(--ink)', // primary text & dark sections
          2: 'var(--ink-2)', // strong text / dark surfaces
          3: 'var(--ink-3)', // strong text / dark gradients
          deep: 'var(--ink-deep)', // darkest sections
        },
        // ── Brand ──────────────────────────────────────────────
        // Primary brand color — main CTAs use the .cta-primary
        // class; these tokens are for brand accents (text-brand,
        // bg-brand, border-brand, ring-brand).
        brand: {
          DEFAULT: 'var(--brand)',
          light: 'var(--brand-light)',
          dark: 'var(--brand-dark)',
          darker: 'var(--brand-darker)',
        },
      },
      maxWidth: {
        site: '1280px',
        content: 'var(--content-width)', // shared inner content width
      },
      borderRadius: {
        // Var-driven so the whole radius scale is tunable at once.
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
        '2xl': 'var(--radius-2xl)',
        '3xl': 'var(--radius-3xl)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
