'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  nodes: { label: string }[];
  variant?: 'light' | 'dark';
}

const CTR = { x: 200, y: 155 };
const R = 108;
const N = 5;

// Static node positions (start at top, clockwise)
const NODE_POS = Array.from({ length: N }, (_, i) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
  return { x: CTR.x + R * Math.cos(a), y: CTR.y + R * Math.sin(a), a };
});

// Traveling dot keyframes (40 points for smooth circle)
const DOT_N = 40;
const DOT_CX = Array.from({ length: DOT_N + 1 }, (_, i) =>
  CTR.x + R * Math.cos(-Math.PI / 2 + (i * 2 * Math.PI) / DOT_N),
);
const DOT_CY = Array.from({ length: DOT_N + 1 }, (_, i) =>
  CTR.y + R * Math.sin(-Math.PI / 2 + (i * 2 * Math.PI) / DOT_N),
);

function textAnchor(a: number) {
  const cosA = Math.cos(a);
  if (cosA > 0.2) return 'start';
  if (cosA < -0.2) return 'end';
  return 'middle';
}

function labelPos(node: { x: number; y: number; a: number }) {
  const pad = 28;
  return {
    x: CTR.x + (R + pad) * Math.cos(node.a),
    y: CTR.y + (R + pad) * Math.sin(node.a),
  };
}

export function LearningLoop({ nodes, variant = 'light' }: Props) {
  const [hovered, setHovered] = useState<number | null>(null);
  const s = variant === 'dark' ? '#e4e4e7' : '#18181b';
  const faint = variant === 'dark' ? '#52525b' : '#d4d4d8';
  const textColor = variant === 'dark' ? '#a1a1aa' : '#52525b';

  return (
    <svg
      viewBox="0 0 400 310"
      fill="none"
      aria-hidden="true"
      className="w-full h-full"
    >
      <defs>
        <marker id="ll-arrow-active" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 Z" fill={s} />
        </marker>
        <marker id="ll-arrow-faint" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 Z" fill={faint} />
        </marker>
      </defs>

      {/* Arcs between adjacent nodes */}
      {NODE_POS.map((node, i) => {
        const next = NODE_POS[(i + 1) % N];
        const isActive = hovered === i;
        return (
          <path
            key={i}
            d={`M ${node.x},${node.y} A ${R},${R} 0 0,1 ${next.x},${next.y}`}
            stroke={isActive ? s : faint}
            strokeWidth={isActive ? 1.5 : 1}
            strokeLinecap="round"
            markerEnd={isActive ? 'url(#ll-arrow-active)' : 'url(#ll-arrow-faint)'}
            style={{ transition: 'stroke 0.15s, stroke-width 0.15s' }}
          />
        );
      })}

      {/* Node circles */}
      {NODE_POS.map((node, i) => (
        <circle
          key={i}
          cx={node.x}
          cy={node.y}
          r={hovered === i ? 7 : 5}
          fill={s}
          style={{ cursor: 'pointer', transition: 'r 0.15s' }}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}

      {/* Node labels */}
      {NODE_POS.map((node, i) => {
        const lp = labelPos(node);
        const label = nodes[i]?.label ?? '';
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y}
            textAnchor={textAnchor(node.a)}
            dominantBaseline="middle"
            fontSize="12"
            fontWeight={hovered === i ? '600' : '400'}
            fill={hovered === i ? s : textColor}
            style={{ transition: 'fill 0.15s', fontFamily: 'var(--font-geist-sans)' }}
          >
            {label}
          </text>
        );
      })}

      {/* Traveling dot */}
      <motion.circle
        r={4}
        fill={s}
        animate={{ cx: DOT_CX, cy: DOT_CY }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />
    </svg>
  );
}
