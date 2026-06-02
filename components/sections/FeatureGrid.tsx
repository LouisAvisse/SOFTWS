import { type ElementType } from 'react';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { FadeIn } from '@/components/motion/FadeIn';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { cn } from '@/lib/utils';

interface Feature {
  icon: ElementType;
  title: string;
  body: string;
}

interface FeatureGridProps {
  headline?: string;
  features: Feature[];
  columns?: 2 | 3;
}

export function FeatureGrid({ headline, features, columns = 3 }: FeatureGridProps) {
  return (
    <section className="section-padding bg-canvas">
      <div className="max-w-content mx-auto px-6">
        {headline && (
          <FadeIn className="mb-12 lg:mb-16">
            <h2 className="display-heading max-w-2xl text-3xl text-ink lg:text-4xl">
              {headline}
            </h2>
          </FadeIn>
        )}

        <StaggerGroup
          className={cn(
            'grid gap-4 sm:gap-5',
            columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {features.map((feature, i) => (
            <StaggerItem key={i} className="h-full">
              <FeatureCard icon={feature.icon} title={feature.title} body={feature.body} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
