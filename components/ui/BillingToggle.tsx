'use client';

import { motion } from 'framer-motion';
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

export function BillingToggle({ isAnnual, onToggle, monthlyLabel, annualLabel, saveLabel }: Props) {
  const labels = { monthly: monthlyLabel, annual: annualLabel };

  return (
    <div className="inline-flex items-center gap-3">
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
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{labels[opt.key]}</span>
            </button>
          );
        })}
      </div>

      <span className="inline-flex items-center rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
        {saveLabel}
      </span>
    </div>
  );
}
