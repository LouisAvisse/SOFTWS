'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export function DrawingLine({ className }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 2"
      preserveAspectRatio="none"
      className={className ?? 'w-full h-px'}
      aria-hidden="true"
    >
      <motion.line
        x1="0"
        y1="1"
        x2="1200"
        y2="1"
        stroke="#e4e4e7"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
      />
    </svg>
  );
}
