import { Heading } from '../common/Heading';
import { CustomLink } from '../common/CustomLink';
import GithubGraph from '../feature/GithubGraph';
import Avatar from '../feature/Avatar';
import Timeline from '../feature/Timeline';
import { TechIcon } from '../feature/TechIcon';
import Animation from '../animation';
import { Breadcrumb } from '../common/BreadCrumb';

export const AboutPage = () => {
  return (
    <div className="overflow-hidden px-8 pt-10 sm:px-20 xl:px-40">
      <Breadcrumb />

      <section className="mt-5">
        <Animation.Reveal>
          <Heading>About</Heading>
        </Animation.Reveal>
        <Animation.Reveal>
          <Heading variant={'gradient'}>Muhammad Naufal Rafianto</Heading>
        </Animation.Reveal>
        <div className="relative mt-5 grid grid-cols-1 sm:grid-cols-[1fr_15rem]">
          <article className="flex flex-col gap-6 text-lg leading-relaxed tracking-wide sm:pr-10 sm:text-base">
            <Animation.Reveal>
              Hello! My name is Naufal. I started learning web development during my early years as a Computer
              Engineering student at the{' '}
              <CustomLink className="text-lg" href={'https://www.its.ac.id/'} target="_blank">
                Institut Teknologi Sepuluh Nopember
              </CustomLink>{' '}
              (ITS). This was around the start of the pandemic when I had a lot more free time. To make good use of this
              time, I decided to dive into web development with a comprehensive Udemy course. This first step sparked my
              interest and passion for the field, encouraging me to explore more.
            </Animation.Reveal>
            <Animation.Reveal>
              As I continued, YouTube became a valuable resource for me. I watched countless tutorials and videos, which
              helped me understand various web development concepts better. I focused mainly on{' '}
              <CustomLink className="text-lg" href={'https://roadmap.sh/full-stack'} target="_blank">
                fullstack development
              </CustomLink>{' '}
              . The visual and hands-on approach of these videos made it easier for me to grasp complex ideas and apply
              them in my projects. Through this journey, I&apos;ve become skilled in a wide range of technologies,
              including Next.js, React, Express.js, Nest.js, and Golang.
            </Animation.Reveal>
          </article>
          <Animation.FadeUp>
            <Avatar className="order-2 mx-auto my-5 h-auto w-1/2 rounded-lg shadow sm:order-1 sm:w-full" />
          </Animation.FadeUp>
        </div>
        <GithubGraph />

        <div className="overflow-hidden">
          <Animation.FadeUp className="mt-10">
            <Heading>What I use</Heading>
          </Animation.FadeUp>
          {/* <TechList /> */}
          <Animation.FadeUp className="mb-10 mt-2.5">
            <TechIcon
              tooltip={true}
              IconSize="h-12 sm:h-14 w-12 sm:w-14"
              Tech={['nextjs', 'react', 'node', 'golang', 'tailwind', 'nestjs']}
            />
          </Animation.FadeUp>
          <Animation.FadeUp>
            <Heading className="mb-2">Work Experience</Heading>
          </Animation.FadeUp>

          <Timeline />
        </div>
      </section>
    </div>
  );
};
