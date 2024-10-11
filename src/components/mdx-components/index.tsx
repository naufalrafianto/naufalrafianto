'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { CloudImg } from '@/components/common/CloudImg';
import { IconType } from 'react-icons/lib';

interface SubtitleProps {
  children: React.ReactNode;
}

export const Subtitle: React.FC<SubtitleProps> = ({ children }) => (
  <motion.h2
    className="mb-8 text-center text-2xl italic text-gray-600 dark:text-gray-400"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.5 }}
  >
    {children}
  </motion.h2>
);
interface TechStackShowcaseProps {
  stack?: string[];
}

export const TechStackShowcase: React.FC<TechStackShowcaseProps> = ({ stack = [] }) => (
  <motion.div
    className="my-8 rounded-lg bg-gray-100 p-6 shadow-inner dark:bg-gray-800"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="mb-4 text-2xl font-bold">Tech Stack</h3>
    {stack.length > 0 ? (
      <div className="flex flex-wrap justify-center gap-4">
        {stack.map((tech, index) => (
          <motion.div
            key={tech}
            className="rounded-full bg-white px-4 py-2 shadow-md dark:bg-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            {tech}
          </motion.div>
        ))}
      </div>
    ) : (
      <p>No technologies specified.</p>
    )}
  </motion.div>
);

interface ObjectiveItem {
  icon: React.ReactElement<IconType>;
  text: string;
}

interface ProjectObjectivesProps {
  objectives: ObjectiveItem[];
}

export const ProjectObjectives: React.FC<ProjectObjectivesProps> = ({ objectives }) => (
  <motion.div className="my-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {objectives.map((objective, index) => (
        <motion.div
          key={index}
          className="flex items-center rounded-lg bg-white p-4 shadow-md dark:bg-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <div className="mr-4 text-3xl text-teal-500">{objective.icon}</div>
          <p>{objective.text}</p>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

interface ChallengesProps {
  challenges: string[];
}

export const Challenges: React.FC<ChallengesProps> = ({ challenges }) => (
  <motion.div
    className="my-8 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 p-6 shadow-lg dark:from-purple-900 dark:to-indigo-900"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <ul className="list-inside list-disc space-y-2">
      {challenges.map((challenge, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          {challenge}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => (
  <motion.div className="my-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
    <h3 className="mb-4 text-2xl font-bold">Gallery</h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <motion.div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <CloudImg
            width={500}
            height={500}
            alt={image.alt}
            publicId={image.src}
            className="h-64 w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2 text-white">
            <p className="text-sm">{image.caption}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
);

interface CTAButtonProps {
  href: string;
  text: string;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ href, text }) => (
  <motion.div
    className="my-8 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.5 }}
  >
    <a
      href={href}
      className="inline-block transform rounded-full bg-teal-500 px-8 py-4 font-bold text-white transition-colors duration-300 hover:scale-105 hover:bg-teal-600"
    >
      {text}
    </a>
  </motion.div>
);
