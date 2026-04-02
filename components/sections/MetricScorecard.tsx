'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { cn } from '@/lib/utils';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Metric {
  value: string;
  label: string;
  description?: string;
}

interface MetricScorecardProps {
  headline?: string;
  metrics: Metric[];
  columns?: 2 | 4;
  dark?: boolean;
}

// ─── Parse "30%", "360°", "0%", "+45%" into { num, suffix, prefix } ─────────

function parseMetricValue(raw: string): { prefix: string; num: number; suffix: string } {
  const match = raw.match(/^([+\-]?)(\d+)(.*)/);
  if (!match) return { prefix: '', num: 0, suffix: raw };
  return {
    prefix: match[1],
    num: parseInt(match[2], 10),
    suffix: match[3],
  };
}

// ─── Easing: t => 1 - (1-t)^4 ───────────────────────────────────────────────

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

// ─── Count-up hook ───────────────────────────────────────────────────────────

function useCountUp(
  target: number,
  duration: number,
  delay: number,
  trigger: boolean,
  prefersReduced: boolean,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Skip animation: reduced motion or target is 0
    if (!trigger) return;
    if (prefersReduced || target === 0) {
      setValue(target);
      return;
    }

    let raf: number;
    let start: number | null = null;
    const delayMs = delay * 1000;
    const durationMs = duration * 1000;

    function tick(timestamp: number) {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;

      if (elapsed < delayMs) {
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = Math.min((elapsed - delayMs) / durationMs, 1);
      const eased = easeOutQuart(t);
      setValue(Math.round(eased * target));

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      }
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay, trigger, prefersReduced]);

  return value;
}

// ─── Single stat cell ────────────────────────────────────────────────────────

function StatCell({
  metric,
  index,
  dark,
  inView,
  prefersReduced,
}: {
  metric: Metric;
  index: number;
  dark: boolean;
  inView: boolean;
  prefersReduced: boolean;
}) {
  const { prefix, num, suffix } = parseMetricValue(metric.value);
  const staggerDelay = index * 0.15;
  const countDuration = 1.2;
  const displayNum = useCountUp(num, countDuration, staggerDelay, inView, prefersReduced);

  // Label/description fade in after count finishes
  const labelDelay = staggerDelay + countDuration + 0.1;

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 lg:first:pl-0 lg:last-of-type:pr-0">
      <p className={cn('font-mono font-bold text-3xl sm:text-4xl lg:text-5xl mb-2', dark ? 'text-white' : 'text-zinc-900')}>
        {prefix}{displayNum}{suffix}
      </p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, ease: 'easeOut', delay: prefersReduced ? 0 : labelDelay }}
        className={cn('font-semibold text-base mb-1', dark ? 'text-zinc-300' : 'text-zinc-700')}
      >
        {metric.label}
      </motion.p>
      {metric.description && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, ease: 'easeOut', delay: prefersReduced ? 0 : labelDelay + 0.05 }}
          className={cn('text-sm', 'text-zinc-500')}
        >
          {metric.description}
        </motion.p>
      )}
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export function MetricScorecard({ headline, metrics, columns = 4, dark = false }: MetricScorecardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  // Detect prefers-reduced-motion
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return (
    <section className={cn('py-24 lg:py-32', dark ? 'bg-zinc-950' : 'bg-zinc-50')}>
      <div className="max-w-[1050px] mx-auto px-6">
        {headline && (
          <FadeIn className="mb-14">
            <h2 className={cn('text-3xl lg:text-4xl font-semibold tracking-tight', dark ? 'text-white' : 'text-zinc-900')}>
              {headline}
            </h2>
          </FadeIn>
        )}

        <div
          ref={ref}
          className={cn(
            'grid divide-y lg:divide-y-0',
            columns === 2 ? 'grid-cols-1 sm:grid-cols-2 sm:divide-x' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:divide-x',
            dark ? 'divide-zinc-800' : 'divide-zinc-100',
          )}
        >
          {metrics.map((metric, i) => (
            <StatCell
              key={i}
              metric={metric}
              index={i}
              dark={dark}
              inView={inView}
              prefersReduced={prefersReduced}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
