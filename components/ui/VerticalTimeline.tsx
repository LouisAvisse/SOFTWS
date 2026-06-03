'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Milestone {
  year: string;
  label: string;
  body: string;
}

interface Props { milestones: Milestone[] }

// B-Corp badge — black variant for the light timeline section.
function BCorp() {
  return (
    <Image
      src="/logo/bcorp/bcorp-black.svg"
      alt="Certified B Corporation"
      width={137}
      height={200}
      className="h-10 w-auto"
    />
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
          stroke="var(--edge)"
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
            {/* Dot — the latest milestone is the brand-blue "current" marker */}
            <div
              className={
                i === milestones.length - 1
                  ? 'absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-brand ring-4 ring-brand/15'
                  : 'absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-edge bg-white'
              }
            />

            <div className="flex items-start gap-3">
              <div>
                <span className="text-xs font-mono text-faint block mb-0.5">{m.year}</span>
                <h3 className="text-base font-semibold text-ink flex items-center gap-2">
                  {m.label}
                  {m.label === 'B-Corp Certified' && <BCorp />}
                </h3>
                <p className="text-sm text-muted leading-normal mt-1">{m.body}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
