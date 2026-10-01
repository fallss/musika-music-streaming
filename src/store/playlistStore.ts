import { create } from 'zustand';
import { Playlist } from '../types/playlist';
import { playlistStorage } from '../services/storage/playlistStorage';

interface PlaylistState {
  playlists: Playlist[];
  createPlaylist: (data: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>) => Playlist;
  updatePlaylist: (id: string, updates: Partial<Omit<Playlist, 'id' | 'createdAt'>>) => Playlist | null;
  deletePlaylist: (id: string) => boolean;
  addSongToPlaylist: (playlistId: string, songId: string) => boolean;
  removeSongFromPlaylist: (playlistId: string, songId: string) => boolean;
  reorderPlaylistSongs: (playlistId: string, songIds: string[]) => boolean;
  getPlaylistById: (id: string) => Playlist | undefined;
  refreshPlaylists: () => void;
}

export const usePlaylistStore = create<PlaylistState>((set, get) => ({
  playlists: playlistStorage.getPlaylists(),

  createPlaylist: (data) => {
    const newPlaylist = playlistStorage.createPlaylist(data);
    set({ playlists: playlistStorage.getPlaylists() });
    return newPlaylist;
  },

  updatePlaylist: (id, updates) => {
    const updated = playlistStorage.updatePlaylist(id, updates);
    if (updated) {
      set({ playlists: playlistStorage.getPlaylists() });
    }
    return updated;
  },

  deletePlaylist: (id) => {
    const success = playlistStorage.deletePlaylist(id);
    if (success) {
      set({ playlists: playlistStorage.getPlaylists() });
    }
    return success;
  },

  addSongToPlaylist: (playlistId, songId) => {
    const success = playlistStorage.addSongToPlaylist(playlistId, songId);
    if (success) {
      set({ playlists: playlistStorage.getPlaylists() });
    }
    return success;
  },

  removeSongFromPlaylist: (playlistId, songId) => {
    const success = playlistStorage.removeSongFromPlaylist(playlistId, songId);
    if (success) {
      set({ playlists: playlistStorage.getPlaylists() });
    }
    return success;
  },

  reorderPlaylistSongs: (playlistId, songIds) => {
    const success = playlistStorage.reorderSongs(playlistId, songIds);
    if (success) {
      set({ playlists: playlistStorage.getPlaylists() });
    }
    return success;
  },

  getPlaylistById: (id) => {
    return get().playlists.find((p) => p.id === id);
  },

  refreshPlaylists: () => {
    set({ playlists: playlistStorage.getPlaylists() });
  },
}));
