import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { TrendingUp, Award, Headphones, BookOpen, Network } from 'lucide-react';
import type { ElementType } from 'react';

import { USE_CASE_SLUGS, USE_CASE_ICONS, type UseCaseSlug } from '@/lib/content/use-cases';
import { HeroCentered } from '@/components/sections/HeroCentered';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';

// ─── Icon resolution ──────────────────────────────────────────────────────────

const ICON_MAP: Record<string, ElementType> = {
  TrendingUp,
  Award,
  Headphones,
  BookOpen,
  Network,
};

// ─── Types ────────────────────────────────────────────────────────────────────

type CardRaw = { role: string; body: string; cta: string; href: string };

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'useCases.overview' });
  return {
    title: `${t('hero.headline')} ${t('hero.headlineBold')} | Soft`,
    description: t('hero.subheadline'),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UseCasesOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'useCases.overview' });

  const cards = t.raw('cards') as CardRaw[];

  // Map cards → BentoGrid items with icons and sizing (2 lg + 3 md)
  const bentoItems = cards.map((card, i) => {
    const slug = USE_CASE_SLUGS[i] as UseCaseSlug;
    const iconName = USE_CASE_ICONS[slug];
    const Icon = ICON_MAP[iconName];
    return {
      title: card.role,
      body: card.body,
      icon: Icon,
      href: card.href,
      size: (i < 2 ? 'lg' : 'md') as 'lg' | 'md',
      visual: (
        <p className="text-sm font-medium text-zinc-900 mt-4">
          {card.cta} →
        </p>
      ),
    };
  });

  return (
    <>
      {/* 1 — Hero */}
      <HeroCentered
        label={t('hero.label')}
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/signup' }}
        backgroundVariant="mesh"
      />

      {/* 2 — Bridge section */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1050px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-5xl mx-auto">
            <FadeIn direction="left">
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.08]">
                {t('bridge.headline')}{' '}
                <em className="italic">{t('bridge.headlineBold')}</em>
              </h2>
            </FadeIn>
            <FadeIn direction="right">
              <p className="text-base lg:text-lg text-zinc-600 leading-relaxed">
                {t('bridge.body')}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3 — Bento Grid (5 use case cards) */}
      <BentoGrid items={bentoItems} columns={3} />

      {/* 4 — Closing CTA */}
      <CenteredCTA
        variant="island"
        headline={t('closing.headline')}
        headlineBold={t('closing.headlineBold')}
        subheadline={t('closing.body')}
        primaryCTA={{ text: t('closing.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('closing.secondaryCTA'), href: '/signup' }}
      />
    </>
  );
}
