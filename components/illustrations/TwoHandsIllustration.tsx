'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, SW_THIN, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

export function TwoHandsIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 260 180" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={130} cy={92} r={52} />

      {/* Two cupping forms reaching toward a shared centre */}
      <motion.path
        d="M 96 50 C 64 50 50 70 50 92 C 50 114 64 134 96 134"
        stroke={c.ink} strokeWidth={SW} strokeLinecap="round" fill="none"
        animate={reduce ? undefined : { x: [0, 6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />
      <motion.path
        d="M 164 50 C 196 50 210 70 210 92 C 210 114 196 134 164 134"
        stroke={c.ink} strokeWidth={SW} strokeLinecap="round" fill="none"
        animate={reduce ? undefined : { x: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Connecting arc above */}
      <path d="M 104 52 C 120 30 140 30 156 52" stroke={c.inkFaint} strokeWidth={SW_THIN} strokeLinecap="round" strokeDasharray="2 5" fill="none" />

      {/* Shared value — brand-blue node, breathing */}
      <motion.circle
        cx={130} cy={92}
        fill={`url(#${id}-accent)`}
        animate={reduce ? undefined : { r: [12, 14, 12] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        style={{ r: 13 }}
      />
      {/* spark mark inside */}
      <path d="M 130 85 L 130 99 M 123 92 L 137 92" stroke={c.accentInk} strokeWidth={SW_THIN} strokeLinecap="round" />
    </svg>
  );
}
