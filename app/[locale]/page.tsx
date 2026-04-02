import { getTranslations } from 'next-intl/server';
import { type ReactNode } from 'react';
import { Zap, ArrowUpRight, BarChart3, Mic, Brain, Target, TrendingUp } from 'lucide-react';

import { HeroSplit } from '@/components/sections/HeroSplit';
import { LogoMarquee } from '@/components/sections/LogoMarquee';
import { ThreePillars } from '@/components/sections/ThreePillars';
import { StickyScroll } from '@/components/sections/StickyScroll';
import { RolesShowcase } from '@/components/sections/RolesShowcase';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { FadeIn } from '@/components/motion/FadeIn';
import {
  MicrophoneIllustration,
  CompassIllustration,
  ConstellationIllustration,
} from '@/components/illustrations';
import { DashboardMockup } from '@/components/ui/DashboardMockup';

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


// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const t = await getTranslations('home');

  const pillarItems = t.raw('pillars.items') as PillarRaw[];
  const stepItems = t.raw('howItWorks.steps') as StepRaw[];
  const tabItems = t.raw('useCaseTabs.tabs') as TabRaw[];
  const metricItems = t.raw('metrics.items') as MetricRaw[];
  const enterpriseFeatures = t.raw('enterprise.features') as string[];
  const mockupData = t.raw('hero.mockup') as MockupData;

  // Pillars — render icons as ReactNode so they're serializable to client components
  const pillarIcons: ReactNode[] = [
    <Zap key="zap" className="w-5 h-5 text-white" />,
    <ArrowUpRight key="arrow" className="w-5 h-5 text-white" />,
    <BarChart3 key="chart" className="w-5 h-5 text-white" />,
  ];
  const pillarVisuals: ReactNode[] = [
    <div key="mic" className="h-28"><MicrophoneIllustration /></div>,
    <div key="compass" className="h-28"><CompassIllustration /></div>,
    <div key="constellation" className="h-28"><ConstellationIllustration /></div>,
  ];
  type PillarShape = { icon: ReactNode; title: string; body: string; visual: ReactNode };
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

  // Roles data (raw, passed directly to RolesShowcase)
  const roles = tabItems;

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
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/signup' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/product' }}
        microcopy={t('hero.microcopy')}

        visual={<DashboardMockup data={mockupData} />}
      />

      {/* 2 — Logo Marquee */}
      <LogoMarquee
        headline={t('logoMarquee.headline')}
        logos={logos}
      />

      {/* 3+4 — Features Bento */}
      <ThreePillars
        sectionLabel="Features / Benefits"
        sectionHeadline={t('valueProposition.headline')}
        sectionHeadlineItalic={t('valueProposition.headlineItalic')}
        sectionBody={t('valueProposition.body')}
        pillars={pillars}
      />

      {/* 5 — How It Works */}
      <StickyScroll
        headline={t('howItWorks.headline')}
        steps={steps}
      />

      {/* 6 — Roles Showcase */}
      <RolesShowcase
        eyebrow="Who It's For"
        headline="Built for Every Revenue Role"
        roles={roles}
      />

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
