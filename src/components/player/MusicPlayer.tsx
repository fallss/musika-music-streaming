import React from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { useLibraryStore } from '../../store/libraryStore';
import { useUIStore } from '../../store/uiStore';
import { formatTime } from '../../utils/format';
import { SongContextMenu } from '../common/DropdownMenu';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Volume2,
  VolumeX,
  ListMusic,
  Maximize2,
} from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    shuffle,
    repeatMode,
    queue,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    setVolume,
    toggleMute,
    toggleShuffle,
    cycleRepeatMode,
  } = usePlayerStore();

  const { toggleLikeSong, isSongLiked } = useLibraryStore();
  const { toggleQueueDrawer, setNowPlayingModalOpen, showToast } = useUIStore();

  if (!currentSong) return null;

  const isLiked = isSongLiked(currentSong.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const liked = toggleLikeSong(currentSong.id);
    showToast(
      liked ? 'Ditambahkan ke Lagu Disukai' : 'Dihapus dari Lagu Disukai',
      liked ? 'success' : 'info'
    );
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 glass-player border-t border-slate-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.5)]">
      {/* Mobile Mini Progress Bar at the very top of player */}
      <div className="md:hidden w-full bg-slate-800 h-1 relative overflow-hidden">
        <div
          className="bg-indigo-500 h-full transition-all duration-200"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-4">
        {/* ================= LEFT: Cover, Title, Artist, Like ================= */}
        <div className="flex items-center gap-3 min-w-0 w-1/3 sm:w-1/4">
          <div
            onClick={() => setNowPlayingModalOpen(true)}
            className="relative group w-12 h-12 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 cursor-pointer shadow-md"
            title="Buka tampilan Now Playing"
          >
            <img
              src={currentSong.coverUrl}
              alt={currentSong.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
          </div>

          <div
            onClick={() => setNowPlayingModalOpen(true)}
            className="min-w-0 cursor-pointer flex-1"
          >
            <h4 className="text-sm font-semibold text-white truncate hover:text-indigo-400 transition-colors">
              {currentSong.title}
            </h4>
            <p className="text-xs text-slate-400 truncate hover:text-slate-300">
              {currentSong.artistName}
            </p>
          </div>

          <button
            onClick={handleLikeClick}
            className={`p-1.5 rounded-full transition-colors flex-shrink-0 ${
              isLiked ? 'text-rose-500' : 'text-slate-400 hover:text-white'
            }`}
            title="Sukai"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* ================= CENTER: Controls & Seek Bar ================= */}
        <div className="flex flex-col items-center justify-center flex-1 max-w-xl">
          {/* Button Row */}
          <div className="flex items-center gap-3 sm:gap-5 mb-1.5">
            <button
              onClick={toggleShuffle}
              className={`hidden sm:block p-1.5 transition-colors ${
                shuffle ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title={`Acak Lagu: ${shuffle ? 'AKTIF' : 'NONAKTIF'}`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            <button
              onClick={prevSong}
              className="p-1.5 text-slate-300 hover:text-white active:scale-90 transition-transform"
              title="Lagu Sebelumnya"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30 active:scale-95 transition-all"
              title={isPlaying ? 'Jeda' : 'Putar'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <button
              onClick={nextSong}
              className="p-1.5 text-slate-300 hover:text-white active:scale-90 transition-transform"
              title="Lagu Berikutnya"
            >
              <SkipForward className="w-5 h-5" />
            </button>

            <button
              onClick={cycleRepeatMode}
              className={`hidden sm:block p-1.5 transition-colors ${
                repeatMode !== 'off' ? 'text-indigo-400' : 'text-slate-400 hover:text-slate-200'
              }`}
              title={`Mode Ulang: ${repeatMode}`}
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="w-4 h-4" />
              ) : (
                <Repeat className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Progress Seek Bar (hidden on mobile, visible on tablet/desktop) */}
          <div className="hidden sm:flex items-center gap-3 w-full">
            <span className="text-[11px] text-slate-400 font-mono w-9 text-right">
              {formatTime(currentTime)}
            </span>

            <input
              type="range"
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={(e) => seek(Number(e.target.value))}
              className="flex-1 h-1.5 accent-indigo-500 rounded-lg cursor-pointer"
            />

            <span className="text-[11px] text-slate-400 font-mono w-9">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* ================= RIGHT: Volume, Queue, Expand ================= */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 w-1/3 sm:w-1/4">
          {/* Volume Control */}
          <div className="hidden lg:flex items-center gap-2 max-w-[120px] w-full">
            <button
              onClick={toggleMute}
              className="p-1 text-slate-400 hover:text-white transition-colors"
              title={isMuted ? 'Bunyikan' : 'Bisukan'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1.5 accent-indigo-500"
            />
          </div>

          {/* Queue Button */}
          <button
            onClick={toggleQueueDrawer}
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title="Antrean Lagu"
          >
            <ListMusic className="w-5 h-5" />
            {queue.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                {queue.length}
              </span>
            )}
          </button>

          {/* Fullscreen Expand */}
          <button
            onClick={() => setNowPlayingModalOpen(true)}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:block"
            title="Perbesar Layar"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          <SongContextMenu song={currentSong} />
        </div>
      </div>
    </div>
  );
};
