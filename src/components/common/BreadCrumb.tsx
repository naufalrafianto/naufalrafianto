'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const formatSegment = (segment: string) => {
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export const Breadcrumb = () => {
  const pathname = usePathname();
  const pathArray = pathname.split('/').filter(Boolean);

  // Remove 'en' if it comes after 'blog'
  const processedPathArray = pathArray.reduce<string[]>((acc, segment, index) => {
    if ((segment === 'en' || segment === 'id') && pathArray[index - 1] === 'blog') {
      return acc;
    }
    acc.push(segment);
    return acc;
  }, []); // The initial value is an empty array of strings.

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center text-sm text-gray-400 dark:text-gray-300">
        <li>
          <Link href="/" className="hover:text-teal-500 dark:hover:text-teal-400">
            Home
          </Link>
        </li>
        {processedPathArray.map((path, index) => {
          const href = `/${processedPathArray.slice(0, index + 1).join('/')}`;
          const isLast = index === processedPathArray.length - 1;

          return (
            <li key={index} className="flex items-center">
              <span className="mx-2 text-gray-500">/</span>
              {isLast ? (
                <span className="text-teal-500 dark:text-teal-400">{formatSegment(decodeURIComponent(path))}</span>
              ) : (
                <Link href={href} className="hover:text-teal-500 dark:hover:text-teal-400">
                  {capitalize(decodeURIComponent(path))}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
