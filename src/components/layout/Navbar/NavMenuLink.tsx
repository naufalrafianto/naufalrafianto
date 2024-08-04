'use client';

import useIsomorphicLayoutEffect from '@/hooks/UseIsomorphicLayoutEffect';
import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

interface NavMenuLinkProps {
  title: string;
  active: boolean;
  duration: number;
}

export default function NavMenuLink({ title, active, duration }: NavMenuLinkProps) {
  const el = useRef<HTMLDivElement | null>(null);
  const tl = useRef<GSAPTimeline | null>(gsap.timeline({ paused: true }));

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      tl.current?.fromTo(el.current, { x: 150 }, { x: 0, duration, ease: 'power3.inOut' }, 0);
    }, el);
  }, []);

  useEffect(() => {
    if (active) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [active]);

  return (
    <div ref={el}>
      <Link
        href={`/${title.toLowerCase() === 'home' ? '' : title.toLowerCase()}`}
        className="group flex !w-full cursor-pointer items-center justify-between px-[clamp(1.25rem,3vw,2.5rem)] py-3"
      >
        <p className="text-zinc-200 hover:text-teal-300">{title}</p>
        <div className="h-3 w-3 origin-center scale-0 rounded-full bg-teal-300 transition group-hover:scale-100" />
      </Link>
    </div>
  );
}
