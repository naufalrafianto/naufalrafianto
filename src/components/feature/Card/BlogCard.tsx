import { BaseCard } from '.';

interface BlogCardProps {
  post: {
    metadata: {
      title: string;
      description: string;
      date: string | Date;
      coverImage: string;
      tags: readonly string[];
    };
    slug: string;
  };
  onTagClick: (tag: string) => void;
  lang: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, onTagClick, lang = 'en' }) => (
  <BaseCard
    title={post.metadata.title}
    description={post.metadata.description}
    date={post.metadata.date}
    image={`/image/blog/${post.metadata.coverImage}`}
    tags={post.metadata.tags}
    onTagClick={onTagClick}
    href={`/blog/${lang}/${post.slug}`}
    cardType="blog"
  />
);
