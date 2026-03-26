'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  isAnnual: boolean;
  onToggle: (v: boolean) => void;
  monthlyLabel: string;
  annualLabel: string;
  saveLabel: string;
}

export function BillingToggle({ isAnnual, onToggle, monthlyLabel, annualLabel, saveLabel }: Props) {
  return (
    <div className="relative inline-flex items-center">
      <div className="flex items-center gap-1 bg-zinc-100 rounded-full p-1">
        <button
          onClick={() => onToggle(false)}
          className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            !isAnnual ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          {monthlyLabel}
        </button>
        <button
          onClick={() => onToggle(true)}
          className={`relative px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 ${
            isAnnual ? 'bg-zinc-900 text-white' : 'text-zinc-500 hover:text-zinc-700'
          }`}
        >
          {annualLabel}
        </button>
      </div>

      {/* Save badge */}
      <AnimatePresence>
        {isAnnual && (
          <motion.span
            className="absolute -top-3 -right-2 bg-zinc-900 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.42, 0, 0.58, 1] }}
          >
            {saveLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
