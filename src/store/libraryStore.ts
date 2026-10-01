import { create } from 'zustand';
import { libraryStorage } from '../services/storage/libraryStorage';

interface LibraryState {
  likedSongIds: string[];
  savedAlbumIds: string[];
  followedArtistIds: string[];

  toggleLikeSong: (songId: string) => boolean;
  isSongLiked: (songId: string) => boolean;

  toggleSaveAlbum: (albumId: string) => boolean;
  isAlbumSaved: (albumId: string) => boolean;

  toggleFollowArtist: (artistId: string) => boolean;
  isArtistFollowed: (artistId: string) => boolean;

  refreshLibrary: () => void;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  likedSongIds: libraryStorage.getLikedSongs(),
  savedAlbumIds: libraryStorage.getSavedAlbums(),
  followedArtistIds: libraryStorage.getFollowedArtists(),

  toggleLikeSong: (songId: string) => {
    const isNowLiked = libraryStorage.toggleLikeSong(songId);
    set({ likedSongIds: libraryStorage.getLikedSongs() });
    return isNowLiked;
  },

  isSongLiked: (songId: string) => {
    return get().likedSongIds.includes(songId);
  },

  toggleSaveAlbum: (albumId: string) => {
    const isNowSaved = libraryStorage.toggleSaveAlbum(albumId);
    set({ savedAlbumIds: libraryStorage.getSavedAlbums() });
    return isNowSaved;
  },

  isAlbumSaved: (albumId: string) => {
    return get().savedAlbumIds.includes(albumId);
  },

  toggleFollowArtist: (artistId: string) => {
    const isNowFollowed = libraryStorage.toggleFollowArtist(artistId);
    set({ followedArtistIds: libraryStorage.getFollowedArtists() });
    return isNowFollowed;
  },

  isArtistFollowed: (artistId: string) => {
    return get().followedArtistIds.includes(artistId);
  },

  refreshLibrary: () => {
    set({
      likedSongIds: libraryStorage.getLikedSongs(),
      savedAlbumIds: libraryStorage.getSavedAlbums(),
      followedArtistIds: libraryStorage.getFollowedArtists(),
    });
  },
}));
