import { cn } from '@/lib/utils';
import { CLIENT_LOGOS } from '@/lib/content/clients';

/* ============================================================================
   TrustLogos — the static customer strip under the hero.

   The real client logos (public/logo/clients/*) ship in clashing brand colors,
   so instead of rendering them as <img> we use each asset as a CSS mask and
   fill the silhouette with one pale, warm token (--neutral-400). That collapses
   five palettes into a single calm monotone that sits on the cream canvas
   without competing with the hero; each logo deepens a step on hover. Per-logo
   height + intrinsic ratio (mask boxes can't infer width) live in
   lib/content/clients.ts.
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
        </li>
      ))}
    </ul>
  );
}
