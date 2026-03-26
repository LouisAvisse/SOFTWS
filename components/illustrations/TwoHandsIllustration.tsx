'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

export function TwoHandsIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const f = variant === 'dark' ? '#27272a' : '#f4f4f5';

  return (
    <svg viewBox="0 0 260 180" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Left hand — simplified open palm facing right */}
      <motion.g
        animate={{ x: [0, 6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      >
        {/* Palm */}
        <path
          d="M 48 88 C 48 72 60 68 68 72 L 68 58 C 68 54 74 54 74 58 L 74 68 C 74 64 80 64 80 68 L 80 70 C 80 66 86 66 86 70 L 86 80 C 90 76 96 78 96 84 L 96 104 C 96 118 84 128 72 128 L 60 128 C 52 128 48 120 48 112 Z"
          fill={f} stroke={s} strokeWidth="1.5" strokeLinejoin="round"
        />
      </motion.g>

      {/* Right hand — simplified open palm facing left */}
      <motion.g
        animate={{ x: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      >
        {/* Palm (mirrored) */}
        <path
          d="M 212 88 C 212 72 200 68 192 72 L 192 58 C 192 54 186 54 186 58 L 186 68 C 186 64 180 64 180 68 L 180 70 C 180 66 174 66 174 70 L 174 80 C 170 76 164 78 164 84 L 164 104 C 164 118 176 128 188 128 L 200 128 C 208 128 212 120 212 112 Z"
          fill={f} stroke={s} strokeWidth="1.5" strokeLinejoin="round"
        />
      </motion.g>

      {/* Exchange item — document/card passing between hands */}
      <motion.rect
        x="110" y="82" width="40" height="30" rx="2"
        fill={f} stroke={s} strokeWidth="1.5"
        animate={{ x: [-14, 0, 14, 0, -14], opacity: [0.6, 1, 0.6, 1, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />
      {/* Lines on the card */}
      <motion.g
        animate={{ x: [-14, 0, 14, 0, -14] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      >
        <line x1="116" y1="92" x2="144" y2="92" stroke={s} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="116" y1="99" x2="138" y2="99" stroke={s} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <line x1="116" y1="106" x2="140" y2="106" stroke={s} strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      </motion.g>

      {/* Connection arc above */}
      <motion.path
        d="M 96 84 C 110 58 150 58 164 84"
        stroke={s} strokeWidth="1" strokeLinecap="round" fill="none"
        strokeDasharray="3 4"
        animate={{ opacity: [0, 0.5, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.7, 1], ease: [0.42, 0, 0.58, 1] }}
      />
    </svg>
  );
}
