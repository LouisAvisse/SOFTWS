import { getTranslations } from 'next-intl/server';
import { Mic, Brain, Target, TrendingUp } from 'lucide-react';

import { HeroVoice } from '@/components/sections/HeroVoice';
import { ValueRows } from '@/components/sections/ValueRows';
import { StickyScroll } from '@/components/sections/StickyScroll';
import { RolesShowcase } from '@/components/sections/RolesShowcase';
import { MetricScorecard } from '@/components/sections/MetricScorecard';
import { DarkCard } from '@/components/sections/DarkCard';
import { CenteredCTA } from '@/components/sections/CenteredCTA';

// ─── Raw message types ────────────────────────────────────────────────────────

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
    <div className="inline-flex items-center justify-center w-12 h-12 bg-mist rounded-lg">
      <Icon className="w-6 h-6 text-ink-3" />
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

  return (
    <>
      {/* 1 — Hero (voice waveform + speaker, with the trust strip folded in) */}
      <HeroVoice
        headline={t('hero.headline')}
        subheadline={t('hero.subheadline')}
        primaryCTA={{ text: t('hero.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('hero.secondaryCTA'), href: '/signup' }}
        characterSrc="/hero-character.png"
        characterAlt={t('hero.characterAlt')}
        compliance={{
          text: t('hero.compliance.text'),
          flagAlt: t('hero.compliance.flagAlt'),
          learnMore: t('hero.compliance.learnMore'),
          href: '#certifications',
        }}
        trust={{
          prefix: t('hero.trust.prefix'),
          logoAlt: t('hero.trust.logoAlt'),
          suffix: t('hero.trust.suffix'),
        }}
      />

      {/* 2 — Value rows (alternating text / prototype) */}
      <ValueRows
        headline={t('valueProposition.headline')}
        headlineItalic={t('valueProposition.headlineItalic')}
        body={t('valueProposition.body')}
        items={pillarItems}
      />

      {/* 5 — How It Works */}
      <StickyScroll
        headline={t('howItWorks.headline')}
        steps={steps}
      />

      {/* 6 — Roles Showcase */}
      <RolesShowcase
        eyebrow={t('rolesShowcase.eyebrow')}
        headline={t('rolesShowcase.headline')}
        roles={roles}
        learnMoreLabel={t('rolesShowcase.learnMore')}
        avgLabel={t('rolesShowcase.avg')}
      />

      {/* 7 — Metrics */}
      <MetricScorecard
        metrics={metricItems}
        columns={4}
      />

      {/* 8 — Enterprise / certifications (hero compliance chip scrolls here) */}
      <DarkCard
        id="certifications"
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
