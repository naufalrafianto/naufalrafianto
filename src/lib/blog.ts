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

interface PortfolioMetadata {
  title: string;
  desc: string;
  date: string;
  demo?: string;
  repository?: string;
  thumbnail: string;
  slug: string;
  tags: string[];
  stack?: string[];
}

interface HeadingInfo {
  text: string;
  id: string;
  level: number;
}

export interface Post {
  content: React.ReactElement;
  metadata: PortfolioMetadata;
  slug: string;
  headings: HeadingInfo[];
  previousPost?: { title: string; slug: string } | null;
  nextPost?: { title: string; slug: string } | null;
}
function getPortfolioDirectories(dir: string): string[] {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

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

async function getPostData(slug: string): Promise<Post | null> {
  const filePath = path.join(process.cwd(), 'src', 'content', 'portfolio', slug, 'page.mdx');
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(source);
  const metadata = data as PortfolioMetadata;
  const headings = extractHeadings(content);

  const mdxContent = await MDXRemote({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
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

  return {
    content: mdxContent,
    metadata,
    slug,
    headings,
    previousPost: null,
    nextPost: null,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const portfolioDir = path.join(process.cwd(), 'src', 'content', 'portfolio');
  const portfolioDirs = getPortfolioDirectories(portfolioDir);
  const posts = await Promise.all(
    portfolioDirs.map(async (dir) => {
      const slug = dir;
      return getPostData(slug);
    })
  );
  return posts.filter((post): post is NonNullable<typeof post> => post !== null);
}

export async function getPost(slug: string): Promise<Post | null> {
  const allPosts = await getAllPosts();
  const postIndex = allPosts.findIndex((post) => post.slug === slug);

  if (postIndex === -1) {
    return null;
  }

  const currentPost = allPosts[postIndex];
  const previousPost = postIndex > 0 ? allPosts[postIndex - 1] : null;
  const nextPost = postIndex < allPosts.length - 1 ? allPosts[postIndex + 1] : null;

  return {
    ...currentPost,
    previousPost: previousPost ? { title: previousPost.metadata.title, slug: previousPost.slug } : null,
    nextPost: nextPost ? { title: nextPost.metadata.title, slug: nextPost.slug } : null,
  };
}

export async function getBlogPosts(): Promise<Post[]> {
  return getAllPosts();
}

export function tag(posts: Post[], ...tags: string[]): Post[] {
  return posts.filter((post) => tags.every((tag) => post.metadata.tags.includes(tag)));
}
