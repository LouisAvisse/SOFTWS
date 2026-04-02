'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Users, TrendingUp, Headphones, BookOpen } from 'lucide-react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface RoleData {
  label: string;
  body: string;
  scenario: string;
  metric1Label: string;
  metric1Value: string;
  metric2Label: string;
  metric2Value: string;
}

interface RolesShowcaseProps {
  eyebrow: string;
  headline: string;
  roles: RoleData[];
}

// ─── Icons per role ──────────────────────────────────────────────────────────

const ROLE_ICONS = [TrendingUp, Users, Headphones, BookOpen];

// ─── Ease ────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Metric bar ──────────────────────────────────────────────────────────────

function MetricBar({ label, value, delay }: { label: string; value: number; delay: number }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[13px] text-zinc-600">{label}</span>
        <span className="text-[13px] font-mono font-semibold text-zinc-900">{value}%</span>
      </div>
      <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-zinc-900 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.8, ease: EASE, delay }}
        />
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function RolesShowcase({ eyebrow, headline, roles }: RolesShowcaseProps) {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const current = roles[active];

  return (
    <section className="py-24 lg:py-32" style={{ background: '#FAFAF9' }}>
      <div className="max-w-[1050px] mx-auto px-6" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-400 mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-bold tracking-tight text-zinc-900"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}
          >
            {headline}
          </h2>
        </motion.div>

        {/* Role selector cards */}
        {/* Mobile: horizontal scroll pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="lg:hidden flex gap-2 overflow-x-auto pb-1 mb-3 -mx-6 px-6 scrollbar-none"
          style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
        >
          {roles.map((role, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg border whitespace-nowrap transition-all duration-200 flex-shrink-0',
                  isActive
                    ? 'bg-white border-zinc-900 shadow-sm'
                    : 'bg-white/60 border-zinc-200/80',
                )}
              >
                <Icon className={cn('w-3.5 h-3.5 transition-colors', isActive ? 'text-zinc-900' : 'text-zinc-400')} />
                <span className={cn('text-[13px] font-semibold transition-colors', isActive ? 'text-zinc-900' : 'text-zinc-500')}>
                  {role.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Desktop: inline row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="hidden lg:flex items-center justify-center gap-2 mb-3"
        >
          {roles.map((role, i) => {
            const Icon = ROLE_ICONS[i % ROLE_ICONS.length];
            const isActive = active === i;
            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all duration-200',
                  isActive
                    ? 'bg-white border-zinc-900 shadow-sm'
                    : 'bg-white/60 border-zinc-200/80 hover:border-zinc-300 hover:bg-white',
                )}
              >
                <Icon className={cn('w-3.5 h-3.5 transition-colors', isActive ? 'text-zinc-900' : 'text-zinc-400')} />
                <span className={cn('text-[13px] font-semibold transition-colors', isActive ? 'text-zinc-900' : 'text-zinc-500')}>
                  {role.label}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="bg-white rounded-2xl border border-zinc-200 overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: text */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400 mb-4">
                  {current.label}
                </p>
                <p className="text-[15px] text-zinc-700 leading-relaxed mb-6" style={{ maxWidth: '38ch' }}>
                  {current.body}
                </p>
                <a
                  href="/use-cases"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-zinc-900 hover:text-zinc-600 transition-colors group"
                >
                  Learn more
                  <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </a>
              </div>

              {/* Right: metrics visualization */}
              <div className="p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-zinc-100 bg-zinc-50/40">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-400">
                    {current.scenario}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold font-mono text-zinc-900">
                      {Math.round((parseInt(current.metric1Value) + parseInt(current.metric2Value)) / 2)}
                    </span>
                    <span className="text-xs text-zinc-400">avg</span>
                  </div>
                </div>

                <div className="space-y-5">
                  <MetricBar
                    label={current.metric1Label}
                    value={parseInt(current.metric1Value)}
                    delay={0.1}
                  />
                  <MetricBar
                    label={current.metric2Label}
                    value={parseInt(current.metric2Value)}
                    delay={0.2}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
