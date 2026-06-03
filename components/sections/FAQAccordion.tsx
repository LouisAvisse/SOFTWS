'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { FadeIn } from '@/components/motion/FadeIn';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  headline: string;
  faqs: FAQ[];
}

export function FAQAccordion({ headline, faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="section-padding bg-canvas">
      <div className="max-w-content mx-auto px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn className="mb-12">
            <h2 className="text-3xl lg:text-4xl display-heading text-ink">
              {headline}
            </h2>
          </FadeIn>

          <div className="divide-y divide-line">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                  aria-expanded={open === i}
                >
                  <span className="font-medium text-base text-ink pr-8">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 text-faint"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <p className="text-[15px] text-body leading-snug pb-5">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
