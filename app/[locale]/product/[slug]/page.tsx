import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  Users, Zap, BarChart3, Target, Shield, RefreshCw,
  MessageSquare, Presentation, Route, UserCheck, Sparkles, type LucideIcon,
} from 'lucide-react';

import { routing } from '@/i18n/routing';
import { PRODUCT_SLUGS, type ProductSlug } from '@/lib/content/products';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { AlternatingSteps } from '@/components/sections/AlternatingSteps';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { IndustryHero } from '@/components/sections/IndustryHero';

// ─── Types ────────────────────────────────────────────────────────────────────

type StepRaw = { label: string; title: string; body: string };
type CapabilityRaw = { title: string; body: string };
type ValueRaw = { value: string; label: string; description: string };
type FAQRaw = { question: string; answer: string };

const CAP_ICONS = [Users, Zap, BarChart3, Target, Shield, RefreshCw] as const;

// Per-product hero icon (mirrors the navbar's product iconography) so each
// sub-page opens with its own mark in the slim hero, like the industry pages.
const PRODUCT_HERO_ICONS: Record<ProductSlug, LucideIcon> = {
  'conversation-roleplay': MessageSquare,
  'pitch-practice': Presentation,
  'personalized-feedback': UserCheck,
  'adaptive-reinforcement': RefreshCw,
  'adaptive-journeys': Route,
  'skill-constellations': Sparkles,
  'conversation-intelligence': BarChart3,
  'role-readiness-builder': Shield,
};

// ─── Static params ────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    PRODUCT_SLUGS.map((slug) => ({ locale, slug })),
  );
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(PRODUCT_SLUGS as readonly string[]).includes(slug)) return {};
  const t = await getTranslations({ locale, namespace: `product.${slug}` });
  return {
    title: `${t('hero.headline')} ${t('hero.headlineBold')} | Soft`,
    description: t('hero.subheadline'),
  };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(PRODUCT_SLUGS as readonly string[]).includes(slug)) notFound();

  const t = await getTranslations({ locale, namespace: `product.${slug as ProductSlug}` });
  const tc = await getTranslations({ locale, namespace: 'common' });

  const stepItems = t.raw('howItWorks.steps') as StepRaw[];
  const capItems = t.raw('capabilities.items') as CapabilityRaw[];
  const valueItems = t.raw('value.items') as ValueRaw[];
  const faqItems = t.raw('faq.items') as FAQRaw[];

  const bentoItems = capItems.map((item, i) => ({
    icon: CAP_ICONS[i % CAP_ICONS.length],
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
        icon={PRODUCT_HERO_ICONS[slug as ProductSlug]}
      />

      {/* 2 — Why It Matters */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl display-heading text-ink leading-[1.08] mb-6">
              {t('whyItMatters.headline')}{' '}
              <em className="not-italic">{t('whyItMatters.headlineBold')}</em>
            </h2>
            <p className="text-base lg:text-lg text-body leading-normal max-w-xl mx-auto">
              {t('whyItMatters.body')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3 — How It Works */}
      <AlternatingSteps headline={t('howItWorks.headline')} steps={steps} />

      {/* 4 — Key Capabilities headline */}
      <section className="pt-24 lg:pt-32 pb-0 bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="mb-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {tc('capabilities')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink">
              {t('capabilities.headline')}
            </h2>
          </FadeIn>
        </div>
      </section>

      {/* 5 — Key Capabilities BentoGrid */}
      <BentoGrid items={bentoItems} columns={3} />

      {/* 6 — Business Value */}
      <MetricScorecard
        headline={t('value.headline')}
        metrics={valueItems}
        columns={4}
      />

      {/* 7 — Enterprise Dark Card */}
      <DarkCard
        headline={t('enterprise.headline')}
        headlineBold={t('enterprise.headlineBold')}
        body={t('enterprise.body')}
      />

      {/* 8 — FAQ */}
      <FAQAccordion headline={t('faq.headline')} faqs={faqItems} />

      {/* 9 — CTA */}
      <CenteredCTA
        variant="island"
        headline={t('cta.headline')}
        subheadline={t('cta.subheadline')}
        primaryCTA={{ text: t('cta.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('cta.secondaryCTA'), href: '/product' }}
      />
    </>
  );
}
