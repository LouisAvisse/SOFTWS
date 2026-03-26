import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { cn } from '@/lib/utils';

interface Metric {
  value: string;
  label: string;
  description?: string;
}

interface MetricScorecardProps {
  headline?: string;
  metrics: Metric[];
  columns?: 2 | 4;
  dark?: boolean;
}

export function MetricScorecard({ headline, metrics, columns = 4, dark = false }: MetricScorecardProps) {
  return (
    <section className={cn('py-24 lg:py-32', dark ? 'bg-zinc-950' : 'bg-zinc-50')}>
      <div className="container mx-auto">
        {headline && (
          <FadeIn className="mb-14">
            <h2 className={cn('text-3xl lg:text-4xl font-semibold tracking-tight', dark ? 'text-white' : 'text-zinc-900')}>
              {headline}
            </h2>
          </FadeIn>
        )}
        <StaggerGroup
          className={cn(
            'grid divide-y lg:divide-y-0',
            columns === 2 ? 'grid-cols-1 sm:grid-cols-2 sm:divide-x' : 'grid-cols-2 lg:grid-cols-4 lg:divide-x',
            dark ? 'divide-zinc-800' : 'divide-zinc-100',
          )}
        >
          {metrics.map((metric, i) => (
            <StaggerItem key={i}>
              <div className="px-6 py-8 first:pl-0 last-of-type:pr-0">
                <p className={cn('font-mono font-bold text-5xl mb-2', dark ? 'text-white' : 'text-zinc-900')}>
                  {metric.value}
                </p>
                <p className={cn('font-semibold text-base mb-1', dark ? 'text-zinc-300' : 'text-zinc-700')}>
                  {metric.label}
                </p>
                {metric.description && (
                  <p className={cn('text-sm', dark ? 'text-zinc-500' : 'text-zinc-500')}>
                    {metric.description}
                  </p>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
