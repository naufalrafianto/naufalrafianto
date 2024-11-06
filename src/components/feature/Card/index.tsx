'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { CloudImg } from '@/components/common/CloudImg';
import { formatDate } from '@/lib/date';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface BaseCardProps {
  title: string;
  description: string;
  date: string | Date;
  image?: string;
  tags: readonly string[];
  onTagClick: (tag: string) => void;
  href: string;
  cardType: 'portfolio' | 'blog';
}

export const BaseCard: React.FC<BaseCardProps> = ({
  title,
  description,
  date,
  image,
  tags,
  onTagClick,
  href,
  cardType,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedTags = isExpanded ? tags : tags.slice(0, 2);
  const remainingTagsCount = tags.length - 2;

  return (
    <motion.div whileHover={{ y: -5 }} className="overflow-hidden rounded-lg transition-all duration-300 ease-out">
      <div className="block">
        {image && (
          <div className="relative h-40 overflow-hidden">
            {cardType === 'blog' ? (
              <Image
                src={image}
                alt={title}
                width={800}
                height={400}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <CloudImg
                publicId={image}
                alt={title}
                width={500}
                height={300}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            )}
          </div>
        )}
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">{description}</p>
          <div className="mb-2 flex flex-wrap gap-2">
            {displayedTags.map((tag) => (
              <button
                key={tag}
                onClick={(e) => {
                  e.preventDefault();
                  onTagClick(tag);
                }}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                {tag}
              </button>
            ))}
            {!isExpanded && remainingTagsCount > 0 && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(true);
                }}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                +{remainingTagsCount}
              </button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{formatDate(date)}</span>
            <Link href={href}>
              <span className="flex items-center text-sm text-teal-400 transition-all group-hover:translate-x-1">
                {cardType === 'blog' ? ' Read Blog' : 'View Project'} <ArrowRightIcon className="ml-1" />
              </span>
            </Link>
          </div>{' '}
        </div>
      </div>
    </motion.div>
  );
};
