import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { formatDate } from '@/lib/date';
import { CloudImg } from '../common/CloudImg';
import { FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

interface Props {
  title: string;
  description: string;
  dates: Date | string;
  tags: readonly string[];
  image?: string;
  slug?: string;
  onTagClick: (tag: string) => void;
}

export function ProjectCard({ title, description, dates, tags, image, slug, onTagClick }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedTags = isExpanded ? tags : tags.slice(0, 3);
  const remainingTagsCount = tags.length - 3;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="group overflow-hidden rounded-lg bg-gray-900 shadow-md transition-all duration-300 ease-out hover:shadow-xl"
    >
      <div className="block">
        <div className="relative h-48 overflow-hidden">
          {image && (
            <CloudImg
              publicId={image}
              alt={title}
              width={500}
              height={300}
              className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
          <p className="mb-3 line-clamp-2 text-sm text-gray-300">{description}</p>
          <div className="mb-3 flex flex-wrap gap-2">
            <AnimatePresence>
              {displayedTags.map((tag) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={(e) => {
                    e.preventDefault();
                    onTagClick(tag);
                  }}
                  className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300 transition-colors hover:bg-gray-700"
                >
                  {tag}
                </motion.button>
              ))}
            </AnimatePresence>
            {!isExpanded && remainingTagsCount > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setIsExpanded(true)}
                className="rounded-full bg-teal-600 px-2 py-1 text-xs text-white transition-colors hover:bg-teal-500"
              >
                +{remainingTagsCount}
              </motion.button>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">{formatDate(dates)}</span>
            <Link href={`/portfolio/${slug}`}>
              <span className="flex items-center text-sm text-teal-400 transition-all group-hover:translate-x-1">
                View Project <FiArrowRight className="ml-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
