import axios from 'axios';
import querystring from 'querystring';
import { NextRequest, NextResponse } from 'next/server';
import { CurrentlyPlayingData, CurrentlyPlayingResponse, TopTracksResponse, TrackData } from '@/types/spotify';
import { NOW_PLAYING_ENDPOINT, TOKEN_ENDPOINT, TOP_TRACKS_ENDPOINT, refresh_token, token } from '@/constant';

const getAccessToken = async (): Promise<string> => {
  const res = await axios.post<{ access_token: string }>(
    TOKEN_ENDPOINT,
    querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
    {
      headers: {
        Authorization: `Basic ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );

  return res.data.access_token;
};

const getNowPlaying = async (): Promise<CurrentlyPlayingResponse> => {
  const access_token = await getAccessToken();

  const res = await axios.get<CurrentlyPlayingResponse>(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.data;
};

const getTopTracks = async (): Promise<TopTracksResponse> => {
  const access_token = await getAccessToken();

  const res = await axios.get<TopTracksResponse>(TOP_TRACKS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.data;
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  if (type === 'now-playing') {
    const response = await getNowPlaying();

    if (!response || response.currently_playing_type !== 'track') {
      return NextResponse.json(
        { isPlaying: false },
        {
          status: 200,
          headers: {
            'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=90',
          },
        }
      );
    }

    const data: CurrentlyPlayingData = {
      isPlaying: response.is_playing,
      title: response.item.name,
      album: response.item.album.name,
      artist: response.item.album.artists.map((artist) => artist.name).join(', '),
      albumImageUrl: response.item.album.images[0].url,
      songUrl: response.item.external_urls.spotify,
      durationMs: response.item.duration_ms,
      progressMs: response.progress_ms,
    };

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=90',
      },
    });
  } else if (type === 'top-tracks') {
    const response = await getTopTracks();

    const tracks: TrackData[] = response.items.map((item) => ({
      title: item.name,
      album: item.album.name,
      artist: item.album.artists.map((artist) => artist.name).join(', '),
      albumImageUrl: item.album.images[0].url,
      songUrl: item.external_urls.spotify,
      preview: item.preview_url,
    }));

    return NextResponse.json(tracks, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=90',
      },
    });
  } else {
    return NextResponse.json(
      { error: 'Invalid type parameter' },
      {
        status: 400,
        headers: {
          'Cache-Control': 'public, s-maxage=180, stale-while-revalidate=90',
        },
      }
    );
  }
}
