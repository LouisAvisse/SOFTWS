'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  isAnnual: boolean;
}

function getDisplayPrice(price: string, isAnnual: boolean): { amount: string; suffix: string } {
  if (!price.startsWith('€')) return { amount: price, suffix: '' };
  const num = parseInt(price.replace('€', ''), 10);
  if (num === 0) return { amount: '€0', suffix: '' };
  const displayNum = isAnnual ? Math.round(num * 0.8) : num;
  const suffix = isAnnual ? '/mo · billed annually' : '/mo';
  return { amount: `€${displayNum}`, suffix };
}

export function PricingGrid({ cards, isAnnual }: Props) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
      {cards.map((card) => {
        const display = getDisplayPrice(card.price, isAnnual);
        const isEnterprise = card.price === "Let's talk";
        const rec = !!card.recommended;

        return (
          <div
            key={card.name}
            className={cn(
              'relative flex flex-col rounded-2xl bg-white p-6 lg:p-7',
              rec
                ? 'border border-brand ring-1 ring-brand shadow-[0_24px_60px_-28px_rgba(68,114,202,0.55)]'
                : 'border border-line',
            )}
          >
            {rec && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
                Recommended
              </span>
            )}

            {/* Name + tagline */}
            <div className="mb-5">
              <h3 className="text-[15px] font-semibold text-ink">{card.name}</h3>
              <p className="mt-1 text-[13px] leading-snug text-muted">{card.tagline}</p>
            </div>

            {/* Price */}
            <div className="mb-6 flex min-h-[2.75rem] items-end gap-1.5">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${card.name}-${isAnnual}`}
                  className={cn(
                    'font-bold leading-none text-ink',
                    isEnterprise ? 'text-[1.9rem]' : 'text-[2.6rem]',
                  )}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  {display.amount}
                </motion.span>
              </AnimatePresence>
              {display.suffix && (
                <span className="max-w-[88px] pb-1.5 text-xs leading-tight text-muted">
                  {display.suffix}
                </span>
              )}
            </div>

            {/* CTA */}
            <Button
              variant={rec ? 'default' : 'architectural'}
              asChild
              className="w-full justify-center rounded-lg"
            >
              <Link href={isEnterprise ? '/contact' : '/signup'}>{card.cta}</Link>
            </Button>

            {/* Features */}
            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {card.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-[1px] flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-brand/10">
                    <Check className="h-2.5 w-2.5 text-brand" strokeWidth={3} />
                  </span>
                  <span className="text-[13px] leading-snug text-ink-3">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
