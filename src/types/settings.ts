export type AudioQuality = 'low' | 'normal' | 'high' | 'very_high';

export interface PlayerSettings {
  autoplay: boolean;
  crossfade: number; // in seconds (0 to 12)
  audioQuality: AudioQuality;
  normalizeVolume: boolean;
  volume: number; // 0 to 1
  shuffle: boolean;
  repeatMode: 'off' | 'one' | 'all';
}

export interface NotificationSettings {
  newReleases: boolean;
  playlistUpdates: boolean;
  recommendations: boolean;
  accountNotifications: boolean;
}

export interface AppBackupData {
  version: string;
  exportedAt: string;
  user: any;
  auth: any;
  playlists: any[];
  likedSongs: string[];
  savedAlbums: string[];
  followedArtists: string[];
  history: any[];
  queue: any[];
  settings: PlayerSettings;
  notifications: NotificationSettings;
  recentSearches: string[];
}
