import { cn } from '@/lib/cn';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../common/Card';
import { CloudImg } from '../common/CloudImg';
import { Badge } from '../common/Badge';
import { formatDate } from '@/lib/date';
import { CustomLink } from '../common/CustomLink';

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: Date | string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  className?: string;
  slug?: string;
}

export function ProjectCard({ title, href, description, dates, tags, link, image, video, className, slug }: Props) {
  return (
    <Card
      className={
        'group flex h-full flex-col overflow-hidden border pb-2 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg motion-reduce:hover:scale-100'
      }
    >
      <Link href={href || '#'} className={cn('block cursor-pointer', className)}>
        {video && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        )}
        {image && (
          <CloudImg
            publicId={image}
            alt={title}
            width={500}
            height={300}
            className="h-40 w-full overflow-hidden object-cover object-top"
          />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <div className="text-[10px]">{formatDate(dates)}</div>
          <div className="hidden font-sans text-xs underline print:visible">
            {link?.replace('https://', '').replace('www.', '').replace('/', '')}
          </div>
          <Markdown className="prose dark:prose-invert max-w-full text-pretty font-sans text-xs text-neutral-100/80">
            {description}
          </Markdown>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2 pb-2">
        <div className="mt-2 flex flex-wrap gap-1">
          {tags?.map((tag) => (
            <Badge className="px-1 py-0 text-[10px]" variant="secondary" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <CustomLink href={`/portfolio/${slug}`} className="inline-flex w-fit gap-1 text-base">
          {'See more ↗'}
        </CustomLink>
      </CardFooter>
    </Card>
  );
}
