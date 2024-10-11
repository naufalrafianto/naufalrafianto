'use client';
import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { CurrentlyPlayingData } from '@/types/spotify';
import { PauseIcon, PlayIcon } from '@radix-ui/react-icons';
import { FaSpinner, FaSpotify } from 'react-icons/fa';

type SpotifyProps = {
  data: CurrentlyPlayingData | undefined;
};

const NowPlayingComponent: React.FC<SpotifyProps> = ({ data }) => {
  if (!data) {
    return (
      <motion.div
        className="flex h-full w-full items-center justify-center rounded-lg bg-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <FaSpinner className="h-8 w-8 animate-spin text-green-500" />
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={data.isPlaying ? 'playing' : 'not-playing'}
        className="relative h-full w-full overflow-hidden rounded-lg bg-gray-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {data.isPlaying ? (
          <>
            <Image
              src={data.albumImageUrl!}
              alt="Album Cover"
              layout="fill"
              objectFit="cover"
              className="absolute left-0 top-0 z-0 transition-transform duration-300 hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-end p-4">
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                <h3 className="truncate text-xl font-bold">{data.title}</h3>
                <p className="truncate text-sm text-gray-300">{data.artist}</p>
              </motion.div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaSpotify className="h-5 w-5 text-green-500" />
                  <span className="text-xs font-medium">Now Playing</span>
                </div>
                <PauseIcon className="h-6 w-6" />
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center p-4">
            <FaSpotify className="mb-4 h-12 w-12 text-green-500" />
            <p className="mb-2 text-center font-medium">Not Playing</p>
            <p className="text-center text-sm text-gray-400">Spotify is currently idle</p>
            <PlayIcon className="mt-4 h-8 w-8 text-green-500" />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default NowPlayingComponent;
