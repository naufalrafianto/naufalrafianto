'use client';

import { animatePageIn } from '@/lib';
import { useEffect } from 'react';

export default function Template({ children, className }: { children: React.ReactNode; className?: string }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <div className={className}>
      <div id="banner-1" className="fixed left-0 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />
      <div id="banner-2" className="fixed left-1/4 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />
      <div id="banner-3" className="fixed left-2/4 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />
      <div id="banner-4" className="fixed left-3/4 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />
      {children}
    </div>
  );
}
