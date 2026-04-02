import { getTranslations } from 'next-intl/server';
import { Landmark, Zap, Store, Heart, GraduationCap, Shield, Clock, Globe, Tag, BarChart3 } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { IndustryMosaicIllustration } from '@/components/illustrations/IndustryMosaicIllustration';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { DrawingLine } from '@/components/ui/DrawingLine';

// ─── Types ────────────────────────────────────────────────────────────────────
type CardRaw = { title: string; body: string; href: string; label: string };
type CrossItem = { title: string; body: string };

const CARD_ICONS = [Landmark, Zap, Store, Heart, GraduationCap] as const;
const CROSS_ICONS = [Shield, Clock, Globe, Tag, BarChart3] as const;

// Bento pattern: item0 = 'lg' (span-2), item1 = 'md' → top row
//                items 2-4 = 'md' → bottom row (3-col)
const BENTO_SIZES = ['lg', 'md', 'md', 'md', 'md'] as const;

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function IndustriesOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'industries.overview' });

  const cards = t.raw('cards') as CardRaw[];
  const crossItems = t.raw('crossIndustry.items') as CrossItem[];

  // Bento items for 5 industry cards
  const bentoItems = cards.map((card, i) => ({
    title: card.title,
    body: card.body,
    href: card.href,
    icon: CARD_ICONS[i],
    size: BENTO_SIZES[i] as 'lg' | 'md',
  }));

  return (
    <>
      {/* 1 — Hero */}
      <HeroSplit
        label="INDUSTRIES"
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '#industries' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/contact' }}
        visual={<IndustryMosaicIllustration />}
      />

      {/* 2 — Centered intro */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-6">
              {t('intro.headline')}{' '}
              <em className="italic">{t('intro.headlineBold')}</em>
            </h2>
            <p className="text-base lg:text-lg text-zinc-500 leading-relaxed">
              {t('intro.body')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3 — Industry Bento */}
      <div id="industries">
        <BentoGrid items={bentoItems} columns={3} />
      </div>

      {/* 4 — Cross-Industry capabilities with drawing line */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="mb-4">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Every Industry
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-10">
              Five Capabilities That Cross Every Sector.
            </h2>
          </FadeIn>

          {/* Drawing separator line */}
          <DrawingLine className="w-full h-px mb-10" />

          {/* 5-column feature row */}
          <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {crossItems.map((item, i) => {
              const Icon = CROSS_ICONS[i];
              return (
                <StaggerItem key={i}>
                  <div className="flex flex-col gap-3">
                    <Icon className="h-5 w-5 text-zinc-400" />
                    <h3 className="text-sm font-semibold text-zinc-900">{item.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* 5 — Dark CTA */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.1] mb-4">
              {t('cta.headline')}{' '}
              <em className="italic text-zinc-400">{t('cta.headlineBold')}</em>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed mb-10">
              {t('cta.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="white" size="lg" asChild>
                <Link href="/contact">{t('cta.primaryCTA')}</Link>
              </Button>
              <Button variant="white-outline" size="lg" asChild>
                <Link href="/use-cases">{t('cta.secondaryCTA')}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
