import React, { Suspense } from 'react'
import { getAllPosts } from '@/lib/portfolio';
import LoadingModal from '../common/LoadingModal';
import PortfolioHomeSection from './PortfolioHomeSection';

const PortfolioHomeSectionWrapper = async () => {
    const posts = await getAllPosts();

    return (
        <Suspense fallback={<LoadingModal />}>
            <PortfolioHomeSection initialPosts={posts} />
        </Suspense>)
}

export default PortfolioHomeSectionWrapper