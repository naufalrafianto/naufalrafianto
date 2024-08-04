'use client';

import { useCombinedRefs } from '@/lib';
import { motion, useAnimation, useInView } from 'framer-motion';
import React, { forwardRef, useEffect, useRef } from 'react';

interface RevealProps {
  children?: React.ReactNode;
  className?: string;
  delay?: number;
  width?: string;
  animationVariants?: {
    hidden?: object;
    visible?: object;
  };
  slideVariants?: {
    hidden?: object;
    visible?: object;
  };
  animationTransition?: {
    duration?: number;
    delay?: number;
    ease?: string;
  };
}

const defaultAnimationVariants = {
  hidden: { opacity: 0, y: 75 },
  visible: { opacity: 1, y: 0 },
};

const defaultSlideVariants = {
  hidden: { left: 0 },
  visible: { left: '100%' },
};

const defaultAnimationTransition = {
  duration: 0.5,
  delay: 0.25,
  ease: 'easeIn',
};

export const Reveal = forwardRef<HTMLDivElement, RevealProps>(
  (
    {
      children,
      className = '',
      delay = 0,
      width = 'fit-content',
      animationVariants = defaultAnimationVariants,
      slideVariants = defaultSlideVariants,
      animationTransition = defaultAnimationTransition,
    },
    ref
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const combinedRef = useCombinedRefs(innerRef, ref);
    const isInView = useInView(innerRef, { once: true });

    const mainControls = useAnimation();
    const slideControls = useAnimation();

    useEffect(() => {
      if (isInView) {
        mainControls.start('visible');
        slideControls.start('visible');
      }
    }, [isInView, mainControls, slideControls]);

    return (
      <span ref={combinedRef} style={{ position: 'relative', width: width }} className={className}>
        <motion.div
          variants={animationVariants}
          transition={{ ...animationTransition, delay: delay + (animationTransition.delay ?? 0) }}
          initial="hidden"
          animate={mainControls}
        >
          {children}
        </motion.div>
        <motion.div
          variants={slideVariants}
          initial="hidden"
          animate={slideControls}
          transition={{ duration: animationTransition.duration, ease: animationTransition.ease, delay: delay }}
          style={{
            position: 'absolute',
            top: 4,
            bottom: 4,
            left: 0,
            right: 0,
            zIndex: 20,
          }}
          className="bg-white"
        />
      </span>
    );
  }
);

Reveal.displayName = 'Reveal';
