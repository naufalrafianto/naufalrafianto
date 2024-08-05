'use client';
import { cn } from '@/lib/cn';
import React from 'react';

export const ScrollbarProgress = () => {
  const [scrollTop, setScrollTop] = React.useState(0);

  const onScroll = () => {
    const windowScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    const scrolled = (windowScroll / height) * 100;
    setScrollTop(scrolled);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={cn('fixed bottom-0 left-0 right-0 z-[100] w-full')}>
      <div className={cn('h-1 bg-teal-300')} style={{ width: `${scrollTop}%` }} />
    </div>
  );
};
