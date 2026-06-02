'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

const RUNGS = [150, 124, 98, 72, 46]; // bottom → top

export function LadderIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 160 200" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={80} cy={46} r={42} />

      {/* Rails */}
      <line x1="56" y1="36" x2="56" y2="166" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />
      <line x1="104" y1="36" x2="104" y2="166" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />

      {/* Rungs — top rung is the brand-blue goal */}
      {RUNGS.map((y, i) => (
        <line
          key={i}
          x1="56" y1={y} x2="104" y2={y}
          stroke={i === RUNGS.length - 1 ? c.accent : c.ink}
          strokeWidth={SW}
          strokeLinecap="round"
        />
      ))}

      {/* Climbing marker — brand-blue, ascends and resets */}
      <motion.circle
        cx="80"
        fill={`url(#${id}-accent)`}
        r="5.5"
        animate={reduce ? undefined : { cy: [150, 46], opacity: [1, 1, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, times: [0, 0.85, 1], ease: [0.45, 0, 0.55, 1] }}
        style={reduce ? { cy: 98 } : undefined}
      />
    </svg>
  );
}
