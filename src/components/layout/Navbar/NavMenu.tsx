'use client';

import { cn } from '@/lib';
import gsap from 'gsap';
import { useRef, useState } from 'react';
import MagneticEffect from './MagneticEffect';
import NavMenuBtn from './NavBtn';
import NavMenuLine from './NavLine';
import NavMenuLink from './NavMenuLink';
import { useIsomorphicLayoutEffect } from 'framer-motion';
import { IconGroup } from '@/components/feature';
import { icons } from '@/constant';

export default function NavMenu() {
  const [active, setActive] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuBgRef = useRef<HTMLDivElement | null>(null);

  const toggleHamburger = (status: boolean) => {
    setActive(status);
  };

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      if (active) {
        gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: 'power3.inOut' });
        gsap.to('.nav-rounded', {
          scaleX: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        });
        gsap.to(menuBgRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        });
      } else {
        gsap.to(menuRef.current, {
          x: '140%',
          duration: 0.8,
          ease: 'power3.inOut',
        });
        gsap.to('.nav-rounded', {
          scaleX: 1,
          duration: 0.8,
          ease: 'power3.inOut',
        });
        gsap.to(menuBgRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power3.inOut',
        });
      }
    }, menuRef);
  }, [active]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setActive(false);
    }
  };

  return (
    <nav className="pointer-events-none fixed z-50 h-full w-full">
      <div
        ref={menuBgRef}
        className={cn(
          'nav-menu-bg absolute left-0 top-0 h-screen w-full bg-gradient-to-r from-black/[.13] via-black/[.16] to-black/[.35] opacity-0',
          active ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        onClick={() => setActive(false)}
        onKeyDown={() => handleKeyDown}
      />

      <div
        ref={menuRef}
        className={cn(
          'nav-menu pointer-events-auto absolute right-0 top-0 flex h-full w-full max-w-lg translate-x-[150%] flex-col justify-between bg-slate-950 pb-12 pt-[clamp(3.5rem,10vh,5rem)] text-6xl text-white will-change-transform [-webkit-perspective:1000]'
        )}
      >
        <div className="nav-rounded absolute left-0 top-[-10%] z-[-1] h-[120%] w-[80%] -translate-x-1/2 rounded-[100%_100%] bg-zinc-800 will-change-transform [-webkit-perspective:1000]"></div>
        <div>
          <NavMenuLine title={'Navigation'} />
        </div>
        <div>
          <MagneticEffect>
            <NavMenuLink title={'Home'} active={active} duration={1} />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink title={'About'} active={active} duration={1} />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink title={'Portfolio'} active={active} duration={1.2} />
          </MagneticEffect>
        </div>
        <div>
          <NavMenuLine title={'Links'} />
        </div>
        <div className="ml-5 md:ml-10">
          <IconGroup icons={icons} />
        </div>
      </div>
      <NavMenuBtn active={active} toggleHamburger={toggleHamburger} />
    </nav>
  );
}
