'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '@/components/motion/FadeIn';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Step {
  label: string;
  title: string;
  body: string;
  visual?: ReactNode;
}

interface AlternatingStepsProps {
  headline: string;
  headlineBold?: string;
  intro?: string;
  steps: Step[];
}

// ─── Ease ────────────────────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Component ───────────────────────────────────────────────────────────────

export function AlternatingSteps({ headline, headlineBold, intro, steps }: AlternatingStepsProps) {
  return (
    <section className="section-padding bg-canvas">
      <div className="max-w-content mx-auto px-6">
        {/* Header */}
        <FadeIn className="mb-16 lg:mb-20 max-w-2xl">
          <h2
            className="display-heading text-ink mb-4"
            style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', lineHeight: 1.1 }}
          >
            {headline}
            {headlineBold && <span className="not-italic"> {headlineBold}</span>}
          </h2>
          {intro && (
            <p className="text-sm text-muted leading-snug max-w-lg">{intro}</p>
          )}
        </FadeIn>

        {/* Steps */}
        <div className="space-y-12 lg:space-y-0">
          {steps.map((step, i) => {
            const isEven = i % 2 === 0;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${i > 0 ? 'lg:pt-12' : ''} ${i < steps.length - 1 ? 'lg:pb-12 lg:border-b lg:border-mist' : ''}`}
              >
                {/* Text side */}
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-ink text-white text-xs font-bold">
                      {step.label.replace(/[^0-9]/g, '') || String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs text-faint font-medium uppercase tracking-wider">
                      {step.label}
                    </span>
                  </div>

                  <h3
                    className="font-bold text-ink mb-3"
                    style={{ fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', lineHeight: 1.15, letterSpacing: '-0.015em' }}
                  >
                    {step.title}
                  </h3>

                  <p className="text-sm text-muted leading-snug" style={{ maxWidth: '38ch' }}>
                    {step.body}
                  </p>
                </div>

                {/* Visual side */}
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  {step.visual ? (
                    <div className="bg-surface/80 border border-mist rounded-2xl p-6 lg:p-8">
                      {step.visual}
                    </div>
                  ) : (
                    <div className="bg-surface/60 border border-mist rounded-2xl aspect-[4/3] flex items-center justify-center">
                      <span className="text-5xl font-bold text-mist">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
