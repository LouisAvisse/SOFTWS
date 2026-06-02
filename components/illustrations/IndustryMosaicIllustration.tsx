'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { AccentDefs, Glow, illoColors, SW, SW_MID, SW_THIN, useIlloId, type IlloVariant } from './_shared';

interface Props { variant?: IlloVariant }

const EASE: [number, number, number, number] = [0.42, 0, 0.58, 1];

export function IndustryMosaicIllustration({ variant = 'light' }: Props) {
  const id = useIlloId();
  const c = illoColors(variant);
  const reduce = useReducedMotion();
  const float = (y: number, dur: number) =>
    reduce ? undefined : { animate: { y: [0, y, 0] }, transition: { duration: dur, repeat: Infinity, ease: EASE } };

  return (
    <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" className="h-full w-full">
      <AccentDefs id={id} variant={variant} />
      <Glow id={id} cx={272} cy={118} r={86} />

      {/* Card — Finance / bars */}
      <motion.g transform="rotate(-2.5 127 110)" {...float(-6, 8)}>
        <rect x="40" y="50" width="174" height="120" rx="10" fill={c.panel} stroke={c.inkFaint} strokeWidth={SW_MID} />
        {[[68, 40], [90, 60], [112, 30], [134, 73], [156, 53]].map(([x, h], i) => (
          <line key={i} x1={x} y1="148" x2={x} y2={148 - h} stroke={c.inkMid} strokeWidth="3" strokeLinecap="round" />
        ))}
        <line x1="60" y1="150" x2="176" y2="150" stroke={c.inkFaint} strokeWidth={SW_THIN} strokeLinecap="round" />
      </motion.g>

      {/* Card — Tech / node graph — the brand-blue accent card */}
      <motion.g transform="rotate(2 272 118)" {...float(-9, 6.5)}>
        <rect x="195" y="65" width="154" height="106" rx="10" fill={`url(#${id}-tint)`} stroke={c.accent} strokeWidth={SW} />
        {[[230, 120], [315, 125], [272, 148]].map(([x, y], i) => (
          <line key={i} x1={x} y1={y} x2={272} y2={95} stroke={c.accent} strokeWidth={SW_THIN} opacity="0.5" />
        ))}
        <circle cx="230" cy="120" r="6" fill={c.panel} stroke={c.accent} strokeWidth={SW_MID} />
        <circle cx="315" cy="125" r="6" fill={c.panel} stroke={c.accent} strokeWidth={SW_MID} />
        <circle cx="272" cy="148" r="5" fill={c.panel} stroke={c.accent} strokeWidth={SW_MID} />
        <circle cx="272" cy="95" r="7" fill={`url(#${id}-accent)`} />
      </motion.g>

      {/* Card — Retail / grid */}
      <motion.g transform="rotate(1.5 135 197)" {...float(-5, 9)}>
        <rect x="55" y="145" width="158" height="106" rx="10" fill={c.panel} stroke={c.inkFaint} strokeWidth={SW_MID} />
        {[0, 1, 2].map((col) =>
          [0, 1, 2].map((row) => (
            <rect key={`${col}-${row}`} x={75 + col * 40} y={163 + row * 27} width="30" height="20" rx="3" stroke={c.inkMid} strokeWidth={SW_THIN} />
          )),
        )}
      </motion.g>

      {/* Card — Healthcare / ECG */}
      <motion.g transform="rotate(-1.5 285 197)" {...float(-7, 7)}>
        <rect x="215" y="150" width="140" height="95" rx="10" fill={c.panel} stroke={c.inkFaint} strokeWidth={SW_MID} />
        <path d="M 228 197 L 248 197 L 255 175 L 262 218 L 269 197 L 285 197 L 290 183 L 296 210 L 302 197 L 342 197"
          stroke={c.inkMid} strokeWidth={SW_MID} strokeLinecap="round" strokeLinejoin="round" />
      </motion.g>

      {/* Card — Education / text lines */}
      <motion.g transform="rotate(3 190 72)" {...float(-4, 10)}>
        <rect x="130" y="30" width="120" height="84" rx="10" fill={c.panel} stroke={c.inkFaint} strokeWidth={SW_MID} />
        {[55, 68, 81, 94].map((y, i) => (
          <line key={i} x1="148" y1={y} x2={i === 3 ? 198 : 232 - i * 4} y2={y} stroke={c.inkMid} strokeWidth={SW_MID} strokeLinecap="round" />
        ))}
      </motion.g>
    </svg>
  );
}
