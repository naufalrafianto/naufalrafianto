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

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center text-sm text-gray-400 dark:text-gray-300">
        <li>
          <Link href="/" className="hover:text-teal-500 dark:hover:text-teal-400">
            Home
          </Link>
        </li>
        {pathArray.map((path, index) => {
          const href = `/${pathArray.slice(0, index + 1).join('/')}`;
          const isLast = index === pathArray.length - 1;

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
