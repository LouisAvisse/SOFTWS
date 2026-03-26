import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-zinc-900 text-white hover:bg-zinc-800',
        outline: 'border border-zinc-900 text-zinc-900 bg-transparent hover:bg-zinc-900 hover:text-white',
        architectural: 'border border-zinc-900 text-zinc-900 bg-transparent hover:bg-zinc-900 hover:text-white',
        ghost: 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900',
        white: 'bg-white text-zinc-900 hover:bg-zinc-50',
        'white-outline': 'border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
      },
      size: {
        sm: 'h-8 px-4 text-xs',
        default: 'h-10 px-6',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-base',
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
