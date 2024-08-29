'use client';
import * as React from 'react';
import styles from './SpotifyBar.module.css';
import Lottie from 'lottie-react';
import animationData from '../../../../public/lottie/spotify.json';
import Image from 'next/image';
import { CurrentlyPlayingData } from '@/types/spotify';
import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { FaSpinner } from 'react-icons/fa';

type SpotifyProps = {
  data: CurrentlyPlayingData | undefined;
};

const NowPlayingComponent: React.FC<SpotifyProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="relative flex h-full w-full items-center justify-center">
        <FaSpinner className="h-14 w-14 animate-spin" />
      </div>
    );
  }

  if (data.isPlaying) {
    return (
      <>
        <Image
          fill={true}
          src={data.albumImageUrl!}
          alt="Cover"
          className="absolute left-0 top-0 z-0 aspect-video h-full w-full overflow-hidden rounded-md object-cover object-[50%_33%] transition-transform"
        />
        <div className="relative z-10 flex h-full w-full flex-col items-start justify-end rounded-md bg-black/50 px-2 text-white">
          <p className="z-10 w-2/3 overflow-hidden text-ellipsis whitespace-nowrap text-lg font-semibold transition duration-200 group-hover/bento:translate-x-2">
            {data.title}
          </p>
          <p className="z-10 w-2/3 overflow-hidden text-ellipsis whitespace-nowrap pb-4 text-sm font-normal opacity-80 transition duration-200 group-hover/bento:translate-x-2">
            {data.artist}
          </p>
          <div className="absolute bottom-4 right-4 z-10 h-6 text-white">
            <PauseIcon className="h-6 w-6" />
          </div>
          <div
            className={`absolute bottom-1.5 left-1/2 z-0 flex h-1/4 w-4/5 -translate-x-1/2 transform items-end gap-1 ${styles.eqContainer}`}
          >
            <span className={`${styles.bar} ${styles.b1}`} />
            <span className={`${styles.bar} ${styles.b2}`} />
            <span className={`${styles.bar} ${styles.b3}`} />
            <span className={`${styles.bar} ${styles.b4}`} />
            <span className={`${styles.bar} ${styles.b5}`} />
            <span className={`${styles.bar} ${styles.b6}`} />
            <span className={`${styles.bar} ${styles.b7}`} />
          </div>
        </div>
      </>
    );
  }

  // This means data is of type SpotifyDataNotPlaying
  return (
    <div className="flex flex-col justify-center">
      <p className="pt-6 text-center font-semibold transition duration-200 sm:ml-3 sm:pt-3">
        Currently not any playing song
      </p>
      <div className="mx-auto -mt-6 mb-6 h-32 w-32">
        <Lottie animationData={animationData} />
      </div>
      <div className="absolute bottom-4 right-4 z-10 h-6 text-white transition duration-200">
        <PlayIcon className="h-6 w-6" />
      </div>
    </div>
  );
};

export default NowPlayingComponent;
