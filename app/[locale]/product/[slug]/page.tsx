import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Users, Zap, BarChart3, Target, Shield, RefreshCw } from 'lucide-react';

import { routing } from '@/i18n/routing';
import { PRODUCT_SLUGS, PRODUCT_ILLUSTRATIONS, type ProductSlug } from '@/lib/content/products';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { AlternatingSteps } from '@/components/sections/AlternatingSteps';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { IllustrationBySlug } from '@/components/illustrations/IllustrationBySlug';

// ─── Types ────────────────────────────────────────────────────────────────────

type StepRaw = { label: string; title: string; body: string };
type CapabilityRaw = { title: string; body: string };
type ValueRaw = { value: string; label: string; description: string };
type FAQRaw = { question: string; answer: string };

const CAP_ICONS = [Users, Zap, BarChart3, Target, Shield, RefreshCw] as const;

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

  const stepItems = t.raw('howItWorks.steps') as StepRaw[];
  const capItems = t.raw('capabilities.items') as CapabilityRaw[];
  const valueItems = t.raw('value.items') as ValueRaw[];
  const faqItems = t.raw('faq.items') as FAQRaw[];

  const illustrationName = PRODUCT_ILLUSTRATIONS[slug as ProductSlug];

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
      <HeroSplit
        label={t('hero.label')}
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/contact' }}
        visual={<IllustrationBySlug name={illustrationName} className="h-64 w-full" />}
      />

      {/* 2 — Why It Matters */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-6">
              {t('whyItMatters.headline')}{' '}
              <em className="italic">{t('whyItMatters.headlineBold')}</em>
            </h2>
            <p className="text-base lg:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
              {t('whyItMatters.body')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 3 — How It Works */}
      <AlternatingSteps headline={t('howItWorks.headline')} steps={steps} />

      {/* 4 — Key Capabilities headline */}
      <section className="pt-24 lg:pt-32 pb-0 bg-white">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="mb-2">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Capabilities
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900">
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
