import {
  INITIAL_USER,
  INITIAL_AUTH,
  MOCK_SONGS,
  MOCK_ARTISTS,
  MOCK_ALBUMS,
  INITIAL_PLAYLISTS,
  INITIAL_LIKED_SONGS,
  INITIAL_SAVED_ALBUMS,
  INITIAL_FOLLOWED_ARTISTS,
  INITIAL_PLAY_HISTORY,
  INITIAL_QUEUE,
  INITIAL_SETTINGS,
  INITIAL_NOTIFICATIONS,
  INITIAL_RECENT_SEARCHES
} from '../data/mockData';

export const STORAGE_KEYS = {
  USER: 'musika_user',
  AUTH: 'musika_auth',
  SONGS: 'musika_songs',
  ARTISTS: 'musika_artists',
  ALBUMS: 'musika_albums',
  PLAYLISTS: 'musika_playlists',
  LIKED_SONGS: 'musika_liked_songs',
  SAVED_ALBUMS: 'musika_saved_albums',
  FOLLOWED_ARTISTS: 'musika_followed_artists',
  PLAY_HISTORY: 'musika_play_history',
  QUEUE: 'musika_queue',
  SETTINGS: 'musika_settings',
  NOTIFICATIONS: 'musika_notifications',
  RECENT_SEARCHES: 'musika_recent_searches',
} as const;

export function getStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing localStorage key "${key}":`, error);
  }
}

export function removeStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}

export function clearStorage(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
}

export function hasStorage(key: string): boolean {
  return localStorage.getItem(key) !== null;
}

/**
 * Initializes localStorage with default mock data if not already present.
 * Does not overwrite existing user data.
 */
export function initializeStorage(): void {
  if (!hasStorage(STORAGE_KEYS.USER)) {
    setStorage(STORAGE_KEYS.USER, INITIAL_USER);
  }
  if (!hasStorage(STORAGE_KEYS.AUTH)) {
    setStorage(STORAGE_KEYS.AUTH, INITIAL_AUTH);
  }
  if (!hasStorage(STORAGE_KEYS.SONGS)) {
    setStorage(STORAGE_KEYS.SONGS, MOCK_SONGS);
  }
  if (!hasStorage(STORAGE_KEYS.ARTISTS)) {
    setStorage(STORAGE_KEYS.ARTISTS, MOCK_ARTISTS);
  }
  if (!hasStorage(STORAGE_KEYS.ALBUMS)) {
    setStorage(STORAGE_KEYS.ALBUMS, MOCK_ALBUMS);
  }
  if (!hasStorage(STORAGE_KEYS.PLAYLISTS)) {
    setStorage(STORAGE_KEYS.PLAYLISTS, INITIAL_PLAYLISTS);
  }
  if (!hasStorage(STORAGE_KEYS.LIKED_SONGS)) {
    setStorage(STORAGE_KEYS.LIKED_SONGS, INITIAL_LIKED_SONGS);
  }
  if (!hasStorage(STORAGE_KEYS.SAVED_ALBUMS)) {
    setStorage(STORAGE_KEYS.SAVED_ALBUMS, INITIAL_SAVED_ALBUMS);
  }
  if (!hasStorage(STORAGE_KEYS.FOLLOWED_ARTISTS)) {
    setStorage(STORAGE_KEYS.FOLLOWED_ARTISTS, INITIAL_FOLLOWED_ARTISTS);
  }
  if (!hasStorage(STORAGE_KEYS.PLAY_HISTORY)) {
    setStorage(STORAGE_KEYS.PLAY_HISTORY, INITIAL_PLAY_HISTORY);
  }
  if (!hasStorage(STORAGE_KEYS.QUEUE)) {
    setStorage(STORAGE_KEYS.QUEUE, INITIAL_QUEUE);
  }
  if (!hasStorage(STORAGE_KEYS.SETTINGS)) {
    setStorage(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  }
  if (!hasStorage(STORAGE_KEYS.NOTIFICATIONS)) {
    setStorage(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }
  if (!hasStorage(STORAGE_KEYS.RECENT_SEARCHES)) {
    setStorage(STORAGE_KEYS.RECENT_SEARCHES, INITIAL_RECENT_SEARCHES);
  }
}
