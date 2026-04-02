import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: [
          'relative text-white rounded-xl',
          'bg-gradient-to-b from-zinc-700 to-zinc-900',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_-1px_0_0_rgba(0,0,0,0.3),0_1px_3px_rgba(0,0,0,0.12),0_0_0_1px_rgba(0,0,0,0.8)]',
          'hover:from-zinc-600 hover:to-zinc-800 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15),inset_0_-1px_0_0_rgba(0,0,0,0.3),0_2px_8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(0,0,0,0.7)]',
          'active:from-zinc-800 active:to-zinc-900 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.8)]',
        ].join(' '),
        outline: 'border border-zinc-900 text-zinc-900 bg-transparent hover:bg-zinc-900 hover:text-white rounded-xl',
        architectural: [
          'relative text-zinc-800 rounded-xl',
          'bg-gradient-to-b from-white to-zinc-50',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),inset_0_-1px_0_0_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.06),0_0_0_1px_rgba(0,0,0,0.1)]',
          'hover:from-zinc-50 hover:to-zinc-100 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.6),inset_0_-1px_0_0_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.12)]',
          'active:from-zinc-100 active:to-zinc-100 active:shadow-[inset_0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.1)]',
        ].join(' '),
        ghost: 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 rounded-xl',
        white: [
          'relative text-zinc-900 rounded-xl',
          'bg-gradient-to-b from-white to-zinc-50',
          'shadow-[inset_0_1px_0_0_rgba(255,255,255,0.9),inset_0_-1px_0_0_rgba(0,0,0,0.04),0_1px_3px_rgba(0,0,0,0.08),0_0_0_1px_rgba(255,255,255,0.6)]',
          'hover:from-zinc-50 hover:to-zinc-100 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8),0_2px_8px_rgba(0,0,0,0.1),0_0_0_1px_rgba(255,255,255,0.5)]',
          'active:from-zinc-100 active:to-zinc-100',
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
