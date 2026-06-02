'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

// A full circular track (ink) with an accent arc sweeping around it.
const TRACK = 'M 100 38 A 62 62 0 1 1 99.9 38';

export function LoopArrowIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={100} cy={100} r={56} />

      {/* Faint full track */}
      <path d={TRACK} stroke={c.inkFaint} strokeWidth={SW} fill="none" strokeLinecap="round" />

      {/* Accent arc — a ~62% segment that rotates around the loop */}
      <motion.path
        d={TRACK}
        stroke={c.accent}
        strokeWidth={SW}
        fill="none"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray="0.62 0.38"
        style={{ transformOrigin: '100px 100px' }}
        animate={reduce ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Arrowhead riding the leading edge (top), rotating with the arc */}
      <motion.g
        style={{ transformOrigin: '100px 100px' }}
        animate={reduce ? undefined : { rotate: [0, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      >
        <path d="M 90 32 L 100 38 L 92 47" stroke={c.accent} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>

      {/* Center reinforcement dot */}
      <motion.circle
        cx="100" cy="100"
        fill={`url(#${id}-accent)`}
        animate={reduce ? undefined : { r: [4, 5.5, 4], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        style={{ r: 4.5 }}
      />
    </svg>
  );
}
