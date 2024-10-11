import Image from 'next/image';
import React from 'react';
import { buildUrl } from 'cloudinary-build-url';

type CloudImgProps = {
  width?: number;
  height?: number;
  alt: string;
  className?: string;
  publicId: string;
};

export const CloudImg: React.FC<CloudImgProps> = ({ height, width, alt, className, publicId }) => {
  if (!publicId) {
    console.error('CloudImg: publicId is required');
    return null;
  }

  try {
    const url = buildUrl(publicId, {
      cloud: {
        cloudName: 'mrnaufal',
      },
    });

    return <Image src={url} alt={alt} height={height} width={width} className={className} />;
  } catch (error) {
    console.error('CloudImg: Error building URL', error);
    return null;
  }
};
