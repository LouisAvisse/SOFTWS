'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CLIENT_LOGOS, type ClientLogo } from '@/lib/content/clients';

/* ============================================================================
   TrustLogos — the customer strip under the hero.

   A slow, seamless one-line marquee with faded edges: the logos stay on a
   single row (no wrapping on mobile, saving a line) and read as a calm, living
   ribbon. The real assets ship in clashing brand colors, so each is used as a
   CSS mask and filled with one warm token (--neutral-400), collapsing five
   palettes into a single monotone; each deepens on hover. Reduced-motion users
   get a static, centered, wrapping row with every logo fully visible.
   Per-logo height + intrinsic ratio live in lib/content/clients.ts.
============================================================================ */

const EDGE_FADE =
  'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)';

function Logo({ logo }: { logo: ClientLogo }) {
  return (
    <span
      role="img"
      aria-label={logo.name}
      className={cn(
        'block w-auto bg-faint transition-colors duration-300 hover:bg-body',
        logo.heightClass,
      )}
      style={{
        aspectRatio: logo.ratio,
        maskImage: `url(${logo.src})`,
        WebkitMaskImage: `url(${logo.src})`,
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  );
}

export function TrustLogos({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  // Mount guard: SSR and the first client paint both render the marquee, so the
  // reduced-motion swap can't cause a hydration mismatch. (The marquee is also
  // animation-frozen for reduced motion via CSS, so nothing moves regardless.)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Reduced motion: calm, fully-visible wrapping row (no scroll, no clipping).
  if (mounted && reduce) {
    return (
      <ul
        className={cn(
          'flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14 lg:gap-x-16',
          className,
        )}
        aria-label="Trusted by leading companies"
      >
        {CLIENT_LOGOS.map((logo) => (
          <li key={logo.name} className="flex items-center">
            <Logo logo={logo} />
          </li>
        ))}
      </ul>
    );
  }

  // The track animates -50%, so its two halves must each be at least as wide as
  // the strip or a blank gap scrolls through. Five logos (~800px) are narrower
  // than the ~1232px strip, so we render four copies: the -50% unit is then two
  // copies (~1600px), wider than the strip, and the loop stays seamless.
  return (
    <div
      className={cn('relative w-full overflow-hidden', className)}
      aria-label="Trusted by leading companies"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <div className="flex w-max animate-logo-marquee items-center hover:[animation-play-state:paused]">
        {[0, 1, 2, 3].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy !== 0}>
            {CLIENT_LOGOS.map((logo) => (
              <li key={logo.name} className="flex items-center pr-10 sm:pr-14 lg:pr-16">
                <Logo logo={logo} />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
