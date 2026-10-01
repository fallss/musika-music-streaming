import { create } from 'zustand';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

interface UIState {
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastMessage['type'], duration?: number) => void;
  removeToast: (id: string) => void;

  // Modals & Panels
  isNowPlayingModalOpen: boolean;
  setNowPlayingModalOpen: (open: boolean) => void;
  toggleNowPlayingModal: () => void;

  isQueueDrawerOpen: boolean;
  setQueueDrawerOpen: (open: boolean) => void;
  toggleQueueDrawer: () => void;

  isCreatePlaylistModalOpen: boolean;
  setCreatePlaylistModalOpen: (open: boolean) => void;

  isAddToPlaylistModalOpen: boolean;
  songToAddToPlaylist: string | null;
  openAddToPlaylistModal: (songId: string) => void;
  closeAddToPlaylistModal: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  toasts: [],

  showToast: (message: string, type = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = { id, message, type, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));

    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  isNowPlayingModalOpen: false,
  setNowPlayingModalOpen: (open) => set({ isNowPlayingModalOpen: open }),
  toggleNowPlayingModal: () => set((state) => ({ isNowPlayingModalOpen: !state.isNowPlayingModalOpen })),

  isQueueDrawerOpen: false,
  setQueueDrawerOpen: (open) => set({ isQueueDrawerOpen: open }),
  toggleQueueDrawer: () => set((state) => ({ isQueueDrawerOpen: !state.isQueueDrawerOpen })),

  isCreatePlaylistModalOpen: false,
  setCreatePlaylistModalOpen: (open) => set({ isCreatePlaylistModalOpen: open }),

  isAddToPlaylistModalOpen: false,
  songToAddToPlaylist: null,
  openAddToPlaylistModal: (songId: string) => set({ isAddToPlaylistModalOpen: true, songToAddToPlaylist: songId }),
  closeAddToPlaylistModal: () => set({ isAddToPlaylistModalOpen: false, songToAddToPlaylist: null }),
}));
