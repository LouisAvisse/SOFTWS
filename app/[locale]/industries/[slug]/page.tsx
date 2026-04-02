import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

import { routing } from '@/i18n/routing';
import { INDUSTRY_SLUGS, type IndustrySlug } from '@/lib/content/industries';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { TabSwitcher } from '@/components/sections/TabSwitcher';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { IndustryMosaicIllustration } from '@/components/illustrations/IndustryMosaicIllustration';

// ─── Types ────────────────────────────────────────────────────────────────────
type ChallengeItem = { title: string; body: string };
type PillarItem = { title: string; body: string };
type TabRaw = { label: string; title: string; body: string };
type FeatureItem = { title: string; body: string };
type MetricItem = { value: string; label: string; description: string };
type FAQItem = { question: string; answer: string };

const CHALLENGE_ICONS = [AlertTriangle, AlertCircle, Info] as const;

// ─── Static params ─────────────────────────────────────────────────────────

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    INDUSTRY_SLUGS.map((slug) => ({ locale, slug })),
  );
}

// ─── Metadata ──────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!(INDUSTRY_SLUGS as readonly string[]).includes(slug)) return {};
  const t = await getTranslations({ locale, namespace: `industries.${slug}` });
  return {
    title: `${t('hero.headline')} ${t('hero.headlineBold')} | Soft`,
    description: t('hero.subheadline'),
  };
}

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!(INDUSTRY_SLUGS as readonly string[]).includes(slug)) notFound();

  const t = await getTranslations({ locale, namespace: `industries.${slug as IndustrySlug}` });

  const challengeItems = t.raw('challenge.items') as ChallengeItem[];
  const valuePillars = t.raw('value.pillars') as PillarItem[];
  const tabsRaw = t.raw('roles.tabs') as TabRaw[];
  const featureItems = t.raw('features.items') as FeatureItem[];
  const metricItems = t.raw('metrics.items') as MetricItem[];
  const faqItems = t.raw('faq.items') as FAQItem[];

  // TabSwitcher needs { label, content: ReactNode }
  const tabs = tabsRaw.map((tab) => ({
    label: tab.label,
    content: (
      <div className="max-w-xl">
        <h3 className="text-xl font-semibold text-zinc-900 mb-3">{tab.title}</h3>
        <p className="text-zinc-600 leading-relaxed">{tab.body}</p>
      </div>
    ),
  }));

  // FeatureGrid items need icon prop
  const features = featureItems.map((item, i) => ({
    icon: CHALLENGE_ICONS[i % CHALLENGE_ICONS.length],
    title: item.title,
    body: item.body,
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
        visual={<IndustryMosaicIllustration />}
      />

      {/* 2 — Industry Challenge */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
              {t('challenge.headline')}{' '}
              <em className="italic">{t('challenge.headlineBold')}</em>
            </h2>
            <p className="mt-4 text-base text-zinc-500">{t('challenge.body')}</p>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {challengeItems.map((item, i) => {
              const Icon = CHALLENGE_ICONS[i];
              return (
                <StaggerItem key={i}>
                  <div className="border border-zinc-200 rounded-none p-6 h-full bg-white hover:border-zinc-400 hover:-translate-y-1 transition-all duration-200">
                    <Icon className="h-5 w-5 text-zinc-400 mb-4" />
                    <h3 className="text-base font-semibold text-zinc-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-500 leading-relaxed">{item.body}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* 3 — Where Soft Creates Value */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
              {t('value.headline')}{' '}
              <em className="italic">{t('value.headlineBold')}</em>
            </h2>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {valuePillars.map((pillar, i) => (
              <StaggerItem key={i}>
                <div className="group border border-zinc-200 p-8 h-full cursor-default hover:border-zinc-900 hover:bg-zinc-950 hover:text-white transition-all duration-300">
                  <div className="text-3xl font-bold text-zinc-200 group-hover:text-zinc-700 mb-6 transition-colors duration-300 font-mono">
                    0{i + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 group-hover:text-white mb-3 transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-500 group-hover:text-zinc-400 leading-relaxed transition-colors duration-300">
                    {pillar.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 4 — Role-Based Tabs */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Who It&apos;s For
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
              Practice for Every Role.
            </h2>
          </FadeIn>
          <TabSwitcher tabs={tabs} />
        </div>
      </section>

      {/* 5 — Feature Grid */}
      <FeatureGrid
        headline={t('features.headline')}
        features={features}
        columns={3}
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
      />

      {/* 8 — FAQ */}
      <FAQAccordion headline={t('faq.headline')} faqs={faqItems} />

      {/* 9 — CTA */}
      <CenteredCTA
        variant="island"
        headline={t('cta.headline')}
        subheadline={t('cta.subheadline')}
        primaryCTA={{ text: t('cta.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('cta.secondaryCTA'), href: '/industries' }}
      />
    </>
  );
}
