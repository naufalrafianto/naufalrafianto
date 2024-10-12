import PortfolioPageComponent from '@/components/page/PortfolioPage';
import { getBlogPosts } from '@/lib/portfolio';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
};

export default async function Page() {
  const posts = await getBlogPosts();

  return <PortfolioPageComponent initialPosts={posts} />;
}
