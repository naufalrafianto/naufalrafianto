'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
    <nav className="rounded-lg p-4 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-200">Table of Contents</h2>
      <ul className="space-y-2">
        {headings.map((heading) => (
          <li key={heading.id} className={`ml-${(heading.level - 2) * 4}`}>
            <Link
              href={`#${heading.id}`}
              className={`transition-colors duration-200 ${
                activeId === heading.id ? 'font-bold text-teal-300' : 'text-slate-400 hover:text-teal-200'
              }`}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
