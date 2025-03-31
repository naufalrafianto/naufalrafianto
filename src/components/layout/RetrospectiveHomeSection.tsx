'use client';

import { BlogPost } from '@/constant/blog';
import { Suspense } from 'react';
import Animation from '../animation';
import Image from 'next/image';
import Link from 'next/link';

interface BlogPostListProps {
    initialPosts: BlogPost[];
}

export function SingleRetrospectivePost({ initialPosts }: BlogPostListProps) {
    const retrospectivePost = initialPosts
        .filter(post => post.metadata.tags.includes('Retrospective'))
        .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())[0];

    return (
        <main className="relative w-full mx-auto px-4 sm:px-6 lg:max-w-5xl lg:px-8">
            <Link
                href={'/blog/en/2024-retrospective'}
                className="block w-full pt-4 pb-8 sm:py-16 group"
            >
                <Suspense fallback={
                    <div className="animate-pulse h-64 sm:h-96 bg-gray-800 rounded-xl" />
                }>
                    {retrospectivePost ? (
                        <article>
                            {/* Hero Section */}
                            <div className="relative h-[50vh] sm:h-[70vh] w-full overflow-hidden rounded-lg sm:rounded-xl">
                                <Image
                                    src={"/image/blog/2020 Top Sales Representatives at Galati Yacht Sales.jpg"}
                                    alt={""}
                                    width={1920}
                                    height={1080}
                                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 md:p-12">
                                    <Animation.FadeUp className="space-y-3 sm:space-y-4">
                                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                                            {retrospectivePost.metadata.title}
                                        </h1>
                                        <p className="text-base sm:text-lg md:text-xl text-gray-300 line-clamp-3 sm:line-clamp-none">
                                            {retrospectivePost.metadata.description}
                                        </p>
                                    </Animation.FadeUp>
                                </div>
                            </div>
                        </article>
                    ) : (
                        <div className="flex items-center justify-center h-[50vh]">
                            <p className="text-xl text-gray-400">
                                No retrospective posts found.
                            </p>
                        </div>
                    )}
                </Suspense>
            </Link>
        </main>
    );
}