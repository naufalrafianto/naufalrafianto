import Image from 'next/image';
import React from 'react';
import { buildUrl } from 'cloudinary-build-url';

type CloudImg = {
  width?: number | undefined;
  height?: number | undefined;
  alt: string;
  className?: string;
  publicId: string;
} & React.PropsWithChildren;

export const CloudImg: React.FC<CloudImg> = ({ height, width, alt, className, publicId }) => {
  const url = buildUrl(publicId, {
    cloud: {
      cloudName: 'mrnaufal',
    },
  });

  return <Image src={url} alt={alt} height={height} width={width} className={className} />;
};
