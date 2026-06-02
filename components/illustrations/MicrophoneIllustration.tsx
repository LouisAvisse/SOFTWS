'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, SW_MID, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

// Concentric voice arcs (accent), opening out from the capsule on both sides.
const ARCS = [
  'M 74 70 A 19 19 0 0 0 74 102',
  'M 65 61 A 28 28 0 0 0 65 111',
  'M 126 70 A 19 19 0 0 1 126 102',
  'M 135 61 A 28 28 0 0 1 135 111',
];

export function MicrophoneIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={100} cy={86} r={72} />

      {/* Voice arcs — the brand-blue accent */}
      {ARCS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={c.accent}
          strokeWidth={SW}
          strokeLinecap="round"
          style={{ opacity: 0.8 }}
          animate={reduce ? undefined : { opacity: [0.35, 0.95, 0.35] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: (i % 2) * 0.35, ease: [0.42, 0, 0.58, 1] }}
        />
      ))}

      {/* Capsule */}
      <rect x="82" y="44" width="36" height="84" rx="18" fill={c.panel} stroke={c.ink} strokeWidth={SW} />
      {/* Grille lines */}
      {[62, 74, 86, 98].map((y) => (
        <line key={y} x1="90" y1={y} x2="110" y2={y} stroke={c.inkMid} strokeWidth={SW_MID} strokeLinecap="round" />
      ))}

      {/* Stem + base */}
      <line x1="100" y1="128" x2="100" y2="162" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />
      <line x1="80" y1="166" x2="120" y2="166" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />
    </svg>
  );
}
