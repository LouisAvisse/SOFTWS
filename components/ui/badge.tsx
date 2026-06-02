import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm font-semibold tracking-wider text-[10px] uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-line bg-surface text-ink-3 px-2.5 py-0.5',
        secondary: 'bg-mist text-ink-2 px-2.5 py-0.5',
        dark: 'bg-ink text-surface px-2.5 py-0.5',
        outline: 'border border-edge text-body px-2.5 py-0.5',
      },
    },
    defaultVariants: { variant: 'default' },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
