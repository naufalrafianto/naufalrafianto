import { getAllBlogPosts, getBlogPostData } from '@/lib/blog';
import { format } from 'date-fns';
import { blogConfig } from '@/types/blog';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { FaCalendar, FaClock, FaTags, FaUser } from 'react-icons/fa';
import { estimateReadingTime } from '@/lib/readingTime';
import { FadeUp } from '@/components/animation/FadeUp';
import { Breadcrumb } from '@/components/common/BreadCrumb';
import LanguageSelector from '@/components/feature/LanguageSelector';
import TableOfContents from '@/components/feature/TableofContent';

export async function generateStaticParams() {
  const locales = ['en', 'id']; // Add all supported locales
  const allPosts = await Promise.all(
    locales.map(async (locale) => {
      const posts = await getAllBlogPosts(locale);
      return posts.map((post) => ({
        lang: locale,
        slug: post.slug,
      }));
    })
  );

  return allPosts.flat();
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
  const post = await getBlogPostData(params.slug, params.lang);
  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.description,
    translatedFilename: post.metadata.translatedFilename,
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.description,
      type: 'article',
      publishedTime: post.metadata.date,
      authors: [post.metadata.author],
      images: [post.metadata.ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { lang: string; slug: string } }) {
  const post = await getBlogPostData(params.slug, params.lang);

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);
  const coverImageUrl = post.metadata.coverImage ? `/image/blog/${post.metadata.coverImage}` : '';

  return (
    <section id="blog-post" className="relative min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <FadeUp className="mb-8 inline-flex items-center">
          <Breadcrumb />
        </FadeUp>
        <LanguageSelector currentLang={params.lang} slug={post.metadata.translatedFilename} />
        <article>
          {post.metadata.coverImage && (
            <div className="lg:h-112 xl:h-128 relative mb-8 h-64 sm:h-80 md:h-96">
              <Image
                src={coverImageUrl}
                alt={post.metadata.title}
                fill
                style={{ objectFit: 'cover' }}
                className="brightness-75"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <h1 className="px-4 text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
                  {post.metadata.title}
                </h1>
              </div>
            </div>
          )}
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
            {!post.metadata.coverImage && (
              <h1 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                {post.metadata.title}
              </h1>
            )}
            <div className="mb-8 flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400">
              <span className="mb-2 mr-4 flex items-center">
                <FaCalendar className="mr-2" />
                {format(new Date(post.metadata.date), blogConfig.dateFormat)}
              </span>
              <span className="mb-2 mr-4 flex items-center">
                <FaUser className="mr-2" />
                {post.metadata.author}
              </span>
              <span className="mb-2 mr-4 flex items-center">
                <FaClock className="mr-2" />
                {readingTime} min read
              </span>
            </div>
            {post.metadata.tags && (
              <div className="mb-8 flex flex-wrap items-center">
                <FaTags className="mr-2 text-gray-600 dark:text-gray-400" />
                {post.metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="mb-2 mr-2 rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr,250px]">
              <article className="prose prose-lg max-w-none dark:prose-invert">{post.content}</article>
              <aside className="hidden lg:block">
                <div className="sticky top-8 rounded-lg p-4">
                  <TableOfContents headings={post.headings} />
                </div>
              </aside>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
              <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Share this post</h2>
              {/* Add social sharing buttons here */}
            </div>
            <nav className="mt-8 flex items-center justify-between border-t border-gray-200 py-8 dark:border-gray-700">
              {post.previousPost && (
                <Link
                  href={`/blog/${params.lang}/${post.previousPost.slug}`}
                  className="flex items-center text-blue-500 hover:underline"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm md:text-base">Previous: {post.previousPost.title}</span>
                </Link>
              )}
              {post.nextPost && (
                <Link
                  href={`/blog/${params.lang}/${post.nextPost.slug}`}
                  className="ml-auto flex items-center text-blue-500 hover:underline"
                >
                  <span className="text-sm md:text-base">Next: {post.nextPost.title}</span>
                  <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
              )}
            </nav>
          </div>
        </article>
      </div>
    </section>
  );
}
