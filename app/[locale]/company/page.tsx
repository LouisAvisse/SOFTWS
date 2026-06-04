import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Play, MapPin, ShieldCheck } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
import { TwoHandsIllustration } from '@/components/illustrations/TwoHandsIllustration';
import { ConstellationIllustration } from '@/components/illustrations/ConstellationIllustration';
import { CompassIllustration } from '@/components/illustrations/CompassIllustration';
import { PrismIllustration } from '@/components/illustrations/PrismIllustration';
import { LadderIllustration } from '@/components/illustrations/LadderIllustration';

// ─── Types ────────────────────────────────────────────────────────────────────
type Milestone = { year: string; label: string; body: string };
type Pillar = { title: string; body: string };
type ResourceItem = { title: string; body: string; badge?: string };

// Partner names per category (brand chrome, not protected copy).
const PARTNER_NAMES = [
  ['Salesforce', 'HubSpot', 'Pipedrive'],
  ['Highspot', 'Seismic', 'Mindtickle'],
  ['Docebo', 'Cornerstone', 'SAP Litmos'],
];

// One distinct illustration per approach pillar so the three never read as a
// repeated icon-card grid; each domain gets its own mark.
const PILLAR_ILLOS = [ConstellationIllustration, CompassIllustration, PrismIllustration];

