'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, SW_MID, SW_THIN, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

const TICKS = [
  [100, 30, 100, 42], [100, 178, 100, 190], [170, 110, 158, 110], [30, 110, 42, 110],
];

export function CompassIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 200 230" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={100} cy={110} r={62} />

      {/* Dial */}
      <circle cx="100" cy="110" r="70" stroke={c.ink} strokeWidth={SW} />
      <circle cx="100" cy="110" r="58" stroke={c.inkFaint} strokeWidth={SW_THIN} />
      {TICKS.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c.inkMid} strokeWidth={SW_MID} strokeLinecap="round" />
      ))}

      {/* Needle — brand-blue accent (north half), ink (south half) */}
      <motion.g
        style={{ transformOrigin: '100px 110px' }}
        animate={reduce ? undefined : { rotate: [-14, 10, -14] }}
        transition={{ duration: 5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      >
        <path d="M 100 60 L 92 110 L 100 110 Z" fill={`url(#${id}-accent)`} />
        <path d="M 100 60 L 108 110 L 100 110 Z" fill={c.accent} opacity="0.7" />
        <path d="M 100 160 L 92 110 L 108 110 Z" fill={c.inkFaint} stroke={c.inkMid} strokeWidth={SW_THIN} strokeLinejoin="round" />
      </motion.g>
      <circle cx="100" cy="110" r="4.5" fill={c.ink} />

      {/* Branching paths below — where the journey leads */}
      <path d="M 100 188 L 100 204" stroke={c.inkMid} strokeWidth={SW_MID} strokeLinecap="round" />
      <path d="M 100 204 C 100 214 70 214 58 222" stroke={c.inkFaint} strokeWidth={SW_MID} strokeLinecap="round" />
      <path d="M 100 204 C 100 216 100 216 100 224" stroke={c.inkFaint} strokeWidth={SW_MID} strokeLinecap="round" />
      <path d="M 100 204 C 100 214 130 214 142 222" stroke={c.inkFaint} strokeWidth={SW_MID} strokeLinecap="round" />
    </svg>
  );
}
