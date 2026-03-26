'use client';

import { type ReactNode, useRef, useState, useEffect } from 'react';
import { useInView } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  title: string;
  body: string;
  visual?: ReactNode;
}

interface StickyScrollProps {
  headline: string;
  intro?: string;
  steps: Step[];
}

function StepPanel({ step, index, onActive }: { step: Step; index: number; onActive: (i: number) => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '-40% 0px -40% 0px' });

  useEffect(() => {
    if (isInView) onActive(index);
  }, [isInView, index, onActive]);

  return (
    <div
      ref={ref}
      className="py-20 border-b border-zinc-100 last:border-0 grid grid-cols-1 gap-8 lg:gap-16"
    >
      <div>
        <span className="font-mono text-sm text-zinc-400 mb-3 block">{step.label}</span>
        <h3 className="text-2xl font-semibold text-zinc-900 mb-4">{step.title}</h3>
        <p className="text-zinc-600 leading-relaxed">{step.body}</p>
      </div>
      {step.visual && <div>{step.visual}</div>}
    </div>
  );
}

export function StickyScroll({ headline, intro, steps }: StickyScrollProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        <FadeIn className="mb-16 max-w-2xl">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
            {headline}
          </h2>
          {intro && <p className="text-base text-zinc-600 leading-relaxed">{intro}</p>}
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-[256px_1fr] gap-16">
          {/* Sticky sidebar — desktop only */}
          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div className="space-y-1">
                {steps.map((step, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200',
                      activeStep === i ? 'text-zinc-900 font-semibold' : 'text-zinc-400',
                    )}
                  >
                    <span className="font-mono text-xs w-8 flex-shrink-0">{step.label}</span>
                    <span className={cn('truncate', activeStep === i ? 'text-zinc-900' : 'text-zinc-400')}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scrolling content */}
          <div>
            {steps.map((step, i) => (
              <StepPanel key={i} step={step} index={i} onActive={setActiveStep} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
