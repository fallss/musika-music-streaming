import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Plus, ListPlus, Heart, Share2, Play } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayerStore } from '../../store/playerStore';
import { useLibraryStore } from '../../store/libraryStore';
import { useUIStore } from '../../store/uiStore';

interface SongContextMenuProps {
  song: Song;
  className?: string;
}

export const SongContextMenu: React.FC<SongContextMenuProps> = ({ song, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const { playSong, addToQueue } = usePlayerStore();
  const { toggleLikeSong, isSongLiked } = useLibraryStore();
  const { openAddToPlaylistModal, showToast } = useUIStore();

  const isLiked = isSongLiked(song.id);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handlePlayNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    playSong(song);
    setIsOpen(false);
  };

  const handleAddToQueue = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToQueue(song);
    showToast(`"${song.title}" ditambahkan ke antrean`, 'info');
    setIsOpen(false);
  };

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const liked = toggleLikeSong(song.id);
    showToast(
      liked ? 'Ditambahkan ke Lagu Disukai' : 'Dihapus dari Lagu Disukai',
      liked ? 'success' : 'info'
    );
    setIsOpen(false);
  };

  const handleOpenPlaylistModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    openAddToPlaylistModal(song.id);
    setIsOpen(false);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/song/${song.id}`);
      showToast('Tautan lagu disalin ke clipboard!', 'success');
    } else {
      showToast('Berbagi tautan tidak didukung di browser ini', 'warning');
    }
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        title="Opsi lagu"
      >
        <MoreHorizontal className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-1.5 w-48 rounded-xl bg-slate-900 border border-slate-700/80 shadow-2xl py-1.5 z-40 text-xs backdrop-blur-md">
          <button
            onClick={handlePlayNow}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white text-left transition-colors"
          >
            <Play className="w-4 h-4 text-indigo-400" />
            Putar Sekarang
          </button>
          <button
            onClick={handleAddToQueue}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white text-left transition-colors"
          >
            <ListPlus className="w-4 h-4 text-cyan-400" />
            Tambah ke Antrean
          </button>
          <button
            onClick={handleOpenPlaylistModal}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white text-left transition-colors"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            Tambah ke Playlist
          </button>
          <button
            onClick={handleToggleLike}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-200 hover:bg-slate-800 hover:text-white text-left transition-colors"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
            {isLiked ? 'Hapus dari Disukai' : 'Sukai Lagu'}
          </button>
          <div className="my-1 border-t border-slate-800" />
          <button
            onClick={handleShare}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white text-left transition-colors"
          >
            <Share2 className="w-4 h-4 text-slate-400" />
            Bagikan Tautan
          </button>
        </div>
      )}
    </div>
  );
};
