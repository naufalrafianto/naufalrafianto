'use client';

import React, { Suspense, useEffect, useState } from 'react';
import LoadingModal from '@/components/common/LoadingModal';
import PortfolioList from './PortfolioList';

interface PortfolioPageProps {
  initialPosts: Post[]; // Replace 'any' with your actual post type
}

const PortfolioPageComponent: React.FC<PortfolioPageProps> = ({ initialPosts }) => {
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
        <PortfolioList initialPosts={initialPosts} />
      </Suspense>
    </>
  );
};

export default PortfolioPageComponent;
