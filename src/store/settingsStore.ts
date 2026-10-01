import { create } from 'zustand';
import { PlayerSettings, NotificationSettings, AppBackupData } from '../types/settings';
import { playerStorage } from '../services/storage/playerStorage';
import { settingsStorage } from '../services/storage/settingsStorage';
import { audioPlayerService } from '../services/audioService';

interface SettingsState {
  playerSettings: PlayerSettings;
  notificationSettings: NotificationSettings;

  updatePlayerSetting: <K extends keyof PlayerSettings>(key: K, value: PlayerSettings[K]) => void;
  updateNotificationSetting: <K extends keyof NotificationSettings>(key: K, value: NotificationSettings[K]) => void;
  exportData: () => AppBackupData;
  importData: (jsonData: AppBackupData) => boolean;
  resetAllData: () => void;
  refreshSettings: () => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  playerSettings: playerStorage.getSettings(),
  notificationSettings: settingsStorage.getNotifications(),

  updatePlayerSetting: (key, value) => {
    const updated = playerStorage.updateSetting(key, value);
    if (key === 'volume') {
      audioPlayerService.setVolume(value as number);
    }
    set({ playerSettings: updated });
  },

  updateNotificationSetting: (key, value) => {
    const updated = settingsStorage.updateNotification(key, value);
    set({ notificationSettings: updated });
  },

  exportData: () => {
    return settingsStorage.exportAllData();
  },

  importData: (backupData: AppBackupData) => {
    const success = settingsStorage.importData(backupData);
    if (success) {
      set({
        playerSettings: playerStorage.getSettings(),
        notificationSettings: settingsStorage.getNotifications(),
      });
    }
    return success;
  },

  resetAllData: () => {
    settingsStorage.resetAllData();
    set({
      playerSettings: playerStorage.getSettings(),
      notificationSettings: settingsStorage.getNotifications(),
    });
  },

  refreshSettings: () => {
    set({
      playerSettings: playerStorage.getSettings(),
      notificationSettings: settingsStorage.getNotifications(),
    });
  },
}));
