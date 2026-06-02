/* eslint-disable @next/next/no-img-element */
import { cn } from '@/lib/utils';
import { CLIENT_LOGOS } from '@/lib/content/clients';

/* ============================================================================
   TrustLogos — the static customer strip under the hero.

   Renders the real client logos (public/logo/clients/*) muted and grayscale so
   the row stays calm and on-brand; each lifts to full strength on hover. Plain
   <img> is used because the assets are SVG-wrapped PNGs (next/image would need
   dangerouslyAllowSVG). Per-logo heights live in lib/content/clients.ts.
============================================================================ */

export function TrustLogos({ className }: { className?: string }) {
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
          <img
            src={logo.src}
            alt={logo.name}
            loading="lazy"
            decoding="async"
            className={cn(
              'w-auto object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0',
              logo.heightClass,
            )}
          />
        </li>
      ))}
    </ul>
  );
}
