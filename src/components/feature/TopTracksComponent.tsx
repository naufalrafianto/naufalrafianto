'use client';
import React, { useRef, useState } from 'react';
import { useTopTracks } from '@/lib/spotify';
import Image from 'next/image';
import { TrackData } from '@/types/spotify';

export const TopTracksComponent: React.FC = () => {
  const { topTracks, isLoading } = useTopTracks();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const [previewPlayed, setPreviewPlayed] = useState<boolean>(false);

  const handlePlay = (trackUrl: string) => {
    if (audioRef.current) {
      if (audioRef.current.src === trackUrl && !audioRef.current.paused) {
        audioRef.current.pause();
        setPreviewPlayed(false);
      } else {
        audioRef.current.src = trackUrl;
        audioRef.current.play();
        setPreviewPlayed(true);
      }
      setCurrentTrack(trackUrl);
    }
  };

  const skeletonItems = Array.from({ length: 5 }, (_, i) => (
    <li key={i} className="flex animate-pulse items-center justify-between rounded-lg bg-gray-700 p-2">
      <div className="flex items-center">
        <div className="mr-4 h-10 w-10 rounded-md bg-gray-600" />
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-gray-600"></div>
          <div className="h-4 w-16 rounded bg-gray-600"></div>
        </div>
      </div>
      <div>
        <div className="h-8 w-20 rounded-full bg-gray-600"></div>
      </div>
    </li>
  ));

  return (
    <ul className="no-scrollbar flex h-full w-full flex-col justify-between overflow-y-auto">
      {isLoading
        ? skeletonItems
        : topTracks
            ?.slice(0, 5)
            .map((track, i) => (
              <TrackItem
                key={i}
                track={track}
                handlePlay={handlePlay}
                currentTrack={currentTrack}
                previewPlayed={previewPlayed}
              />
            ))}
      <audio ref={audioRef} />
    </ul>
  );
};

interface TrackItemProps {
  track: TrackData;
  handlePlay: (trackUrl: string) => void;
  currentTrack: string | null;
  previewPlayed: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, handlePlay, currentTrack, previewPlayed }) => {
  const isPlaying = currentTrack === track.preview && previewPlayed;

  return (
    <li className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-white/15">
      <div className="flex items-center">
        <Image width={40} height={40} src={track.albumImageUrl} alt={track.album} className="mr-4 rounded-md" />
        <div className="space-y-[-1]">
          <p className="text-sm font-medium">{track.title}</p>
          <p className="text-sm text-neutral-400">{track.artist}</p>
        </div>
      </div>
      <div>
        <button
          onClick={() => handlePlay(track.preview)}
          className="rounded-full bg-white px-4 py-1 text-sm font-bold text-black hover:bg-[#1DB954]"
        >
          {isPlaying ? 'Stop' : 'Play'}
        </button>
      </div>
    </li>
  );
};
