// app/blog/[lang]/page.tsx
import { BlogPostList } from '@/components/page/BlogPostList';
import { getAllBlogPosts } from '@/lib/blog';
import { Suspense } from 'react';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
};

export default async function BlogPage({ params }: { params: { lang: string } }) {
  const posts = await getAllBlogPosts(params.lang);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPostList initialPosts={posts} lang={params.lang} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }]; // Add all supported languages
}
