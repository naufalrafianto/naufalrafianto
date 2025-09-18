'use client';

import React, { Suspense } from 'react';
import LoadingModal from '@/components/common/LoadingModal';
import { BlogPostList } from '@/components/page/BlogPostList';
import { BlogPost } from '@/constant/blog';

interface BlogPageProps {
  initialPosts: BlogPost[]; // Replace 'any' with your actual post type
  lang: string;
}

const BlogPageComponent: React.FC<BlogPageProps> = ({ initialPosts, lang }) => {

  return (
    <>
      <Suspense fallback={<LoadingModal />}>
        <BlogPostList initialPosts={initialPosts} lang={lang} />
      </Suspense>
    </>
  );
};

export default BlogPageComponent;
