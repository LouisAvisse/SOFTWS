import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm font-semibold tracking-wider text-[10px] uppercase transition-colors',
  {
    variants: {
      variant: {
        default: 'border border-zinc-200 bg-zinc-50 text-zinc-700 px-2.5 py-0.5',
        secondary: 'bg-zinc-100 text-zinc-800 px-2.5 py-0.5',
        dark: 'bg-zinc-900 text-zinc-50 px-2.5 py-0.5',
        outline: 'border border-zinc-300 text-zinc-600 px-2.5 py-0.5',
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
