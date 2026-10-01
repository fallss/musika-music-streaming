import { create } from 'zustand';
import { Song, RepeatMode } from '../types/music';
import { audioPlayerService } from '../services/audioService';
import { playerStorage } from '../services/storage/playerStorage';
import { musicStorage } from '../services/storage/musicStorage';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  previousVolume: number;
  shuffle: boolean;
  repeatMode: RepeatMode;
  queue: Song[];
  queueIndex: number;

  playSong: (song: Song, customQueue?: Song[]) => void;
  togglePlay: () => void;
  pauseSong: () => void;
  resumeSong: () => void;
  nextSong: () => void;
  prevSong: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
  addToQueue: (song: Song) => void;
  removeFromQueue: (index: number) => void;
  clearQueue: () => void;
  reorderQueue: (startIndex: number, endIndex: number) => void;
  playQueueIndex: (index: number) => void;
  updateTime: (current: number, dur: number) => void;
  syncWithSettings: () => void;
}

const savedSettings = playerStorage.getSettings();
const initialQueueItems = playerStorage.getQueue();
const allSongs = musicStorage.getSongs();
const initialQueueSongs = initialQueueItems
  .map((q) => allSongs.find((s) => s.id === q.songId))
  .filter((s): s is Song => Boolean(s));

export const usePlayerStore = create<PlayerState>((set, get) => {
  // Bind audio service callbacks once
  audioPlayerService.setCallbacks({
    onTimeUpdate: (currentTime, duration) => {
      get().updateTime(currentTime, duration);
    },
    onPlay: () => {
      set({ isPlaying: true });
    },
    onPause: () => {
      set({ isPlaying: false });
    },
    onEnded: () => {
      const state = get();
      if (state.repeatMode === 'one' && state.currentSong) {
        audioPlayerService.seek(0);
        audioPlayerService.playSong(state.currentSong);
      } else {
        state.nextSong();
      }
    },
  });

  // Apply initial volume to audio element
  audioPlayerService.setVolume(savedSettings.volume);

  return {
    currentSong: initialQueueSongs[0] || null,
    isPlaying: false,
    currentTime: 0,
    duration: initialQueueSongs[0]?.duration || 0,
    volume: savedSettings.volume ?? 0.8,
    isMuted: false,
    previousVolume: savedSettings.volume ?? 0.8,
    shuffle: savedSettings.shuffle ?? false,
    repeatMode: savedSettings.repeatMode ?? 'off',
    queue: initialQueueSongs,
    queueIndex: 0,

    updateTime: (currentTime, duration) => {
      const state = get();
      set({
        currentTime,
        duration: duration > 0 ? duration : state.duration,
      });

      // Periodically record play history (e.g., every 5 seconds or upon progress)
      if (state.currentSong && Math.floor(currentTime) % 10 === 0 && currentTime > 5) {
        musicStorage.savePlayHistory(state.currentSong.id, Math.floor(currentTime));
      }
    },

    playSong: (song: Song, customQueue?: Song[]) => {
      const state = get();
      let updatedQueue = customQueue || state.queue;

      if (!updatedQueue.some((s) => s.id === song.id)) {
        updatedQueue = [song, ...updatedQueue];
      }

      const songIdx = updatedQueue.findIndex((s) => s.id === song.id);

      set({
        currentSong: song,
        queue: updatedQueue,
        queueIndex: songIdx !== -1 ? songIdx : 0,
        isPlaying: true,
        currentTime: 0,
        duration: song.duration,
      });

      // Persist queue to storage
      playerStorage.setQueue(updatedQueue.map((s, idx) => ({ songId: s.id, position: idx })));
      musicStorage.savePlayHistory(song.id, 0);

      audioPlayerService.playSong(song);
    },

    togglePlay: () => {
      const state = get();
      if (!state.currentSong) {
        if (state.queue.length > 0) {
          state.playSong(state.queue[0]);
        }
        return;
      }

      if (state.isPlaying) {
        audioPlayerService.pause();
        set({ isPlaying: false });
      } else {
        audioPlayerService.resume();
        set({ isPlaying: true });
      }
    },

    pauseSong: () => {
      audioPlayerService.pause();
      set({ isPlaying: false });
    },

    resumeSong: () => {
      audioPlayerService.resume();
      set({ isPlaying: true });
    },

    nextSong: () => {
      const state = get();
      if (state.queue.length === 0) return;

      let nextIndex: number;
      if (state.shuffle) {
        nextIndex = Math.floor(Math.random() * state.queue.length);
      } else {
        nextIndex = state.queueIndex + 1;
      }

      if (nextIndex >= state.queue.length) {
        if (state.repeatMode === 'all') {
          nextIndex = 0;
        } else {
          audioPlayerService.pause();
          set({ isPlaying: false, currentTime: 0 });
          return;
        }
      }

      const nextSongToPlay = state.queue[nextIndex];
      if (nextSongToPlay) {
        set({
          currentSong: nextSongToPlay,
          queueIndex: nextIndex,
          currentTime: 0,
          duration: nextSongToPlay.duration,
          isPlaying: true,
        });
        audioPlayerService.playSong(nextSongToPlay);
        musicStorage.savePlayHistory(nextSongToPlay.id, 0);
      }
    },

    prevSong: () => {
      const state = get();
      if (state.queue.length === 0) return;

      // If playing for more than 3 seconds, restart current track
      if (state.currentTime > 3) {
        audioPlayerService.seek(0);
        set({ currentTime: 0 });
        return;
      }

      let prevIndex = state.queueIndex - 1;
      if (prevIndex < 0) {
        prevIndex = state.queue.length - 1;
      }

      const prevSongToPlay = state.queue[prevIndex];
      if (prevSongToPlay) {
        set({
          currentSong: prevSongToPlay,
          queueIndex: prevIndex,
          currentTime: 0,
          duration: prevSongToPlay.duration,
          isPlaying: true,
        });
        audioPlayerService.playSong(prevSongToPlay);
        musicStorage.savePlayHistory(prevSongToPlay.id, 0);
      }
    },

    seek: (seconds: number) => {
      audioPlayerService.seek(seconds);
      set({ currentTime: seconds });
    },

    setVolume: (volume: number) => {
      const clamped = Math.max(0, Math.min(1, volume));
      audioPlayerService.setVolume(clamped);
      playerStorage.updateSetting('volume', clamped);
      set({
        volume: clamped,
        isMuted: clamped === 0,
        previousVolume: clamped > 0 ? clamped : get().previousVolume,
      });
    },

    toggleMute: () => {
      const state = get();
      if (state.isMuted) {
        const restoreVol = state.previousVolume > 0 ? state.previousVolume : 0.8;
        audioPlayerService.setVolume(restoreVol);
        playerStorage.updateSetting('volume', restoreVol);
        set({ isMuted: false, volume: restoreVol });
      } else {
        audioPlayerService.setVolume(0);
        set({ isMuted: true, volume: 0, previousVolume: state.volume });
      }
    },

    toggleShuffle: () => {
      const nextVal = !get().shuffle;
      playerStorage.updateSetting('shuffle', nextVal);
      set({ shuffle: nextVal });
    },

    cycleRepeatMode: () => {
      const current = get().repeatMode;
      let nextMode: RepeatMode = 'off';
      if (current === 'off') nextMode = 'all';
      else if (current === 'all') nextMode = 'one';
      else nextMode = 'off';

      playerStorage.updateSetting('repeatMode', nextMode);
      set({ repeatMode: nextMode });
    },

    addToQueue: (song: Song) => {
      const state = get();
      const updated = [...state.queue, song];
      set({ queue: updated });
      playerStorage.setQueue(updated.map((s, idx) => ({ songId: s.id, position: idx })));
    },

    removeFromQueue: (index: number) => {
      const state = get();
      const updated = state.queue.filter((_, idx) => idx !== index);
      let newQueueIndex = state.queueIndex;
      if (index < state.queueIndex) {
        newQueueIndex -= 1;
      }
      set({ queue: updated, queueIndex: newQueueIndex });
      playerStorage.setQueue(updated.map((s, idx) => ({ songId: s.id, position: idx })));
    },

    clearQueue: () => {
      const state = get();
      const retainedCurrent = state.currentSong ? [state.currentSong] : [];
      set({ queue: retainedCurrent, queueIndex: 0 });
      playerStorage.setQueue(retainedCurrent.map((s, idx) => ({ songId: s.id, position: idx })));
    },

    reorderQueue: (startIndex: number, endIndex: number) => {
      const state = get();
      const newQueue = [...state.queue];
      const [moved] = newQueue.splice(startIndex, 1);
      newQueue.splice(endIndex, 0, moved);

      // Recalculate queueIndex
      const currentId = state.currentSong?.id;
      const newIndex = newQueue.findIndex((s) => s.id === currentId);

      set({
        queue: newQueue,
        queueIndex: newIndex !== -1 ? newIndex : 0,
      });

      playerStorage.setQueue(newQueue.map((s, idx) => ({ songId: s.id, position: idx })));
    },

    playQueueIndex: (index: number) => {
      const state = get();
      const song = state.queue[index];
      if (song) {
        set({
          currentSong: song,
          queueIndex: index,
          currentTime: 0,
          duration: song.duration,
          isPlaying: true,
        });
        audioPlayerService.playSong(song);
        musicStorage.savePlayHistory(song.id, 0);
      }
    },

    syncWithSettings: () => {
      const settings = playerStorage.getSettings();
      set({
        volume: settings.volume,
        shuffle: settings.shuffle,
        repeatMode: settings.repeatMode,
      });
      audioPlayerService.setVolume(settings.volume);
    },
  };
});
