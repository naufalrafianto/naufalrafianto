'use client';

import { animatePageIn } from '@/lib/animation';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ScrollbarProgress } from '../feature/ScrollbarProgress';
import NextTopLoader from 'nextjs-toploader';

export default function Template({ children, className }: { children: React.ReactNode; className?: string }) {
  useEffect(() => {
    animatePageIn();
  }, []);
  return (
    <main className="container mx-auto">
      <NextTopLoader
        color="#fff"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        showSpinner={true}
        crawl={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #fff,0 0 5px #fff"
      />
      <Toaster />
      <div className="min-h-screen leading-relaxed text-slate-200 antialiased selection:bg-teal-300 selection:text-black">
        <div className="fixed inset-0 z-[-10] bg-slate-950 bg-[radial-gradient(circle_500px_at_50%_200px,#034a4391,transparent)]" />
        <div>
          <div className={className}>
            <div id="banner-1" className="fixed left-0 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />
            <div id="banner-2" className="fixed left-1/4 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />
            <div id="banner-3" className="fixed left-2/4 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />
            <div id="banner-4" className="fixed left-3/4 top-0 z-50 min-h-screen w-1/4 bg-teal-300" />

            {children}
          </div>
        </div>
      </div>
      <ScrollbarProgress />
    </main>
  );
}
