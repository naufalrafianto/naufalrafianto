import { BlogPost, BlogPostMetadata } from '@/constant/blog';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';
import { FadeUp } from '@/components/animation/FadeUp';
import { Reveal } from '@/components/animation/Reveal';
import { Callout } from '@/components/common/Callout';
import { CloudImg } from '@/components/common/CloudImg';
import { TechIcon } from '@/components/feature/TechIcon';
import { CustomLink } from '@/components/common/CustomLink';
import {
  CTAButton,
  Challenges,
  Gallery,
  ProjectObjectives,
  Subtitle,
  TechStackShowcase,
} from '@/components/mdx-components';
import {
  FaCameraRetro,
  FaClipboardList,
  FaCode,
  FaLightbulb,
  FaMountain,
  FaShoppingCart,
  FaUserCheck,
  FaUserFriends,
} from 'react-icons/fa';
import { blogConfig } from '@/constant/blog';
import remarkReadingTime from './readingTime';

function extractHeadings(content: string): HeadingInfo[] {
  const headingRegex = /<h([1-6])\s+id="([^"]+)"[^>]*>(.*?)<\/h[1-6]>/g;
  const headings: HeadingInfo[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''), // Remove any nested HTML tags
    });
  }

  return headings;
}

export async function getBlogPostData(slug: string, locale: string): Promise<BlogPost | null> {
  const filePath = path.join(process.cwd(), 'src', 'content', 'blog', locale, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(source);
  const metadata = {
    ...data,
    date: new Date(data.date).toISOString(),
    author: data.author || blogConfig.defaultAuthor,
    ogImage: data.ogImage || blogConfig.defaultOgImage,
    slug,
    locale,
  } as BlogPostMetadata;
  const headings = extractHeadings(content);

  const mdxContent = await MDXRemote({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkReadingTime],
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: {
                light: 'github-light',
                dark: 'github-dark',
              },
              keepBackground: false,
            },
          ],
        ],
      },
    },
    components: {
      Callout,
      CustomLink,
      FadeUp,
      CloudImg,
      Reveal,
      TechIcon,
      Subtitle,
      TechStackShowcase,
      ProjectObjectives,
      Challenges,
      Gallery,
      CTAButton,
      FaCameraRetro,
      FaMountain,
      FaLightbulb,
      FaCode,
      FaUserFriends,
      FaShoppingCart,
      FaUserCheck,
      FaClipboardList,
    },
  });

  const readingTime = mdxContent.props.readingTime;

  return {
    content: mdxContent,
    metadata: {
      ...metadata,
      readingTime,
    },
    slug,
    headings,
    previousPost: null,
    nextPost: null,
  };
}

export async function getAllBlogPosts(locale: string): Promise<BlogPost[]> {
  if (!locale) {
    console.error('Locale is undefined in getAllBlogPosts');
    return [];
  }

  const blogDir = path.join(process.cwd(), 'src', 'content', 'blog', locale);

  if (!fs.existsSync(blogDir)) {
    console.error(`Blog directory not found for locale: ${locale}`);
    return [];
  }

  const blogFiles = fs.readdirSync(blogDir).filter((file) => file.endsWith('.mdx'));

  const posts = await Promise.all(
    blogFiles.map(async (file) => {
      const filePath = path.join(blogDir, file);
      const source = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(source);
      const slug = file.replace(/\.mdx$/, '');

      const metadata: BlogPostMetadata = {
        ...data,
        date: new Date(data.date).toISOString(),
        slug,
        locale,
      } as BlogPostMetadata;

      return {
        content,
        metadata,
        slug,
      } as BlogPost;
    })
  );

  return posts.sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime());
}

export function tagBlogPosts(posts: BlogPost[], ...tags: string[]): BlogPost[] {
  return posts.filter((post) => tags.every((tag) => post.metadata.tags.includes(tag)));
}
