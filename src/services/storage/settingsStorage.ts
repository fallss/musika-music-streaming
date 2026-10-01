import { NotificationSettings, AppBackupData } from '../../types/settings';
import { getStorage, setStorage, clearStorage, initializeStorage, STORAGE_KEYS } from '../storageService';
import { INITIAL_NOTIFICATIONS } from '../../data/mockData';

export const settingsStorage = {
  getNotifications(): NotificationSettings {
    return getStorage<NotificationSettings>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  },

  setNotifications(notifications: NotificationSettings): void {
    setStorage(STORAGE_KEYS.NOTIFICATIONS, notifications);
  },

  updateNotification<K extends keyof NotificationSettings>(
    key: K,
    value: NotificationSettings[K]
  ): NotificationSettings {
    const current = this.getNotifications();
    const updated = { ...current, [key]: value };
    this.setNotifications(updated);
    return updated;
  },

  exportAllData(): AppBackupData {
    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      user: getStorage(STORAGE_KEYS.USER, {}),
      auth: getStorage(STORAGE_KEYS.AUTH, {}),
      playlists: getStorage(STORAGE_KEYS.PLAYLISTS, []),
      likedSongs: getStorage(STORAGE_KEYS.LIKED_SONGS, []),
      savedAlbums: getStorage(STORAGE_KEYS.SAVED_ALBUMS, []),
      followedArtists: getStorage(STORAGE_KEYS.FOLLOWED_ARTISTS, []),
      history: getStorage(STORAGE_KEYS.PLAY_HISTORY, []),
      queue: getStorage(STORAGE_KEYS.QUEUE, []),
      settings: getStorage(STORAGE_KEYS.SETTINGS, {} as any),
      notifications: getStorage(STORAGE_KEYS.NOTIFICATIONS, {} as any),
      recentSearches: getStorage(STORAGE_KEYS.RECENT_SEARCHES, []),
    };
  },

  importData(backup: AppBackupData): boolean {
    if (!backup || typeof backup !== 'object') {
      throw new Error('Data backup tidak valid.');
    }

    if (backup.user) setStorage(STORAGE_KEYS.USER, backup.user);
    if (backup.auth) setStorage(STORAGE_KEYS.AUTH, backup.auth);
    if (Array.isArray(backup.playlists)) setStorage(STORAGE_KEYS.PLAYLISTS, backup.playlists);
    if (Array.isArray(backup.likedSongs)) setStorage(STORAGE_KEYS.LIKED_SONGS, backup.likedSongs);
    if (Array.isArray(backup.savedAlbums)) setStorage(STORAGE_KEYS.SAVED_ALBUMS, backup.savedAlbums);
    if (Array.isArray(backup.followedArtists)) setStorage(STORAGE_KEYS.FOLLOWED_ARTISTS, backup.followedArtists);
    if (Array.isArray(backup.history)) setStorage(STORAGE_KEYS.PLAY_HISTORY, backup.history);
    if (Array.isArray(backup.queue)) setStorage(STORAGE_KEYS.QUEUE, backup.queue);
    if (backup.settings) setStorage(STORAGE_KEYS.SETTINGS, backup.settings);
    if (backup.notifications) setStorage(STORAGE_KEYS.NOTIFICATIONS, backup.notifications);
    if (Array.isArray(backup.recentSearches)) setStorage(STORAGE_KEYS.RECENT_SEARCHES, backup.recentSearches);

    return true;
  },

  resetAllData(): void {
    clearStorage();
    initializeStorage();
  }
};
