import { getTranslations } from 'next-intl/server';

import { FAQAccordion } from '@/components/sections/FAQAccordion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { PricingSection } from '@/components/ui/PricingSection';
import { PricingTimeline } from '@/components/ui/PricingTimeline';

// ─── Types ────────────────────────────────────────────────────────────────────
interface PricingCard {
  name: string;
  price: string;
  priceSuffix: string;
  tagline: string;
  cta: string;
  features: string[];
  recommended?: boolean;
}

interface BillingRaw { monthly: string; annual: string; save: string }
interface FAQRaw { question: string; answer: string }

// ─── Page ──────────────────────────────────────────────────────────────────

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'pricing' });

  const billing = t.raw('billing') as BillingRaw;
  const cardsObj = t.raw('cards') as Record<string, PricingCard>;
  const cards: PricingCard[] = ['starter', 'pro', 'advanced', 'enterprise'].map(
    (k) => cardsObj[k],
  );
  const timelineNodes = t.raw('scale.nodes') as string[];
  const timelineCounts = t.raw('scale.counts') as string[];
  const faqItems = t.raw('faq.items') as FAQRaw[];

  return (
    <>
      {/* 1 — Hero + billing toggle + pricing cards (one cohesive block) */}
      <section className="bg-canvas pt-32 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted">
              {t('hero.label')}
            </p>
            <h1 className="display-heading mb-4 text-4xl leading-[1.08] text-ink lg:text-5xl">
              {t('hero.headline')}
            </h1>
            <p className="text-base leading-normal text-muted lg:text-lg">
              {t('hero.subheadline')}
            </p>
          </FadeIn>

          <div className="mt-12">
            <PricingSection cards={cards} billing={billing} />
          </div>
        </div>
      </section>

      {/* 2 — Scale section (narrative + "coverage grows" visual) */}
      <section className="border-t border-line bg-canvas py-20 lg:py-24">
        <div className="mx-auto max-w-content px-6">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <h2 className="display-heading mb-4 text-3xl text-ink lg:text-4xl">
              {t('scale.headline')}
            </h2>
            <p className="mx-auto max-w-xl text-base leading-normal text-muted">
              {t('scale.body')}
            </p>
          </FadeIn>
          <FadeIn delay={0.1} className="mt-16 lg:mt-20">
            <PricingTimeline nodes={timelineNodes} counts={timelineCounts} />
          </FadeIn>
        </div>
      </section>

      {/* 3 — FAQ */}
      <FAQAccordion headline={t('faq.headline')} faqs={faqItems} />

      {/* 4 — Final CTA */}
      <section className="section-padding bg-ink-deep">
        <div className="max-w-content mx-auto px-6">
          <FadeIn className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl display-heading text-white mb-4">
              {t('finalCTA.headline')}
            </h2>
            <p className="text-base text-faint leading-normal mb-8">
              {t('finalCTA.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">{t('finalCTA.primaryCTA')}</Link>
              </Button>
              <Button variant="white-outline" size="lg" asChild>
                <Link href="/contact">{t('finalCTA.secondaryCTA')}</Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
