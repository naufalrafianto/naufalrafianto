import { Reveal } from '@/components/animation/Reveal';
import { CustomLink } from '@/components/common/CustomLink';
import { Heading } from '@/components/common/Heading';
import { ProjectCard } from '@/components/feature/ProjectCard';
import { getBlogPosts } from '@/lib/blog';
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
};

const PortfolioPage = async () => {
  const posts = await getBlogPosts();

  return (
    <main className="relative z-10 mt-6 px-8 pt-10 lg:px-20">
      <div className="inline-flex items-center sm:-ml-10">
        <ChevronLeftIcon className="mt-1 text-teal-300" />
        <CustomLink href="/">Back to home</CustomLink>
      </div>
      <section className="flex w-full flex-col items-center py-4 tracking-wide">
        <Reveal>
          <Heading variant={'gradient'} className="mx-auto w-full text-center sm:w-3/4">
            A small selection of recent projects
          </Heading>
        </Reveal>
        <Reveal className="my-4">
          <p className="mx-auto w-full text-center sm:w-3/5">
            I&apos;ve worked on a variety of projects, from simple websites to complex web applications. Here are a few
            of my favorites.
          </p>
        </Reveal>
        <div className="mx-auto grid grid-cols-1 gap-3 sm:grid-cols-3">
          {posts.map((post) => {
            return (
              <ProjectCard
                key={post.slug}
                title={post.metadata.title}
                description={post.metadata.desc}
                href={`/portfolio/${post.metadata.slug}`}
                dates={post.metadata.date}
                tags={post.metadata.stack as string[]}
                link={`/portfolio/${post.metadata.slug}`}
                image={post.metadata.thumbnail}
                slug={post.slug}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
};
export default PortfolioPage;
