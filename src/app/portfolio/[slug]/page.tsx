import { getPost } from '@/lib/blog';
import { formatDate } from '@/lib/date';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ChevronLeftIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { CustomLink } from '@/components/common/CustomLink';
import { FaChrome } from 'react-icons/fa';
import { Heading } from '@/components/common/Heading';
import { Reveal } from '@/components/animation/Reveal';
import { CloudImg } from '@/components/common/CloudImg';
import { FadeUp } from '@/components/animation/FadeUp';
import TableOfContents from '@/components/feature/TableofContent';

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

  console.log('Heading: ', post.headings);

  return (
    <section id="portfolio-post" className="relative min-h-screen px-8 pt-10 sm:px-20">
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
      <FadeUp className="inline-flex items-center sm:-ml-10">
        <ChevronLeftIcon className="mt-1 text-teal-300" />
        <CustomLink href="/">Back to home</CustomLink>
      </FadeUp>
      <section className="mt-5 flex flex-col gap-1 border-b pb-6">
        <FadeUp delay={1.5} className="mx-auto w-full">
          <CloudImg
            width={1000}
            height={1000}
            alt=""
            publicId={post.metadata?.thumbnail}
            className="rounded-xl object-contain"
          />
        </FadeUp>
        <Reveal className="mb-2 mt-4">
          <Heading variant={'gradient'}>{post.metadata?.title}</Heading>
        </Reveal>
        <Reveal>
          <p className="text-gray-500">{post.metadata?.desc}</p>
        </Reveal>
        <Reveal className="inline-flex items-center">
          <div className="inline-flex items-center gap-2.5">
            <FaChrome className="h-6 w-6" />
            <CustomLink href={post.metadata?.demo}>Live demo</CustomLink>
          </div>
          <div className="ml-4 inline-flex items-center gap-2.5">
            <GitHubLogoIcon className="h-6 w-6" />
            {post.metadata?.repository ? (
              <CustomLink href={post.metadata?.repository as string}>Repository</CustomLink>
            ) : (
              <p>
                <strong>Repository :</strong> -
              </p>
            )}
          </div>
        </Reveal>
        <Reveal className="my-1">
          <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">{formatDate(post.metadata.date)}</p>
          </Suspense>
        </Reveal>
      </section>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr,250px]">
        <article className="prose dark:prose-invert max-w-none">{post.content}</article>
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>
    </section>
  );
}
