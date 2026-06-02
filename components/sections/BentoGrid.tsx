import { type ReactNode, type ElementType } from 'react';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { cn } from '@/lib/utils';

interface BentoItem {
  title: string;
  body: string;
  icon?: ElementType;
  size?: 'sm' | 'md' | 'lg';
  visual?: ReactNode;
  href?: string;
}

interface BentoGridProps {
  items: BentoItem[];
  columns?: 2 | 3;
  dark?: boolean;
}

export function BentoGrid({ items, columns = 3, dark = false }: BentoGridProps) {
  return (
    <section className={cn('section-padding', dark ? 'bg-ink-deep' : 'bg-canvas')}>
      <div className="max-w-content mx-auto px-6">
        <StaggerGroup
          className={cn(
            'grid gap-4',
            columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {items.map((item, i) => {
            const spanClass = item.size === 'lg' ? 'md:col-span-2' : '';
            return (
              <StaggerItem key={i} className={spanClass}>
                <FeatureCard
                  icon={item.icon}
                  media={item.icon ? 'box' : 'none'}
                  title={item.title}
                  body={item.body}
                  href={item.href}
                  footer={item.visual}
                  tone={dark ? 'dark' : 'default'}
                  className={spanClass}
                />
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
