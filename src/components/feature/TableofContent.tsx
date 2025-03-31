'use client';
import React, { useEffect, useState } from 'react';
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const handleScroll = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="sticky top-4 space-y-2 p-4 rounded-md border border-teal-400/10 shadow-lg">
      {headings.map((heading) => (
        <motion.div
          key={heading.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`ml-${(heading.level - 2) * 4}`}
        >
          <button
            onClick={() => handleScroll(heading.id)}
            className={`text-left text-sm transition-all duration-200 ${activeId === heading.id ? 'font-medium text-teal-400' : 'text-gray-400 hover:text-teal-300'
              }`}
          >
            {heading.text}
          </button>
        </motion.div>
      ))}
    </nav>
  );
};

export default TableOfContents;
