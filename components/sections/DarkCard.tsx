'use client';

import { useRef } from 'react';
import { Check } from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface DarkCardProps {
  headline: string;
  headlineBold?: string;
  body: string;
  features?: string[];
  badge?: string;
}

export function DarkCard({ headline, headlineBold, body, features, badge }: DarkCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-zinc-950 overflow-hidden"
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)',
      }}
    >
      {/* Noise grain texture overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <filter id="darkcard-noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#darkcard-noise)" />
        </svg>
      </div>

      <div className="max-w-[1050px] mx-auto px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          {badge && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6"
            >
              <Badge variant="dark" className="border-zinc-700 bg-zinc-800 text-zinc-300">
                {badge}
              </Badge>
            </motion.div>
          )}

          <h2 className="text-3xl lg:text-4xl font-semibold tracking-tight text-white mb-2">
            <motion.span
              initial={{ clipPath: 'inset(100% 0 0 0)' }}
              animate={inView ? { clipPath: 'inset(0% 0 0 0)' } : {}}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="block"
            >
              {headline}{' '}
              {headlineBold && <span className="italic">{headlineBold}</span>}
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="text-lg text-zinc-400 leading-relaxed mt-4 mb-10 max-w-2xl mx-auto"
          >
            {body}
          </motion.p>

          {features && features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.5 + i * 0.06 }}
                  className="flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <span className="text-sm text-zinc-300">{f}</span>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
