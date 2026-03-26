'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

const LEFT_ARCS = [
  { r: 20, x1: 82.7, y1: 68, x2: 82.7, y2: 88 },
  { r: 28, x1: 75.8, y1: 64, x2: 75.8, y2: 92 },
  { r: 36, x1: 68.8, y1: 60, x2: 68.8, y2: 96 },
];
const RIGHT_ARCS = [
  { r: 20, x1: 117.3, y1: 68, x2: 117.3, y2: 88 },
  { r: 28, x1: 124.2, y1: 64, x2: 124.2, y2: 92 },
  { r: 36, x1: 131.2, y1: 60, x2: 131.2, y2: 96 },
];

export function MicrophoneIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const f = variant === 'dark' ? '#27272a' : '#f4f4f5';

  return (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Mic capsule */}
      <rect x="80" y="38" width="40" height="75" rx="20"
        stroke={s} strokeWidth="1.5" fill={f} />
      {/* Stem */}
      <line x1="100" y1="113" x2="100" y2="165"
        stroke={s} strokeWidth="1.5" strokeLinecap="round" />
      {/* Base */}
      <ellipse cx="100" cy="168" rx="30" ry="8"
        stroke={s} strokeWidth="1.5" fill="none" />

      {/* Sound arcs — left */}
      {LEFT_ARCS.map((a, i) => (
        <motion.path
          key={`l${i}`}
          d={`M ${a.x1} ${a.y1} A ${a.r} ${a.r} 0 0 0 ${a.x2} ${a.y2}`}
          stroke={s} strokeWidth="1.5" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3,
            ease: [0.42, 0, 0.58, 1] }}
        />
      ))}
      {/* Sound arcs — right */}
      {RIGHT_ARCS.map((a, i) => (
        <motion.path
          key={`r${i}`}
          d={`M ${a.x1} ${a.y1} A ${a.r} ${a.r} 0 0 1 ${a.x2} ${a.y2}`}
          stroke={s} strokeWidth="1.5" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3,
            ease: [0.42, 0, 0.58, 1] }}
        />
      ))}

      {/* Speech bubble */}
      <motion.path
        d="M 118 18 L 178 18 Q 184 18 184 24 L 184 58 Q 184 64 178 64 L 122 64 L 115 74 L 122 64 Q 116 64 116 58 L 116 24 Q 116 18 118 18 Z"
        stroke={s} strokeWidth="1.5" fill={f}
        strokeLinejoin="round"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
        style={{ transformOrigin: '150px 46px' }}
      />
      {/* Bubble dots */}
      {[136, 150, 164].map((cx, i) => (
        <circle key={i} cx={cx} cy="41" r="3" fill={s} opacity="0.6" />
      ))}
    </svg>
  );
}
