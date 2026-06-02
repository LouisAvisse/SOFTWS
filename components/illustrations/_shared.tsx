'use client';

import { useId } from 'react';

/* ============================================================================
   Illustration design language — "refined line + brand-blue accent".

   Every illustration shares these primitives so the set reads as one system:
     • Warm-ink outlines (tokenised, never hardcoded zinc).
     • Exactly one element carried in brand blue — the focal / "active" thing —
       with a soft radial glow behind it and an optional vertical gradient fill.
     • Generous negative space, rounded caps/joins, calm motion.

   Colours come from the globals.css tokens, so the whole set retunes with the
   brand. Gradient/glow ids are caller-supplied (use React's useId) so multiple
   illustrations can render on the same page without id collisions.
============================================================================ */

export type IlloVariant = 'light' | 'dark';

/** Stable, url()-safe id for scoping gradient/glow defs per instance. */
export function useIlloId() {
  return 'illo-' + useId().replace(/[^a-zA-Z0-9]/g, '');
}

// Stroke weights for the whole system.
export const SW = 1.75; // primary outline
export const SW_MID = 1.25; // secondary structure
export const SW_THIN = 1; // hairlines / connectors

export function illoColors(variant: IlloVariant = 'light') {
  const dark = variant === 'dark';
  return {
    ink: dark ? 'rgba(246,243,237,0.92)' : 'var(--ink-3)', // primary lines
    inkMid: dark ? 'rgba(246,243,237,0.5)' : 'var(--muted)', // secondary
    inkFaint: dark ? 'rgba(246,243,237,0.2)' : 'var(--edge)', // faint / construction
    panel: dark ? 'rgba(255,255,255,0.05)' : '#ffffff', // surface fills
    accent: dark ? 'var(--brand-light)' : 'var(--brand)', // the blue accent
    accentInk: '#ffffff', // marks on top of an accent fill
  };
}

/** Scoped gradient + glow defs. Reference as url(#${id}-accent|glow|tint). */
export function AccentDefs({ id, variant = 'light' }: { id: string; variant?: IlloVariant }) {
  const dark = variant === 'dark';
  return (
    <defs>
      <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style={{ stopColor: 'var(--brand-light)' }} />
        <stop offset="100%" style={{ stopColor: 'var(--brand)' }} />
      </linearGradient>
      <radialGradient id={`${id}-glow`}>
        <stop offset="0%" style={{ stopColor: 'var(--brand)', stopOpacity: dark ? 0.55 : 0.36 }} />
        <stop offset="60%" style={{ stopColor: 'var(--brand)', stopOpacity: dark ? 0.22 : 0.14 }} />
        <stop offset="100%" style={{ stopColor: 'var(--brand)', stopOpacity: 0 }} />
      </radialGradient>
      <linearGradient id={`${id}-tint`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style={{ stopColor: 'var(--brand)', stopOpacity: dark ? 0.2 : 0.1 }} />
        <stop offset="100%" style={{ stopColor: 'var(--brand)', stopOpacity: 0 }} />
      </linearGradient>
    </defs>
  );
}

/** A soft circular glow centred on the focal element. */
export function Glow({ id, cx, cy, r }: { id: string; cx: number; cy: number; r: number }) {
  return <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-glow)`} aria-hidden="true" />;
}
