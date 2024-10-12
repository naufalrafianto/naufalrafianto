import path from 'path';

export const blogConfig = {
  postsDirectory: path.join(process.cwd(), 'src', 'content', 'blog'),
  postsPerPage: 10,
  defaultAuthor: 'Naufal Rafianto',
  defaultOgImage: '/image/profile-pict.png',
  dateFormat: 'MMMM d, yyyy',
};

export interface BlogPostMetadata {
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  coverImage: string;
  ogImage?: string;
  slug: string;
  locale: string;
  translatedFilename: string;
  readingTime?: {
    text: string;
    time: number;
    words: number;
    minutes: number;
  };
}

export interface BlogPost {
  content: React.ReactElement;
  metadata: BlogPostMetadata;
  slug: string;
  headings: HeadingInfo[];
  previousPost?: { title: string; slug: string } | null;
  nextPost?: { title: string; slug: string } | null;
}

interface HeadingInfo {
  text: string;
  id: string;
  level: number;
}
