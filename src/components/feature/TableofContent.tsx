'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeadingInfo {
  level: number;
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: HeadingInfo[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ headings }) => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveId(heading.id);
              }
            });
          },
          { rootMargin: '-20% 0px -80% 0px' }
        );

        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [headings]);

  const handleScroll = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="rounded-lg p-4">
      <h2 className="mb-4 text-xl font-semibold">Table of Contents</h2>
      <ul>
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            className={`ml-${(heading.level - 2) * 4} text-white/50 transition-colors duration-200`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={`#${heading.id}`}
              onClick={() => handleScroll(heading.id)}
              className={`block rounded p-1 ${activeId === heading.id ? 'text-teal-300' : 'hover:text-teal-500'}`}
            >
              <span className={`font-medium ${activeId === heading.id ? 'font-bold' : ''}`}>{heading.text}</span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
