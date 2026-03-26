import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';
import { Zap, ArrowUpRight, BarChart3, Mic, Brain, Target, TrendingUp } from 'lucide-react';

import { HeroSplit } from '@/components/sections/HeroSplit';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { ThreePillars } from '@/components/sections/ThreePillars';
import { StickyScroll } from '@/components/sections/StickyScroll';
import { TabSwitcher } from '@/components/sections/TabSwitcher';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import {
  MicrophoneIllustration,
  CompassIllustration,
  ConstellationIllustration,
} from '@/components/illustrations';
import { ProductMockupCard } from '@/components/ui/ProductMockupCard';

// ─── Raw message types ────────────────────────────────────────────────────────

type MockupData = {
  title: string;
  metric1Label: string; metric1Value: string;
  metric2Label: string; metric2Value: string;
  metric3Label: string; metric3Value: string;
};
type PillarRaw = { title: string; body: string };
type StepRaw = { label: string; title: string; body: string };
type TabRaw = {
  label: string; body: string; scenario: string;
  metric1Label: string; metric1Value: string;
  metric2Label: string; metric2Value: string;
};
type MetricRaw = { value: string; label: string; description: string };

// ─── Server sub-components ────────────────────────────────────────────────────

function StepVisual({ Icon }: { Icon: React.ElementType }) {
  return (
    <div className="inline-flex items-center justify-center w-12 h-12 bg-zinc-100 rounded-lg">
      <Icon className="w-6 h-6 text-zinc-700" />
    </div>
  );
}

function TabContent({ tab }: { tab: TabRaw }) {
  const metrics = [
    { label: tab.metric1Label, value: tab.metric1Value },
    { label: tab.metric2Label, value: tab.metric2Value },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
      <p className="text-base text-zinc-600 leading-relaxed">{tab.body}</p>
      <div className="bg-white border border-zinc-200 rounded-lg p-5">
        <p className="text-xs font-semibold tracking-widest uppercase text-zinc-400 mb-4">
          {tab.scenario}
        </p>
        <div className="space-y-4">
          {metrics.map((m, i) => (
            <div key={i}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-zinc-600">{m.label}</span>
                <span className="font-mono text-zinc-900 font-semibold">{m.value}%</span>
              </div>
              <div className="h-1.5 bg-zinc-100 rounded-full">
                <div
                  className="h-1.5 bg-zinc-900 rounded-full"
                  style={{ width: `${m.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const t = await getTranslations('home');

  const pillarItems = t.raw('pillars.items') as PillarRaw[];
  const stepItems = t.raw('howItWorks.steps') as StepRaw[];
  const tabItems = t.raw('useCaseTabs.tabs') as TabRaw[];
  const metricItems = t.raw('metrics.items') as MetricRaw[];
  const enterpriseFeatures = t.raw('enterprise.features') as string[];
  const mockupData = t.raw('hero.mockup') as MockupData;

  // Pillars
  const pillarIcons = [Zap, ArrowUpRight, BarChart3] as const;
  const pillarVisuals: ReactNode[] = [
    <div key="mic" className="h-28"><MicrophoneIllustration /></div>,
    <div key="compass" className="h-28"><CompassIllustration /></div>,
    <div key="constellation" className="h-28"><ConstellationIllustration /></div>,
  ];
  type PillarShape = { icon: React.ElementType; title: string; body: string; visual: ReactNode };
  const pillars = ([0, 1, 2] as const).map((i) => ({
    icon: pillarIcons[i],
    title: pillarItems[i].title,
    body: pillarItems[i].body,
    visual: pillarVisuals[i],
  })) as unknown as [PillarShape, PillarShape, PillarShape];

  // Steps
  const stepIcons = [Mic, Brain, Target, TrendingUp] as const;
  const steps = stepItems.map((step, i) => ({
    label: step.label,
    title: step.title,
    body: step.body,
    visual: <StepVisual Icon={stepIcons[i]} />,
  }));

  // Tabs
  const tabs = tabItems.map((tab) => ({
    label: tab.label,
    content: <TabContent tab={tab} />,
  }));

  // Logo stubs
  const logos = [
    'Veolia', 'Danone', 'TotalEnergies', 'Michelin',
    'Sodexo', 'Edenred', 'Legrand', 'Bouygues',
  ].map((name) => ({ name }));

  return (
    <>
      {/* 1 — Hero */}
      <HeroSplit
        label={t('hero.label')}
        headline={t('hero.headline')}
        headlineBold={t('hero.headlineBold')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/signup' }}
        microcopy={t('hero.microcopy')}
        visual={<ProductMockupCard data={mockupData} />}
      />

      {/* 2 — Logo Marquee */}
      <LogoMarquee
        headline={t('logoMarquee.headline')}
        logos={logos}
      />

      {/* 3 — Value Proposition */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto">
          <FadeIn className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-6">
              {t('valueProposition.headline')}{' '}
              <em className="italic">{t('valueProposition.headlineItalic')}</em>
            </h2>
            <p className="text-base lg:text-lg text-zinc-600 leading-relaxed max-w-xl mx-auto">
              {t('valueProposition.body')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 4 — Three Pillars */}
      <ThreePillars pillars={pillars} />

      {/* 5 — How It Works */}
      <StickyScroll
        headline={t('howItWorks.headline')}
        steps={steps}
      />

      {/* 6 — Use Case Tabs */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto">
          <FadeIn className="mb-12">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-3">
              Who It&apos;s For
            </p>
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900">
              Built for Every Revenue Role
            </h2>
          </FadeIn>
          <TabSwitcher tabs={tabs} />
        </div>
      </section>

      {/* 7 — Metrics */}
      <MetricScorecard
        metrics={metricItems}
        columns={4}
      />

      {/* 8 — Enterprise */}
      <DarkCard
        headline={t('enterprise.headline')}
        headlineBold={t('enterprise.headlineBold')}
        body={t('enterprise.body')}
        features={enterpriseFeatures}
      />

      {/* 9 — Final CTA */}
      <CenteredCTA
        variant="island"
        headline={t('finalCTA.headline')}
        subheadline={t('finalCTA.subheadline')}
        primaryCTA={{ text: t('finalCTA.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('finalCTA.secondaryCTA'), href: '/use-cases' }}
      />
    </>
  );
}
