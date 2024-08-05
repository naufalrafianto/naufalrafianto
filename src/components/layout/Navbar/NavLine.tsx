import React from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/lib/cn';

interface NavMenuLineProps {
  title: string;
}
const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn('bg-border shrink-0', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', className)}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export default function NavMenuLine({ title }: NavMenuLineProps) {
  return (
    <div className="px-[clamp(1.25rem,3vw,2.5rem)]">
      <span className="text-xl font-semibold text-zinc-200">{title}</span>
      <Separator className="mb-2 mt-2 bg-zinc-200/50" />
    </div>
  );
}
