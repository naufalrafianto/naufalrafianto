import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { AnimatePresence, motion } from 'framer-motion';
import { FaCalendar, FaTags, FaUser } from 'react-icons/fa';
import { BlogPost, blogConfig } from '@/types/blog';
import { useState } from 'react';

interface BlogPostCardProps {
  post: BlogPost;
  onTagClick: (tag: string) => void;
  lang: string;
}

export function BlogPostCard({ post, onTagClick, lang = 'en' }: BlogPostCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedTags = isExpanded ? post.metadata.tags : post.metadata.tags.slice(0, 3);
  const remainingTagsCount = post.metadata.tags.length - 3;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-hidden rounded-lg bg-white shadow-md dark:bg-gray-900"
    >
      <Link href={`/blog/${lang}/${post.slug}`} className="block transition-opacity duration-200 hover:opacity-75">
        {post.metadata.coverImage && (
          <Image
            src={`/image/blog/${post.metadata.coverImage}`}
            alt={post.metadata.title}
            width={800}
            height={400}
            className="h-48 w-full object-cover"
          />
        )}
      </Link>
      <div className="p-6">
        <Link href={`/blog/${lang}/${post.slug}`} className="block hover:underline">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">{post.metadata.title}</h2>
        </Link>
        <div className="mb-4 flex items-center text-sm text-gray-600 dark:text-gray-400">
          <FaCalendar className="mr-2" />
          <span>{format(new Date(post.metadata.date), blogConfig.dateFormat)}</span>
          <FaUser className="ml-4 mr-2" />
          <span>{post.metadata.author}</span>
        </div>
        <p className="mb-4 text-gray-700 dark:text-gray-300">{post.metadata.description}</p>
        <div className="flex items-center space-x-2">
          <FaTags className="text-gray-600 dark:text-gray-400" />
          <div className="flex flex-wrap gap-2">
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
          </div>
        </div>
      </div>
    </motion.div>
  );
}
