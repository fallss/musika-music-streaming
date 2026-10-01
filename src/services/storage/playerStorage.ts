import { QueueItem } from '../../types/music';
import { PlayerSettings } from '../../types/settings';
import { getStorage, setStorage, STORAGE_KEYS } from '../storageService';
import { INITIAL_QUEUE, INITIAL_SETTINGS } from '../../data/mockData';

export const playerStorage = {
  getQueue(): QueueItem[] {
    return getStorage<QueueItem[]>(STORAGE_KEYS.QUEUE, INITIAL_QUEUE);
  },

  setQueue(queue: QueueItem[]): void {
    setStorage(STORAGE_KEYS.QUEUE, queue);
  },

  addToQueue(songId: string): QueueItem[] {
    const queue = this.getQueue();
    // Prevent duplicate adjacent or just append
    const position = queue.length;
    const updated = [...queue, { songId, position }];
    this.setQueue(updated);
    return updated;
  },

  removeFromQueue(index: number): QueueItem[] {
    const queue = this.getQueue();
    const updated = queue
      .filter((_, idx) => idx !== index)
      .map((item, idx) => ({ ...item, position: idx }));
    this.setQueue(updated);
    return updated;
  },

  clearQueue(): void {
    this.setQueue([]);
  },

  reorderQueue(startIndex: number, endIndex: number): QueueItem[] {
    const queue = [...this.getQueue()];
    const [moved] = queue.splice(startIndex, 1);
    queue.splice(endIndex, 0, moved);
    const updated = queue.map((item, idx) => ({ ...item, position: idx }));
    this.setQueue(updated);
    return updated;
  },

  getSettings(): PlayerSettings {
    return getStorage<PlayerSettings>(STORAGE_KEYS.SETTINGS, INITIAL_SETTINGS);
  },

  setSettings(settings: PlayerSettings): void {
    setStorage(STORAGE_KEYS.SETTINGS, settings);
  },

  updateSetting<K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]): PlayerSettings {
    const current = this.getSettings();
    const updated = { ...current, [key]: value };
    this.setSettings(updated);
    return updated;
  }
};
