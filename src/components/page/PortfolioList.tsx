'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Heading } from '@/components/common/Heading';
import { useRouter, useSearchParams } from 'next/navigation';
import SortDropdown from '../common/SortButton';
import FilterTag from '../common/FilterButton';
import Animation from '../animation';
import { ProjectCard } from '../feature/Card/ProjectCard';
import { Breadcrumb } from '../common/BreadCrumb';
import LoadingModal from '../common/LoadingModal';

interface PortfolioListProps {
  initialPosts: Post[];
}

type SortOption = 'date' | 'title';

const PortfolioList: React.FC<PortfolioListProps> = ({ initialPosts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState(initialPosts);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>('date');
  const [, setIsOpen] = useState(false);

  useEffect(() => {
    const filter = searchParams.get('filter');
    const sort = searchParams.get('sort') as SortOption;
    if (filter) {
      setActiveFilter(filter);
      setPosts(
        sortPosts(
          initialPosts.filter((post) => post.metadata.stack?.includes(filter)),
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
      router.push(`/portfolio?sort=${sortBy}`);
    } else {
      router.push(`/portfolio?filter=${encodeURIComponent(tag)}&sort=${sortBy}`);
    }
  };

  const handleSortChange = (option: SortOption) => {
    setSortBy(option);
    setIsOpen(false);
    const filter = searchParams.get('filter');
    if (filter) {
      router.push(`/portfolio?filter=${encodeURIComponent(filter)}&sort=${option}`);
    } else {
      router.push(`/portfolio?sort=${option}`);
    }
  };

  const sortPosts = (postsToSort: Post[], sortOption: SortOption): Post[] => {
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
            Recent Projects
          </Heading>
        </Animation.Reveal>
        <Animation.Reveal>
          <p className="mx-auto mb-6 max-w-2xl text-center text-gray-400">
            Explore a selection of my recent work, showcasing a range of web development projects and applications.
          </p>
        </Animation.Reveal>
      </div>
      <div className="mb-8 flex items-center justify-between">
        {activeFilter && <FilterTag activeFilter={activeFilter} onRemove={() => handleTagClick(activeFilter)} />}
        <SortDropdown options={['date', 'title']} currentSort={sortBy} onSortChange={handleSortChange} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Suspense fallback={<LoadingModal />}>
          {posts.map((post) => (
            <ProjectCard
              key={post.slug}
              title={post.metadata.title}
              description={post.metadata.desc}
              dates={post.metadata.date}
              tags={post.metadata.stack as string[]}
              image={post.metadata.thumbnail}
              slug={post.slug}
              onTagClick={handleTagClick}
            />
          ))}
        </Suspense>
      </div>
      {posts.length === 0 && (
        <p className="mt-8 text-center text-gray-400">No projects found with the selected technology.</p>
      )}
    </main>
  );
};

export default PortfolioList;
