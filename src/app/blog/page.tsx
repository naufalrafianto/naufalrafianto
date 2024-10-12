import { BlogPostList } from '@/components/page/BlogPostList';
import { getAllBlogPosts } from '@/lib/blog';
import { Suspense } from 'react';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts('en');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogPostList initialPosts={posts} lang={'en'} />
    </Suspense>
  );
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}
