import { type ElementType } from 'react';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { FadeIn } from '@/components/motion/FadeIn';
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
    <section className="py-24 lg:py-32 bg-white">
      <div className="container mx-auto">
        {headline && (
          <FadeIn className="mb-14">
            <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-zinc-900">
              {headline}
            </h2>
          </FadeIn>
        )}
        <StaggerGroup
          className={cn(
            'grid',
            columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <StaggerItem key={i}>
                <div className="flex gap-4 border-b border-zinc-100 pb-6 mb-6 last:border-0 last:mb-0 last:pb-0">
                  <Icon className="w-5 h-5 text-zinc-900 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-zinc-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-zinc-600 leading-relaxed">{feature.body}</p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
