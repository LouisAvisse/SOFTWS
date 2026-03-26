'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

// Static path segments for the adaptive side (branching tree)
const ADAPTIVE_PATHS = [
  { d: 'M 20,60 L 70,60', delay: 0 },        // trunk
  { d: 'M 70,60 L 130,28', delay: 0.15 },    // branch up
  { d: 'M 70,60 L 130,60', delay: 0.25 },    // branch mid
  { d: 'M 70,60 L 130,92', delay: 0.35 },    // branch down
  { d: 'M 130,28 L 180,45', delay: 0.5 },    // converge up
  { d: 'M 130,60 L 180,45', delay: 0.55 },   // converge mid
  { d: 'M 130,92 L 180,45', delay: 0.6 },    // converge down
  { d: 'M 180,45 L 220,45', delay: 0.75 },   // final
];

export function PathComparisonCard({ variant = 'light' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const border = variant === 'dark' ? 'border-zinc-700' : 'border-zinc-200';
  const bg = variant === 'dark' ? 'bg-zinc-900' : 'bg-zinc-50';
  const divider = variant === 'dark' ? 'border-zinc-700' : 'border-zinc-200';
  const labelColor = variant === 'dark' ? 'text-zinc-400' : 'text-zinc-500';
  const headingColor = variant === 'dark' ? 'text-zinc-100' : 'text-zinc-900';

  return (
    <div ref={ref} className={`rounded-xl border ${border} ${bg} p-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left: Static Path */}
        <div>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${labelColor}`}>
            Traditional Training
          </p>
          <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>One path. No adaptation.</h3>
          <svg viewBox="0 0 260 120" fill="none" className="w-full h-24">
            {/* Static line */}
            <line x1="20" y1="60" x2="220" y2="60" stroke={s} strokeWidth="1.5" strokeLinecap="round" />
            {/* Arrowhead */}
            <path d="M 214 54 L 222 60 L 214 66" stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Start label */}
            <text x="20" y="82" fontSize="10" fill="#a1a1aa" fontFamily="var(--font-geist-sans)">Start</text>
            {/* End label */}
            <text x="210" y="82" fontSize="10" fill="#a1a1aa" textAnchor="middle" fontFamily="var(--font-geist-sans)">End</text>
            {/* Dashed "same for everyone" */}
            <text x="130" y="44" fontSize="9" fill="#a1a1aa" textAnchor="middle" fontFamily="var(--font-geist-sans)">same for everyone</text>
          </svg>
        </div>

        {/* Divider */}
        <div className={`hidden md:block absolute left-1/2 top-8 bottom-8 border-l ${divider}`} />

        {/* Right: Adaptive Path */}
        <div>
          <p className={`text-xs font-semibold tracking-widest uppercase mb-4 ${labelColor}`}>
            Soft Adaptive Learning
          </p>
          <h3 className={`text-lg font-semibold mb-6 ${headingColor}`}>
            Your path. Built from your gaps.
          </h3>
          <svg viewBox="0 0 260 120" fill="none" className="w-full h-24">
            {ADAPTIVE_PATHS.map((seg, i) => (
              <motion.path
                key={i}
                d={seg.d}
                stroke={s}
                strokeWidth="1.5"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{
                  duration: 0.5,
                  delay: seg.delay,
                  ease: [0.42, 0, 0.58, 1],
                }}
              />
            ))}
            {/* Node dots */}
            {[
              { cx: 20, cy: 60 }, { cx: 70, cy: 60 },
              { cx: 130, cy: 28 }, { cx: 130, cy: 60 }, { cx: 130, cy: 92 },
              { cx: 180, cy: 45 }, { cx: 220, cy: 45 },
            ].map((pt, i) => (
              <motion.circle
                key={i}
                cx={pt.cx} cy={pt.cy} r={3} fill={s}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              />
            ))}
            {/* Arrowhead at end */}
            <motion.path
              d="M 215 39 L 223 45 L 215 51"
              stroke={s} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.9 }}
            />
            <text x="130" y="110" fontSize="9" fill="#a1a1aa" textAnchor="middle" fontFamily="var(--font-geist-sans)">adapts to each individual</text>
          </svg>
        </div>
      </div>
    </div>
  );
}
