import { FaSpotify } from 'react-icons/fa';

export default function NowPlayingComponent({ data }) {
  return (
    <div className="flex items-center gap-3 rounded-lg  p-3 backdrop-blur-sm">
      <FaSpotify
        className={`text-2xl ${data?.isPlaying ? 'text-[#1DB954]' : 'text-gray-400'}`}
      />

      <div className="flex flex-col">
        <p className="text-sm text-gray-300">
          {data?.isPlaying ? (
            <>
              {data.title} - {data.artist}
            </>
          ) : (
            "Not Playing"
          )}
        </p>
      </div>
    </div>
  );
}