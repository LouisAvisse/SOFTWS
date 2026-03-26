import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/motion/FadeIn';
import { cn } from '@/lib/utils';

interface CenteredCTAProps {
  headline: string;
  headlineBold?: string;
  subheadline?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
  variant?: 'light' | 'dark' | 'island';
}

export function CenteredCTA({
  headline, headlineBold, subheadline,
  primaryCTA, secondaryCTA,
  variant = 'light',
}: CenteredCTAProps) {
  const isDark = variant === 'dark';

  const content = (
    <FadeIn className="text-center">
      <h2 className={cn(
        'text-3xl lg:text-4xl font-semibold tracking-tight mb-4',
        isDark ? 'text-white' : 'text-zinc-900',
      )}>
        {headline}{' '}
        {headlineBold && <span className="italic">{headlineBold}</span>}
      </h2>
      {subheadline && (
        <p className={cn(
          'text-base lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto',
          isDark ? 'text-zinc-400' : 'text-zinc-600',
        )}>
          {subheadline}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="lg" variant={isDark ? 'white' : 'default'} asChild>
          <Link href={primaryCTA.href}>{primaryCTA.text}</Link>
        </Button>
        {secondaryCTA && (
          <Button size="lg" variant={isDark ? 'white-outline' : 'architectural'} asChild>
            <Link href={secondaryCTA.href}>{secondaryCTA.text}</Link>
          </Button>
        )}
      </div>
    </FadeIn>
  );

  if (variant === 'island') {
    return (
      <div className="container mx-auto my-24">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 py-20 px-8 lg:px-12 max-w-4xl mx-auto">
          {content}
        </div>
      </div>
    );
  }

  return (
    <section className={cn('py-24 lg:py-32', isDark ? 'bg-zinc-950' : 'bg-white')}>
      <div className="container mx-auto">{content}</div>
    </section>
  );
}
