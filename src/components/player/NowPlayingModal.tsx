import React from 'react';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore } from '../../store/playerStore';
import { useLibraryStore } from '../../store/libraryStore';
import { formatTime } from '../../utils/format';
import { Visualizer } from './Visualizer';
import {
  X,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Plus,
  Share2,
  Volume2,
  VolumeX,
} from 'lucide-react';

export const NowPlayingModal: React.FC = () => {
  const { isNowPlayingModalOpen, setNowPlayingModalOpen, openAddToPlaylistModal, showToast } =
    useUIStore();
  const {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    shuffle,
    repeatMode,
    volume,
    isMuted,
    togglePlay,
    nextSong,
    prevSong,
    seek,
    toggleShuffle,
    cycleRepeatMode,
    setVolume,
    toggleMute,
  } = usePlayerStore();

  const { toggleLikeSong, isSongLiked } = useLibraryStore();

  if (!isNowPlayingModalOpen || !currentSong) return null;

  const isLiked = isSongLiked(currentSong.id);

  const handleToggleLike = () => {
    const liked = toggleLikeSong(currentSong.id);
    showToast(
      liked ? 'Ditambahkan ke Lagu Disukai' : 'Dihapus dari Lagu Disukai',
      liked ? 'success' : 'info'
    );
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${window.location.origin}/song/${currentSong.id}`);
      showToast('Tautan lagu disalin ke clipboard!', 'success');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
      {/* Blurred Ambient Backdrop with song cover */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-2xl transition-opacity"
        onClick={() => setNowPlayingModalOpen(false)}
      />
      <div
        className="fixed inset-0 opacity-20 pointer-events-none filter blur-3xl scale-125"
        style={{
          backgroundImage: `url(${currentSong.coverUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Main Container */}
      <div
        className="relative w-full max-w-4xl bg-slate-900/90 border border-slate-700/60 rounded-3xl shadow-2xl p-6 sm:p-8 z-10 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-widest text-slate-300 uppercase">
              Sedang Diputar
            </span>
          </div>

          <button
            onClick={() => setNowPlayingModalOpen(false)}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Center Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-6 overflow-y-auto">
          {/* Left: Large Artwork with Vinyl / Pulse Effect */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative group w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-slate-800">
              <img
                src={currentSong.coverUrl}
                alt={currentSong.title}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  isPlaying ? 'scale-105' : 'scale-100 opacity-90'
                }`}
              />

              {/* Glowing gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

              {/* Animated Equalizer Overlay at bottom-left */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                <Visualizer isPlaying={isPlaying} barCount={12} theme="gradient" />
              </div>
            </div>
          </div>

          {/* Right: Info, Lyrics / Description & Controls */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                    {currentSong.title}
                  </h2>
                  <p className="text-base sm:text-lg font-medium text-indigo-400 mt-1">
                    {currentSong.artistName}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Album: <span className="text-slate-300 font-medium">{currentSong.albumName}</span> • {currentSong.genre}
                  </p>
                </div>

                <button
                  onClick={handleToggleLike}
                  className={`p-2.5 rounded-full border transition-all ${
                    isLiked
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-500'
                      : 'border-slate-700 bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                  title="Sukai Lagu"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Progress Slider */}
            <div className="space-y-2">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="w-full h-2 accent-indigo-500 rounded-lg cursor-pointer"
              />
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between px-2">
              <button
                onClick={toggleShuffle}
                className={`p-2 transition-colors ${
                  shuffle ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title={`Shuffle: ${shuffle ? 'ON' : 'OFF'}`}
              >
                <Shuffle className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <button
                  onClick={prevSong}
                  className="p-2.5 text-slate-300 hover:text-white active:scale-95 transition-transform"
                  title="Lagu Sebelumnya"
                >
                  <SkipBack className="w-6 h-6" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-600/40 active:scale-95 transition-all"
                  title={isPlaying ? 'Jeda' : 'Putar'}
                >
                  {isPlaying ? (
                    <Pause className="w-7 h-7 fill-current" />
                  ) : (
                    <Play className="w-7 h-7 fill-current ml-1" />
                  )}
                </button>

                <button
                  onClick={nextSong}
                  className="p-2.5 text-slate-300 hover:text-white active:scale-95 transition-transform"
                  title="Lagu Berikutnya"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>

              <button
                onClick={cycleRepeatMode}
                className={`p-2 transition-colors ${
                  repeatMode !== 'off' ? 'text-indigo-400' : 'text-slate-500 hover:text-slate-300'
                }`}
                title={`Ulang: ${repeatMode}`}
              >
                {repeatMode === 'one' ? (
                  <Repeat1 className="w-5 h-5" />
                ) : (
                  <Repeat className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Bottom Actions: Volume & Add to Playlist */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAddToPlaylistModal(currentSong.id)}
                  className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  Playlist
                </button>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                  title="Bagikan Tautan"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-2 max-w-[140px] w-full">
                <button
                  onClick={toggleMute}
                  className="text-slate-400 hover:text-white p-1"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
