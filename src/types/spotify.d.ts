export interface CurrentlyPlayingData {
  isPlaying: boolean;
  title?: string;
  album?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
  durationMs?: number;
  progressMs?: number;
}

export interface TrackData {
  title: string;
  album: string;
  artist: string;
  albumImageUrl: string;
  songUrl: string;
  preview: string;
}

export interface CurrentlyPlayingResponse {
  is_playing: boolean;
  item: {
    name: string;
    album: {
      name: string;
      artists: { name: string }[];
      images: [{ url: string }];
    };
    external_urls: {
      spotify: string;
    };
    duration_ms: number;
  };
  progress_ms: number;
  currently_playing_type: string;
}

export interface TopTracksResponse {
  items: {
    name: string;
    album: {
      name: string;
      artists: { name: string }[];
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
    preview_url: string;
  }[];
}
