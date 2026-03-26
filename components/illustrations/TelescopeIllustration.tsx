'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

export function TelescopeIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const f = variant === 'dark' ? '#27272a' : '#f4f4f5';

  return (
    <svg viewBox="0 0 260 180" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Tripod legs */}
      <line x1="130" y1="130" x2="90" y2="165" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130" y1="130" x2="130" y2="168" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="130" y1="130" x2="170" y2="165" stroke={s} strokeWidth="1.5" strokeLinecap="round" />

      {/* Telescope body — tube tilted 30° */}
      {/* Main tube */}
      <motion.rect
        x="90" y="82" width="80" height="22" rx="2"
        fill={f} stroke={s} strokeWidth="1.5"
        style={{ transformOrigin: '130px 93px', rotate: '-30deg' }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Eyepiece (wider, at right end) */}
      <motion.rect
        x="152" y="77" width="22" height="32" rx="2"
        fill={f} stroke={s} strokeWidth="1.5"
        style={{ transformOrigin: '163px 93px', rotate: '-30deg' }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Objective lens cap (narrow, at left end) */}
      <motion.rect
        x="78" y="86" width="16" height="14" rx="1"
        fill={f} stroke={s} strokeWidth="1.5"
        style={{ transformOrigin: '86px 93px', rotate: '-30deg' }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 3, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Stars in the direction the telescope points (upper-left) */}
      {[
        { cx: 48, cy: 38, r: 2.5, delay: 0 },
        { cx: 72, cy: 22, r: 2, delay: 0.5 },
        { cx: 30, cy: 55, r: 1.5, delay: 1 },
        { cx: 60, cy: 58, r: 1.5, delay: 0.8 },
        { cx: 22, cy: 28, r: 1.5, delay: 1.4 },
      ].map((star, i) => (
        <motion.circle
          key={i}
          cx={star.cx} cy={star.cy} r={star.r}
          fill={s}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: star.delay, ease: [0.42, 0, 0.58, 1] }}
        />
      ))}

      {/* Sight line from lens toward stars */}
      <motion.line
        x1="78" y1="72" x2="40" y2="30"
        stroke={s} strokeWidth="1" strokeLinecap="round" strokeDasharray="3 4"
        animate={{ opacity: [0, 0.4, 0.4, 0] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.2, 0.8, 1], ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Mount pivot */}
      <circle cx="130" cy="130" r="4" fill={f} stroke={s} strokeWidth="1.5" />
    </svg>
  );
}
