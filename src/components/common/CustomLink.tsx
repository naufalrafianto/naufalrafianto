'use client';
import { cn } from '@/lib/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const linkVariant = cva(
  'animated-underline inline-flex items-center font-medium focus:outline-none focus-visible:ring focus-visible:ring-teal-300 border-b border-dotted border-white hover:border-black/0 ',
  {
    variants: {
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-xl',
      },
    },
    defaultVariants: {
      size: 'base',
    },
  }
);

export interface LinkProps extends React.ComponentPropsWithRef<'a'>, VariantProps<typeof linkVariant> {
  asChild?: boolean;
}

export const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(({ size, children, className, ...rest }, ref) => {
  return (
    <a ref={ref} {...rest} className={cn(linkVariant({ size }), className)}>
      <span className="whitespace-nowrap bg-gradient-to-tr from-teal-300 to-teal-500 bg-clip-text text-transparent">
        {children}
      </span>
    </a>
  );
});

CustomLink.displayName = 'CustomLink';
