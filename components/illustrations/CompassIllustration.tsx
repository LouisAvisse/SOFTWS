'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

// Tick positions: [x1,y1,x2,y2] for N,S,E,W (long) + diagonals (short)
const LONG_TICKS = [
  [100, 38, 100, 50], [100, 170, 100, 182],
  [172, 110, 160, 110], [28, 110, 40, 110],
];
const SHORT_TICKS = [
  [153, 57, 147, 63], [153, 163, 147, 157],
  [47, 163, 53, 157], [47, 57, 53, 63],
];

export function CompassIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const f = variant === 'dark' ? '#27272a' : '#f4f4f5';
  const faint = variant === 'dark' ? '#3f3f46' : '#d4d4d8';

  return (
    <svg viewBox="0 0 200 260" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Outer circle */}
      <circle cx="100" cy="110" r="72" stroke={s} strokeWidth="1.5" />

      {/* Long ticks */}
      {LONG_TICKS.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {/* Short ticks */}
      {SHORT_TICKS.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={faint} strokeWidth="1.5" strokeLinecap="round" />
      ))}

      {/* Compass rose — 4 diamond points */}
      {/* N (larger) */}
      <path d={`M 100 110 L 96 82 L 100 56 L 104 82 Z`}
        stroke={s} strokeWidth="1.5" fill={f} strokeLinejoin="round" />
      {/* S */}
      <path d={`M 100 110 L 96 138 L 100 158 L 104 138 Z`}
        stroke={s} strokeWidth="1.5" fill={faint} strokeLinejoin="round" />
      {/* E */}
      <path d={`M 100 110 L 124 106 L 144 110 L 124 114 Z`}
        stroke={s} strokeWidth="1.5" fill={faint} strokeLinejoin="round" />
      {/* W */}
      <path d={`M 100 110 L 76 106 L 56 110 L 76 114 Z`}
        stroke={s} strokeWidth="1.5" fill={faint} strokeLinejoin="round" />

      {/* Needle (rotates) */}
      <motion.g
        style={{ transformOrigin: '100px 110px' }}
        animate={{ rotate: [-12, 8, -12] }}
        transition={{ duration: 4, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      >
        <path d="M 100 68 L 97 110 L 100 152 L 103 110 Z"
          stroke={s} strokeWidth="1.5" fill={s} strokeLinejoin="round" opacity="0.9" />
      </motion.g>
      {/* Center dot */}
      <circle cx="100" cy="110" r="4" fill={s} />

      {/* Branching paths */}
      <line x1="100" y1="188" x2="100" y2="210" stroke={faint} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="210" x2="55" y2="250" stroke={faint} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="210" x2="100" y2="254" stroke={faint} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="100" y1="210" x2="145" y2="250" stroke={faint} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
