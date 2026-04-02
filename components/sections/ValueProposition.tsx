'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface ValuePropositionProps {
  label: string;
  headline: string;
  headlineItalic: string;
  body: string;
}

export function ValueProposition({
  label,
  headline,
  headlineItalic,
  body,
}: ValuePropositionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const clipReveal = {
    hidden: { clipPath: 'inset(100% 0 0 0)' },
    visible: { clipPath: 'inset(0% 0 0 0)' },
  };

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-[1050px] mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4"
          >
            {label}
          </motion.p>

          {/* Decorative line — draws left → right */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="h-px bg-zinc-200 max-w-[120px] mx-auto mb-8 origin-left"
          />

          {/* Headline — two-line clip reveal */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-6">
            {/* Line 1: "Static Training is Dead." */}
            <motion.span
              variants={clipReveal}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="block"
            >
              {headline}
            </motion.span>

            {/* Line 2: "Soft is Adaptive." with scale landing */}
            <motion.em
              initial={{ clipPath: 'inset(100% 0 0 0)', scale: 0.95 }}
              animate={
                inView
                  ? { clipPath: 'inset(0% 0 0 0)', scale: 1 }
                  : {}
              }
              transition={{
                clipPath: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 },
                scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 },
              }}
              className="block italic"
            >
              {headlineItalic}
            </motion.em>
          </h2>

          {/* Body copy — fadeUp after headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
              delay: 0.7,
            }}
            className="text-base lg:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto"
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
