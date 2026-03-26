'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

// Three output lines from prism
const OUT_LINES = [
  { d: 'M 178 65 L 268 30' },
  { d: 'M 183 91 L 272 91' },
  { d: 'M 178 117 L 265 148' },
];

export function PrismIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const f = variant === 'dark' ? '#27272a' : '#f4f4f5';

  return (
    <svg viewBox="0 0 280 180" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Input arrow */}
      <line x1="20" y1="91" x2="87" y2="91"
        stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      {/* Arrowhead */}
      <path d="M 83 85 L 92 91 L 83 97" stroke={s} strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />

      {/* Prism — equilateral triangle */}
      <motion.path
        d="M 140 47 L 90 134 L 190 134 Z"
        stroke={s} strokeWidth="1.5" fill={f} strokeLinejoin="round"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Output lines — draw one by one, then fade */}
      {OUT_LINES.map((line, i) => (
        <motion.path
          key={i}
          d={line.d}
          stroke={s} strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1, 0.8], opacity: [0, 1, 1, 0.5] }}
          transition={{
            duration: 3.5, repeat: Infinity, delay: i * 0.3,
            times: [0, 0.3, 0.7, 1], ease: [0.42, 0, 0.58, 1],
          }}
        />
      ))}
    </svg>
  );
}
