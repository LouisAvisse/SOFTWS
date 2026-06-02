'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props { variant?: 'light' | 'dark' }

const BARS = [
  { height: 45, label: 'SDR' },
  { height: 62, label: 'AE' },
  { height: 55, label: 'CS' },
  { height: 78, label: 'AM' },
  { height: 85, label: 'SM', highlight: true },
  { height: 92, label: 'SE' },
];

const CHIPS = ['92% Completion', '↑18% vs last month', '3 gaps identified'];

export function AnalyticsDashboard({ variant = 'light' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const isDark = variant === 'dark';

  return (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border p-6 shadow-lg w-full max-w-lg mx-auto',
        isDark ? 'bg-ink border-ink-3' : 'bg-white border-line',
      )}
    >
      {/* Header */}
      <div className="mb-5">
        <p className={cn('text-xs font-semibold tracking-widest uppercase mb-1', isDark ? 'text-muted' : 'text-faint')}>
          Analytics
        </p>
        <p className={cn('text-sm font-semibold', isDark ? 'text-mist' : 'text-ink')}>
          Team Readiness Overview
        </p>
      </div>

      {/* Bar chart */}
      <div className="flex items-end gap-2 h-32 mb-3">
        {BARS.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className={cn('w-full relative rounded-t overflow-hidden', isDark ? 'bg-ink-2' : 'bg-mist')}
              style={{ height: '100%' }}
            >
              <motion.div
                className={cn(
                  'absolute bottom-0 w-full rounded-t origin-bottom',
                  bar.highlight
                    ? 'bg-brand ring-1 ring-brand shadow-[0_0_16px_-2px_var(--brand)]'
                    : isDark ? 'bg-body' : 'bg-edge',
                )}
                style={{ height: `${bar.height}%` }}
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.42, 0, 0.58, 1] }}
              />
            </div>
            <span className={cn('text-[10px]', isDark ? 'text-muted' : 'text-faint')}>
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      {/* Metric chips */}
      <div className="flex flex-wrap gap-2 mt-4">
        {CHIPS.map((chip, i) => (
          <span
            key={i}
            className={cn(
              'text-xs px-2 py-1 rounded font-medium',
              isDark ? 'bg-ink-2 text-edge' : 'bg-mist text-ink-3',
            )}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
