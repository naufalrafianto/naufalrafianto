'use client';

import Image from 'next/image';
import { IconGroup } from '../feature/IconGroup';
import { icons } from '@/constant';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="relative w-full overflow-y-hidden px-10 pb-10 pt-80 sm:px-40 sm:pt-20" id="contact">
      <div className="absolute bottom-0 left-0 h-80 w-full">
        <Image
          fill={true}
          src="/svg/footer-grid.svg"
          alt="grid"
          className="h-full w-full scale-150 opacity-100 sm:scale-100 sm:opacity-50"
        />
      </div>

      <Link href="mailto:developer.naufal@gmail.com" className="flex flex-col items-center">
        <button className="relative p-[3px]">
          <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-teal-300 to-teal-500" />
          <div className="group relative rounded-[6px] bg-black px-8 py-2 text-white transition duration-200 hover:bg-transparent hover:text-black">
            Let&apos;s get in touch
          </div>
        </button>
      </Link>
      <div className="mt-10 flex flex-col items-center justify-between gap-y-4 md:flex-row">
        <p className="z-10 text-sm font-light md:text-base md:font-normal">
          Copyright © 2024 Muhammad Naufal Rafianto
        </p>

        <div className="z-10 flex items-center gap-6 md:gap-3">
          <IconGroup icons={icons} />
        </div>
      </div>
    </footer>
  );
};
