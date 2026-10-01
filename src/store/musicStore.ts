import { create } from 'zustand';
import { Song, Artist, Album, PlayHistoryItem } from '../types/music';
import { musicStorage } from '../services/storage/musicStorage';

interface MusicState {
  songs: Song[];
  artists: Artist[];
  albums: Album[];
  playHistory: PlayHistoryItem[];
  recentSearches: string[];
  searchQuery: string;
  selectedGenre: string | null;

  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: string | null) => void;
  saveSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearSearches: () => void;
  refreshData: () => void;

  getSongById: (id: string) => Song | undefined;
  getArtistById: (id: string) => Artist | undefined;
  getAlbumById: (id: string) => Album | undefined;
  getSongsByArtistId: (artistId: string) => Song[];
  getSongsByAlbumId: (albumId: string) => Song[];
}

export const useMusicStore = create<MusicState>((set, get) => ({
  songs: musicStorage.getSongs(),
  artists: musicStorage.getArtists(),
  albums: musicStorage.getAlbums(),
  playHistory: musicStorage.getPlayHistory(),
  recentSearches: musicStorage.getRecentSearches(),
  searchQuery: '',
  selectedGenre: null,

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedGenre: (selectedGenre) => set({ selectedGenre }),

  saveSearch: (query) => {
    musicStorage.saveRecentSearch(query);
    set({ recentSearches: musicStorage.getRecentSearches() });
  },

  removeSearch: (query) => {
    musicStorage.removeRecentSearch(query);
    set({ recentSearches: musicStorage.getRecentSearches() });
  },

  clearSearches: () => {
    musicStorage.clearRecentSearches();
    set({ recentSearches: [] });
  },

  refreshData: () => {
    set({
      songs: musicStorage.getSongs(),
      artists: musicStorage.getArtists(),
      albums: musicStorage.getAlbums(),
      playHistory: musicStorage.getPlayHistory(),
      recentSearches: musicStorage.getRecentSearches(),
    });
  },

  getSongById: (id: string) => {
    return get().songs.find((s) => s.id === id);
  },

  getArtistById: (id: string) => {
    return get().artists.find((a) => a.id === id);
  },

  getAlbumById: (id: string) => {
    return get().albums.find((a) => a.id === id);
  },

  getSongsByArtistId: (artistId: string) => {
    return get().songs.filter((s) => s.artistId === artistId);
  },

  getSongsByAlbumId: (albumId: string) => {
    return get().songs.filter((s) => s.albumId === albumId);
  },
}));
