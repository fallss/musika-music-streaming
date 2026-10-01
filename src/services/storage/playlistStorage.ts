import { Playlist } from '../../types/playlist';
import { getStorage, setStorage, STORAGE_KEYS } from '../storageService';
import { INITIAL_PLAYLISTS } from '../../data/mockData';

export const playlistStorage = {
  getPlaylists(): Playlist[] {
    return getStorage<Playlist[]>(STORAGE_KEYS.PLAYLISTS, INITIAL_PLAYLISTS);
  },

  setPlaylists(playlists: Playlist[]): void {
    setStorage(STORAGE_KEYS.PLAYLISTS, playlists);
  },

  getPlaylistById(id: string): Playlist | undefined {
    const playlists = this.getPlaylists();
    return playlists.find((p) => p.id === id);
  },

  createPlaylist(playlistData: Omit<Playlist, 'id' | 'createdAt' | 'updatedAt'>): Playlist {
    const playlists = this.getPlaylists();
    const newPlaylist: Playlist = {
      ...playlistData,
      id: `playlist-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updated = [newPlaylist, ...playlists];
    this.setPlaylists(updated);
    return newPlaylist;
  },

  updatePlaylist(id: string, updates: Partial<Omit<Playlist, 'id' | 'createdAt'>>): Playlist | null {
    const playlists = this.getPlaylists();
    const index = playlists.findIndex((p) => p.id === id);
    if (index === -1) return null;

    const updatedPlaylist: Playlist = {
      ...playlists[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    playlists[index] = updatedPlaylist;
    this.setPlaylists(playlists);
    return updatedPlaylist;
  },

  deletePlaylist(id: string): boolean {
    const playlists = this.getPlaylists();
    const filtered = playlists.filter((p) => p.id !== id);
    if (filtered.length === playlists.length) return false;
    this.setPlaylists(filtered);
    return true;
  },

  addSongToPlaylist(playlistId: string, songId: string): boolean {
    const playlists = this.getPlaylists();
    const index = playlists.findIndex((p) => p.id === playlistId);
    if (index === -1) return false;

    const playlist = playlists[index];
    if (playlist.songIds.includes(songId)) return false; // already exists

    playlist.songIds.push(songId);
    playlist.updatedAt = new Date().toISOString();
    this.setPlaylists(playlists);
    return true;
  },

  removeSongFromPlaylist(playlistId: string, songId: string): boolean {
    const playlists = this.getPlaylists();
    const index = playlists.findIndex((p) => p.id === playlistId);
    if (index === -1) return false;

    const playlist = playlists[index];
    playlist.songIds = playlist.songIds.filter((id) => id !== songId);
    playlist.updatedAt = new Date().toISOString();
    this.setPlaylists(playlists);
    return true;
  },

  reorderSongs(playlistId: string, songIds: string[]): boolean {
    const playlists = this.getPlaylists();
    const index = playlists.findIndex((p) => p.id === playlistId);
    if (index === -1) return false;

    playlists[index].songIds = songIds;
    playlists[index].updatedAt = new Date().toISOString();
    this.setPlaylists(playlists);
    return true;
  }
};
