import React from 'react'
import { getAllBlogPosts } from '@/lib/blog';
import { SingleRetrospectivePost } from './RetrospectiveHomeSection';

const Retrospective = async () => {
    const posts = await getAllBlogPosts('en');

    return (
        <>
            <SingleRetrospectivePost initialPosts={posts} />
        </>)
}

export default Retrospective