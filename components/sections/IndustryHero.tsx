import { type ReactNode } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';

/* ============================================================================
   IndustryHero — the header for the Industries area.

   • variant="full" (the /industries overview only): a two-column illustrated
     hero — editorial headline + CTAs on the left, the IndustryMosaic on the
     right.
   • variant="slim" (every industry sub-page): a compact header band — an
     industry icon chip + label, a tighter headline, sub, and CTAs. No big
     illustration, so the five sub-pages stop opening identically and the real
     content rises up the page. Each page is distinguished by its own icon.

   Replaces HeroSplit on these pages (which also removes its EU-flag hydration
   bug). Hero copy is the only text this component owns.
============================================================================ */

interface CTA { text: string; href: string }

interface IndustryHeroProps {
  variant?: 'slim' | 'full';
  eyebrow: string;
  headline: string;
  headlineBold: string;
  subheadline: string;
  primaryCTA: CTA;
  secondaryCTA: CTA;
  icon?: LucideIcon;
  visual?: ReactNode;
}

function IconChip({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15">
      <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
    </span>
  );
}

function Eyebrow({ icon, label }: { icon?: LucideIcon; label: string }) {
  return (
    <div className="mb-6 inline-flex items-center gap-2.5">
      {icon && <IconChip icon={icon} />}
      <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
        {label}
      </span>
    </div>
  );
}

function Ctas({ primaryCTA, secondaryCTA }: { primaryCTA: CTA; secondaryCTA: CTA }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <Button asChild size="lg">
        <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
      </Button>
      <Button asChild variant="architectural" size="lg">
        <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
      </Button>
    </div>
  );
}

export function IndustryHero({
  variant = 'slim',
  eyebrow,
  headline,
  headlineBold,
  subheadline,
  primaryCTA,
  secondaryCTA,
  icon,
  visual,
}: IndustryHeroProps) {
  if (variant === 'full') {
    return (
      <section className="relative overflow-hidden border-b border-line bg-canvas pt-32 pb-16 lg:pt-36 lg:pb-20">
        <div className="mx-auto grid max-w-content items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <FadeIn>
            <Eyebrow icon={icon} label={eyebrow} />
            <h1
              className="display-heading text-ink"
              style={{ fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)', lineHeight: 1.06 }}
            >
              {headline} <em className="not-italic">{headlineBold}</em>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted lg:text-lg">
              {subheadline}
            </p>
            <Ctas primaryCTA={primaryCTA} secondaryCTA={secondaryCTA} />
          </FadeIn>
          {visual && (
            <FadeIn delay={0.1} className="relative">
              <div className="mx-auto w-full max-w-md">{visual}</div>
            </FadeIn>
          )}
        </div>
      </section>
    );
  }

  // slim
  return (
    <section className="relative border-b border-line bg-canvas pt-32 pb-14 lg:pt-36 lg:pb-16">
      <div className="mx-auto max-w-content px-6">
        <FadeIn className="max-w-3xl">
          <Eyebrow icon={icon} label={eyebrow} />
          <h1
            className="display-heading text-ink"
            style={{ fontSize: 'clamp(2rem, 3.6vw, 3.05rem)', lineHeight: 1.08 }}
          >
            {headline} <em className="not-italic">{headlineBold}</em>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted lg:text-lg">
            {subheadline}
          </p>
          <Ctas primaryCTA={primaryCTA} secondaryCTA={secondaryCTA} />
        </FadeIn>
      </div>
    </section>
  );
}
