'use client';
import React from 'react';
import { renderToString } from 'react-dom/server';

interface EstimatedReadTimeProps {
  content: React.ReactElement;
}

const WORDS_PER_MINUTE = 200;

const EstimatedReadTime: React.FC<EstimatedReadTimeProps> = ({ content }) => {
  const calculateReadTime = (content: React.ReactElement): number => {
    // Convert the React element to a string
    const contentString = renderToString(content);

    // Remove HTML tags and trim whitespace
    const text = contentString.replace(/<[^>]*>/g, '').trim();

    // Count words
    const wordCount = text.split(/\s+/).length;

    // Calculate read time
    return Math.ceil(wordCount / WORDS_PER_MINUTE);
  };

  const readTimeMinutes = calculateReadTime(content);

  return <span className="text-sm text-gray-500">{readTimeMinutes} min read</span>;
};

export default EstimatedReadTime;
