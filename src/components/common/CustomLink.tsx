'use client';
import { cn } from '@/lib/cn';
import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

const linkVariant = cva(
  'group relative inline-flex items-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900',
  {
    variants: {
      variant: {
        default: 'text-gray-300 hover:text-white',
        gradient: 'bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent hover:from-teal-300 hover:to-blue-400',
        accent: 'text-teal-400 hover:text-teal-300',
        subtle: 'text-gray-400 hover:text-gray-200',
      },
      size: {
        sm: 'text-sm',
        base: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl',
      },
      underline: {
        none: '',
        simple: 'border-b border-current border-opacity-30 hover:border-opacity-100',
        animated: 'after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full',
        dotted: 'border-b border-dotted border-current border-opacity-50 hover:border-opacity-100',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'base',
      underline: 'animated',
    },
  }
);

export interface LinkProps extends React.ComponentPropsWithRef<'a'>, VariantProps<typeof linkVariant> {
  asChild?: boolean;
}

export const CustomLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ variant, size, underline, children, className, ...rest }, ref) => {
    return (
      <a
        ref={ref}
        {...rest}
        className={cn(linkVariant({ variant, size, underline }), className)}
      >
        {children}
      </a>
    );
  }
);

CustomLink.displayName = 'CustomLink';