import { Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/motion/FadeIn';

interface DarkCardProps {
  headline: string;
  headlineBold?: string;
  body: string;
  features?: string[];
  badge?: string;
}

export function DarkCard({ headline, headlineBold, body, features, badge }: DarkCardProps) {
  return (
    <section
      className="relative py-24 bg-zinc-950 overflow-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)',
      }}
    >
      <div className="container mx-auto relative">
        <FadeIn className="max-w-3xl">
          {badge && (
            <Badge variant="dark" className="mb-6 border-zinc-700 bg-zinc-800 text-zinc-300">
              {badge}
            </Badge>
          )}
          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-2">
            {headline}{' '}
            {headlineBold && <span className="italic">{headlineBold}</span>}
          </h2>
          <p className="text-lg text-zinc-400 leading-relaxed mt-4 mb-10 max-w-2xl">
            {body}
          </p>
          {features && features.length > 0 && (
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <span className="text-sm text-zinc-300">{f}</span>
                </div>
              ))}
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}
