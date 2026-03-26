'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Props { nodes: string[] }

const W = 600;
const Y = 20;

export function PricingTimeline({ nodes }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  // Distribute nodes evenly with 12.5% padding on each side
  const xs = nodes.map((_, i) => 75 + i * (450 / (nodes.length - 1)));

  return (
    <div ref={ref} className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <svg viewBox={`0 0 ${W} 48`} className="w-full" aria-hidden="true">
          {/* Connecting line */}
          <motion.line
            x1={xs[0]}
            y1={Y}
            x2={xs[xs.length - 1]}
            y2={Y}
            stroke="#e4e4e7"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
          />
          {/* Nodes */}
          {xs.map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={Y}
              r={6}
              fill="#18181b"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.15 + i * 0.2, duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
            />
          ))}
          {/* Labels */}
          {xs.map((x, i) => (
            <text
              key={i}
              x={x}
              y={44}
              textAnchor="middle"
              fontSize="11"
              fill="#71717a"
              fontFamily="var(--font-geist-sans)"
            >
              {nodes[i]}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
