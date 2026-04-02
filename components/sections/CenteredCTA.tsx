'use client';

import { useRef, type ReactNode, type MouseEvent } from 'react';
import Link from 'next/link';
import { motion, useInView, useMotionValue, useSpring, type Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// ─── Word-stagger variants ───────────────────────────────────────────────────

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      delay: i * 0.07,
    },
  }),
};

// ─── Magnetic button ─────────────────────────────────────────────────────────

function MagneticButton({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15 });
  const springY = useSpring(y, { stiffness: 200, damping: 15 });

  function handleMouseMove(e: MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const clamp = 8;
    const factor = 0.25;
    x.set(Math.max(-clamp, Math.min(clamp, dx * factor)));
    y.set(Math.max(-clamp, Math.min(clamp, dy * factor)));
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

// ─── Staggered headline ──────────────────────────────────────────────────────

function StaggerWords({
  text,
  italicText,
  inView,
  colorClass,
}: {
  text: string;
  italicText?: string;
  inView: boolean;
  colorClass: string;
}) {
  const words = text.split(' ');
  const italicWords = italicText ? italicText.split(' ') : [];
  const totalNormal = words.length;

  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`w-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className={cn('inline-block mr-[0.3em]', colorClass)}
        >
          {word}
        </motion.span>
      ))}
      {italicWords.map((word, i) => (
        <motion.span
          key={`i-${i}`}
          custom={totalNormal + i}
          variants={wordVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className={cn('inline-block mr-[0.3em] italic', colorClass)}
        >
          {word}
        </motion.span>
      ))}
    </>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────

interface CenteredCTAProps {
  headline: string;
  headlineBold?: string;
  subheadline?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  variant?: 'light' | 'dark' | 'island';
}

// ─── Component ───────────────────────────────────────────────────────────────

export function CenteredCTA({
  headline, headlineBold, subheadline,
  primaryCTA, secondaryCTA,
  variant = 'light',
}: CenteredCTAProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isDark = variant === 'dark' || variant === 'island';

  const totalWords = headline.split(' ').length + (headlineBold ? headlineBold.split(' ').length : 0);
  const subDelay = totalWords * 0.07 + 0.15;
  const ctaDelay = subDelay + 0.25;

  if (variant === 'island') {
    return (
      <section ref={ref} className="py-24 lg:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-32 h-32 md:w-64 md:h-64 bg-zinc-800 rounded-full blur-3xl opacity-40 pointer-events-none" />
        <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-24 h-24 md:w-48 md:h-48 bg-zinc-700 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="max-w-[1050px] mx-auto px-6 relative text-center">
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-white">
            <StaggerWords text={headline} italicText={headlineBold} inView={inView} colorClass="text-white" />
          </h2>
          {subheadline && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: subDelay }}
              className="text-base lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto text-zinc-400"
            >
              {subheadline}
            </motion.p>
          )}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: ctaDelay }}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <MagneticButton>
              <Button size="lg" variant="white" asChild>
                <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
              </Button>
            </MagneticButton>
            {secondaryCTA && (
              <MagneticButton>
                <Button size="lg" variant="white-outline" asChild>
                  <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
                </Button>
              </MagneticButton>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className={cn('py-24 lg:py-32', isDark ? 'bg-zinc-950' : 'bg-white')}>
      <div className="max-w-[1050px] mx-auto px-6 text-center">
        <h2 className={cn('text-3xl lg:text-4xl font-semibold tracking-tight mb-4', isDark ? 'text-white' : 'text-zinc-900')}>
          <StaggerWords
            text={headline}
            italicText={headlineBold}
            inView={inView}
            colorClass={isDark ? 'text-white' : 'text-zinc-900'}
          />
        </h2>
        {subheadline && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: subDelay }}
            className={cn('text-base lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto', isDark ? 'text-zinc-400' : 'text-zinc-600')}
          >
            {subheadline}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: ctaDelay }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton>
            <Button size="lg" variant={isDark ? 'white' : 'default'} asChild>
              <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
            </Button>
          </MagneticButton>
          {secondaryCTA && (
            <MagneticButton>
              <Button size="lg" variant={isDark ? 'white-outline' : 'architectural'} asChild>
                <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
              </Button>
            </MagneticButton>
          )}
        </motion.div>
      </div>
    </section>
  );
}
