'use client';
import { TECH_STACK } from '@/constant';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import React from 'react';

type TechStackItem = {
  Tech: string[] | undefined;
  IconSize?: string;
  tooltip: boolean;
};

export function TechIcon({ Tech, IconSize = 'h-14 w-14 lg:h-10 lg:w-10', tooltip = true }: TechStackItem) {
  return (
    <div className="flex">
      {TECH_STACK.map((item) => {
        if (Tech?.includes(item.id)) {
          return (
            <div key={item.id} className={cn(IconSize, 'group relative mr-2 flex items-center justify-center')}>
              <Image width={50} height={50} src={`/icon/${item.id}.svg`} alt="icon" />
              {tooltip && (
                <div className="absolute bottom-full mb-2 hidden w-max max-w-xs rounded-md bg-black px-2 py-1 text-sm text-white group-hover:block">
                  {item.label}
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
