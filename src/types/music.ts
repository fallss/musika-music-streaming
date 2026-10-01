export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  albumId: string;
  albumName: string;
  audioUrl: string;
  coverUrl: string;
  duration: number; // in seconds
  genre: string;
  releaseDate: string;
  plays?: number;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  bio: string;
  followers: number;
  monthlyListeners?: string;
  headerImage?: string;
}

export interface Album {
  id: string;
  title: string;
  artistId: string;
  artistName: string;
  coverUrl: string;
  releaseDate: string;
  genre: string;
  songCount?: number;
}

export interface PlayHistoryItem {
  songId: string;
  progress: number;
  playedAt: string;
}

export interface QueueItem {
  songId: string;
  position: number;
}

export type RepeatMode = 'off' | 'one' | 'all';
