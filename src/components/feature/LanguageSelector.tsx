'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LanguageSelectorProps {
  currentLang: string;
  slug: string;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLang, slug }) => {
  const languages = [
    { code: 'en', name: 'English', flag: '/image/flag/uk.svg' },
    { code: 'id', name: 'Bahasa Indonesia', flag: '/image/flag/indonesia.svg' },
  ];

  return (
    <div className="flex space-x-4">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/blog/${lang.code}/${slug}`}
          className={`flex items-center gap-2 rounded-md px-3 py-5 text-sm font-medium transition duration-200 ease-in-out ${currentLang === lang.code ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'} `}
        >
          <Image width={10} height={10} src={lang.flag} alt={lang.name} className="h-4 w-4" />
          {lang.name}
        </Link>
      ))}
    </div>
  );
};

export default LanguageSelector;
