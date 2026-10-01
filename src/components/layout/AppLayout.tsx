import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { MusicPlayer } from '../player/MusicPlayer';
import { NowPlayingModal } from '../player/NowPlayingModal';
import { QueueDrawer } from '../player/QueueDrawer';
import { CreatePlaylistModal } from '../playlist/CreatePlaylistModal';
import { AddToPlaylistModal } from '../playlist/AddToPlaylistModal';
import { ToastContainer } from '../common/Toast';
import { useUIStore } from '../../store/uiStore';

export const AppLayout: React.FC = () => {
  const { isCreatePlaylistModalOpen, setCreatePlaylistModalOpen } = useUIStore();

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-musika-bg text-slate-100 font-sans">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Sticky Header */}
        <Header />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden pb-36 md:pb-28">
          <Outlet />
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Global Bottom Music Player */}
      <MusicPlayer />

      {/* Modals & Panels */}
      <NowPlayingModal />
      <QueueDrawer />
      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setCreatePlaylistModalOpen(false)}
      />
      <AddToPlaylistModal />
      <ToastContainer />
    </div>
  );
};
