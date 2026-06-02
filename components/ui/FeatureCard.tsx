import { type ElementType, type ReactNode } from 'react';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/* ============================================================================
   FeatureCard — the ONE card for every icon / number + title + body block.

   One canonical shell (rounded-2xl, raised on a warm-paper section, subtle
   shadow, hover-lift with a brand accent line) plus a small, deliberate set of
   variants. Use this everywhere instead of hand-rolling card markup, so the UI
   stays seamless and the look is tunable from a single place.

     tone     default | highlight (subtle fill) | dark (inverse section)
     media    box (brand icon chip, default) | muted (neutral chip) |
              plain (bare icon) | number (mono index) | none
     featured pins the brand accent on + fills the icon chip (the "recommended"
              treatment)
     href     renders the whole card as a link
     mediaSlot / children let it host custom visuals or body content
============================================================================ */

const card = cva(
  'group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 lg:p-7',
  {
    variants: {
      tone: {
        default:
          'border-line bg-white shadow-[0_1px_2px_rgba(20,18,16,0.04)] hover:-translate-y-1 hover:border-edge hover:shadow-[0_22px_50px_-26px_rgba(20,18,16,0.28)]',
        highlight:
          'border-line bg-surface shadow-[0_1px_2px_rgba(20,18,16,0.04)] hover:-translate-y-1 hover:border-edge hover:shadow-[0_22px_50px_-26px_rgba(20,18,16,0.28)]',
        dark: 'border-ink-2 bg-ink text-white hover:-translate-y-1 hover:bg-ink-2',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

type Media = 'box' | 'muted' | 'plain' | 'number' | 'none';

export interface FeatureCardProps extends VariantProps<typeof card> {
  title?: string;
  body?: string;
  icon?: ElementType;
  /** 1-based index, rendered as "01" when media="number". */
  index?: number;
  media?: Media;
  /** Pins the brand accent on and fills the icon chip (the "recommended" look). */
  featured?: boolean;
  href?: string;
  /** Custom media (e.g. an illustration) in place of an icon. */
  mediaSlot?: ReactNode;
  /** Custom body content; replaces `body`. */
  children?: ReactNode;
  /** Optional footer visual rendered below the body. */
  footer?: ReactNode;
  className?: string;
}

function Chip({
  Icon,
  dark,
  featured,
  muted,
}: {
  Icon: ElementType;
  dark: boolean;
  featured: boolean;
  muted: boolean;
}) {
  return (
    <span
      className={cn(
        'mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-300',
        muted
          ? 'bg-mist text-muted'
          : featured
            ? 'bg-brand text-white ring-1 ring-inset ring-brand'
            : dark
              ? 'bg-white/10 text-white ring-1 ring-inset ring-white/15'
              : 'bg-brand/10 text-brand ring-1 ring-inset ring-brand/15 group-hover:bg-brand group-hover:text-white group-hover:ring-brand',
      )}
    >
      <Icon className="h-5 w-5" strokeWidth={1.75} />
    </span>
  );
}

export function FeatureCard({
  title,
  body,
  icon: Icon,
  index,
  media = 'box',
  tone,
  featured = false,
  href,
  mediaSlot,
  children,
  footer,
  className,
}: FeatureCardProps) {
  const dark = tone === 'dark';

  let mediaEl: ReactNode = null;
  if (mediaSlot) {
    mediaEl = <div className="mb-4">{mediaSlot}</div>;
  } else if (media === 'number' && index != null) {
    mediaEl = (
      <div className={cn('mb-6 font-mono text-3xl font-bold', dark ? 'text-brand-light' : 'text-brand')}>
        {String(index).padStart(2, '0')}
      </div>
    );
  } else if (Icon && media === 'plain') {
    mediaEl = <Icon className={cn('mb-4 h-5 w-5', dark ? 'text-faint' : 'text-ink')} strokeWidth={1.75} />;
  } else if (Icon && (media === 'box' || media === 'muted')) {
    mediaEl = <Chip Icon={Icon} dark={dark} featured={featured} muted={media === 'muted'} />;
  }

  const inner = (
    <>
      {!dark && (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-0 top-0 h-[3px] origin-left bg-brand transition-transform duration-300 ease-out',
            featured ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
          )}
        />
      )}
      {mediaEl}
      {title && (
        <h3 className={cn('mb-2 text-base font-semibold', dark ? 'text-white' : 'text-ink')}>{title}</h3>
      )}
      {children ??
        (body && (
          <p className={cn('text-sm leading-relaxed', dark ? 'text-faint' : 'text-body')}>{body}</p>
        ))}
      {footer && <div className="mt-6">{footer}</div>}
    </>
  );

  const cls = cn(
    card({ tone }),
    href &&
      'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2',
    className,
  );

  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
