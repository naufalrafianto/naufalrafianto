import { promises as fs } from 'fs';
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

// Mark the file as server-side only
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

async function getPortfolioDirectories(dir: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    return files
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (error) {
    console.error('Error reading portfolio directories:', error);
    return [];
  }
}

function extractHeadings(content: string): HeadingInfo[] {
  const headingRegex = /<h([1-6])\s+id="([^"]+)"[^>]*>(.*?)<\/h[1-6]>/g;
  const headings: HeadingInfo[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]+>/g, ''),
    });
  }

  return headings;
}

async function getPostData(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'portfolio', slug, 'page.mdx');
    const source = await fs.readFile(filePath, 'utf-8');
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
  } catch (error) {
    console.error(`Error getting post data for slug ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const portfolioDir = path.join(process.cwd(), 'src', 'content', 'portfolio');
    const portfolioDirs = await getPortfolioDirectories(portfolioDir);
    const posts = await Promise.all(
      portfolioDirs.map((dir) => getPostData(dir))
    );
    return posts.filter((post): post is NonNullable<typeof post> => post !== null);
  } catch (error) {
    console.error('Error getting all posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
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
  } catch (error) {
    console.error(`Error getting post for slug ${slug}:`, error);
    return null;
  }
}

export async function getBlogPosts(): Promise<Post[]> {
  return getAllPosts();
}

export function tag(posts: Post[], ...tags: string[]): Post[] {
  return posts.filter((post) => tags.every((tag) => post.metadata.tags.includes(tag)));
}