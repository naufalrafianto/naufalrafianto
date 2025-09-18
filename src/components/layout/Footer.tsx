'use client';

import Image from 'next/image';
import { IconGroup } from '../feature/IconGroup';
import { icons } from '@/constant';
import { CustomLink } from '../common/CustomLink';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full overflow-y-hidden border-t border-gray-200/10 px-10 pb-10 pt-80 sm:px-40 sm:pt-0" id="contact">
      <div className="absolute bottom-0 left-0 h-80 w-full">
        <Image
          fill={true}
          src="/svg/footer-grid.svg"
          alt="grid"
          className="h-full w-full scale-150 opacity-100 sm:scale-100 sm:opacity-50"
        />
      </div>



      <div className="mt-10 flex flex-col items-center justify-between gap-y-4 md:flex-row">
        <h3 className="relative">
          Naufal
          <span className="absolute bottom-1 -right-3 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500"></span>
          </span>
        </h3>
        <ul className="flex justify-between gap-8">
          <li>
            <CustomLink href="/">Home</CustomLink>
          </li>
          <li>
            <CustomLink href="/about">About</CustomLink>
          </li>
          <li>
            <CustomLink href="/blog">Blog</CustomLink>
          </li>
          <li>
            <CustomLink href="/portfolio">Portfolio</CustomLink>
          </li>
        </ul>
      </div>

      <div className="relative mt-8 flex flex-col items-center gap-6">
        <div className="z-10 flex items-center gap-6 md:gap-3">
          <IconGroup icons={icons} />
        </div>

        <div className="z-10 my-6 h-px w-full bg-gray-200" />

        <p className="z-10 text-sm font-light md:text-base md:font-normal">
          Copyright © {year} Muhammad Naufal Rafianto
        </p>
      </div>
    </footer>
  );
};