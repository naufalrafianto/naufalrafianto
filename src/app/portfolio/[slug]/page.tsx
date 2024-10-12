import { getPost } from '@/lib/portfolio';
import { formatDate } from '@/lib/date';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { FaChrome } from 'react-icons/fa';
import { Heading } from '@/components/common/Heading';
import { CloudImg } from '@/components/common/CloudImg';
import TableOfContents from '@/components/feature/TableofContent';
import Link from 'next/link';
import { Breadcrumb } from '@/components/common/BreadCrumb';
import Animation from '@/components/animation';

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getPost(params.slug);

  if (!post) {
    return;
  }

  let { title, date: publishedTime, desc: description, thumbnail: image } = post.metadata;
  let ogImage = image ? `https://naufalrafianto.dev${image}` : `https://naufalrafianto.dev/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `https://naufalrafianto.dev/portfolio/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PortfolioPost({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section id="portfolio-post" className="relative min-h-screen">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.metadata.title,
            datePublished: post.metadata.date,
            dateModified: post.metadata.date,
            description: post.metadata.desc,
            image: post.metadata.thumbnail
              ? `https://naufalrafianto.dev${post.metadata.thumbnail}`
              : `https://naufalrafianto.dev/og?title=${post.metadata.title}`,
            url: `https://naufalrafianto.dev/portfolio/${post.slug}`,
            author: {
              '@type': 'Person',
              name: 'Muhammad Naufal Rafianto',
            },
          }),
        }}
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Animation.FadeUp className="mb-8 inline-flex items-center">
          <Breadcrumb />
        </Animation.FadeUp>

        <Animation.FadeUp delay={1} className="mb-8">
          <CloudImg
            width={1000}
            height={500}
            alt={post.metadata?.title}
            publicId={post.metadata?.thumbnail}
            className="w-full rounded-xl object-cover shadow-lg"
          />
        </Animation.FadeUp>

        <Animation.Reveal>
          <Heading variant="gradient" className="mb-4 text-4xl sm:text-5xl">
            {post.metadata?.title}
          </Heading>
        </Animation.Reveal>

        <Animation.Reveal>
          <p className="mb-6 text-xl text-gray-600 dark:text-gray-300">{post.metadata?.desc}</p>
        </Animation.Reveal>

        <Animation.Reveal className="mb-6 flex flex-wrap space-x-10">
          <a
            href={post.metadata?.demo}
            className="inline-flex items-center rounded-full bg-teal-500 px-4 py-2 text-white transition-colors hover:bg-teal-600"
          >
            <FaChrome className="mr-2" />
            Live Demo
          </a>
          {post.metadata?.repository && (
            <a
              href={post.metadata.repository}
              className="ml-4 inline-flex items-center rounded-full bg-gray-200 px-4 py-2 text-gray-800 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              <GitHubLogoIcon className="mr-2" />
              Repository
            </a>
          )}
        </Animation.Reveal>

        <Animation.Reveal>
          <Suspense fallback={<p className="h-5" />}>
            <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
              Published on {formatDate(post.metadata.date)}
            </p>
          </Suspense>
        </Animation.Reveal>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,250px]">
          <article className="prose prose-lg max-w-none dark:prose-invert">{post.content}</article>
          <aside className="hidden lg:block">
            <div className="sticky top-8 rounded-lg p-4">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        </div>
        <nav className="mt-12 flex justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
          {post.previousPost ? (
            <Link
              href={`/portfolio/${post.previousPost.slug}`}
              className="group flex items-center text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              <ArrowLeftIcon className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Previous Project</div>
                <div className="font-medium">{post.previousPost.title}</div>
              </div>
            </Link>
          ) : (
            <div></div> // Empty div to maintain layout when there's no previous post
          )}

          {post.nextPost ? (
            <Link
              href={`/portfolio/${post.nextPost.slug}`}
              className="group flex items-center text-right text-teal-600 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              <div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Next Project</div>
                <div className="font-medium">{post.nextPost.title}</div>
              </div>
              <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : (
            <div></div> // Empty div to maintain layout when there's no next post
          )}
        </nav>
      </div>
    </section>
  );
}
