import React from 'react';
import { Album } from '../../types/music';
import { useMusicStore } from '../../store/musicStore';
import { usePlayerStore } from '../../store/playerStore';
import { useLibraryStore } from '../../store/libraryStore';
import { useUIStore } from '../../store/uiStore';
import { Play, Bookmark, BookmarkCheck } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
  onSelect?: (album: Album) => void;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album, onSelect }) => {
  const { getSongsByAlbumId } = useMusicStore();
  const { playSong } = usePlayerStore();
  const { toggleSaveAlbum, isAlbumSaved } = useLibraryStore();
  const { showToast } = useUIStore();

  const isSaved = isAlbumSaved(album.id);
  const releaseYear = album.releaseDate.split('-')[0];

  const handlePlayAlbum = (e: React.MouseEvent) => {
    e.stopPropagation();
    const songs = getSongsByAlbumId(album.id);
    if (songs.length > 0) {
      playSong(songs[0], songs);
      showToast(`Memutar album "${album.title}"`, 'success');
    } else {
      showToast('Belum ada lagu di album ini', 'info');
    }
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    const saved = toggleSaveAlbum(album.id);
    showToast(
      saved ? `Album "${album.title}" disimpan` : `Album "${album.title}" dihapus dari tersimpan`,
      saved ? 'success' : 'info'
    );
  };

  return (
    <div
      onClick={() => onSelect && onSelect(album)}
      className="group p-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 flex flex-col cursor-pointer"
    >
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800 shadow-lg">
        <img
          src={album.coverUrl}
          alt={album.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover play button */}
        <button
          onClick={handlePlayAlbum}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-900/40 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          title="Putar Album"
        >
          <Play className="w-4 h-4 fill-current ml-0.5" />
        </button>

        {/* Save button toggle */}
        <button
          onClick={handleToggleSave}
          className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-indigo-600/80 text-white opacity-100'
              : 'bg-black/50 text-slate-300 hover:text-white opacity-0 group-hover:opacity-100'
          }`}
          title={isSaved ? 'Hapus dari tersimpan' : 'Simpan album'}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
        </button>
      </div>

      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
        {album.title}
      </h4>
      <p className="text-xs text-slate-400 truncate mt-0.5">{album.artistName}</p>
      <p className="text-[11px] text-slate-500 mt-2">{releaseYear} • {album.genre}</p>
    </div>
  );
};
