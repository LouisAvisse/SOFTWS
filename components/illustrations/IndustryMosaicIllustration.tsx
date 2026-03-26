'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

export function IndustryMosaicIllustration({ variant = 'light' }: Props) {
  const s = variant === 'dark' ? '#52525b' : '#d4d4d8';
  const bg = variant === 'dark' ? 'rgba(39,39,42,0.7)' : 'rgba(255,255,255,0.7)';

  const ease: [number, number, number, number] = [0.42, 0, 0.58, 1];

  return (
    <svg viewBox="0 0 400 300" fill="none" aria-hidden="true" className="w-full h-full">

      {/* Card 1 — Finance / Bar chart — center-left */}
      <g transform="rotate(-2.5, 127, 110)">
        <motion.g
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease }}
        >
          <rect x="40" y="50" width="174" height="120" rx="8" fill={bg} stroke={s} strokeWidth="1.5" />
          {/* Bar chart pattern */}
          <line x1="68" y1="148" x2="68" y2="108" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <line x1="90" y1="148" x2="90" y2="88" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <line x1="112" y1="148" x2="112" y2="118" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <line x1="134" y1="148" x2="134" y2="75" stroke={s} strokeWidth="2" strokeLinecap="round" />
          <line x1="156" y1="148" x2="156" y2="95" stroke={s} strokeWidth="2" strokeLinecap="round" />
          {/* x-axis */}
          <line x1="60" y1="150" x2="175" y2="150" stroke={s} strokeWidth="1" strokeLinecap="round" />
        </motion.g>
      </g>

      {/* Card 2 — Tech / Node graph — center-right */}
      <g transform="rotate(2, 272, 118)">
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease }}
        >
          <rect x="195" y="65" width="154" height="105" rx="8" fill={bg} stroke={s} strokeWidth="1.5" />
          {/* Node graph */}
          <circle cx="230" cy="120" r="7" stroke={s} strokeWidth="1.5" />
          <circle cx="272" cy="95" r="6" stroke={s} strokeWidth="1.5" />
          <circle cx="315" cy="125" r="7" stroke={s} strokeWidth="1.5" />
          <circle cx="272" cy="148" r="5" stroke={s} strokeWidth="1.5" />
          <line x1="237" y1="116" x2="266" y2="99" stroke={s} strokeWidth="1" />
          <line x1="278" y1="99" x2="308" y2="121" stroke={s} strokeWidth="1" />
          <line x1="272" y1="101" x2="272" y2="143" stroke={s} strokeWidth="1" />
          <line x1="308" y1="129" x2="277" y2="145" stroke={s} strokeWidth="1" />
        </motion.g>
      </g>

      {/* Card 3 — Retail / Grid — bottom-left */}
      <g transform="rotate(1.5, 135, 197)">
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease }}
        >
          <rect x="55" y="145" width="160" height="105" rx="8" fill={bg} stroke={s} strokeWidth="1.5" />
          {/* Grid of items */}
          {[0, 1, 2].map((col) =>
            [0, 1, 2].map((row) => (
              <rect
                key={`${col}-${row}`}
                x={75 + col * 38}
                y={163 + row * 27}
                width="28"
                height="20"
                rx="2"
                stroke={s}
                strokeWidth="1"
              />
            ))
          )}
        </motion.g>
      </g>

      {/* Card 4 — Healthcare / ECG — bottom-right */}
      <g transform="rotate(-1.5, 285, 197)">
        <motion.g
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease }}
        >
          <rect x="215" y="150" width="140" height="95" rx="8" fill={bg} stroke={s} strokeWidth="1.5" />
          {/* ECG waveform */}
          <path
            d="M 228 197 L 248 197 L 255 175 L 262 218 L 269 197 L 285 197 L 290 183 L 296 210 L 302 197 L 342 197"
            stroke={s}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
      </g>

      {/* Card 5 — Education / Text lines — top-center overlay */}
      <g transform="rotate(3, 190, 72)">
        <motion.g
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease }}
        >
          <rect x="130" y="30" width="120" height="85" rx="8" fill={bg} stroke={s} strokeWidth="1.5" />
          {/* Text lines */}
          <line x1="148" y1="55" x2="232" y2="55" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="148" y1="68" x2="220" y2="68" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="148" y1="81" x2="228" y2="81" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
          <line x1="148" y1="94" x2="198" y2="94" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
        </motion.g>
      </g>
    </svg>
  );
}
