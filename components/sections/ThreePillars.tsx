import { type ReactNode, type ElementType } from 'react';
import { FadeIn } from '@/components/motion/FadeIn';
import { StaggerGroup, StaggerItem } from '@/components/motion/StaggerGroup';

interface Pillar {
  icon: ElementType;
  title: string;
  body: string;
  visual?: ReactNode;
}

interface ThreePillarsProps {
  headline?: string;
  pillars: [Pillar, Pillar, Pillar];
}

export function ThreePillars({ headline, pillars }: ThreePillarsProps) {
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
        <StaggerGroup className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={i}>
                <div className="group border border-zinc-200 bg-white p-8 h-full transition-all duration-200 hover:-translate-y-1 hover:border-zinc-400">
                  <Icon className="w-6 h-6 text-zinc-900 mb-4" />
                  <h3 className="text-xl font-semibold text-zinc-900 mb-3">{pillar.title}</h3>
                  <p className="text-base text-zinc-600 leading-relaxed">{pillar.body}</p>
                  {pillar.visual && (
                    <div className="mt-6">{pillar.visual}</div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
