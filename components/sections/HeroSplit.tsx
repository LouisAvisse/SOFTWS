'use client';

import { type ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

// ─── Animation helpers ───────────────────────────────────────────────────────

const EASE = [0.16, 1, 0.3, 1] as const;
function d(step: number) { return step * 0.09; }

// ─── Props ───────────────────────────────────────────────────────────────────

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

// ─── EU flag SVG ─────────────────────────────────────────────────────────────

function EUFlag() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="rounded-full flex-shrink-0">
      <circle cx="10" cy="10" r="10" fill="#003399" />
      {/* 12 stars in a circle */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 - 90) * (Math.PI / 180);
        const cx = 10 + 6 * Math.cos(angle);
        const cy = 10 + 6 * Math.sin(angle);
        return (
          <polygon
            key={i}
            points={[0, 1, 2, 3, 4].map((j) => {
              const a = ((j * 144 - 90) * Math.PI) / 180;
              return `${cx + 1.3 * Math.cos(a)},${cy + 1.3 * Math.sin(a)}`;
            }).join(' ')}
            fill="#FFCC00"
          />
        );
      })}
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export function HeroSplit({
  label, headline, headlineBold, subheadline,
  primaryCTA, secondaryCTA, visual, microcopy,
}: HeroSplitProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F8F8F6 0%, #FDFDFB 50%, #FFFFFF 100%)',
      }}
    >
      {/* ═══ Desktop / Tablet (md+) ═══ */}
      <div
        className="hidden md:block relative"
        style={{ paddingTop: 'clamp(8rem, 14vh, 11rem)', paddingBottom: 0 }}
      >
        {/* Text column — 720px centered */}
        <div className="mx-auto px-6 text-center" style={{ maxWidth: '720px' }}>

          {/* 1 — Eyebrow badge with EU flag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: d(0) }}
            className="mb-5 flex justify-center"
          >
            <span
              className="inline-flex items-center gap-2 uppercase font-medium rounded-full"
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                padding: '5px 16px 5px 5px',
                background: 'rgba(0,0,0,0.04)',
                color: '#666',
              }}
            >
              <EUFlag />
              {label}
            </span>
          </motion.div>

          {/* 2 — Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: d(1) }}
            className="text-zinc-900"
            style={{
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              lineHeight: 1.06,
              letterSpacing: '-0.025em',
              fontWeight: 700,
              marginBottom: '24px',
            }}
          >
            {headline}<br />
            <span style={{ fontWeight: 800 }}>{headlineBold}</span>
          </motion.h1>

          {/* 3 — Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: d(2) }}
            style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.12rem)',
              lineHeight: 1.7,
              color: '#6B6B6B',
              maxWidth: '520px',
              margin: '0 auto',
              marginBottom: '36px',
            }}
          >
            {subheadline}
          </motion.p>

          {/* 4 — CTA cluster */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: d(3) }}
            className="flex flex-wrap items-center justify-center"
            style={{ gap: '12px' }}
          >
            <Button
              asChild
              className="rounded-md font-semibold"
              style={{ fontSize: '0.9rem', padding: '13px 30px' }}
            >
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            <Button
              variant="architectural"
              asChild
              className="rounded-md font-medium"
              style={{
                fontSize: '0.9rem',
                padding: '13px 30px',
                border: '1px solid rgba(0,0,0,0.18)',
                background: 'transparent',
                color: '#1a1a1a',
              }}
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          </motion.div>

          {/* 5a — Microcopy */}
          {microcopy && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: EASE, delay: d(4) }}
              className="text-zinc-400 mt-3"
              style={{ fontSize: '0.78rem' }}
            >
              {microcopy}
            </motion.p>
          )}

        </div>

        {/* 6 — Product visual — wider than text column */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: d(6) + 0.1 }}
          className="mx-auto px-6"
          style={{ maxWidth: '1000px', marginTop: '56px' }}
        >
          {/* Soft glow behind the mockup */}
          <div className="relative">
            <div
              className="absolute inset-x-0 -top-12 h-48 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(0,0,0,0.03) 0%, transparent 70%)',
              }}
            />
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '16px 16px 0 0',
                border: '1px solid #e5e5e5',
                borderBottom: 'none',
                boxShadow: '0 32px 80px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.04)',
              }}
            >
              {visual}
              {/* Bottom fade transition seamlessly smoothing the bottom crop into the next section */}
              <div 
                className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
                style={{ 
                  height: '160px', 
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)' 
                }} 
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══ Mobile (<md) ═══ */}
      <div
        className="md:hidden relative"
        style={{ paddingTop: 'calc(64px + 28px)', paddingBottom: 0 }}
      >
        <div className="px-5">
          {/* Eyebrow with EU flag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: d(0) }}
            className="mb-4"
          >
            <span
              className="inline-flex items-center gap-2 uppercase font-medium rounded-full"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.12em',
                padding: '4px 14px 4px 4px',
                background: 'rgba(0,0,0,0.04)',
                color: '#666',
              }}
            >
              <EUFlag />
              {label}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: d(1) }}
            className="text-zinc-900 mb-4"
            style={{
              fontSize: 'clamp(2rem, 8vw, 3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            {headline} <span style={{ fontWeight: 800 }}>{headlineBold}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: d(2) }}
            className="mb-7"
            style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#6B6B6B' }}
          >
            {subheadline}
          </motion.p>

          {/* CTAs — stacked full-width */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: d(3) }}
            className="flex flex-col gap-3"
          >
            <Button
              asChild
              className="rounded-md font-semibold w-full justify-center"
              style={{ fontSize: '0.9rem', padding: '14px 24px' }}
            >
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
            <Button
              variant="architectural"
              asChild
              className="rounded-md font-medium w-full justify-center"
              style={{
                fontSize: '0.9rem',
                padding: '14px 24px',
                border: '1px solid rgba(0,0,0,0.18)',
                background: 'transparent',
                color: '#1a1a1a',
              }}
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
          </motion.div>

          {microcopy && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: d(4) }}
              className="text-zinc-400 mt-3 text-center"
              style={{ fontSize: '0.75rem' }}
            >
              {microcopy}
            </motion.p>
          )}

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: d(6) }}
            className="mt-10"
          >
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: '10px 10px 0 0',
                border: '1px solid #e5e5e5',
                borderBottom: 'none',
                boxShadow: '0 16px 48px rgba(0,0,0,0.06)',
              }}
            >
              {visual}
              {/* Bottom fade transition seamlessly smoothing the bottom crop into the next section */}
              <div 
                className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
                style={{ 
                  height: '120px', 
                  background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, #FFFFFF 100%)' 
                }} 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
