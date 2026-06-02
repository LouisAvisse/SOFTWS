'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, SW_MID, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

// Refracted output rays fanning to the right (the personalised insight).
const RAYS = [
  'M 176 78 L 264 44',
  'M 180 95 L 268 95',
  'M 176 112 L 264 146',
];

export function PrismIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 280 190" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={150} cy={100} r={66} />

      {/* Single input ray (ink) */}
      <line x1="18" y1="95" x2="92" y2="95" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />

      {/* Prism */}
      <path d="M 142 52 L 96 138 L 188 138 Z" fill={`url(#${id}-tint)`} stroke={c.ink} strokeWidth={SW} strokeLinejoin="round" />

      {/* Output rays — brand-blue accent, drawing then settling */}
      {RAYS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={c.accent}
          strokeWidth={SW}
          strokeLinecap="round"
          style={{ opacity: 0.9 }}
          initial={reduce ? undefined : { pathLength: 0, opacity: 0 }}
          animate={reduce ? undefined : { pathLength: [0, 1, 1, 1], opacity: [0, 1, 1, 0.85] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: i * 0.25, times: [0, 0.35, 0.8, 1], ease: [0.42, 0, 0.58, 1] }}
        />
      ))}
      {/* ray endpoints */}
      {RAYS.map((_, i) => {
        const pts = [[264, 44], [268, 95], [264, 146]][i];
        return <circle key={i} cx={pts[0]} cy={pts[1]} r="2.5" fill={c.accent} />;
      })}
    </svg>
  );
}
