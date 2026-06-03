import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import {
  AlertTriangle, AlertCircle, Info,
  Landmark, Zap, Store, Heart, GraduationCap,
  MessageSquare, ShieldCheck, Gauge, HeartHandshake, BookOpen, Languages,
  type LucideIcon,
} from 'lucide-react';

import { routing } from '@/i18n/routing';
import { INDUSTRY_SLUGS, type IndustrySlug } from '@/lib/content/industries';
import { IndustryHero } from '@/components/sections/IndustryHero';
import { TabSwitcher } from '@/components/sections/TabSwitcher';
import { FeatureGrid } from '@/components/sections/FeatureGrid';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

// ─── Types ────────────────────────────────────────────────────────────────────
type ChallengeItem = { title: string; body: string };
type PillarItem = { title: string; body: string };
type TabRaw = { label: string; title: string; body: string };
type FeatureItem = { title: string; body: string };
type MetricItem = { value: string; label: string; description: string };
type FAQItem = { question: string; answer: string };

const CHALLENGE_ICONS = [AlertTriangle, AlertCircle, Info] as const;

// Capability icons for the "Why Soft Fits …" feature grid — varied and on-theme
// (not the warning icons used for the Challenge section).
const FEATURE_ICONS = [MessageSquare, ShieldCheck, Gauge, HeartHandshake, BookOpen, Languages] as const;

// Per-industry icon — gives each slim hero its own identity.
const INDUSTRY_ICONS: Record<IndustrySlug, LucideIcon> = {
  'financial-services': Landmark,
  'technology-saas': Zap,
  'franchise-retail': Store,
  healthcare: Heart,
  education: GraduationCap,
};

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
  const tc = await getTranslations({ locale, namespace: 'common' });

  const challengeItems = t.raw('challenge.items') as ChallengeItem[];
  const valuePillars = t.raw('value.pillars') as PillarItem[];
  const tabsRaw = t.raw('roles.tabs') as TabRaw[];
  const featureItems = t.raw('features.items') as FeatureItem[];
  const metricItems = t.raw('metrics.items') as MetricItem[];
  const faqItems = t.raw('faq.items') as FAQItem[];

  // TabSwitcher needs { label, content: ReactNode }
  const IndustryIcon = INDUSTRY_ICONS[slug as IndustrySlug];
  const tabs = tabsRaw.map((tab) => ({
    label: tab.label,
    content: (
      <div className="mx-auto flex max-w-2xl items-start gap-5">
        <span className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-brand/15 sm:flex">
          <IndustryIcon className="h-5 w-5" strokeWidth={1.75} />
        </span>
        <div>
          <h3 className="mb-3 text-xl font-semibold text-ink">{tab.title}</h3>
          <p className="leading-snug text-body">{tab.body}</p>
        </div>
      </div>
    ),
  }));

  // FeatureGrid items need icon prop
  const features = featureItems.map((item, i) => ({
    icon: FEATURE_ICONS[i % FEATURE_ICONS.length],
    title: item.title,
    body: item.body,
  }));

  return (
    <>
      {/* 1 — Slim industry header */}
      <IndustryHero
        variant="slim"
        eyebrow={t('hero.label')}
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/contact' }}
        icon={INDUSTRY_ICONS[slug as IndustrySlug]}
      />

      {/* 2 — Industry Challenge */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl display-heading text-ink leading-[1.1]">
              {t('challenge.headline')}{' '}
              <em className="not-italic">{t('challenge.headlineBold')}</em>
            </h2>
            <p className="mt-4 text-base text-muted">{t('challenge.body')}</p>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {challengeItems.map((item, i) => (
              <StaggerItem key={i}>
                <FeatureCard icon={CHALLENGE_ICONS[i]} media="muted" title={item.title} body={item.body} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 3 — Where Soft Creates Value */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl display-heading text-ink">
              {t('value.headline')}{' '}
              <em className="not-italic">{t('value.headlineBold')}</em>
            </h2>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {valuePillars.map((pillar, i) => (
              <StaggerItem key={i}>
                <FeatureCard media="number" index={i + 1} title={pillar.title} body={pillar.body} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 4 — Role-Based Tabs */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {tc('whoItsFor')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink">
              {tc('practiceForEveryRole')}
            </h2>
          </FadeIn>
          <FadeIn>
            <div className="rounded-2xl border border-line bg-white p-8 lg:p-12">
              <TabSwitcher tabs={tabs} />
            </div>
          </FadeIn>
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
