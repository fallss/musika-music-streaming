import React from 'react';
import { Play, Pause, Heart, Trash2 } from 'lucide-react';
import { Song } from '../../types/music';
import { usePlayerStore } from '../../store/playerStore';
import { useLibraryStore } from '../../store/libraryStore';
import { useUIStore } from '../../store/uiStore';
import { SongContextMenu } from '../common/DropdownMenu';
import { formatTime } from '../../utils/format';

interface SongRowProps {
  song: Song;
  index: number;
  playlistContext?: Song[];
  showAlbum?: boolean;
  onRemove?: () => void;
  removeTooltip?: string;
}

export const SongRow: React.FC<SongRowProps> = ({
  song,
  index,
  playlistContext,
  showAlbum = true,
  onRemove,
  removeTooltip = 'Hapus',
}) => {
  const { currentSong, isPlaying, playSong, togglePlay } = usePlayerStore();
  const { toggleLikeSong, isSongLiked } = useLibraryStore();
  const { showToast } = useUIStore();

  const isCurrent = currentSong?.id === song.id;
  const isLiked = isSongLiked(song.id);

  const handleRowClick = () => {
    if (isCurrent) {
      togglePlay();
    } else {
      playSong(song, playlistContext);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const liked = toggleLikeSong(song.id);
    showToast(
      liked ? 'Ditambahkan ke Lagu Disukai' : 'Dihapus dari Lagu Disukai',
      liked ? 'success' : 'info'
    );
  };

  return (
    <div
      onClick={handleRowClick}
      className={`group flex items-center gap-4 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer select-none ${
        isCurrent
          ? 'bg-indigo-950/30 text-white border border-indigo-500/20'
          : 'hover:bg-slate-800/60 text-slate-300 hover:text-white'
      }`}
    >
      {/* Index or Play icon */}
      <div className="w-7 flex items-center justify-center text-xs text-slate-500 group-hover:text-white font-medium">
        {isCurrent && isPlaying ? (
          <div className="flex items-end gap-0.5 h-3.5">
            <span className="w-0.5 bg-indigo-400 rounded-full animate-eq-1" />
            <span className="w-0.5 bg-indigo-400 rounded-full animate-eq-2" />
            <span className="w-0.5 bg-indigo-400 rounded-full animate-eq-3" />
          </div>
        ) : (
          <>
            <span className="group-hover:hidden">{index + 1}</span>
            <button className="hidden group-hover:flex items-center justify-center text-indigo-400">
              <Play className="w-3.5 h-3.5 fill-current" />
            </button>
          </>
        )}
      </div>

      {/* Cover & Title */}
      <div className="flex items-center gap-3 min-w-0 flex-1">
        <img
          src={song.coverUrl}
          alt={song.title}
          className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-800"
          loading="lazy"
        />
        <div className="min-w-0">
          <p
            className={`text-sm font-semibold truncate ${
              isCurrent ? 'text-indigo-400' : 'text-slate-100 group-hover:text-white'
            }`}
          >
            {song.title}
          </p>
          <p className="text-xs text-slate-400 truncate">{song.artistName}</p>
        </div>
      </div>

      {/* Album name */}
      {showAlbum && (
        <div className="hidden md:block flex-1 min-w-0 text-xs text-slate-400 truncate">
          {song.albumName}
        </div>
      )}

      {/* Actions & Duration */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          onClick={handleLike}
          className={`p-1 transition-colors ${
            isLiked
              ? 'text-rose-500 fill-rose-500 opacity-100'
              : 'text-slate-400 opacity-0 group-hover:opacity-100 hover:text-white'
          }`}
          title="Sukai"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        <span className="text-xs text-slate-400 w-10 text-right font-mono">
          {formatTime(song.duration)}
        </span>

        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="p-1 text-slate-500 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-opacity"
            title={removeTooltip}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}

        <SongContextMenu song={song} />
      </div>
    </div>
  );
};
