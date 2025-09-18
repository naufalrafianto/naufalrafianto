'use client';

import { icons } from '@/constant';

import Image from 'next/image';
import { useNowPlaying } from '@/lib/spotify';
import dynamic from 'next/dynamic';
import { IconGroup } from '../feature/IconGroup';
import { NameAnimationHome } from '../feature/NameAnimationHome';
import Animation from '../animation';
import { motion } from "framer-motion"

const NowPlayingComponent = dynamic(() => import('../feature/SpotifyComponent/NowPlayingComponent'), { ssr: false });

export const HomePage = () => {

  const { nowPlaying } = useNowPlaying();

  return (
    <section className="mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center gap-y-4 py-4">
      <Animation.FadeUp>
        <Image
          src={'/image/profile-pict.png'}
          width={160}
          height={160}
          alt="profilepic"
          className="border-slate- mt-2 h-auto w-[110%] rounded-full border-2"
          priority
        />
      </Animation.FadeUp>
      <IconGroup icons={icons} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.5,
          duration: 0.6,
          ease: [0.23, 1, 0.32, 1],
        }}
        className="mx-auto mt-4 flex flex-col sm:flex-row items-center gap-4 justify-center"
      >
        {/* <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-gradient-to-r from-green-500/[0.08] to-green-500/[0.16] px-4 py-2 backdrop-blur-md">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500"></span>
          </span>
          <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-sm font-semibold tracking-wide text-transparent">
            Currently unemployed
          </span>
        </div> */}

        <NowPlayingComponent data={nowPlaying} />
      </motion.div>
      <NameAnimationHome />
      <Animation.Reveal className="mb-10 px-6 text-center md:px-16 lg:px-64">
        <p className="text-lg font-light md:text-xl lg:text-2xl">
          <span className="text-slate-400">Hi there! I&apos;m</span>{' '}
          <span className="border-b-2 border-teal-400 font-semibold text-slate-200 transition-colors duration-300 ease-in-out hover:border-teal-600 hover:text-teal-400">
            Muhammad Naufal Rafianto
          </span>
          <span className="text-slate-400">, an enthusiastic</span>{' '}
          <span className="bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
            Full Stack Software Developer
          </span>{' '}
          <span className="text-slate-400">
            with a passion for creating innovative solutions. I&apos;m currently based in
          </span>{' '}
          <span className="border-b-2 border-teal-400 font-semibold text-slate-200 transition-colors duration-300 ease-in-out hover:border-teal-600 hover:text-teal-400">
            Indonesia
          </span>
          <span className="text-slate-400">, where I leverage my skills to build cutting-edge web applications.</span>
        </p>
      </Animation.Reveal>
    </section>
  );
};
