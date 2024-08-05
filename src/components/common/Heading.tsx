import { cn } from '@/lib/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const HeadingVariant = cva('w-full  font-black', {
  variants: {
    size: {
      sm: 'text-3xl',
      base: 'text-5xl',
      lg: 'text-7xl',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
    variant: {
      gradient: 'bg-gradient-to-tr from-teal-300 to-teal-600 bg-clip-text text-transparent',
      default: 'text-white',
    },
  },
  defaultVariants: {
    size: 'base',
    align: 'left',
    variant: 'default',
  },
});

export interface HeadingProps extends React.ComponentPropsWithRef<'h1'>, VariantProps<typeof HeadingVariant> {
  asChild?: boolean;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, size, align, className, variant, ...props }, ref) => {
    return (
      <h1 className={cn(HeadingVariant({ size, align, variant }), className)} ref={ref} {...props}>
        {children}
      </h1>
    );
  }
);

Heading.displayName = 'Heading';
