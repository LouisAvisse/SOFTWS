'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Soundwave } from '@/components/ui/Soundwave';
import { TrustLogos } from '@/components/ui/TrustLogos';

// ─── Entrance choreography ────────────────────────────────────────────────────
// Content is server-rendered and visible by default; this only adds a soft
// rise on load. Reduced-motion users get the static end state (see variants).
const EASE = [0.16, 1, 0.3, 1] as const;
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE, delay: 0.05 + i * 0.08 },
  }),
};

// Headline reveal: each word un-blurs and settles in, staggered left→right.
const headlineContainer = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.07 } },
};
const headlineWord = {
  hidden: { opacity: 0, y: 6, filter: 'blur(12px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: EASE },
  },
};

interface HeroVoiceProps {
  headline: string;
  subheadline: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA: { text: string; href: string };
  /** Transparent-background cutout of the speaker. */
  characterSrc: string;
  characterAlt: string;
}

export function HeroVoice({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  characterSrc,
  characterAlt,
}: HeroVoiceProps) {
  // Reduced-motion users start in the resolved (visible) state — no entrance.
  const reduce = useReducedMotion();
  const initial = reduce ? 'show' : 'hidden';
  const fadeInitial = reduce ? { opacity: 1 } : { opacity: 0 };

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: 'var(--hero-bg)' }}
    >
      <div className="relative mx-auto max-w-7xl px-6 pt-32 lg:pt-36">
        {/* ── Copy ── */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
            variants={headlineContainer}
            initial={initial}
            animate="show"
            className="mx-auto font-serif font-normal"
            style={{
              color: 'var(--hero-headline)',
              fontSize: 'clamp(2.3rem, 4vw, 3.6rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.018em',
            }}
          >
            {headline.split(' ').map((w, i) => (
              <motion.span
                key={`${w}-${i}`}
                variants={headlineWord}
                className="inline-block"
                style={{ marginRight: '0.22em', willChange: 'filter, transform, opacity' }}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            custom={1}
            variants={rise}
            initial={initial}
            animate="show"
            className="mx-auto mt-7 max-w-xl text-pretty"
            style={{
              color: 'var(--hero-sub)',
              fontSize: 'clamp(1rem, 1.15vw, 1.12rem)',
              lineHeight: 1.65,
            }}
          >
            {subheadline}
          </motion.p>

          <motion.div
            custom={2}
            variants={rise}
            initial={initial}
            animate="show"
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Button
              asChild
              variant="architectural"
              className="rounded-lg px-5 py-3 text-[0.95rem] font-semibold"
            >
              <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
            </Button>
            <Button
              asChild
              className="rounded-lg px-5 py-3 text-[0.95rem] font-semibold"
            >
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
          </motion.div>
        </div>

        {/* ── Soundwave + speaker ── */}
        <motion.div
          initial={fadeInitial}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.35 }}
          className="relative mx-auto mt-8 lg:mt-10"
          style={{ height: 'clamp(300px, 28vw, 414px)' }}
        >
          {/* Wave sits behind, centred on the speaker's mid-line. */}
          <div className="absolute inset-x-0 top-[52%] -translate-y-1/2">
            <div
              className="mx-auto"
              style={{ maxWidth: '1110px', height: 'clamp(148px, 15vw, 212px)' }}
            >
              <Soundwave barCount={40} />
            </div>
          </div>

          {/* Speakers in front, standing on the baseline, feet fading out.
              aspectRatio matches the source asset (882×1024 ≈ 0.861) so the
              figures fill the box at full size instead of being letterboxed. */}
          <div className="absolute inset-0 flex items-end justify-center">
            <div
              className="relative h-full"
              style={{
                aspectRatio: '0.861',
                maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 88%, transparent 100%)',
              }}
            >
              <Image
                src={characterSrc}
                alt={characterAlt}
                fill
                priority
                sizes="(max-width: 768px) 80vw, 460px"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </motion.div>

        {/* ── Trust strip ── */}
        <div className="relative pb-16 pt-2 lg:pb-20">
          <TrustLogos />
        </div>
      </div>
    </section>
  );
}
