type Direction = 'left' | 'right' | 'up' | 'down';
type TransitionType = 'spring' | 'tween';

import gsap from 'gsap';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const animatePageIn = () => {
  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 100,
      stagger: 0.15,
      ease: 'power3.inOut',
    });
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const bannerOne = document.getElementById('banner-1');
  const bannerTwo = document.getElementById('banner-2');
  const bannerThree = document.getElementById('banner-3');
  const bannerFour = document.getElementById('banner-4');

  if (bannerOne && bannerTwo && bannerThree && bannerFour) {
    const tl = gsap.timeline();

    tl.set([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: -100,
    }).to([bannerOne, bannerTwo, bannerThree, bannerFour], {
      yPercent: 0,
      stagger: 0.15,
      ease: 'power3.inOut',
      onComplete: () => {
        router.push(href);
      },
    });
  }
};

export const textVariant = (delay: number) => {
  return {
    hidden: {
      y: -50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.5,
        delay,
        ease: 'easeOut',
      },
    },
  };
};

export const fadeIn = (direction: Direction, type: TransitionType, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: 'power3.out',
      },
    },
  };
};

export const zoomIn = (delay: number, duration: number) => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'power3.out',
      },
    },
  };
};

export const slideIn = (direction: Direction, type: TransitionType, delay: number, duration: number) => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '-100%' : direction === 'down' ? '100%' : 0, // Adjusted to handle direction correctly
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'power3.out',
      },
    },
  };
};

export const staggerContainer = (staggerChildren: number, delayChildren?: number) => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren: delayChildren || 0,
      },
    },
  };
};
