import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  Users, Zap, BarChart3, Target, Shield, RefreshCw,
  TrendingUp, Award, Headphones, BookOpen, Network, type LucideIcon,
} from 'lucide-react';

import { routing } from '@/i18n/routing';
import { USE_CASE_SLUGS, type UseCaseSlug } from '@/lib/content/use-cases';
import { IndustryHero } from '@/components/sections/IndustryHero';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { CLIENT_LOGOS } from '@/lib/content/clients';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { AlternatingSteps } from '@/components/sections/AlternatingSteps';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';

// ─── Types ────────────────────────────────────────────────────────────────────

type BentoRaw = { title: string; body: string };
type FeatureRaw = { title: string; body: string };
type StepRaw = { label: string; title: string; body: string };
type MetricRaw = { value: string; label: string; description: string };
type FAQRaw = { question: string; answer: string };

const FEATURE_ICONS = [Users, Zap, BarChart3, Target, Shield, RefreshCw] as const;

// Per-use-case hero icon (mirrors the navbar's use-case iconography) so each
// sub-page opens with its own mark in the slim hero, like the industry pages.
const USE_CASE_HERO_ICONS: Record<UseCaseSlug, LucideIcon> = {
  'revenue-teams': TrendingUp,
  'managers-and-leaders': Award,
  'customer-service': Headphones,
  'learning-and-development': BookOpen,
  'partner-enablement': Network,
};

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

  const bentoItems = t.raw('bento.items') as BentoRaw[];
  const featureItems = t.raw('features') as FeatureRaw[];
  const stepItems = t.raw('stickyScroll.steps') as StepRaw[];
  const metricItems = t.raw('metrics.items') as MetricRaw[];
  const faqItems = t.raw('faq.items') as FAQRaw[];
  const enterpriseFeatures: string[] = [];

  const logos = CLIENT_LOGOS.map((logo) => ({
    name: logo.name,
    svg: (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={logo.src} alt={logo.name} loading="lazy" decoding="async" className="h-7 w-auto object-contain" />
    ),
  }));

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
      <IndustryHero
        variant="slim"
        eyebrow={t('hero.label')}
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/contact' }}
        icon={USE_CASE_HERO_ICONS[slug as UseCaseSlug]}
      />

      {/* 2 — Logo Marquee */}
      <LogoMarquee headline={t('logoMarquee.headline')} logos={logos} />

      {/* 3 — Bento Grid */}
      <BentoGrid items={bentoGridItems} columns={3} />

      {/* 4 — Feature Highlight + Feature Grid */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="mb-14 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl display-heading text-ink mb-4">
              {t('featureHighlight.headline')}{' '}
              <em className="not-italic">{t('featureHighlight.headlineBold')}</em>
            </h2>
            <p className="text-base text-body leading-normal">
              {t('featureHighlight.body')}
            </p>
          </FadeIn>
        </div>
      </section>
      <FeatureGrid features={features} columns={3} />

      {/* 5 — Alternating Steps */}
      <AlternatingSteps
        headline={t('stickyScroll.headline')}
        headlineBold={t('stickyScroll.headlineBold')}
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
