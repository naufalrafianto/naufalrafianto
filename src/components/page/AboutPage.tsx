import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Heading } from '../common';
import { FadeUp, Reveal } from '../animation';
import { CustomLink } from '../common/CustomLink';
import GithubGraph from '../feature/GithubGraph';
import Avatar from '../feature/Avatar';
import Timeline from '../feature/Timeline';
import TechStackIcon from '../feature/TechIcon';

export const AboutPage = () => {
  return (
    <div className="overflow-hidden px-8 pt-10 sm:px-20 xl:px-40">
      <div className="inline-flex items-center sm:-ml-20">
        <ChevronLeftIcon className="mt-1 text-teal-300" />
        <CustomLink href="/">Back to home</CustomLink>
      </div>

      <section className="mt-5">
        <Reveal delay={1}>
          <Heading>About</Heading>
        </Reveal>
        <Reveal delay={1}>
          <Heading variant={'gradient'}>Muhammad Naufal Rafianto</Heading>
        </Reveal>
        <div className="relative mt-5 grid grid-cols-1 sm:grid-cols-[1fr_15rem]">
          <article className="prose dark:prose-invert space-y-4 sm:pr-10">
            <Reveal delay={1}>
              Hello! My name is Naufal. I started learning web development during my early years as a Computer
              Engineering student at the{' '}
              <CustomLink href={'https://www.its.ac.id/'} target="_blank">
                Institut Teknologi Sepuluh Nopember
              </CustomLink>{' '}
              (ITS). This was around the start of the pandemic when I had a lot more free time. To make good use of this
              time, I decided to dive into web development with a comprehensive Udemy course. This first step sparked my
              interest and passion for the field, encouraging me to explore more.
            </Reveal>
            <Reveal delay={1}>
              As I continued, YouTube became a valuable resource for me. I watched countless tutorials and videos, which
              helped me understand various web development concepts better. I focused mainly on{' '}
              <CustomLink href={'https://roadmap.sh/full-stack'} target="_blank">
                fullstack development
              </CustomLink>{' '}
              . The visual and hands-on approach of these videos made it easier for me to grasp complex ideas and apply
              them in my projects. Through this journey, I&apos;ve become skilled in a wide range of technologies,
              including Next.js, React, Express.js, Nest.js, and Golang.
            </Reveal>
          </article>
          <FadeUp>
            <Avatar className="order-2 mx-auto my-5 h-auto w-1/2 rounded-lg shadow sm:order-1 sm:w-full" />
          </FadeUp>
        </div>
        <GithubGraph />

        <div className="overflow-hidden">
          <FadeUp className="mt-10">
            <Heading>What I use</Heading>
          </FadeUp>
          {/* <TechList /> */}
          <FadeUp className="mb-10 mt-2.5">
            <TechStackIcon
              tooltip={true}
              IconSize="h-12 sm:h-14 w-12 sm:w-14"
              Tech={['nextjs', 'react', 'node', 'golang', 'tailwind']}
            />
          </FadeUp>
          <FadeUp>
            <h1 className="mb-4 text-3xl font-bold leading-tight tracking-tight transition-colors sm:text-7xl">
              Work Experience
            </h1>
          </FadeUp>

          <Timeline />
        </div>
      </section>
    </div>
  );
};
