import PortfolioPage from '@/components/page/PortfolioList';
import { getBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Portfolio',
};

export default async function Page() {
  const posts = await getBlogPosts();

  return (
    <Suspense fallback={<div>Loading portfolio...</div>}>
      <PortfolioPage initialPosts={posts} />
    </Suspense>
  );
}
