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
  const suffix = isAnnual ? '/mo, billed annually' : '/mo';
  return { amount: `€${displayNum}`, suffix };
}

export function PricingGrid({ cards, isAnnual }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const display = getDisplayPrice(card.price, isAnnual);
        const isEnterprise = card.price === "Let's talk";

        return (
          <div
            key={card.name}
            className={cn(
              'relative bg-white border rounded-2xl p-6 lg:p-7 flex flex-col',
              card.recommended
                ? 'border-zinc-900 shadow-lg'
                : 'border-zinc-200',
            )}
          >
            {/* Recommended badge */}
            {card.recommended && (
              <span className="absolute top-4 right-4 bg-zinc-900 text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full">
                Recommended
              </span>
            )}

            {/* Name + tagline */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-zinc-500 mb-1">{card.name}</p>
              <p className="text-xs text-zinc-400">{card.tagline}</p>
            </div>

            {/* Price */}
            <div className="mb-8 min-h-[3rem] flex items-end gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${card.name}-${isAnnual}`}
                  className="text-4xl font-bold text-zinc-900 leading-none"
                  initial={{ scale: 0.9, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.05, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {display.amount}
                </motion.span>
              </AnimatePresence>
              {display.suffix && (
                <span className="text-xs text-zinc-400 pb-1 leading-tight max-w-[80px]">
                  {display.suffix}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="mb-8">
              <Button
                variant={card.recommended ? 'default' : 'architectural'}
                size="default"
                asChild
                className="w-full justify-center"
              >
                <Link href={isEnterprise ? '/contact' : '/signup'}>{card.cta}</Link>
              </Button>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {card.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 text-zinc-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-700 leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
