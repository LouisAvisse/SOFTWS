'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

export function LoopArrowIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';

  return (
    <svg viewBox="0 0 240 200" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Main loop arc — clockwise circular path */}
      <motion.path
        d="M 60 100 C 60 50 180 50 180 100 C 180 150 60 150 60 100"
        stroke={s} strokeWidth="1.5" strokeLinecap="round" fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.45, 0.75, 1], ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Arrowhead at the bottom of the loop (pointing left) */}
      <motion.path
        d="M 72 107 L 60 100 L 72 93"
        stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
        animate={{ opacity: [0, 0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, times: [0, 0.44, 0.5, 0.75, 1], ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Inner small loop — offset, draws with delay */}
      <motion.path
        d="M 90 100 C 90 72 150 72 150 100 C 150 128 90 128 90 100"
        stroke={s} strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 0.4, times: [0, 0.45, 0.75, 1], ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Center dot */}
      <motion.circle
        cx="120" cy="100" r="3" fill={s}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />
    </svg>
  );
}
