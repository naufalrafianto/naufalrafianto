'use client';
import { BentoGrid, BentoGridComponent } from '../layout/BentoGrid';

import { icons } from '@/constant';

import Image from 'next/image';
import { BackgroundGradientAnimation } from '../layout/GradientBackground';
import { cn } from '@/lib/cn';
import { useNowPlaying } from '@/lib/spotify';
import dynamic from 'next/dynamic';
import { IconGroup } from '../feature/IconGroup';
import { NameAnimationHome } from '../feature/NameAnimationHome';
import Animation from '../animation';

const NowPlayingComponent = dynamic(() => import('../feature/SpotifyComponent/NowPlayingComponent'), { ssr: false });

export const HomePage = () => {
  const age = new Date().getFullYear() - new Date('2003-12-11').getFullYear();

  const { nowPlaying } = useNowPlaying();

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-y-4 py-4">
      <Animation.FadeUp>
        <Image
          src={'/image/profile-pict.png'}
          width={160}
          height={160}
          alt="profilepic"
          className="mt-2 rounded-full border-2 border-slate-400"
          priority
        />
      </Animation.FadeUp>
      <IconGroup icons={icons} />
      <NameAnimationHome />
      <Animation.Reveal className="-mt-5 mb-10 px-10 text-center text-xl tracking-tight text-slate-400 md:px-20 lg:px-60 lg:text-3xl">
        I am <span className="border-b font-medium text-slate-200">Naufal </span>
        {age} years old based on <span className="border-b font-medium text-slate-200"> Indonesia </span>and working as
        an freelance Full Stack Software Developer.
      </Animation.Reveal>
      <BentoGrid>
        {/* ==== NOW PLAYING BOX */}
        <BentoGridComponent
          href={!nowPlaying ? 'https://open.spotify.com/user/g82swyx3uiwbvl9qzf3k13jo1' : nowPlaying?.songUrl || ''}
          className="relative col-span-1 flex h-full w-full items-center justify-center xl:row-span-3"
        >
          <NowPlayingComponent data={nowPlaying} />
        </BentoGridComponent>

        {/* ==== ABOUT BOX */}
        <BentoGridComponent href="/about" className="col-span-1 xl:row-span-3">
          <div className="absolute h-full w-full">
            <Image
              width={500}
              height={500}
              src={'/svg/grid.svg'}
              alt={'About Image'}
              className={cn('absolute right-0 w-60 object-cover object-center md:w-96')}
            />
          </div>
          <div className="absolute bottom-0 right-0 z-10 w-full opacity-80">
            <Image
              width={500}
              height={500}
              src={'/svg/b4.svg'}
              alt={''}
              className="z-50 h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative flex min-h-40 flex-col justify-center p-3 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-4">
            <div className="z-10 text-sm font-extralight text-[#C1C2D3] md:max-w-32 md:text-xs">About page</div>
            <div className={`z-10 max-w-96 text-lg font-bold lg:text-xl`}>Get to know me</div>
          </div>
        </BentoGridComponent>

        {/* ==== Blog BOX */}
        <BentoGridComponent href="/blog" className="col-span-1 xl:row-span-4">
          <BackgroundGradientAnimation>
            <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl"></div>
          </BackgroundGradientAnimation>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-3xl font-bold text-white md:text-4xl lg:text-7xl">
            <div
              className={`bg-gradient-to-b from-white/80 to-white/20 bg-clip-text text-lg font-bold text-transparent drop-shadow-2xl lg:text-2xl`}
            >
              Tech enthusiast with a passion for development.
            </div>
          </div>
        </BentoGridComponent>

        {/* ==== GITHUB BOX */}
        <BentoGridComponent href="https://github.com/naufalrafianto" className="xl:col-span-2 xl:row-span-3">
          <div className="absolute h-full w-full">
            <Image
              width={500}
              height={500}
              src={'/svg/grid.svg'}
              alt={'About Image'}
              className={cn('absolute right-0 w-60 object-cover object-center md:w-96')}
            />
          </div>
          <div className="justify-betwen absolute bottom-0 right-0 z-10 flex h-full w-full opacity-50">
            <Image width={500} height={500} src={'/svg/b5.svg'} alt={''} className="h-full w-full object-cover" />
          </div>
          <div className="relative flex min-h-40 flex-col justify-center p-3 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-4">
            <div className="z-10 text-sm font-extralight text-[#C1C2D3] md:max-w-32 md:text-xs">The Inside Scoop</div>
            <div className={`z-10 max-w-96 text-lg font-bold lg:text-xl`}>Checkout My Github Profile</div>
          </div>
        </BentoGridComponent>

        <BentoGridComponent href="/portfolio" className="xl:col-span-1 xl:row-span-2">
          <div className="absolute h-full w-full">
            <Image
              width={500}
              height={500}
              src={'/svg/b1.svg'}
              alt={'Portfolio Image'}
              className={cn('absolute right-0 h-full w-full object-cover object-center')}
            />
          </div>
          <div className="relative flex min-h-40 flex-col justify-center p-3 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-4">
            <div className="z-10 text-sm font-extralight text-[#C1C2D3] md:max-w-32 md:text-xs">
              See all my portfolios
            </div>
            <div className={`z-10 max-w-96 text-lg font-bold lg:text-xl`}>Portfolio page</div>
          </div>
        </BentoGridComponent>
      </BentoGrid>
    </section>
  );
};
