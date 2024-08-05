import React from 'react';
import { type VariantProps, cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/cn';
import Link from 'next/link';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-slate-200 text-slate-950 shadow hover:bg-teal-300 ',
        outline: 'border border-input bg-background shadow-sm hover:bg-teal-300/90 hover:text-slate-950/90',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
        logo: 'h-12 w-12 py-2',
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

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = 'Button';

export const MagicButton = ({
  title,
  icon,
  href,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  href: string;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <Link
      href={href}
      className="relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] text-sm focus:outline-none md:w-60"
      onClick={handleClick}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] rounded-lg bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#5eead4_50%,#E2CBFF_100%)]" />

      <span
        className={`inline-flex h-full w-full cursor-pointer flex-nowrap items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-slate-950 px-5 font-medium text-white backdrop-blur-3xl transition-colors hover:bg-white hover:text-black ${otherClasses}`}
      >
        {position === 'left' && icon}
        {title}
        {position === 'right' && icon}
      </span>
    </Link>
  );
};
