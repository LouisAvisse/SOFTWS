import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Users, Zap, BarChart3, Target, Shield, RefreshCw } from 'lucide-react';

import { routing } from '@/i18n/routing';
import { USE_CASE_SLUGS, type UseCaseSlug } from '@/lib/content/use-cases';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { StickyScroll } from '@/components/sections/StickyScroll';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { UseCaseMockupCard } from '@/components/ui/UseCaseMockupCard';

// ─── Types ────────────────────────────────────────────────────────────────────

type BentoRaw = { title: string; body: string };
type FeatureRaw = { title: string; body: string };
type StepRaw = { label: string; title: string; body: string };
type MetricRaw = { value: string; label: string; description: string };
type FAQRaw = { question: string; answer: string };
type HeroMockup = { scenario: string; metric1Label: string; metric1Value: string; metric2Label: string; metric2Value: string };

const FEATURE_ICONS = [Users, Zap, BarChart3, Target, Shield, RefreshCw] as const;

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    USE_CASE_SLUGS.map((slug) => ({ locale, slug })),
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(USE_CASE_SLUGS as readonly string[]).includes(slug)) return {};
  const t = await getTranslations({ locale, namespace: `useCases.${slug}` });
  return {
    title: `${t('hero.headline')} ${t('hero.headlineBold')} | Soft`,
    description: t('hero.subheadline'),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function UseCasePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  if (!(USE_CASE_SLUGS as readonly string[]).includes(slug)) notFound();

  const t = await getTranslations({ locale, namespace: `useCases.${slug as UseCaseSlug}` });

  const heroMockup = t.raw('heroMockup') as HeroMockup;
  const bentoItems = t.raw('bento.items') as BentoRaw[];
  const featureItems = t.raw('features') as FeatureRaw[];
  const stepItems = t.raw('stickyScroll.steps') as StepRaw[];
  const metricItems = t.raw('metrics.items') as MetricRaw[];
  const faqItems = t.raw('faq.items') as FAQRaw[];
  const enterpriseFeatures: string[] = [];

  const logos = ['Veolia', 'Danone', 'TotalEnergies', 'Michelin', 'Sodexo', 'Edenred', 'Legrand', 'Bouygues']
    .map((name) => ({ name }));

  const bentoGridItems = bentoItems.map((item) => ({
    title: item.title,
    body: item.body,
  }));

  const features = featureItems.map((item, i) => ({
    icon: FEATURE_ICONS[i % FEATURE_ICONS.length],
    title: item.title,
    body: item.body,
  }));

  const steps = stepItems.map((step) => ({
    label: step.label,
    title: step.title,
    body: step.body,
  }));

  return (
    <>
      {/* 1 — Hero */}
      <HeroSplit
        label={t('hero.label')}
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/contact' }}
        visual={
          <UseCaseMockupCard
            scenarioName={heroMockup.scenario}
            metrics={[
              { label: heroMockup.metric1Label, value: parseInt(heroMockup.metric1Value, 10) },
              { label: heroMockup.metric2Label, value: parseInt(heroMockup.metric2Value, 10) },
            ]}
          />
        }
      />

      {/* 2 — Logo Marquee */}
      <LogoMarquee headline={t('logoMarquee.headline')} logos={logos} />

      {/* 3 — Bento Grid */}
      <BentoGrid items={bentoGridItems} columns={3} />

      {/* 4 — Feature Highlight + Feature Grid */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto">
          <FadeIn className="mb-14 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900 mb-4">
              {t('featureHighlight.headline')}{' '}
              <em className="italic">{t('featureHighlight.headlineBold')}</em>
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">
              {t('featureHighlight.body')}
            </p>
          </FadeIn>
        </div>
      </section>
      <FeatureGrid features={features} columns={3} />

      {/* 5 — Sticky Scroll */}
      <StickyScroll
        headline={t('stickyScroll.headline')}
        intro={t('stickyScroll.intro')}
        steps={steps}
      />

      {/* 6 — Metrics */}
      <MetricScorecard
        headline={t('metrics.headline')}
        metrics={metricItems}
        columns={4}
      />

      {/* 7 — Enterprise Dark Card */}
      <DarkCard
        headline={t('enterprise.headline')}
        headlineBold={t('enterprise.headlineBold')}
        body={t('enterprise.body')}
        features={enterpriseFeatures}
      />

      {/* 8 — FAQ */}
      <FAQAccordion headline={t('faq.headline')} faqs={faqItems} />

      {/* 9 — CTA */}
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
