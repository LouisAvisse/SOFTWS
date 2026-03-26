'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

const RUNGS = [130, 108, 86, 64, 42];

export function LadderIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';

  return (
    <svg viewBox="0 0 180 180" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Left rail */}
      <line x1="62" y1="30" x2="62" y2="148" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      {/* Right rail */}
      <line x1="118" y1="30" x2="118" y2="148" stroke={s} strokeWidth="1.5" strokeLinecap="round" />

      {/* Rungs — each draws in from left to right with stagger */}
      {RUNGS.map((y, i) => (
        <motion.line
          key={i}
          x1="62" y1={y} x2="118" y2={y}
          stroke={s} strokeWidth="1.5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 1] }}
          transition={{
            duration: 2.5, repeat: Infinity, delay: i * 0.18,
            times: [0, 0.4, 1], ease: [0.42, 0, 0.58, 1],
          }}
        />
      ))}

      {/* Ascending dot — climbs the ladder */}
      <motion.circle
        cx="90" cy="148" r="4" fill={s}
        animate={{ cy: [148, 42, 148], opacity: [1, 1, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.7, 1], ease: [0.42, 0, 0.58, 1] }}
      />

      {/* Top highlight — glows when dot arrives */}
      <motion.circle
        cx="90" cy="30" r="6" fill="none" stroke={s} strokeWidth="1"
        animate={{ opacity: [0, 0, 1, 0], scale: [0.6, 0.6, 1.2, 1.5] }}
        transition={{ duration: 3, repeat: Infinity, times: [0, 0.65, 0.75, 1], ease: [0.42, 0, 0.58, 1] }}
        style={{ transformOrigin: '90px 30px' }}
      />
    </svg>
  );
}
