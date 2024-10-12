'use client';

import React, { Suspense, useEffect, useState } from 'react';
import LoadingModal from '@/components/common/LoadingModal';
import { BlogPostList } from '@/components/page/BlogPostList';
import { BlogPost } from '@/constant/blog';

interface BlogPageProps {
  initialPosts: BlogPost[]; // Replace 'any' with your actual post type
  lang: string;
}

const BlogPageComponent: React.FC<BlogPageProps> = ({ initialPosts, lang }) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // This effect will run on client-side navigation
    const handleStart = () => setIsLoading(true);
    const handleComplete = () => setIsLoading(false);

    window.addEventListener('routeChangeStart', handleStart);
    window.addEventListener('routeChangeComplete', handleComplete);
    window.addEventListener('routeChangeError', handleComplete);

    return () => {
      window.removeEventListener('routeChangeStart', handleStart);
      window.removeEventListener('routeChangeComplete', handleComplete);
      window.removeEventListener('routeChangeError', handleComplete);
    };
  }, []);

  return (
    <>
      <Suspense fallback={<LoadingModal />}>
        <BlogPostList initialPosts={initialPosts} lang={lang} />
      </Suspense>
    </>
  );
};

export default BlogPageComponent;
