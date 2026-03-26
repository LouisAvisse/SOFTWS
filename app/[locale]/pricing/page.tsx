import { getTranslations } from 'next-intl/server';

import { FAQAccordion } from '@/components/sections/FAQAccordion';
import { CenteredCTA } from '@/components/sections/CenteredCTA';
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
  const faqItems = t.raw('faq.items') as FAQRaw[];

  return (
    <>
      {/* 1 — Hero */}
      <section className="relative py-24 lg:py-32 bg-white overflow-hidden">
        {/* Subtle dot mesh */}
        <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" aria-hidden>
          <defs>
            <pattern id="pricing-mesh" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="#d4d4d8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pricing-mesh)" />
        </svg>

        <div className="container mx-auto relative">
          <FadeIn className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-zinc-500 mb-4">
              {t('hero.label')}
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900 leading-[1.08] mb-4">
              {t('hero.headline')}
            </h1>
            <p className="text-base lg:text-lg text-zinc-500 leading-relaxed">
              {t('hero.subheadline')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 2 — Billing Toggle + Pricing Cards */}
      <section className="pb-24 lg:pb-32 bg-white">
        <div className="container mx-auto">
          <PricingSection cards={cards} billing={billing} />
          <p className="text-xs text-zinc-400 text-center mt-8">
            Example pricing — final rates confirmed at sign-up.
          </p>
        </div>
      </section>

      {/* 3 — Scale section */}
      <section className="py-24 lg:py-32 bg-zinc-50">
        <div className="container mx-auto">
          <FadeIn className="max-w-2xl mx-auto text-center mb-14">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-4">
              {t('scale.headline')}
            </h2>
            <p className="text-base text-zinc-500 leading-relaxed">
              {t('scale.body')}
            </p>
          </FadeIn>
          <PricingTimeline nodes={timelineNodes} />
        </div>
      </section>

      {/* 4 — FAQ */}
      <FAQAccordion headline={t('faq.headline')} faqs={faqItems} />

      {/* 5 — Final CTA */}
      <section className="py-24 lg:py-32 bg-zinc-950">
        <div className="container mx-auto">
          <FadeIn className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-white mb-4">
              {t('finalCTA.headline')}
            </h2>
            <p className="text-base text-zinc-400 leading-relaxed mb-8">
              {t('finalCTA.body')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-zinc-900 text-sm font-semibold hover:bg-zinc-100 transition-colors"
              >
                {t('finalCTA.primaryCTA')}
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 border border-zinc-700 text-zinc-300 text-sm font-semibold hover:border-zinc-500 hover:text-white transition-colors"
              >
                {t('finalCTA.secondaryCTA')}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
