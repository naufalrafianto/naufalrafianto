'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { cn } from '@/lib/cn';
import Image from 'next/image';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';

export default function Avatar({ className }: { className?: string }) {
  const component = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.avatar',
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: prefersReducedMotion ? 0 : 1.3,
          ease: 'power3.inOut',
        }
      );

      window.onmousemove = (e) => {
        if (!component.current) return;
        const componentRect = (component.current as HTMLElement).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;

        const componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
        };

        const distFromCenterX = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: 'auto', ease: 'power3.out' },
          })
          .to(
            '.avatar',
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0
          )
          .to(
            '.highlight',
            {
              opacity: distFromCenterX - 0.7,
              x: -10 + 20 * componentPercent.x,
              duration: 0.5,
            },
            0
          );
      };
    }, component);
    return () => ctx.revert(); // cleanup!
  }, [prefersReducedMotion]);

  return (
    <div ref={component} className={cn('relative h-full w-full', className)}>
      <div
        className="avatar overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0"
        style={{ perspective: '500px', perspectiveOrigin: '150% 150%' }}
      >
        <Image
          src={'/image/about-pic.jpg'}
          alt="profile-pic"
          width={4284}
          height={5712}
          className="avatar-image h-full w-full object-fill"
        />
      </div>
    </div>
  );
}
