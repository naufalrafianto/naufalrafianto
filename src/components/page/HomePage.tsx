'use client';
import Image from 'next/image';
import { IconGroup, NameAnimationHome } from '../feature';
import { FadeUp, Reveal } from '../animation';
import { icons } from '@/constant';

export const HomePage = () => {
  const age = new Date().getFullYear() - new Date('2003-12-11').getFullYear();

  return (
    <section className="flex max-w-7xl flex-col items-center justify-center gap-y-4 pt-4">
      <FadeUp>
        <Image
          src={'/image/profile-pict.png'}
          width={160}
          height={160}
          alt="profilepic"
          className="mt-2 rounded-full border-2 border-slate-400"
          priority
        />
      </FadeUp>
      <IconGroup icons={icons} />
      <NameAnimationHome />
      <Reveal className="-mt-5 mb-10 px-10 text-center text-xl tracking-tight text-slate-400 md:px-20 lg:px-60 lg:text-3xl">
        I am <span className="border-b font-medium text-slate-200">Naufal </span>
        {age} years old based on Surabaya, Indonesia and working as an freelance{' '}
        <span className="border-b font-medium text-slate-200">Full Stack Software Developer.</span>
      </Reveal>
    </section>
  );
};
