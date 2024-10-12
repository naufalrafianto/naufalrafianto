// src/lib/readingTime.ts

import React from 'react';

export function estimateReadingTime(content: string | React.ReactElement): number {
  let text: string;

  if (typeof content === 'string') {
    text = content;
  } else if (React.isValidElement(content)) {
    // If it's a React element, try to extract text from it
    text = extractTextFromReactElement(content);
  } else {
    console.error('Invalid content type passed to estimateReadingTime');
    return 0;
  }

  // Estimate reading time (assuming 200 words per minute)
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  return readingTime;
}

function extractTextFromReactElement(element: React.ReactElement): string {
  let text = '';
  React.Children.forEach(element.props.children, (child) => {
    if (typeof child === 'string') {
      text += child + ' ';
    } else if (React.isValidElement(child)) {
      text += extractTextFromReactElement(child) + ' ';
    }
  });
  return text.trim();
}
