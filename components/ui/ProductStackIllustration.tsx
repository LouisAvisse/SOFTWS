'use client';

import { motion } from 'framer-motion';

interface Props { variant?: 'light' | 'dark' }

const CARDS = [
  { tx: 20, ty: 20, rot: 3, bg: 'bg-zinc-100', duration: 3, yRange: 6, labels: [] },
  { tx: 10, ty: 10, rot: 1.5, bg: 'bg-zinc-50', duration: 3.5, yRange: 8, labels: [] },
  {
    tx: 0, ty: 0, rot: 0, bg: 'bg-white', duration: 4, yRange: 10,
    labels: ['Conversation Roleplay', 'Pitch Practice', 'Analytics Dashboard'],
  },
];

export function ProductStackIllustration({ variant = 'light' }: Props) {
  const border = variant === 'dark' ? 'border-zinc-700' : 'border-zinc-200';
  const labelBg = variant === 'dark' ? 'bg-zinc-800 text-zinc-300' : 'bg-zinc-100 text-zinc-600';
  const dotColor = variant === 'dark' ? 'bg-zinc-600' : 'bg-zinc-300';

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
            {/* Card header dots */}
            <div className="flex items-center gap-1.5 mb-4">
              {[0, 1, 2].map((d) => (
                <div key={d} className={`w-2 h-2 rounded-full ${dotColor}`} />
              ))}
            </div>

            {/* Labels on front card only */}
            {card.labels.length > 0 && (
              <div className="space-y-2">
                {card.labels.map((label, j) => (
                  <div
                    key={j}
                    className={`text-xs font-medium px-2 py-1 rounded ${labelBg} inline-block`}
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
