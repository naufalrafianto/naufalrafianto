'use client';
import React from 'react';
import Giscus from '@giscus/react';

const GiscusComments: React.FC = () => {
  return (
    <Giscus
      repo="naufalrafianto/naufalrafianto"
      repoId="R_kgDOMfGGxQ"
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
