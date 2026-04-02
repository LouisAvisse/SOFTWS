'use client';

import { useState } from 'react';
import { BillingToggle } from './BillingToggle';
import { PricingGrid } from './PricingGrid';

interface BillingLabels {
  monthly: string;
  annual: string;
  save: string;
}

interface PricingCard {
  name: string;
  price: string;
  priceSuffix: string;
  tagline: string;
  cta: string;
  features: string[];
  recommended?: boolean;
}

interface Props {
  cards: PricingCard[];
  billing: BillingLabels;
}

export function PricingSection({ cards, billing }: Props) {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="space-y-10">
      <div className="flex justify-center">
        <BillingToggle
          isAnnual={isAnnual}
          onToggle={setIsAnnual}
          monthlyLabel={billing.monthly}
          annualLabel={billing.annual}
          saveLabel={billing.save}
        />
      </div>
      <PricingGrid cards={cards} isAnnual={isAnnual} />
    </div>
  );
}
