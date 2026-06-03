import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Play, ArrowRight, Download, BookOpen, MapPin, Building2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { IndustryHero } from '@/components/sections/IndustryHero';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { LadderIllustration } from '@/components/illustrations/LadderIllustration';
import { VerticalTimeline } from '@/components/ui/VerticalTimeline';
import { PersonSilhouette } from '@/components/ui/PersonSilhouette';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { Badge } from '@/components/ui/badge';

// ─── Types ────────────────────────────────────────────────────────────────────
type Milestone = { year: string; label: string; body: string };
type Pillar = { title: string; body: string };
type ResourceItem = { title: string; body: string; badge?: string };

const PARTNER_NAMES = [
  ['Salesforce', 'HubSpot', 'Pipedrive'],
  ['Highspot', 'Seismic', 'Mindtickle'],
  ['Docebo', 'Cornerstone', 'SAP Litmos'],
];

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company' });

  const milestones = t.raw('story.milestones') as Milestone[];
  const expertisePillars = t.raw('expertise.pillars') as Pillar[];
  const resourceItems = t.raw('resources.items') as ResourceItem[];
  const llms = t.raw('responsibleAI.llms') as string[];
  const partnerCategories = t.raw('partners.categories') as string[];

  // Resource BentoGrid visuals (lg, md, md, lg for clean layout)
  const resourceVisuals = [
    <div key="play" className="flex items-center gap-3 mt-4">
      <Play className="h-8 w-8 text-edge" />
      <Badge variant="secondary">{resourceItems[0]?.badge ?? 'Coming Soon'}</Badge>
    </div>,
    <ArrowRight key="arrow" className="h-5 w-5 text-faint mt-4" />,
    <Download key="dl" className="h-5 w-5 text-faint mt-4" />,
    <BookOpen key="book" className="h-5 w-5 text-faint mt-4" />,
  ];

  const bentoItems = resourceItems.map((item, i) => ({
    title: item.title,
    body: item.body,
    visual: resourceVisuals[i],
    size: (i === 0 || i === 3 ? 'lg' : 'md') as 'lg' | 'md',
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
        icon={Building2}
      />

      {/* 2 — Story Timeline */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
                {t('story.label')}
              </p>
              <h2 className="text-3xl lg:text-4xl display-heading text-ink mb-6">
                {t('story.headline')}
              </h2>
              <p className="text-base text-body leading-snug">
                {t('story.body')}
              </p>
            </FadeIn>
            <FadeIn direction="right">
              <VerticalTimeline milestones={milestones} />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 3 — Expertise */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {t('expertise.label')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink mb-4">
              {t('expertise.headline')}{' '}
              <em className="not-italic">{t('expertise.headlineBold')}</em>
            </h2>
            <p className="text-base text-body leading-snug">{t('expertise.body')}</p>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {expertisePillars.map((pillar, i) => (
              <StaggerItem key={i}>
                <FeatureCard
                  mediaSlot={<PersonSilhouette className="opacity-60" />}
                  title={pillar.title}
                  body={pillar.body}
                />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 4 — Resource Hub */}
      <section className="pt-24 lg:pt-32 pb-0 bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {t('resources.label')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink">
              {t('resources.headline')}{' '}
              <em className="not-italic">{t('resources.headlineBold')}</em>
            </h2>
          </FadeIn>
        </div>
      </section>
      <BentoGrid items={bentoItems} columns={2} />

      {/* 5 — Responsible AI */}
      <section className="section-padding bg-ink-deep overflow-hidden">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="max-w-2xl mb-10">
            <Badge variant="dark" className="mb-4">{t('responsibleAI.badge')}</Badge>
            <h2 className="text-3xl lg:text-4xl display-heading text-white mb-4">
              {t('responsibleAI.headline')}{' '}
              <em className="not-italic text-faint">{t('responsibleAI.headlineBold')}</em>
            </h2>
            <p className="text-base text-faint leading-snug">
              {t('responsibleAI.body')}
            </p>
          </FadeIn>
          {/* LLM Marquee */}
          <div className="overflow-hidden border-t border-ink-2 pt-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-body mb-4">
              {t('responsibleAI.poweredBy')}
            </p>
            <div className="flex w-max animate-marquee gap-12 items-center">
              {llms.map((name, i) => (
                <span key={i} className="text-sm font-medium text-muted whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Security */}
      <section className="section-padding bg-ink-deep border-t border-ink-2">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-muted" />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                {t('security.label')}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl display-heading text-white mb-4">
              {t('security.headline')}{' '}
              <em className="not-italic text-faint">{t('security.headlineBold')}</em>
            </h2>
            <p className="text-base text-faint leading-snug">{t('security.body')}</p>
            <div className="flex items-center gap-4 mt-8">
              {(t.raw('security.badges') as string[]).map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-semibold border border-ink-3 text-faint px-3 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7 — Partners */}
      <section className="section-padding bg-canvas">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-3">
              {t('partners.label')}
            </p>
            <h2 className="text-3xl lg:text-4xl display-heading text-ink mb-4">
              {t('partners.headline')}{' '}
              <em className="not-italic">{t('partners.headlineBold')}</em>
            </h2>
            <p className="text-base text-muted leading-snug max-w-xl">
              {t('partners.body')}
            </p>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {partnerCategories.map((cat, i) => (
              <StaggerItem key={i}>
                <FeatureCard media="none">
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted mb-4">
                    {cat}
                  </p>
                  <div className="space-y-2">
                    {PARTNER_NAMES[i]?.map((name) => (
                      <div key={name} className="flex items-center h-8 px-1">
                        <span className="text-sm font-semibold text-faint select-none">{name}</span>
                      </div>
                    ))}
                  </div>
                </FeatureCard>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 8 — Careers */}
      <section className="section-padding bg-ink-deep">
        <div className="max-w-content mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-xs font-semibold tracking-widest uppercase text-body mb-3">
                {t('careers.label')}
              </p>
              <h2 className="text-3xl lg:text-4xl display-heading text-white mb-4">
                {t('careers.headline')}{' '}
                <em className="not-italic text-faint">{t('careers.headlineBold')}</em>
              </h2>
              <p className="text-base text-faint leading-snug mb-8">
                {t('careers.body')}
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">{t('careers.cta')}</Link>
              </Button>
            </FadeIn>
            <FadeIn direction="right">
              <LadderIllustration variant="dark" />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* 9 — Final CTA */}
      <CenteredCTA
        variant="island"
        headline={t('finalCTA.headline')}
        subheadline={t('finalCTA.headlineBold')}
        primaryCTA={{ text: t('finalCTA.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('finalCTA.secondaryCTA'), href: '/contact' }}
      />
    </>
  );
}
