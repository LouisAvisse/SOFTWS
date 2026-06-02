'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW_THIN, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

const STARS = [
  { x: 52, y: 60, r: 2 },
  { x: 104, y: 38, r: 2.5 },
  { x: 150, y: 96, r: 2 },
  { x: 210, y: 56, r: 2.5 },
  { x: 64, y: 140, r: 2 },
  { x: 120, y: 158, r: 2 },
  { x: 196, y: 146, r: 2.5 },
  { x: 232, y: 110, r: 2 },
];
// faint links between stars
const LINKS: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [2, 5], [4, 5], [5, 6], [6, 7], [3, 7],
];
// the focal node (accent) and the links that light up around it
const HUB = { x: 150, y: 96 };

export function ConstellationIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();

  return (
    <svg viewBox="0 0 260 200" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={HUB.x} cy={HUB.y} r={46} />

      {/* Faint links */}
      {LINKS.map(([a, b], i) => (
        <line
          key={i}
          x1={STARS[a].x} y1={STARS[a].y} x2={STARS[b].x} y2={STARS[b].y}
          stroke={c.inkFaint}
          strokeWidth={SW_THIN}
        />
      ))}

      {/* Accent links radiating from the hub */}
      {[1, 2, 5, 6].map((idx, i) => (
        <line
          key={i}
          x1={HUB.x} y1={HUB.y} x2={STARS[idx].x} y2={STARS[idx].y}
          stroke={c.accent} strokeWidth={SW_THIN} opacity="0.75"
        />
      ))}

      {/* Minor stars */}
      {STARS.map((s, i) =>
        i === 2 ? null : (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={c.inkMid} />
        ),
      )}

      {/* Hub node — brand-blue accent, gently pulsing */}
      <motion.circle
        cx={HUB.x} cy={HUB.y}
        fill={`url(#${id}-accent)`}
        animate={reduce ? undefined : { r: [6, 7.5, 6] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        style={{ r: 6.5 }}
      />
    </svg>
  );
}
