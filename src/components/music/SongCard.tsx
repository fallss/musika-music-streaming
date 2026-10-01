import React from 'react';
import { Play, Pause, Heart } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayerStore } from '../../store/playerStore';
import { useLibraryStore } from '../../store/libraryStore';
import { useUIStore } from '../../store/uiStore';
import { SongContextMenu } from '../common/DropdownMenu';
import { formatTime } from '../../utils/format';

interface SongCardProps {
  song: Song;
  playlistContext?: Song[];
}

export const SongCard: React.FC<SongCardProps> = ({ song, playlistContext }) => {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayerStore();
  const { toggleLikeSong, isSongLiked } = useLibraryStore();
  const { showToast } = useUIStore();

  const isCurrent = currentSong?.id === song.id;
  const isLiked = isSongLiked(song.id);

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, playlistContext);
    }
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const liked = toggleLikeSong(song.id);
    showToast(
      liked ? 'Ditambahkan ke Lagu Disukai' : 'Dihapus dari Lagu Disukai',
      liked ? 'success' : 'info'
    );
  };

  return (
    <div
      onClick={handlePlayClick}
      className={`group relative p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border transition-all duration-300 cursor-pointer flex flex-col ${
        isCurrent ? 'border-indigo-500/60 bg-indigo-950/20 shadow-lg shadow-indigo-950/30' : 'border-slate-800/80 hover:border-slate-700'
      }`}
    >
      {/* Cover Image & Play Overlay */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Playing Animated Equalizer Indicator */}
        {isCurrent && isPlaying && (
          <div className="absolute top-2.5 left-2.5 flex items-end gap-0.5 h-4 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md">
            <span className="w-1 bg-indigo-400 rounded-full animate-eq-1" />
            <span className="w-1 bg-indigo-400 rounded-full animate-eq-2" />
            <span className="w-1 bg-indigo-400 rounded-full animate-eq-3" />
          </div>
        )}

        {/* Hover / Active Play Button */}
        <button
          onClick={handlePlayClick}
          className={`absolute bottom-3 right-3 w-11 h-11 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-900/40 transition-all duration-300 transform active:scale-95 ${
            isCurrent
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'
          }`}
          aria-label={isCurrent && isPlaying ? 'Pause' : 'Play'}
        >
          {isCurrent && isPlaying ? (
            <Pause className="w-5 h-5 fill-current" />
          ) : (
            <Play className="w-5 h-5 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* Song Info */}
      <div className="flex items-start justify-between gap-2 mt-auto">
        <div className="min-w-0 flex-1">
          <h4
            className={`text-sm font-semibold truncate transition-colors ${
              isCurrent ? 'text-indigo-400' : 'text-slate-100 group-hover:text-white'
            }`}
          >
            {song.title}
          </h4>
          <p className="text-xs text-slate-400 truncate mt-0.5">{song.artistName}</p>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleLikeClick}
            className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
            title="Sukai"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
          <SongContextMenu song={song} />
        </div>
      </div>

      <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
        <span className="truncate max-w-[100px]">{song.genre}</span>
        <span>{formatTime(song.duration)}</span>
      </div>
    </div>
  );
};
