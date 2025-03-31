'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import FilterTag from '../common/FilterButton';
import Animation from '../animation';
import LoadingModal from '../common/LoadingModal';
import { CloudImg } from '../common/CloudImg';
import { CustomLink } from '../common/CustomLink';

interface PortfolioListProps {
    initialPosts: Post[];
}

const PortfolioHomeSection: React.FC<PortfolioListProps> = ({ initialPosts }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [posts, setPosts] = useState(initialPosts);
    const [activeFilter, setActiveFilter] = useState<string | null>(null);

    // Get only the 3 most recent posts
    const recentPosts = posts
        .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
        .slice(0, 3);

    useEffect(() => {
        const filter = searchParams.get('filter');
        if (filter) {
            setActiveFilter(filter);
            setPosts(initialPosts.filter((post) => post.metadata.stack?.includes(filter)));
        } else {
            setActiveFilter(null);
            setPosts(initialPosts);
        }
    }, [searchParams, initialPosts]);

    const handleTagClick = (tag: string) => {
        if (activeFilter === tag) {
            router.push('/portfolio');
        } else {
            router.push(`/portfolio?filter=${encodeURIComponent(tag)}`);
        }
    };

    return (
        <main className="relative z-10 mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-12 flex w-full flex-col items-center">
                <Animation.Reveal className="whitespace-nowrap py-4">
                    <h1 className="text-4xl font-bold text-white sm:text-6xl">
                        What I&apos;ve been <span className="text-teal-400">done</span>
                    </h1>
                </Animation.Reveal>
                <Animation.Reveal>
                    <p className="mx-auto max-w-2xl text-center text-xl text-gray-400">
                        My latest work that i have been done working on.
                    </p>
                </Animation.Reveal>
            </div>
            {activeFilter && (
                <div className="mb-8">
                    <FilterTag activeFilter={activeFilter} onRemove={() => handleTagClick(activeFilter)} />
                </div>
            )}
            <div className="grid grid-cols-1 gap-8">
                <Suspense fallback={<LoadingModal />}>
                    {recentPosts.map((post, index) => (
                        <ProjectCardHomeSection
                            key={post.slug}
                            title={post.metadata.title}
                            description={post.metadata.desc}
                            dates={post.metadata.date}
                            tags={post.metadata.stack as string[]}
                            image={post.metadata.thumbnail}
                            slug={post.slug}
                            onTagClick={handleTagClick}
                            isReversed={index === 1}
                        />
                    ))}
                </Suspense>
            </div>
            {posts.length === 0 && (
                <p className="mt-8 text-center text-gray-400">No projects found with the selected technology.</p>
            )}
            <div className="mt-8 flex justify-center rounded-lg px-4 py-2 w-40 mx-auto">
                <CustomLink
                    href="/portfolio"
                    className="font-semibold "
                >
                    View All Projects
                </CustomLink>
            </div>
        </main>
    );
};

interface ProjectCardProps {
    title: string;
    description: string;
    dates: string;
    tags: string[];
    image: string;
    slug: string;
    onTagClick: (tag: string) => void;
    isReversed?: boolean;
}

export const ProjectCardHomeSection: React.FC<ProjectCardProps> = ({
    title,
    description,
    dates,
    tags,
    image,
    slug,
    onTagClick,
    isReversed = false
}) => {
    const formatDate = (date: string | Date) => {
        if (date instanceof Date) {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return date;
    };

    return (
        <div className={`group relative flex flex-col md:flex-row overflow-hidden transition-all duration-300 rounded-lg gap-8 ${isReversed ? 'md:flex-row-reverse' : ''}`}>
            {/* Content */}
            <div className="flex grow flex-col justify-between p-6 md:w-1/2">
                <div>
                    <div className="mb-2 flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                    </div>
                    <p className="mb-4 text-gray-400">{description}</p>

                    {/* Tags */}
                    <div className="mb-6 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => onTagClick(tag)}
                                className="rounded bg-gray-800 px-2.5 py-1 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Link
                        href={`/portfolio/${slug}`}
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700"
                    >
                        View Project
                        <span className="text-lg">→</span>
                    </Link>

                </div>
            </div>

            {/* Image */}
            <div className="relative h-[300px] md:w-1/2 rounded-lg overflow-hidden">
                <CloudImg
                    publicId={image}
                    alt={title}
                    width={500}
                    height={300}
                    className="object-contain rounded-lg h-full w-full transition-transform duration-300 group-hover:scale-105"
                />
            </div>
        </div>
    );
};

export default PortfolioHomeSection;