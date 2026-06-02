'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props { nodes: string[] }

/* "Coverage scale" — each stage is a 5×5 grid that fills with brand dots as the
   deployment grows: one person (Individual) → the whole organisation
   (Enterprise). The growing fill makes "individual → org-wide" legible. */

const GRID = 5;
const TOTAL = GRID * GRID; // 25 dots

// Fraction of the org "covered" at each stage (grows left → right, full at end).
const FILL_RATIO = [0.04, 0.24, 0.56, 1];

function filledCount(i: number, total: number): number {
  const r = FILL_RATIO[i] ?? (i + 1) / total;
  return Math.max(1, Math.round(TOTAL * r));
}

export function PricingTimeline({ nodes }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
      {nodes.map((node, i) => {
        const last = i === nodes.length - 1;
        const filled = filledCount(i, nodes.length);
        return (
          <motion.div
            key={i}
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.42, 0, 0.58, 1] }}
          >
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: TOTAL }).map((_, d) => (
                <span
                  key={d}
                  className={cn(
                    'h-2.5 w-2.5 rounded-full',
                    d < filled ? 'bg-brand' : 'bg-edge/45',
                  )}
                />
              ))}
            </div>
            <span className={cn('mt-5 text-sm font-semibold', last ? 'text-ink' : 'text-ink-3')}>
              {node}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
