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

interface PortfolioMetadata {
  title: string;
  desc: string;
  date: string;
  demo?: string;
  repository?: string;
  thumbnail: string;
  slug: string;
  tags: string;
  stack?: string[];
}

interface HeadingInfo {
  text: string;
  id: string;
  level: number;
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

export async function getPost(slug: string): Promise<{
  content: React.ReactElement;
  metadata: PortfolioMetadata;
  slug: string;
  headings: HeadingInfo[];
} | null> {
  const filePath = path.join(process.cwd(), 'src', 'content', 'portfolio', slug, 'page.mdx');
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const source = fs.readFileSync(filePath, 'utf-8');
  const { content, data } = matter(source);
  const metadata = data as PortfolioMetadata;
  const headings = extractHeadings(content);

  return {
    content: await MDXRemote({
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
      },
    }),
    metadata,
    slug,
    headings,
  };
}

export async function getAllPosts(): Promise<
  Array<{
    content: React.ReactElement;
    metadata: PortfolioMetadata;
    slug: string;
    headings: HeadingInfo[];
  }>
> {
  const portfolioDir = path.join(process.cwd(), 'src', 'content', 'portfolio');
  const portfolioDirs = getPortfolioDirectories(portfolioDir);
  const posts = await Promise.all(
    portfolioDirs.map(async (dir) => {
      const slug = dir;
      const post = await getPost(slug);
      return post;
    })
  );
  return posts.filter((post): post is NonNullable<typeof post> => post !== null);
}

export async function getBlogPosts(): Promise<
  Array<{
    content: React.ReactElement;
    metadata: PortfolioMetadata;
    slug: string;
    headings: HeadingInfo[];
  }>
> {
  return getAllPosts();
}
