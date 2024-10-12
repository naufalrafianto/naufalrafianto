import BlogPageComponent from '@/components/page/BlogPage';
import { getAllBlogPosts } from '@/lib/blog';

export const metadata = {
  title: 'Blog',
  description: 'Read our latest blog posts',
};

export default async function BlogPage() {
  const posts = await getAllBlogPosts('en');

  return <BlogPageComponent initialPosts={posts} lang={'en'} />;
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}
