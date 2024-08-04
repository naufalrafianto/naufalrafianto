import { CurrentlyPlayingData, TrackData } from '@/types/spotify';
import useSWR from 'swr';

export const useNowPlaying = () => {
  const fetcher = (url: string): Promise<CurrentlyPlayingData> =>
    fetch(url).then((res) => res.json() as Promise<CurrentlyPlayingData>);
  const { data, error } = useSWR<CurrentlyPlayingData>('/api/spotify?type=now-playing', fetcher);

  return {
    nowPlaying: data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const useTopTracks = () => {
  const fetcher = (url: string): Promise<TrackData[]> => fetch(url).then((res) => res.json() as Promise<TrackData[]>);

  const { data, error } = useSWR('/api/spotify?type=top-tracks', fetcher);

  return {
    topTracks: data,
    isLoading: !error && !data,
    isError: error,
  };
};
