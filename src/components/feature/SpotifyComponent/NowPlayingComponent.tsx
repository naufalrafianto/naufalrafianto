"use client";
import { FaSpotify } from 'react-icons/fa';
import { HiMusicalNote } from 'react-icons/hi2';
import Image from 'next/image';
import Link from 'next/link';
import { CurrentlyPlayingData } from '@/types/spotify';

export default function NowPlayingComponent({ data }: { data: CurrentlyPlayingData | undefined }) {
  if (!data?.isPlaying || !data.title || !data.artist || !data.albumImageUrl || !data.songUrl) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 p-3">
        <HiMusicalNote className="text-lg text-gray-500" />
        <div>
          <p className="text-sm text-gray-400">Not playing</p>
        </div>
      </div>
    );
  }

  return (
    <Link
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3"
    >
      <Image
        src={data.albumImageUrl}
        alt={data.album || 'Album cover'}
        width={56}
        height={40}
        className="rounded-md object-cover"
      />

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <FaSpotify className="text-[#1DB954] text-sm" />
          <span className="text-xs text-gray-500">Now Playing</span>
        </div>
        <p className="text-sm text-white truncate font-medium">
          {data.title}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {data.artist}
        </p>
      </div>
    </Link>
  );
}