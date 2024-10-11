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

  return (
    <nav className="rounded-lg bg-white p-6 dark:bg-gray-800">
      <h2 className="mb-6 text-2xl font-bold text-gray-800 dark:text-gray-200">Table of Contents</h2>
      <ul className="space-y-3">
        {headings.map((heading) => (
          <motion.li
            key={heading.id}
            className={`ml-${(heading.level - 2) * 4}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link href={`#${heading.id}`} className="group flex items-center">
              <motion.span
                className={`mr-2 h-6 w-1 rounded-full ${
                  activeId === heading.id ? 'bg-teal-500' : 'bg-gray-300 group-hover:bg-teal-300 dark:bg-gray-600'
                }`}
                initial={false}
                animate={{
                  height: activeId === heading.id ? 24 : 16,
                }}
                transition={{ duration: 0.2 }}
              />
              <span
                className={`transition-colors duration-200 ${
                  activeId === heading.id
                    ? 'font-bold text-teal-500 dark:text-teal-400'
                    : 'text-gray-600 group-hover:text-teal-400 dark:text-gray-400 dark:group-hover:text-teal-300'
                }`}
              >
                {heading.text}
              </span>
            </Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
