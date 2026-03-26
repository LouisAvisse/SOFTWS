'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Milestone {
  year: string;
  label: string;
  body: string;
}

interface Props { milestones: Milestone[] }

function BCorp() {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-label="B-Corp Certified">
      <rect x="1" y="1" width="34" height="34" rx="7" stroke="#27272a" strokeWidth="1.5" />
      <text x="18" y="16" fontSize="12" fontWeight="700" fill="#27272a" textAnchor="middle" fontFamily="var(--font-geist-sans)">B</text>
      <text x="18" y="27" fontSize="7" fontWeight="500" fill="#52525b" textAnchor="middle" fontFamily="var(--font-geist-sans)">CORP</text>
    </svg>
  );
}

export function VerticalTimeline({ milestones }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const lineH = milestones.length * 96;

  return (
    <div ref={ref} className="relative max-w-xl">
      {/* Animated vertical line */}
      <svg
        viewBox={`0 0 2 ${lineH}`}
        className="absolute left-[6px] top-2 w-0.5"
        style={{ height: lineH }}
        aria-hidden="true"
      >
        <motion.line
          x1="1" y1="0" x2="1" y2={lineH}
          stroke="#e4e4e7"
          strokeWidth="1.5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
        />
      </svg>

      {/* Milestones */}
      <div className="space-y-8">
        {milestones.map((m, i) => (
          <motion.div
            key={i}
            className="pl-8 relative"
            initial={{ opacity: 0, x: -12 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={{ delay: 0.3 + i * 0.2, duration: 0.4, ease: [0.42, 0, 0.58, 1] }}
          >
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-zinc-900 bg-white" />

            <div className="flex items-start gap-3">
              <div>
                <span className="text-xs font-mono text-zinc-400 block mb-0.5">{m.year}</span>
                <h3 className="text-base font-semibold text-zinc-900 flex items-center gap-2">
                  {m.label}
                  {m.label === 'B-Corp Certified' && <BCorp />}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mt-1">{m.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
