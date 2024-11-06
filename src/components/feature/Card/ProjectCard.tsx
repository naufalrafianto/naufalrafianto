import { BaseCard } from '.';

interface ProjectCardProps {
  title: string;
  description: string;
  dates: Date | string;
  tags: readonly string[];
  image?: string;
  slug?: string;
  onTagClick: (_tag: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  dates,
  tags,
  image,
  slug,
  onTagClick,
}) => (
  <BaseCard
    title={title}
    description={description}
    date={dates}
    image={image}
    tags={tags}
    onTagClick={onTagClick}
    href={`/portfolio/${slug}`}
    cardType="portfolio"
  />
);
