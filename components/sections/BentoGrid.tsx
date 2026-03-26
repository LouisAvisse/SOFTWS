import { type ReactNode, type ElementType } from 'react';
import Link from 'next/link';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';
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
    <section className={cn('py-24 lg:py-32', dark ? 'bg-zinc-950' : 'bg-white')}>
      <div className="container mx-auto">
        <StaggerGroup
          className={cn(
            'grid gap-4',
            columns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {items.map((item, i) => {
            const Icon = item.icon;
            const spanClass = item.size === 'lg' ? 'md:col-span-2' : '';
            const cardClass = cn(
              'group p-8 border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2',
              dark
                ? 'bg-zinc-900 border-zinc-800 text-white hover:bg-zinc-800 hover:-translate-y-0.5'
                : 'bg-white border-zinc-200 hover:bg-zinc-50 hover:-translate-y-0.5',
              item.href ? 'cursor-pointer' : '',
              spanClass,
            );

            const inner = (
              <>
                {Icon && <Icon className={cn('w-5 h-5 mb-4', dark ? 'text-zinc-400' : 'text-zinc-900')} />}
                <h3 className={cn('text-lg font-semibold mb-2', dark ? 'text-white' : 'text-zinc-900')}>
                  {item.title}
                </h3>
                <p className={cn('text-sm leading-relaxed', dark ? 'text-zinc-400' : 'text-zinc-600')}>
                  {item.body}
                </p>
                {item.visual && <div className="mt-6">{item.visual}</div>}
              </>
            );

            return (
              <StaggerItem key={i} className={spanClass}>
                {item.href ? (
                  <Link href={item.href} className={cardClass}>{inner}</Link>
                ) : (
                  <div className={cardClass}>{inner}</div>
                )}
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
