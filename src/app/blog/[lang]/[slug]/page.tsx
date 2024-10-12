import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { FaCalendar, FaClock, FaTags } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { getBlogPostData } from '@/lib/blog';
import TableOfContents from '@/components/feature/TableofContent';
import { Breadcrumb } from '@/components/common/BreadCrumb';
import LanguageSelector from '@/components/feature/LanguageSelector';
import EstimatedReadTime from '@/components/feature/ReadTime';
import GiscusComments from '@/components/feature/Giscus';

export default async function BlogPostPage({ params }: { params: { lang: string; slug: string } }) {
  const post = await getBlogPostData(params.slug, params.lang);
  if (!post) notFound();

  const coverImageUrl = post.metadata.coverImage ? `/image/blog/${post.metadata.coverImage}` : '';

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Breadcrumb />
      <LanguageSelector slug={post.metadata.translatedFilename} currentLang={params.lang} />
      {post.metadata.coverImage && (
        <div className="relative mb-8 h-64 overflow-hidden rounded-lg">
          <Image src={coverImageUrl} alt={post.metadata.title} fill style={{ objectFit: 'cover' }} />
        </div>
      )}

      <h1 className="mb-4 text-3xl font-bold">{post.metadata.title}</h1>

      <div className="mb-8 flex flex-wrap gap-4 text-sm text-gray-600">
        <span className="flex items-center">
          <FaCalendar className="mr-2" />
          {format(new Date(post.metadata.date), 'MMM d, yyyy')}
        </span>
        <span className="flex items-center">
          <FaClock className="mr-2" />
          <EstimatedReadTime content={post.content} />
        </span>
        {post.metadata.tags && (
          <span className="flex items-center">
            <FaTags className="mr-2" />
            {post.metadata.tags.map((tag) => (
              <span key={tag} className="mr-2 rounded bg-teal-300 px-2 py-1 text-gray-900">
                {tag}
              </span>
            ))}
          </span>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr,200px]">
        <article className="prose prose-invert max-w-none">{post.content}</article>
        <aside className="hidden lg:block">
          <div className="sticky top-8">
            <TableOfContents headings={post.headings} />
          </div>
        </aside>
      </div>

      <nav className="mt-12 flex justify-between border-t pt-8">
        {post.previousPost && (
          <Link href={`/blog/${params.lang}/${post.previousPost.slug}`} className="text-blue-500 hover:underline">
            ← {post.previousPost.title}
          </Link>
        )}
        {post.nextPost && (
          <Link href={`/blog/${params.lang}/${post.nextPost.slug}`} className="ml-auto text-blue-500 hover:underline">
            {post.nextPost.title} →
          </Link>
        )}
      </nav>
      <GiscusComments />
    </article>
  );
}

export async function generateMetadata({ params }: { params: { lang: string; slug: string } }) {
  const post = await getBlogPostData(params.slug, params.lang);
  if (!post) return {};

  return {
    title: post.metadata.title,
    description: post.metadata.description,
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
