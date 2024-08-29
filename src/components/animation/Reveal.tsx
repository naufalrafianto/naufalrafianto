'use client';
import * as React from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  className?: string;
}

export const Reveal = ({ children, width = 'fit-content', className }: RevealProps) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();
  const slideControl = useAnimation();

  React.useEffect(() => {
    if (isInView) {
      mainControl.start('visible');
      slideControl.start('visible');
    }
  }, [isInView]);

  return (
    <div style={{ position: 'relative', width, overflow: 'hidden' }} className={className}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{ duration: 1, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        ref={ref}
        style={{ position: 'absolute', top: 4, bottom: 4, right: 0, left: 0, background: '#5eead4', zIndex: 20 }}
        variants={{
          hidden: { left: 0 },
          visible: { left: '100%' },
        }}
        initial="hidden"
        animate={slideControl}
        transition={{ duration: 1, ease: 'easeIn' }}
      />
    </div>
  );
};
