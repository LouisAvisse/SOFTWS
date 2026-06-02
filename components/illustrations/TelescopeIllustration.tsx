'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, SW_MID, SW_THIN, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

const STARS = [
  { x: 58, y: 40, r: 2 },
  { x: 86, y: 28, r: 1.6 },
  { x: 40, y: 60, r: 1.6 },
];

export function TelescopeIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 240 180" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      {/* glow on the focal star the scope points at */}
      <Glow id={id} cx={68} cy={42} r={40} />

      {/* Tripod */}
      <line x1="132" y1="126" x2="100" y2="164" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />
      <line x1="132" y1="126" x2="132" y2="166" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />
      <line x1="132" y1="126" x2="166" y2="164" stroke={c.ink} strokeWidth={SW} strokeLinecap="round" />

      {/* Telescope tube (ink), tilted toward the sky */}
      <g style={{ transformOrigin: '132px 96px', transform: 'rotate(-32deg)' }}>
        <rect x="92" y="84" width="80" height="24" rx="6" fill={c.panel} stroke={c.ink} strokeWidth={SW} />
        <rect x="156" y="79" width="20" height="34" rx="5" fill={c.panel} stroke={c.ink} strokeWidth={SW} />
        {/* objective lens — brand-blue accent */}
        <rect x="80" y="88" width="14" height="16" rx="4" fill={`url(#${id}-accent)`} stroke={c.accent} strokeWidth={SW_MID} />
      </g>
      <circle cx="132" cy="126" r="4.5" fill={c.panel} stroke={c.ink} strokeWidth={SW_MID} />

      {/* Sight line */}
      <motion.line
        x1="78" y1="74" x2="66" y2="46"
        stroke={c.accent} strokeWidth={SW_THIN} strokeLinecap="round" strokeDasharray="2 5"
        animate={reduce ? undefined : { opacity: [0, 0.6, 0.6, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.25, 0.75, 1], ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Focal star — brand-blue accent, twinkling */}
      <motion.circle
        cx={68} cy={42}
        fill={`url(#${id}-accent)`}
        animate={reduce ? undefined : { r: [4, 5.5, 4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        style={{ r: 4.5 }}
      />
      {STARS.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={c.inkMid} />
      ))}
    </svg>
  );
}
