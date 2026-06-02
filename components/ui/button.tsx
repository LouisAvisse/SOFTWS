import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        // Primary CTA — brand-colored. Appearance lives in the
        // shared .cta-primary class (see globals.css).
        default: 'cta-primary rounded-xl focus-visible:ring-brand',
        outline: 'border border-ink text-ink bg-transparent hover:bg-ink hover:text-white rounded-xl',
        architectural: [
          'relative text-ink-2 rounded-xl',
          'bg-gradient-to-b from-white to-surface',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.1)]',
          'hover:from-surface hover:to-mist hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.12)]',
          'active:from-mist active:to-mist active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.1)]',
        ].join(' '),
        ghost: 'text-ink-3 hover:bg-mist hover:text-ink rounded-xl',
        white: [
          'relative text-ink rounded-xl',
          'bg-gradient-to-b from-white to-surface',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),inset_0_-1px_0_0_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.6)]',
          'hover:from-surface hover:to-mist hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)]',
          'active:from-mist active:to-mist',
        ].join(' '),
        'white-outline': [
          'relative text-white rounded-xl',
          'bg-white/5 backdrop-blur-sm',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_0_0_1px_rgba(255,255,255,0.2)]',
          'hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),0_0_0_1px_rgba(255,255,255,0.3)]',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-4 text-xs',
        default: 'h-10 px-5 text-sm',
        lg: 'h-11 px-6 text-[0.9rem]',
        xl: 'h-12 px-8 text-[0.95rem]',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