// ─── Shared section nameplate ───────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
      {children}
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────
export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'company' });

  const milestones = t.raw('story.milestones') as Milestone[];
  const pillars = t.raw('expertise.pillars') as Pillar[];
  const resources = t.raw('resources.items') as ResourceItem[];
  const llms = t.raw('responsibleAI.llms') as string[];
  const uniqueLlms = Array.from(new Set(llms));
  const partnerCategories = t.raw('partners.categories') as string[];
  const securityBadges = t.raw('security.badges') as string[];

  const featured = resources[0];
  const otherResources = resources.slice(1);

  return (
    <>
      {/* ══ 1 — Hero ══ */}
      <section className="relative overflow-hidden bg-canvas pt-32 pb-16 lg:pt-40 lg:pb-24">
        <div className="mx-auto max-w-content px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <FadeIn>
              <SectionLabel>{t('hero.label')}</SectionLabel>
              <h1
                className="display-heading mt-6 text-ink"
                style={{ fontSize: 'clamp(2.5rem, 1.6rem + 3.4vw, 4rem)', lineHeight: 1.04 }}
              >
                {t('hero.headline')} {t('hero.headlineBold')}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
                {t('hero.subheadline')}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link href="/contact">{t('hero.primaryCTA')}</Link>
                </Button>
                <Button asChild size="lg" variant="architectural">
                  <Link href="/contact">{t('hero.secondaryCTA')}</Link>
                </Button>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.1}>
              <div className="relative mx-auto w-full max-w-[480px]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-4 -z-10"
                  style={{
                    background:
                      'radial-gradient(56% 56% at 50% 46%, color-mix(in srgb, var(--brand) 16%, transparent), transparent 70%)',
                  }}
                />
                <div className="aspect-[260/180] w-full">
                  <TwoHandsIllustration />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 2 — Story + horizontal timeline ══ */}
      <section className="section-padding border-t border-line/60 bg-canvas">
        <div className="mx-auto max-w-content px-6">
          <FadeIn className="max-w-2xl">
            <h2 className="display-heading text-3xl text-ink lg:text-4xl">
              {t('story.headline')}
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
              {t('story.body')}
            </p>
          </FadeIn>

          <StaggerGroup className="relative mt-16 grid grid-cols-1 gap-y-10 sm:mt-20 sm:grid-cols-3 sm:gap-x-10">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[7px] hidden h-px bg-edge sm:block"
            />
            {milestones.map((m, i) => {
              const last = i === milestones.length - 1;
              const isBcorp = m.label === 'B-Corp Certified';
              return (
                <StaggerItem key={i} className="relative">
                  <span
                    className={cn(
                      'relative z-10 block h-3.5 w-3.5 rounded-full',
                      last ? 'bg-brand ring-4 ring-brand/15' : 'border-2 border-edge bg-canvas',
                    )}
                  />
                  <p className="mt-5 font-mono text-[12px] font-medium text-brand">{m.year}</p>
                  <h3 className="mt-1.5 flex items-center gap-2 text-base font-semibold text-ink">
                    {m.label}
                    {isBcorp && (
                      <Image
                        src="/logo/bcorp/bcorp-black.svg"
                        alt="Certified B Corporation"
                        width={137}
                        height={200}
                        className="h-7 w-auto"
                      />
                    )}
                  </h3>
                  <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-muted">{m.body}</p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ══ 3 — Approach (three expert lenses) ══ */}
      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-content px-6">
          <FadeIn className="max-w-2xl">
            <SectionLabel>{t('expertise.label')}</SectionLabel>
            <h2 className="display-heading mt-5 text-3xl text-ink lg:text-4xl">
              {t('expertise.headline')}{' '}
              <span className="text-ink">{t('expertise.headlineBold')}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
              {t('expertise.body')}
            </p>
          </FadeIn>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-3 lg:mt-16">
            {pillars.map((pillar, i) => {
              const Illo = PILLAR_ILLOS[i % PILLAR_ILLOS.length];
              return (
                <StaggerItem key={i}>
                  <div className="h-24 w-32">
                    <Illo />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink">{pillar.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-body">{pillar.body}</p>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </section>

      {/* ══ 4 — Resources ══ */}
      <section className="section-padding bg-canvas">
        <div className="mx-auto max-w-content px-6">
          <FadeIn className="max-w-2xl">
            <SectionLabel>{t('resources.label')}</SectionLabel>
            <h2 className="display-heading mt-5 text-3xl text-ink lg:text-4xl">
              {t('resources.headline')}{' '}
              <span className="text-ink">{t('resources.headlineBold')}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
              {t('resources.body')}
            </p>
          </FadeIn>

          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {/* Featured — Masterclasses */}
            <FadeIn>
              <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-7 shadow-[0_20px_50px_-30px_rgba(20,18,16,0.35)]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand ring-1 ring-inset ring-brand/15">
                      <Play className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    {featured?.badge && (
                      <span className="rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand">
                        {featured.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-ink">{featured?.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-body">{featured?.body}</p>
                </div>
                <div className="mt-10 flex items-end gap-1.5" aria-hidden="true">
                  {[34, 52, 40, 64, 48, 30].map((h, i) => (
                    <span key={i} className="w-2 rounded-sm bg-brand/15" style={{ height: h }} />
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* The rest — compact rows */}
            <StaggerGroup className="flex flex-col gap-4">
              {otherResources.map((item) => (
                <StaggerItem key={item.title} className="h-full">
                  <div className="group flex h-full items-start gap-4 rounded-2xl border border-line bg-white p-6 transition-colors duration-200 hover:border-edge">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-ink">{item.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{item.body}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 flex-shrink-0 text-edge transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-brand" />
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </section>

      {/* ══ 5 — Responsible AI + Security (dark trust block) ══ */}
      <section className="section-padding overflow-hidden bg-ink-deep">
        <div className="mx-auto max-w-content px-6">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Responsible AI */}
            <FadeIn>
              <span className="inline-flex items-center gap-2 rounded-full border border-ink-3 bg-ink-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-edge">
                <ShieldCheck className="h-3.5 w-3.5 text-brand-light" strokeWidth={2} />
                {t('responsibleAI.badge')}
              </span>
              <h2 className="display-heading mt-5 text-3xl text-white lg:text-4xl">
                {t('responsibleAI.headline')}{' '}
                <span className="text-white">{t('responsibleAI.headlineBold')}</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-faint">
                {t('responsibleAI.body')}
              </p>
            </FadeIn>

            {/* Security */}
            <FadeIn direction="right" delay={0.1}>
              <div className="lg:border-l lg:border-ink-2 lg:pl-16">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-light" strokeWidth={2} />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                    {t('security.label')}
                  </span>
                </div>
                <h2 className="display-heading mt-4 text-3xl text-white lg:text-4xl">
                  {t('security.headline')}{' '}
                  <span className="text-white">{t('security.headlineBold')}</span>
                </h2>
                <p className="mt-5 max-w-md text-base leading-relaxed text-faint">
                  {t('security.body')}
                </p>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {securityBadges.map((badge) => (
                    <span
                      key={badge}
                      className="rounded-lg border border-ink-3 bg-ink-2/60 px-3 py-1.5 text-xs font-semibold text-edge"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Powered by */}
          <div className="mt-16 border-t border-ink-2 pt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              {t('responsibleAI.poweredBy')}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3">
              {uniqueLlms.map((name) => (
                <span key={name} className="text-base font-medium text-edge">
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6 — Partners ══ */}
      <section className="section-padding bg-canvas">
        <div className="mx-auto max-w-content px-6">
          <FadeIn className="max-w-2xl">
            <SectionLabel>{t('partners.label')}</SectionLabel>
            <h2 className="display-heading mt-5 text-3xl text-ink lg:text-4xl">
              {t('partners.headline')}{' '}
              <span className="text-ink">{t('partners.headlineBold')}</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-body">
              {t('partners.body')}
            </p>
          </FadeIn>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {partnerCategories.map((cat, i) => (
              <StaggerItem key={cat} className="bg-canvas">
                <div className="h-full p-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{cat}</p>
                  <div className="mt-5 space-y-3">
                    {PARTNER_NAMES[i]?.map((name) => (
                      <p key={name} className="text-[15px] font-semibold text-ink-3">{name}</p>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ══ 7 — Careers ══ */}
      <section className="section-padding bg-surface">
        <div className="mx-auto max-w-content px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <SectionLabel>{t('careers.label')}</SectionLabel>
              <h2 className="display-heading mt-5 text-3xl text-ink lg:text-4xl">
                {t('careers.headline')}{' '}
                <span className="text-ink">{t('careers.headlineBold')}</span>
              </h2>
              <p className="mt-5 max-w-md text-base leading-relaxed text-body">
                {t('careers.body')}
              </p>
              <Button asChild size="lg" className="mt-8">
                <Link href="/contact">{t('careers.cta')}</Link>
              </Button>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <div className="relative mx-auto w-full max-w-sm">
                <div
                  aria-hidden="true"
                  className="absolute -inset-8 -z-10"
                  style={{
                    background:
                      'radial-gradient(60% 60% at 55% 45%, color-mix(in srgb, var(--brand) 14%, transparent), transparent 72%)',
                  }}
                />
                <div className="mx-auto aspect-square w-full max-w-[320px]">
                  <LadderIllustration />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ══ 8 — Final CTA ══ */}
      <CenteredCTA
        variant="island"
        headline={t('finalCTA.headline')}
        headlineBold={t('finalCTA.headlineBold')}
        primaryCTA={{ text: t('finalCTA.primaryCTA'), href: '/contact' }}
        secondaryCTA={{ text: t('finalCTA.secondaryCTA'), href: '/contact' }}
      />
    </>
  );
}
