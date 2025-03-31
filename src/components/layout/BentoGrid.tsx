'use client';

import { cn } from '@/lib/cn';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaBlog, FaGithub, FaComment, FaLaptopCode, FaArrowRight } from 'react-icons/fa';
import * as React from 'react';


export const BentoGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto grid h-full max-w-4xl grid-cols-1 gap-4 px-4 sm:px-0 md:grid-cols-2">
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
        'group/bento relative flex min-h-[10rem] flex-col items-start justify-between overflow-hidden rounded-md',
        'border border-gray-800 bg-gray-900/50 backdrop-blur-sm',
        'transition duration-300 hover:border-teal-500/50 hover:shadow-[0_0_15px_rgba(20,184,166,0.15)]',
        className
      )}
    >
      <Link href={href} className="h-full w-full">
        {children}
      </Link>
    </div>
  );
};