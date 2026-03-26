'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface HeroSplitProps {
  label: string;
  headline: string;
  headlineBold: string;
  subheadline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  visual: ReactNode;
  microcopy?: string;
}

export function HeroSplit({
  label, headline, headlineBold, subheadline,
  primaryCTA, secondaryCTA, visual, microcopy,
}: HeroSplitProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-24">
      {/* Subtle radial bg */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,theme(colors.zinc.50),transparent)] pointer-events-none" />

      <div className="container mx-auto relative">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
              {label}
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-6">
              {headline}{' '}
              <span className="italic font-bold">{headlineBold}</span>
            </h1>
            <p className="text-base lg:text-lg text-zinc-600 leading-relaxed mb-8 max-w-lg">
              {subheadline}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Button size="lg" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
              <Button variant="architectural" size="lg" asChild>
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            </div>
            {microcopy && (
              <p className="text-sm text-zinc-400">{microcopy}</p>
            )}
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
            style={{ willChange: 'transform, opacity' }}
            className="flex items-center justify-center"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
