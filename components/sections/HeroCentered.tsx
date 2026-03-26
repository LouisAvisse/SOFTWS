'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroCenteredProps {
  label: string;
  headline: string;
  headlineBold: string;
  subheadline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  backgroundVariant?: 'clean' | 'mesh';
  scrollLabel?: string;
}

function MeshBackground() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-40 pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <pattern id="mesh-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="currentColor" className="text-zinc-300" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mesh-grid)" />
    </svg>
  );
}

export function HeroCentered({
  label, headline, headlineBold, subheadline,
  primaryCTA, secondaryCTA,
  backgroundVariant = 'clean',
  scrollLabel = 'Scroll to explore',
}: HeroCenteredProps) {
  return (
    <section className="relative overflow-hidden bg-white pt-40 pb-24 text-center">
      {backgroundVariant === 'mesh' && <MeshBackground />}

      <div className="container mx-auto relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ willChange: 'transform, opacity' }}
          >
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-6">
              {label}
            </p>
            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-6">
              {headline}{' '}
              <span className="italic">{headlineBold}</span>
            </h1>
            <p className="text-base lg:text-lg text-zinc-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              {subheadline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
              <Button variant="architectural" size="lg" asChild>
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-col items-center gap-1 text-zinc-400 text-xs"
          >
            <span className="tracking-widest uppercase">{scrollLabel}</span>
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
