'use client';
import { FaLocationArrow } from 'react-icons/fa6';

import Image from 'next/image';
import { MagicButton } from '../common/Button';
import { IconGroup } from '../feature/IconGroup';
import { icons } from '@/constant';

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

      <div className="flex flex-col items-center">
        <MagicButton
          href="mailto:mnaufalrafianto@gmail.com"
          title="Let's get in touch"
          icon={<FaLocationArrow />}
          position="right"
        />
      </div>
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
