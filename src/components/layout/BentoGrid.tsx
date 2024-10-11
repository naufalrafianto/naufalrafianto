'use client';
import { cn } from '@/lib/cn';
import Link from 'next/link';
import * as React from 'react';

export const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto grid h-full w-full grid-cols-1 gap-4 px-4 sm:px-0 md:grid-cols-2 xl:grid-cols-3 xl:grid-rows-6">
      {children}
    </div>
  );
};

export const BentoGridComponent = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'group/bento relative flex min-h-[10rem] flex-col items-start justify-between overflow-hidden rounded-md border border-white/[0.1] transition duration-200 hover:shadow-xl',
        className
      )}
    >
      <Link href={href} className="h-full w-full">
        {children}
      </Link>
    </div>
  );
};
