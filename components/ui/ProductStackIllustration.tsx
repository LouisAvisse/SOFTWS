'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

const CARDS = [
  { tx: 20, ty: 20, rot: 3, bg: 'bg-mist', duration: 3, yRange: 6, labels: [] },
  { tx: 10, ty: 10, rot: 1.5, bg: 'bg-surface', duration: 3.5, yRange: 8, labels: [] },
  {
    tx: 0, ty: 0, rot: 0, bg: 'bg-white', duration: 4, yRange: 10,
    labels: ['Conversation Roleplay', 'Pitch Practice', 'Analytics Dashboard'],
  },
];

export function ProductStackIllustration({ variant = 'light' }: Props) {
  const border = variant === 'dark' ? 'border-ink-3' : 'border-line';
  const labelBg = variant === 'dark' ? 'bg-ink-2 text-edge' : 'bg-mist text-body';
  const dotColor = variant === 'dark' ? 'bg-body' : 'bg-edge';

  return (
    <div className="relative w-full max-w-sm mx-auto" style={{ height: '240px' }}>
      {CARDS.map((card, i) => (
        <div
          key={i}
          className="absolute inset-0"
          style={{ transform: `translate(${card.tx}px, ${card.ty}px) rotate(${card.rot}deg)` }}
        >
          <motion.div
            className={`w-full h-full rounded-xl border ${card.bg} ${border} shadow-md px-5 py-4`}
            animate={{ y: [0, -card.yRange, 0] }}
            transition={{ duration: card.duration, repeat: Infinity, ease: [0.42, 0, 0.58, 1] }}
          >
            {/* Card header dots — one carries the brand accent */}
            <div className="flex items-center gap-1.5 mb-4">
              {[0, 1, 2].map((d) => (
                <div
                  key={d}
                  className={`h-2 w-2 rounded-full ${d === 0 && card.labels.length > 0 ? 'bg-brand' : dotColor}`}
                />
              ))}
            </div>

            {/* Labels on front card only — the first is the active (brand) module */}
            {card.labels.length > 0 && (
              <div className="space-y-2">
                {card.labels.map((label, j) => (
                  <div
                    key={j}
                    className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                      j === 0
                        ? 'bg-brand text-white shadow-[0_2px_10px_-2px_var(--brand)]'
                        : labelBg
                    }`}
                  >
                    {label}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      ))}
    </div>
  );
}
