import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Play, ArrowRight, Download, BookOpen, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { HeroSplit } from '@/components/sections/HeroSplit';
import { BentoGrid } from '@/components/sections/BentoGrid';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { TwoHandsIllustration } from '@/components/illustrations/TwoHandsIllustration';
import { LadderIllustration } from '@/components/illustrations/LadderIllustration';
import { VerticalTimeline } from '@/components/ui/VerticalTimeline';
import { PersonSilhouette } from '@/components/ui/PersonSilhouette';
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
      <Play className="h-8 w-8 text-zinc-300" />
      <Badge variant="secondary">{resourceItems[0]?.badge ?? 'Coming Soon'}</Badge>
    </div>,
    <ArrowRight key="arrow" className="h-5 w-5 text-zinc-400 mt-4" />,
    <Download key="dl" className="h-5 w-5 text-zinc-400 mt-4" />,
    <BookOpen key="book" className="h-5 w-5 text-zinc-400 mt-4" />,
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
      <HeroSplit
        label="COMPANY"
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: 'Book a Demo', href: '/contact' }}
        secondaryCTA={{ text: 'Meet the Team', href: '/contact' }}
        visual={<div className="h-64 w-full"><TwoHandsIllustration /></div>}
      />

      {/* 2 — Story Timeline */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1050px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
                Our Story
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-6">
                {t('story.headline')}
              </h2>
              <p className="text-base text-zinc-600 leading-relaxed">
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
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="max-w-2xl mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Our Approach
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              {t('expertise.headline')}{' '}
              <em className="italic">{t('expertise.headlineBold')}</em>
            </h2>
            <p className="text-base text-zinc-600 leading-relaxed">{t('expertise.body')}</p>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {expertisePillars.map((pillar, i) => (
              <StaggerItem key={i}>
                <div className="border border-zinc-200 bg-white p-8 h-full hover:-translate-y-1 hover:border-zinc-400 transition-all duration-200">
                  <PersonSilhouette className="mb-4 opacity-60" />
                  <h3 className="text-lg font-semibold text-zinc-900 mb-3">{pillar.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{pillar.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 4 — Resource Hub */}
      <section className="pt-24 lg:pt-32 pb-0 bg-white">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn>
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Resources
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900">
              {t('resources.headline')}{' '}
              <em className="italic">{t('resources.headlineBold')}</em>
            </h2>
          </FadeIn>
        </div>
      </section>
      <BentoGrid items={bentoItems} columns={2} />

      {/* 5 — Responsible AI */}
      <section className="py-24 lg:py-32 bg-zinc-950 overflow-hidden">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="max-w-2xl mb-10">
            <Badge variant="dark" className="mb-4">{t('responsibleAI.badge')}</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              {t('responsibleAI.headline')}{' '}
              <em className="italic text-zinc-400">{t('responsibleAI.headlineBold')}</em>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">
              {t('responsibleAI.body')}
            </p>
          </FadeIn>
          {/* LLM Marquee */}
          <div className="overflow-hidden border-t border-zinc-800 pt-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-4">
              Powered by
            </p>
            <div className="flex w-max animate-marquee gap-12 items-center">
              {llms.map((name, i) => (
                <span key={i} className="text-sm font-medium text-zinc-500 whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 — Security */}
      <section className="py-24 lg:py-32 bg-zinc-950 border-t border-zinc-800">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-4 w-4 text-zinc-500" />
              <span className="text-xs font-semibold tracking-widest uppercase text-zinc-500">
                Frankfurt, Germany
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              {t('security.headline')}{' '}
              <em className="italic text-zinc-400">{t('security.headlineBold')}</em>
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed">{t('security.body')}</p>
            <div className="flex items-center gap-4 mt-8">
              {['ISO 27001', 'SOC2', 'GDPR', 'EU AI Act'].map((badge) => (
                <span
                  key={badge}
                  className="text-xs font-semibold border border-zinc-700 text-zinc-400 px-3 py-1"
                >
                  {badge}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 7 — Partners */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="max-w-[1050px] mx-auto px-6">
          <FadeIn className="mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Ecosystem
            </p>
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              {t('partners.headline')}{' '}
              <em className="italic">{t('partners.headlineBold')}</em>
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed max-w-xl">
              {t('partners.body')}
            </p>
          </FadeIn>
          <StaggerGroup className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {partnerCategories.map((cat, i) => (
              <StaggerItem key={i}>
                <div className="border border-zinc-200 p-6">
                  <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
                    {cat}
                  </p>
                  <div className="space-y-2">
                    {PARTNER_NAMES[i]?.map((name) => (
                      <div key={name} className="flex items-center h-8 px-1">
                        <span className="text-sm font-semibold text-zinc-400 select-none">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* 8 — Careers */}
      <section className="py-24 lg:py-32 bg-zinc-950">
        <div className="max-w-[1050px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn>
              <p className="text-xs font-semibold tracking-widest uppercase text-zinc-600 mb-3">
                Careers
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
                {t('careers.headline')}{' '}
                <em className="italic text-zinc-400">{t('careers.headlineBold')}</em>
              </h2>
              <p className="text-base text-zinc-400 leading-relaxed mb-8">
                {t('careers.body')}
              </p>
              <Button variant="white" size="lg" asChild>
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
