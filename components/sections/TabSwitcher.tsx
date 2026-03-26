'use client';

import { type ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabSwitcherProps {
  tabs: Tab[];
  className?: string;
}

export function TabSwitcher({ tabs, className }: TabSwitcherProps) {
  const [active, setActive] = useState(0);

  return (
    <div className={className}>
      {/* Tab list */}
      <div className="relative flex border-b border-zinc-200 overflow-x-auto">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'relative pb-3 mr-8 text-sm font-medium whitespace-nowrap transition-colors duration-150 flex-shrink-0',
              active === i ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700',
            )}
          >
            {tab.label}
            {active === i && (
              <motion.span
                layoutId="tab-underline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="pt-8">
        {tabs[active].content}
      </div>
    </div>
  );
}
