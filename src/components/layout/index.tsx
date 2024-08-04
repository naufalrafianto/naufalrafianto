'use client';
import React from 'react';
import { ScrollbarProgress } from '@/components/feature';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="container mx-auto">
      <NextTopLoader
        color="#fff"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        showSpinner={false}
        crawl={true}
        easing="ease"
        speed={200}
        shadow="0 0 10px #fff,0 0 5px #fff"
      />
      <Toaster />
      <div className="min-h-screen leading-relaxed text-slate-200 antialiased selection:bg-teal-300 selection:text-black">
        <div className="fixed inset-0 z-[-10] bg-slate-950 bg-[radial-gradient(circle_500px_at_50%_200px,#034a4391,transparent)]" />
        <div>{children}</div>
      </div>
      <ScrollbarProgress />
    </div>
  );
};
