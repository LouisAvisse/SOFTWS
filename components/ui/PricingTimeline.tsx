'use client';

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  nodes: string[];
  counts: string[];
}

/* "Coverage scale" — every stage is the SAME 5×5 field of dots, filled bottom-up
   with brand dots as deployment grows: one learner (Individual) → the whole org
   (Enterprise). Identical frames keep the four stages perfectly aligned, and the
   bottom-up fill lands every stage on a shared baseline. On scroll-in the brand
   dots populate in a left→right, bottom-up wave (reduced-motion → instant). */

const GRID = 5;
const TOTAL = GRID * GRID; // 25
const FILLS = [1, 5, 15, 25]; // whole rows → clean shapes, bottom-aligned
const EASE = [0.16, 1, 0.3, 1] as const;

export function PricingTimeline({ nodes, counts }: Props) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 sm:gap-x-6 lg:gap-x-8">
      {nodes.map((node, i) => {
        const last = i === nodes.length - 1;
        const count = FILLS[i] ?? TOTAL;

        // Map each grid cell (row-major) to its fill order k (bottom row first,
        // left→right), so brand dots stack up from the baseline.
        const order = new Map<number, number>();
        for (let k = 0; k < count; k++) {
          const row = GRID - 1 - Math.floor(k / GRID);
          const col = k % GRID;
          order.set(row * GRID + col, k);
        }
        const stageBase = 0.1 + i * 0.22;

        return (
          <div key={i} className="flex flex-col items-start">
            <div className="grid grid-cols-5 gap-2.5">
              {Array.from({ length: TOTAL }).map((_, idx) => {
                const k = order.get(idx);
                if (k === undefined) {
                  // empty "track" dot — always visible so the field reads as a frame
                  return (
                    <span
                      key={idx}
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: 'color-mix(in srgb, var(--brand) 24%, transparent)' }}
                    />
                  );
                }
                return (
                  <motion.span
                    key={idx}
                    className="h-2.5 w-2.5 rounded-full bg-brand"
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : undefined}
                    transition={{ duration: 0.34, ease: EASE, delay: reduce ? 0 : stageBase + k * 0.022 }}
                  />
                );
              })}
            </div>

            <div className="mt-6">
              <p className={cn('text-sm font-semibold tracking-tight', last ? 'text-ink' : 'text-ink-3')}>
                {node}
              </p>
              <p className="mt-1 text-[13px] text-muted">{counts[i]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
