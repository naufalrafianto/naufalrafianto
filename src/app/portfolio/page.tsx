import PortfolioPage from '@/components/page/PortfolioList';
import { getBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
};

export default async function Page() {
  const posts = await getBlogPosts();

  return <PortfolioPage initialPosts={posts} />;
}
