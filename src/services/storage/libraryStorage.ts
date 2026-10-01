import { getStorage, setStorage, STORAGE_KEYS } from '../storageService';
import {
  INITIAL_LIKED_SONGS,
  INITIAL_SAVED_ALBUMS,
  INITIAL_FOLLOWED_ARTISTS
} from '../../data/mockData';

export const libraryStorage = {
  getLikedSongs(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.LIKED_SONGS, INITIAL_LIKED_SONGS);
  },

  setLikedSongs(songIds: string[]): void {
    setStorage(STORAGE_KEYS.LIKED_SONGS, songIds);
  },

  toggleLikeSong(songId: string): boolean {
    const list = this.getLikedSongs();
    const isLiked = list.includes(songId);
    let updated: string[];

    if (isLiked) {
      updated = list.filter((id) => id !== songId);
    } else {
      updated = [songId, ...list];
    }

    this.setLikedSongs(updated);
    return !isLiked; // returns new liked state
  },

  isSongLiked(songId: string): boolean {
    return this.getLikedSongs().includes(songId);
  },

  getSavedAlbums(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.SAVED_ALBUMS, INITIAL_SAVED_ALBUMS);
  },

  setSavedAlbums(albumIds: string[]): void {
    setStorage(STORAGE_KEYS.SAVED_ALBUMS, albumIds);
  },

  toggleSaveAlbum(albumId: string): boolean {
    const list = this.getSavedAlbums();
    const isSaved = list.includes(albumId);
    let updated: string[];

    if (isSaved) {
      updated = list.filter((id) => id !== albumId);
    } else {
      updated = [albumId, ...list];
    }

    this.setSavedAlbums(updated);
    return !isSaved;
  },

  isAlbumSaved(albumId: string): boolean {
    return this.getSavedAlbums().includes(albumId);
  },

  getFollowedArtists(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.FOLLOWED_ARTISTS, INITIAL_FOLLOWED_ARTISTS);
  },

  setFollowedArtists(artistIds: string[]): void {
    setStorage(STORAGE_KEYS.FOLLOWED_ARTISTS, artistIds);
  },

  toggleFollowArtist(artistId: string): boolean {
    const list = this.getFollowedArtists();
    const isFollowed = list.includes(artistId);
    let updated: string[];

    if (isFollowed) {
      updated = list.filter((id) => id !== artistId);
    } else {
      updated = [artistId, ...list];
    }

    this.setFollowedArtists(updated);
    return !isFollowed;
  },

  isArtistFollowed(artistId: string): boolean {
    return this.getFollowedArtists().includes(artistId);
  }
};
