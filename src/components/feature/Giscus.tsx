'use client';
import React from 'react';
import Giscus, { Repo } from '@giscus/react';

const GiscusComments: React.FC = () => {
  return (
    <Giscus
      repo={(process.env.NEXT_PUBLIC_GISCUS_REPO as Repo) || ''}
      repoId={process.env.NEXT_PUBLIC_GISCUS_REPO_ID || ''}
      category="General"
      categoryId="DIC_kwDOMfGGxc4CjTir"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme="dark"
      lang="en"
    />
  );
};

export default GiscusComments;
