/* eslint-disable unused-imports/no-unused-vars */
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

interface Post {
  content: React.ReactElement;
  metadata: PortfolioMetadata;
  slug: string;
  headings: HeadingInfo[];
  previousPost?: { title: string; slug: string } | null;
  nextPost?: { title: string; slug: string } | null;
}
