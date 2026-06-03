/* ============================================================================
   SoftAppIcon — the Soft app icon (public/logo/softappicon.svg).

   The supplied asset already includes the brand squircle, so this just renders
   it inline. Decorative by default (aria-hidden); size it in `em` so it tracks
   the surrounding text. Inline use sits it just before a word, e.g. the "Soft"
   in a headline.
============================================================================ */

export function SoftAppIcon({ className, title }: { className?: string; title?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo/softappicon.svg"
      alt={title ?? ''}
      aria-hidden={title ? undefined : true}
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
