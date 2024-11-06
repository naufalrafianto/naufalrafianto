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
import { motion } from 'framer-motion';
import { FaArrowRight, FaBlog, FaCode, FaComment, FaGithub, FaLaptopCode, FaRocket } from 'react-icons/fa';
import { IconBox } from '../common/IconBox';

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
      <Animation.Reveal className="-mt-5 mb-10 px-10 text-center text-xl tracking-tight text-slate-400 md:px-20 lg:px-60 lg:text-2xl">
        I am <span className="border-b font-medium text-slate-200">Naufal </span>
        {age} years old based on <span className="border-b font-medium text-slate-200"> Indonesia </span>and working as
        an freelance Full Stack Software Developer. I specialize in transforming designs into functional,
        high-performing web applications.
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
          <motion.div
            className={cn(
              'relative h-full w-full overflow-hidden rounded-md bg-gradient-to-br from-white/10 to-white/5 p-1',
              'backdrop-blur-lg transition-all duration-300 hover:shadow-lg',
              'dark:from-gray-800/10 dark:to-gray-900/5'
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-500/20 opacity-50" />

            <div className="relative h-full w-full rounded-xl bg-white/5 p-4 dark:bg-gray-900/5">
              <div className="absolute right-0 top-0 h-40 w-40 md:h-60 md:w-60">
                <Image
                  width={500}
                  height={500}
                  src={'/svg/grid.svg'}
                  alt={'Background Pattern'}
                  className="opacity-20"
                />
              </div>

              <div className="absolute bottom-0 right-0 h-32 w-32 md:h-48 md:w-48">
                <Image width={500} height={500} src={'/svg/b4.svg'} alt={'Decorative Shape'} className="opacity-30" />
              </div>

              <div className="relative z-10 flex h-full flex-col justify-end space-y-2">
                <div className="text-sm font-light text-gray-300 dark:text-gray-400">About page</div>
                <div className="text-2xl font-bold text-white dark:text-gray-100">Get to know me</div>
                <motion.div
                  className="mt-2 h-1 w-12 bg-teal-400"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </BentoGridComponent>

        {/* ==== Blog BOX */}
        <BentoGridComponent href="/blog" className="col-span-1 xl:row-span-4">
          <motion.div
            className={cn(
              'relative h-full w-full overflow-hidden rounded-md',
              'transition-all duration-300 hover:shadow-lg'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <BackgroundGradientAnimation>
              <div className="relative z-10 flex h-full w-full flex-col justify-between p-8">
                <div>
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 text-4xl font-bold text-white"
                  >
                    My Blog
                  </motion.div>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-6 text-lg text-gray-200"
                  >
                    Dive into the world of development and innovation
                  </motion.p>
                </div>

                <div className="mb-6 grid grid-cols-3 gap-4">
                  <IconBox icon={<FaCode />} text="Coding" />
                  <IconBox icon={<FaRocket />} text="Innovation" />
                  <IconBox icon={<FaBlog />} text="Insights" />
                </div>

                <motion.div
                  className="inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Blog
                </motion.div>
              </div>
            </BackgroundGradientAnimation>
          </motion.div>
        </BentoGridComponent>

        {/* ==== GITHUB BOX */}
        <BentoGridComponent href="https://github.com/naufalrafianto" className="xl:col-span-2 xl:row-span-3">
          <motion.div
            className={cn(
              'relative h-full overflow-hidden rounded-md bg-gradient-to-br from-gray-900 to-gray-800',
              'transition-all duration-300 hover:shadow-lg'
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-[url('/svg/grid.svg')] opacity-10" />

            <div className="relative h-full w-full p-6">
              <div className="mb-6 flex items-center space-x-4">
                <FaGithub className="text-4xl text-white" />
                <div>
                  <div className="text-sm font-light text-gray-300">The Inside Scoop</div>
                  <div className="text-xl font-bold text-white">My GitHub Profile</div>
                </div>
              </div>

              <div className="mb-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <FaCode className="mb-2 text-teal-400" />
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-sm text-gray-300">Repositories</div>
                </div>
                <div className="rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                  <FaComment className="mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-sm text-gray-300">Total Commits</div>
                </div>
              </div>

              <div className="absolute bottom-0 right-0 h-40 w-40 opacity-20 md:h-60 md:w-60">
                <Image width={500} height={500} src={'/svg/b5.svg'} alt={'Decorative Shape'} className="object-cover" />
              </div>

              <motion.div
                className="absolute bottom-6 left-6 right-6 h-1 bg-gradient-to-r from-teal-400 to-purple-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </BentoGridComponent>

        <BentoGridComponent href="/portfolio" className="xl:col-span-1 xl:row-span-2">
          <motion.div
            className={cn(
              'relative overflow-hidden rounded-md bg-gradient-to-br from-indigo-500 to-purple-600',
              'group transition-all duration-300 hover:shadow-lg'
            )}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="absolute inset-0 bg-black opacity-50" />

            <div className="relative flex h-full w-full flex-col justify-between p-6">
              <div>
                <FaLaptopCode className="mb-4 text-4xl text-white" />
                <h3 className="mb-2 text-xl font-bold text-white">Portfolio Showcase</h3>
                <p className="text-sm text-indigo-100">Explore my creative works and projects</p>
              </div>

              <div className="mt-4">
                <motion.div className="flex items-center text-white group-hover:underline" whileHover={{ x: 5 }}>
                  <span className="mr-2">View Portfolio</span>
                  <FaArrowRight />
                </motion.div>
              </div>
            </div>

            <div className="absolute -bottom-16 -right-16 h-48 w-48 md:h-64 md:w-64">
              <Image
                width={500}
                height={500}
                src={'/image/laptop.png'}
                alt={'Portfolio Background'}
                className="rotate-12 transform object-cover opacity-30"
              />
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-white"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        </BentoGridComponent>
      </BentoGrid>
    </section>
  );
};
