'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

const MAJOR = [
  { cx: 80, cy: 45 },
  { cx: 190, cy: 40 },
  { cx: 140, cy: 140 },
];
const MINOR = [
  { cx: 45, cy: 95 },
  { cx: 115, cy: 70 },
  { cx: 205, cy: 98 },
  { cx: 165, cy: 65 },
  { cx: 58, cy: 152 },
  { cx: 218, cy: 152 },
];
// [majorIdx|minorIdx, isMajor, ...same for second]
const LINES: [number, boolean, number, boolean][] = [
  [0, true, 4, false],   // A-E
  [0, true, 0, false],   // A-D
  [1, true, 3, false],   // B-G
  [1, true, 2, false],   // B-F
  [4, false, 1, false],  // E-G
  [2, true, 4, false],   // C-H (draws itself)
  [2, true, 5, false],   // C-I
  [0, false, 4, false],  // D-H
  [2, false, 5, false],  // F-I
];

function getPoint(idx: number, isMajor: boolean) {
  return isMajor ? MAJOR[idx] : MINOR[idx];
}

export function ConstellationIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const faint = variant === 'dark' ? '#52525b' : '#a1a1aa';

  return (
    <svg viewBox="0 0 260 200" fill="none" aria-hidden="true" className="w-full h-full">
      {/* Connecting lines */}
      {LINES.map(([ai, am, bi, bm], i) => {
        const a = getPoint(ai, am);
        const b = getPoint(bi, bm);
        // Line C-H (index 5) draws itself
        if (i === 5) {
          return (
            <motion.line key={i}
              x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
              stroke={faint} strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 0.4, 0.4, 0] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.3, 0.7, 1],
                ease: [0.42, 0, 0.58, 1] }}
            />
          );
        }
        return (
          <line key={i} x1={a.cx} y1={a.cy} x2={b.cx} y2={b.cy}
            stroke={faint} strokeWidth="1" opacity="0.4" />
        );
      })}

      {/* Minor stars */}
      {MINOR.map((star, i) => (
        <circle key={i} cx={star.cx} cy={star.cy} r="2" fill={s} opacity="0.7" />
      ))}

      {/* Major stars — pulsing */}
      {MAJOR.map((star, i) => (
        <motion.circle key={i}
          cx={star.cx} cy={star.cy}
          fill={s}
          animate={{ r: [4.5, 5.5, 4.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.7,
            ease: [0.42, 0, 0.58, 1] }}
        />
      ))}
    </svg>
  );
}
