import { CurrentlyPlayingData } from '@/types/spotify';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useNowPlaying = () => {
  const { data, error, mutate } = useSWR<CurrentlyPlayingData>('/api/spotify?type=now-playing', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: false,
    dedupingInterval: 30000,
  });


  return {
    nowPlaying: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

