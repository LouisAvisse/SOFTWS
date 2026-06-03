'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
  /** Compliance credential chip shown above the headline. Links to the
      certifications section; the whole pill is the click target. */
  compliance: { text: string; flagAlt: string; learnMore: string; href: string };
  /** Trust chip shown above the client logo strip. The brand name is a logo. */
  trust: { prefix: string; logoAlt: string; suffix: string };
}

// ─── EU flag, drawn as a crisp circular badge ─────────────────────────────────
// Twelve gold stars on the EU blue, clipped to a circle so it reads as a flag
// even at chip scale (an emoji would render inconsistently across platforms).
const EU_STAR =
  'M12,4 L12.353,5.015 L13.427,5.037 L12.571,5.685 L12.882,6.714 ' +
  'L12,6.1 L11.118,6.714 L11.429,5.685 L10.573,5.037 L11.647,5.015 Z';

function EUFlag({ title, className }: { title: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" role="img" aria-label={title} className={className}>
      <circle cx="12" cy="12" r="12" fill="#003399" />
      <g fill="#FFCC00">
        {Array.from({ length: 12 }).map((_, i) => (
          <path key={i} d={EU_STAR} transform={`rotate(${i * 30} 12 12)`} />
        ))}
      </g>
    </svg>
  );
}

// ─── Compliance chip ──────────────────────────────────────────────────────────
// Sits above the headline as a quiet credential and links to the certifications
// section. The whole pill is the click target; the trailing "Learn more ›" is
// the affordance, its chevron nudging on hover. Shares the trust chip's pill
// language so the top and bottom of the hero rhyme; the flag carries the color.
function ComplianceChip({ text, flagAlt, learnMore, href }: HeroVoiceProps['compliance']) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 rounded-full border border-line bg-white/80
        py-1 pl-1 pr-3.5 text-[0.8rem] font-medium text-body
        shadow-[0_1px_2px_rgba(42,37,32,0.05)]
        transition-all duration-200 ease-out
        hover:-translate-y-px hover:border-edge hover:bg-white hover:shadow-[0_4px_14px_rgba(42,37,32,0.08)]
        motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Flag as a minted coin: a hairline rim defines its edge on the pill. */}
      <span className="grid h-[1.45rem] w-[1.45rem] shrink-0 place-items-center rounded-full ring-1 ring-inset ring-black/[0.07]">
        <EUFlag title={flagAlt} className="h-full w-full" />
      </span>
      <span>{text}</span>
      <span aria-hidden className="h-3.5 w-px bg-edge/70" />
      <span className="inline-flex items-center gap-0.5 text-brand">
        {learnMore}
        <ChevronRight
          className="h-3.5 w-3.5 transition-transform duration-200 ease-out
            group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
        />
      </span>
    </Link>
  );
}

// ─── Trust chip ───────────────────────────────────────────────────────────────
// "Trusted by [Incenteev logo] clients" — a quiet, raised pill that introduces
// the customer strip. The logo is a placeholder (see public/logo/incenteev/).
function TrustChip({ prefix, logoAlt, suffix }: HeroVoiceProps['trust']) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80
        px-3.5 py-1.5 text-[0.8rem] font-medium text-muted
        shadow-[0_1px_2px_rgba(42,37,32,0.05)]"
    >
      {prefix}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo/incenteev/incenteev.svg" alt={logoAlt} className="h-3.5 w-auto" />
      {suffix}
    </span>
  );
}

export function HeroVoice({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  characterSrc,
  characterAlt,
  compliance,
  trust,
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
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 lg:pt-36">
        {/* ── Copy ── */}
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            custom={0}
            variants={rise}
            initial={initial}
            animate="show"
            className="mb-6 flex justify-center"
          >
            <ComplianceChip {...compliance} />
          </motion.div>

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
        <motion.div
          custom={3}
          variants={rise}
          initial={initial}
          animate="show"
          className="relative flex flex-col items-center gap-7 pb-16 pt-2 lg:pb-20"
        >
          <TrustChip {...trust} />
          <TrustLogos />
        </motion.div>
      </div>
    </section>
  );
}
