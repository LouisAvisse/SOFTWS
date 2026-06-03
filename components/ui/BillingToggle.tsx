'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Props {
  isAnnual: boolean;
  onToggle: (v: boolean) => void;
  monthlyLabel: string;
  annualLabel: string;
  saveLabel: string;
}

const OPTIONS = [
  { value: false, key: 'monthly' as const },
  { value: true, key: 'annual' as const },
];

const SPRING = { type: 'spring' as const, stiffness: 380, damping: 32 };

export function BillingToggle({ isAnnual, onToggle, monthlyLabel, annualLabel, saveLabel }: Props) {
  const labels = { monthly: monthlyLabel, annual: annualLabel };
  const reduceMotion = useReducedMotion();

  // Shared state styling for the savings sticker. Annual on = brand-blue
  // "saving active" with a little pulse; monthly on = muted "switch to save".
  const tagAnimate = isAnnual
    ? { backgroundColor: 'var(--brand)', color: '#ffffff', scale: reduceMotion ? 1 : [1, 1.08, 1] }
    : { backgroundColor: 'rgba(68, 114, 202, 0.10)', color: 'var(--brand-dark)', scale: 1 };
  const tagTransition = reduceMotion ? { duration: 0 } : { ...SPRING, scale: { duration: 0.4 } };

  return (
    <div className="relative inline-flex">
      <div className="inline-flex items-center gap-1 rounded-full border border-line bg-mist p-1">
        {OPTIONS.map((opt) => {
          const active = isAnnual === opt.value;
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => onToggle(opt.value)}
              className={cn(
                'relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200',
                active ? 'text-ink' : 'text-muted hover:text-ink-3',
              )}
            >
              {active && (
                <motion.span
                  layoutId="billing-pill"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_1px_3px_rgba(20,18,16,0.12)]"
                  transition={reduceMotion ? { duration: 0 } : SPRING}
                />
              )}
              <span className="relative z-10">{labels[opt.key]}</span>
            </button>
          );
        })}
      </div>

      {/* Savings "sticker" — slapped on the top-right corner of the annual tab.
          pointer-events-none so it never blocks the tab underneath it.
          Same behavior as before: brand-blue + pulse when annual is active. */}
      <motion.span
        className="pointer-events-none absolute -top-3 right-1 z-20 inline-flex shrink-0 origin-bottom-right -rotate-[8deg] items-center rounded-full px-2.5 py-1 text-[11px] font-semibold shadow-[0_3px_8px_rgba(20,18,16,0.20)] sm:-right-3 sm:origin-bottom-left"
        initial={false}
        animate={tagAnimate}
        transition={tagTransition}
      >
        {saveLabel}
      </motion.span>
    </div>
  );
}
