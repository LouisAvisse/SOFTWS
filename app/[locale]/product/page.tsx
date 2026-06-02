import React from 'react';
import { getTranslations } from 'next-intl/server';
import { Brain, Navigation, BarChart3, MessageSquare, Sparkles, FileText, Search, Map, Star, Zap, Shield, TrendingUp, Users } from 'lucide-react';

import { PRODUCT_ILLUSTRATIONS, type ProductSlug } from '@/lib/content/products';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { ThreePillars } from '@/components/sections/ThreePillars';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { AlternatingSteps } from '@/components/sections/AlternatingSteps';
import { DarkCard } from '@/components/sections/DarkCard';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { ProductStackIllustration } from '@/components/ui/ProductStackIllustration';
import { LearningLoop } from '@/components/ui/LearningLoop';
import { PathComparisonCard } from '@/components/ui/PathComparisonCard';
import { AnalyticsDashboard } from '@/components/ui/AnalyticsDashboard';
import { IllustrationBySlug } from '@/components/illustrations/IllustrationBySlug';

// ─── Types ────────────────────────────────────────────────────────────────────
type FeatureRaw = { title: string; body: string; slug: string };
type StepRaw = { label: string; title: string; body: string };
type WhyItemRaw = { title: string; body: string };
type FAQRaw = { question: string; answer: string };

// Bento lg/md pattern: items at index 0,3,4,7 are 'lg' (span-2)
const LG_INDICES = new Set([0, 3, 4, 7]);

const STEP_ICONS = [MessageSquare, Sparkles, FileText, Search, Map, Star];
const WHY_ICONS = [Zap, Shield, TrendingUp, Users];
const PILLAR_ICONS = [Brain, Navigation, BarChart3] as const;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'product.overview' });

  // Raw data
  const pillarsRaw = t.raw('pillars.items') as { title: string; body: string }[];
  const nodes = t.raw('learningLoop.nodes') as { label: string }[];
  const featuresRaw = t.raw('features.items') as FeatureRaw[];
  const stepsRaw = t.raw('howItWorks.steps') as StepRaw[];
  const standards = t.raw('standards.items') as string[];
  const whyChooseRaw = t.raw('whyChoose.items') as WhyItemRaw[];
  const faqItems = t.raw('faq.items') as FAQRaw[];

  // Assembled pillars — render icons as ReactNode so they're serializable
  const pillarIconNodes = [
    <Brain key="brain" className="w-5 h-5 text-white" />,
    <Navigation key="nav" className="w-5 h-5 text-white" />,
    <BarChart3 key="chart" className="w-5 h-5 text-white" />,
  ];
  const pillars: [
    { icon: React.ReactNode; title: string; body: string },
    { icon: React.ReactNode; title: string; body: string },
    { icon: React.ReactNode; title: string; body: string },
  ] = [
    { icon: pillarIconNodes[0], title: pillarsRaw[0]?.title ?? '', body: pillarsRaw[0]?.body ?? '' },
    { icon: pillarIconNodes[1], title: pillarsRaw[1]?.title ?? '', body: pillarsRaw[1]?.body ?? '' },
    { icon: pillarIconNodes[2], title: pillarsRaw[2]?.title ?? '', body: pillarsRaw[2]?.body ?? '' },
  ];

  // Bento items
  const bentoItems = featuresRaw.map((item, i) => ({
    title: item.title,
    body: item.body,
    href: `/product/${item.slug}`,
    size: (LG_INDICES.has(i) ? 'lg' : 'md') as 'lg' | 'md',
    visual: LG_INDICES.has(i) ? (
      <IllustrationBySlug
        name={PRODUCT_ILLUSTRATIONS[item.slug as ProductSlug] ?? ''}
        className="h-16 opacity-60"
      />
    ) : undefined,
  }));

  // Sticky scroll steps
  const steps = stepsRaw.map((step, i) => {
    const Icon = STEP_ICONS[i] ?? MessageSquare;
    return {
      label: step.label,
      title: step.title,
      body: step.body,
      visual: (
        <div className="bg-mist rounded-lg p-5 inline-flex items-center justify-center">
          <Icon className="h-10 w-10 text-body" />
        </div>
      ),
    };
  });

  // Feature grid items
  const featureGridItems = whyChooseRaw.map((item, i) => ({
    icon: WHY_ICONS[i] ?? Zap,
    title: item.title,
    body: item.body,
  }));

  // Standards for marquee: duplicate for seamless loop
  const standardsDouble = [...standards, ...standards];

  return (
    <>
      {/* 1 — Hero */}
      <HeroSplit
        label={t('hero.label')}
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/use-cases' }}
        visual={<ProductStackIllustration />}
      />

      {/* 2 — Three Pillars */}
      <ThreePillars pillars={pillars} />

      {/* 3 — Learning Loop */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {t('learningLoop.label')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink mb-3">
              {t('learningLoop.headline')}
            </h2>
            <p className="text-base text-muted max-w-md mx-auto">
              {t('learningLoop.headlineBold')}
            </p>
          </FadeIn>
          <div className="h-96 max-w-xl mx-auto">
            <LearningLoop nodes={nodes} />
          </div>
        </div>
      </section>

      {/* 4 — Feature Bento (8 products) */}
      <section className="pt-24 lg:pt-32 pb-0 bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {t('bento.label')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink">
              {t('bento.headline')}
            </h2>
          </FadeIn>
        </div>
      </section>
      <BentoGrid items={bentoItems} columns={3} />

      {/* 5 — How Soft Works */}
      <AlternatingSteps headline={t('howItWorks.headline')} steps={steps} />

      {/* 6 — Static vs Adaptive Comparison */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {t('comparison.label')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink">
              {t('comparison.headline')}
            </h2>
          </FadeIn>
          <PathComparisonCard />
        </div>
      </section>

      {/* 7 — Methodology Marquee */}
      <section className="py-16 bg-canvas border-y border-line overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 items-center">
          {standardsDouble.map((item, i) => (
            <span key={i} className="text-sm font-medium text-faint whitespace-nowrap">
              {item}
              {i < standardsDouble.length - 1 && (
                <span className="ml-16 text-line">·</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* 8 — Analytics Dashboard */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {t('analytics.label')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink mb-3">
              {t('analytics.headline')}
            </h2>
            <p className="text-base text-muted">{t('analytics.headlineBold')}</p>
          </FadeIn>
          <AnalyticsDashboard />
        </div>
      </section>

      {/* 9 — Enterprise Dark Card */}
      <DarkCard
        headline={t('enterprise.headline')}
        headlineBold={t('enterprise.headlineBold')}
        body={t('enterprise.body')}
      />

      {/* 10 — Why Organizations Choose Soft */}
      <FeatureGrid
        headline={t('whyChoose.headline')}
        features={featureGridItems}
        columns={2}
      />

      {/* 11 — FAQ */}
      <FAQAccordion headline={t('faq.headline')} faqs={faqItems} />

      {/* 12 — CTA */}
      <CenteredCTA
        variant="island"
        headline={t('cta.headline')}
        subheadline={t('cta.subheadline')}
        primaryCTA={{ text: t('cta.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('cta.secondaryCTA'), href: '/use-cases' }}
      />
    </>
  );
}
