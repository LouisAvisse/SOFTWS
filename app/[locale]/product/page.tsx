import { getTranslations } from 'next-intl/server';
import { Brain, Navigation, BarChart3, MessageSquare, Sparkles, FileText, Search, Map, Star, Zap, Shield, TrendingUp, Users } from 'lucide-react';

import { PRODUCT_ILLUSTRATIONS, type ProductSlug } from '@/lib/content/products';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { ThreePillars } from '@/components/sections/ThreePillars';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { StickyScroll } from '@/components/sections/StickyScroll';
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

  // Assembled pillars
  const pillars: [
    { icon: typeof Brain; title: string; body: string },
    { icon: typeof Navigation; title: string; body: string },
    { icon: typeof BarChart3; title: string; body: string },
  ] = [
    { icon: PILLAR_ICONS[0], title: pillarsRaw[0]?.title ?? '', body: pillarsRaw[0]?.body ?? '' },
    { icon: PILLAR_ICONS[1], title: pillarsRaw[1]?.title ?? '', body: pillarsRaw[1]?.body ?? '' },
    { icon: PILLAR_ICONS[2], title: pillarsRaw[2]?.title ?? '', body: pillarsRaw[2]?.body ?? '' },
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
        <div className="bg-zinc-100 rounded-lg p-5 inline-flex items-center justify-center">
          <Icon className="h-10 w-10 text-zinc-600" />
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
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              How Learning Works
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-3">
              {t('learningLoop.headline')}
            </h2>
            <p className="text-base text-zinc-500 max-w-md mx-auto">
              {t('learningLoop.headlineBold')}
            </p>
          </FadeIn>
          <div className="h-96 max-w-xl mx-auto">
            <LearningLoop nodes={nodes} />
          </div>
        </div>
      </section>

      {/* 4 — Feature Bento (8 products) */}
      <section className="pt-24 lg:pt-32 pb-0 bg-white">
        <div className="container mx-auto">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              The Platform
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
              Eight Tools. One Engine.
            </h2>
          </FadeIn>
        </div>
      </section>
      <BentoGrid items={bentoItems} columns={3} />

      {/* 5 — How Soft Works (StickyScroll) */}
      <StickyScroll headline={t('howItWorks.headline')} steps={steps} />

      {/* 6 — Static vs Adaptive Comparison */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto">
          <FadeIn className="max-w-2xl mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Why It Works
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
              Stop Training Everyone the Same Way.
            </h2>
          </FadeIn>
          <PathComparisonCard />
        </div>
      </section>

      {/* 7 — Methodology Marquee */}
      <section className="py-16 bg-white border-y border-zinc-200 overflow-hidden">
        <div className="flex w-max animate-marquee gap-16 items-center">
          {standardsDouble.map((item, i) => (
            <span key={i} className="text-sm font-medium text-zinc-400 whitespace-nowrap">
              {item}
              {i < standardsDouble.length - 1 && (
                <span className="ml-16 text-zinc-200">·</span>
              )}
            </span>
          ))}
        </div>
      </section>

      {/* 8 — Analytics Dashboard */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto">
          <FadeIn className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Analytics
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-3">
              {t('analytics.headline')}
            </h2>
            <p className="text-base text-zinc-500">{t('analytics.headlineBold')}</p>
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
        headline="Why Organizations Choose Soft"
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
