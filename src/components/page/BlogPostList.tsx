'use client';

import { BlogPost } from '@/constant/blog';
import { BlogCard } from '@/components/feature/Card/BlogCard';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Heading } from '../common/Heading';
import SortDropdown from '../common/SortButton';
import FilterTag from '../common/FilterButton';
import Animation from '../animation';
import { Breadcrumb } from '../common/BreadCrumb';

interface BlogPostListProps {
  initialPosts: BlogPost[];
  lang: string;
}

type SortOption = 'date' | 'title';

export function BlogPostList({ initialPosts, lang = 'en' }: BlogPostListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState(initialPosts);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');

  useEffect(() => {
    const filter = searchParams.get('filter');
    const sort = searchParams.get('sort') as SortOption;
    if (filter) {
      setActiveFilter(filter);
      setPosts(
        sortPosts(
          initialPosts.filter((post) => post.metadata.tags.includes(filter)),
          sort || 'date'
        )
      );
    } else {
      setActiveFilter(null);
      setPosts(sortPosts(initialPosts, sort || 'date'));
    }
    if (sort) {
      setSortBy(sort);
    }
  }, [searchParams, initialPosts]);

  const handleTagClick = (tag: string) => {
    if (activeFilter === tag) {
      router.push(`/blog?sort=${sortBy}`);
    } else {
      router.push(`/blog?filter=${encodeURIComponent(tag)}&sort=${sortBy}`);
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    const filter = searchParams.get('filter');
    if (filter) {
      router.push(`/blog?filter=${encodeURIComponent(filter)}&sort=${option}`);
    } else {
      router.push(`/blog?sort=${option}`);
    }
  };

  const sortPosts = (postsToSort: BlogPost[], sortOption: SortOption): BlogPost[] => {
    return [...postsToSort].sort((a, b) => {
      if (sortOption === 'date') {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
      } else {
        return a.metadata.title.localeCompare(b.metadata.title);
      }
    });
  };

  return (
    <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <Animation.FadeUp className="mb-8 inline-flex items-center">
        <Breadcrumb />
      </Animation.FadeUp>
      <div className="mb-12 flex w-full flex-col items-center">
        <Animation.Reveal>
          <Heading variant="gradient" className="mb-4 text-center text-3xl font-bold sm:text-4xl">
            Blog Posts
          </Heading>
        </Animation.Reveal>
        <Animation.Reveal>
          <p className="mx-auto mb-6 max-w-2xl text-center text-gray-400">
            Explore my thoughts and insights on web development, technology, and more.
          </p>
        </Animation.Reveal>
      </div>
      <div className="mb-8 flex items-center justify-between">
        {activeFilter && <FilterTag activeFilter={activeFilter} onRemove={() => handleTagClick(activeFilter)} />}
        <SortDropdown options={['date', 'title']} currentSort={sortBy} onSortChange={handleSortChange} />
      </div>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<div>Loading blog posts...</div>}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} onTagClick={handleTagClick} lang={lang} />
          ))}
        </Suspense>
      </div>
      {posts.length === 0 && (
        <p className="mt-8 text-center text-gray-400">No blog posts found with the selected tag.</p>
      )}
    </main>
  );
}
