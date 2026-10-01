import { Song, Artist, Album, PlayHistoryItem } from '../../types/music';
import { getStorage, setStorage, STORAGE_KEYS } from '../storageService';
import {
  MOCK_SONGS,
  MOCK_ARTISTS,
  MOCK_ALBUMS,
  INITIAL_PLAY_HISTORY,
  INITIAL_RECENT_SEARCHES
} from '../../data/mockData';

export const musicStorage = {
  getSongs(): Song[] {
    return getStorage<Song[]>(STORAGE_KEYS.SONGS, MOCK_SONGS);
  },

  setSongs(songs: Song[]): void {
    setStorage(STORAGE_KEYS.SONGS, songs);
  },

  getSongById(id: string): Song | undefined {
    const songs = this.getSongs();
    return songs.find((s) => s.id === id);
  },

  getArtists(): Artist[] {
    return getStorage<Artist[]>(STORAGE_KEYS.ARTISTS, MOCK_ARTISTS);
  },

  getArtistById(id: string): Artist | undefined {
    const artists = this.getArtists();
    return artists.find((a) => a.id === id);
  },

  getAlbums(): Album[] {
    return getStorage<Album[]>(STORAGE_KEYS.ALBUMS, MOCK_ALBUMS);
  },

  getAlbumById(id: string): Album | undefined {
    const albums = this.getAlbums();
    return albums.find((a) => a.id === id);
  },

  getPlayHistory(): PlayHistoryItem[] {
    return getStorage<PlayHistoryItem[]>(STORAGE_KEYS.PLAY_HISTORY, INITIAL_PLAY_HISTORY);
  },

  savePlayHistory(songId: string, progress: number): void {
    const history = this.getPlayHistory();
    const filtered = history.filter((item) => item.songId !== songId);
    const newEntry: PlayHistoryItem = {
      songId,
      progress,
      playedAt: new Date().toISOString()
    };
    const updated = [newEntry, ...filtered].slice(0, 30);
    setStorage(STORAGE_KEYS.PLAY_HISTORY, updated);
  },

  getRecentSearches(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.RECENT_SEARCHES, INITIAL_RECENT_SEARCHES);
  },

  saveRecentSearch(term: string): void {
    if (!term || !term.trim()) return;
    const cleanTerm = term.trim();
    const current = this.getRecentSearches();
    const filtered = current.filter((item) => item.toLowerCase() !== cleanTerm.toLowerCase());
    const updated = [cleanTerm, ...filtered].slice(0, 10);
    setStorage(STORAGE_KEYS.RECENT_SEARCHES, updated);
  },

  removeRecentSearch(term: string): void {
    const current = this.getRecentSearches();
    const updated = current.filter((item) => item !== term);
    setStorage(STORAGE_KEYS.RECENT_SEARCHES, updated);
  },

  clearRecentSearches(): void {
    setStorage(STORAGE_KEYS.RECENT_SEARCHES, []);
  }
};
