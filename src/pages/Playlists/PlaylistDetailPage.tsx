import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePlaylistStore } from '../../store/playlistStore';
import { useMusicStore } from '../../store/musicStore';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';
import { CreatePlaylistModal } from '../../components/playlist/CreatePlaylistModal';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { SongRow } from '../../components/music/SongRow';
import { formatTime } from '../../utils/format';
import {
  Play,
  Shuffle,
  Edit2,
  Trash2,
  Clock,
  ArrowUp,
  ArrowDown,
  Plus,
  ListMusic,
} from 'lucide-react';

export const PlaylistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { getPlaylistById, deletePlaylist, removeSongFromPlaylist, reorderPlaylistSongs, addSongToPlaylist } =
    usePlaylistStore();
  const { songs } = useMusicStore();
  const { playSong } = usePlayerStore();
  const { showToast } = useUIStore();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const playlist = id ? getPlaylistById(id) : undefined;

  if (!playlist) {
    return (
      <div className="p-10 text-center text-slate-400">
        <p className="text-lg font-bold text-white mb-2">Playlist tidak ditemukan</p>
        <button
          onClick={() => navigate('/playlists')}
          className="text-xs font-semibold text-indigo-400 underline"
        >
          Kembali ke Daftar Playlist
        </button>
      </div>
    );
  }

  // Resolve songs in playlist
  const playlistSongs = playlist.songIds
    .map((songId) => songs.find((s) => s.id === songId))
    .filter((s): s is typeof songs[0] => Boolean(s));

  const totalDuration = playlistSongs.reduce((acc, curr) => acc + curr.duration, 0);

  // Recommendations: songs not currently in playlist
  const recommendedToAdd = songs.filter((s) => !playlist.songIds.includes(s.id)).slice(0, 5);

  const handlePlayAll = () => {
    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0], playlistSongs);
      showToast(`Memutar ${playlist.name}`, 'success');
    } else {
      showToast('Belum ada lagu dalam playlist ini', 'info');
    }
  };

  const handleShufflePlay = () => {
    if (playlistSongs.length > 0) {
      const shuffled = [...playlistSongs].sort(() => Math.random() - 0.5);
      playSong(shuffled[0], shuffled);
      showToast(`Memutar acak ${playlist.name}`, 'success');
    }
  };

  const handleDeletePlaylist = () => {
    deletePlaylist(playlist.id);
    showToast(`Playlist "${playlist.name}" telah dihapus`, 'info');
    navigate('/playlists');
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newIds = [...playlist.songIds];
    const [moved] = newIds.splice(index, 1);
    newIds.splice(index - 1, 0, moved);
    reorderPlaylistSongs(playlist.id, newIds);
  };

  const handleMoveDown = (index: number) => {
    if (index >= playlist.songIds.length - 1) return;
    const newIds = [...playlist.songIds];
    const [moved] = newIds.splice(index, 1);
    newIds.splice(index + 1, 0, moved);
    reorderPlaylistSongs(playlist.id, newIds);
  };

  return (
    <div className="px-4 sm:px-8 py-6 space-y-8 max-w-7xl mx-auto">
      {/* ================= HEADER HERO ================= */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-6 p-6 rounded-3xl bg-gradient-to-t from-slate-900 via-slate-900/60 to-indigo-950/40 border border-slate-800 shadow-2xl">
        <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-slate-800 shadow-2xl flex-shrink-0 border border-white/10">
          <img
            src={playlist.coverUrl}
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 text-center md:text-left space-y-2">
          <span className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
            Playlist Publik
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {playlist.name}
          </h1>
          <p className="text-sm text-slate-300 max-w-xl">
            {playlist.description || 'Tidak ada deskripsi.'}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2 text-xs text-slate-400 font-medium">
            <span className="text-white font-semibold">Dibuat oleh Kamu</span>
            <span>•</span>
            <span>{playlistSongs.length} lagu</span>
            <span>•</span>
            <span>Sekitar {Math.round(totalDuration / 60)} menit</span>
          </div>
        </div>
      </div>

      {/* ================= ACTION BUTTONS ROW ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayAll}
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            Putar Semua
          </button>

          <button
            onClick={handleShufflePlay}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Putar Acak"
          >
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
            title="Edit Playlist"
          >
            <Edit2 className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsDeleteDialogOpen(true)}
            className="p-3 rounded-full bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 border border-slate-700 transition-colors"
            title="Hapus Playlist"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ================= SONGS LIST TABLE ================= */}
      <div className="space-y-2">
        {/* Table Column Headers */}
        <div className="flex items-center gap-4 px-3.5 py-2 text-xs font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
          <div className="w-7 text-center">#</div>
          <div className="flex-1">Judul</div>
          <div className="hidden md:block flex-1">Album</div>
          <div className="flex items-center gap-3 w-28 justify-end">
            <Clock className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Songs Rows */}
        {playlistSongs.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl bg-slate-900/30 border border-dashed border-slate-800 text-slate-400 text-sm">
            <ListMusic className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
            <p>Belum ada lagu di playlist ini.</p>
            <p className="text-xs text-slate-500 mt-1">Tambahkan lagu dari rekomendasi di bawah!</p>
          </div>
        ) : (
          <div className="space-y-1">
            {playlistSongs.map((song, idx) => (
              <div key={`${song.id}-${idx}`} className="relative group/reorder flex items-center">
                <div className="flex-1 min-w-0">
                  <SongRow
                    song={song}
                    index={idx}
                    playlistContext={playlistSongs}
                    onRemove={() => removeSongFromPlaylist(playlist.id, song.id)}
                    removeTooltip="Hapus dari playlist"
                  />
                </div>

                {/* Move Up / Down Buttons on hover */}
                <div className="hidden group-hover/reorder:flex items-center gap-1 pl-2">
                  <button
                    onClick={() => handleMoveUp(idx)}
                    disabled={idx === 0}
                    className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-20"
                    title="Pindah ke atas"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(idx)}
                    disabled={idx === playlistSongs.length - 1}
                    className="p-1 rounded text-slate-500 hover:text-white disabled:opacity-20"
                    title="Pindah ke bawah"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= RECOMMENDED TO ADD ================= */}
      {recommendedToAdd.length > 0 && (
        <section className="pt-8 border-t border-slate-800 space-y-4">
          <div>
            <h3 className="text-lg font-bold text-white">Rekomendasi Lagu untuk Ditambahkan</h3>
            <p className="text-xs text-slate-400">Berdasarkan lagu yang ada di playlist ini</p>
          </div>

          <div className="space-y-1 bg-slate-900/40 p-2 rounded-2xl border border-slate-800">
            {recommendedToAdd.map((song) => (
              <div
                key={song.id}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800/60 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-10 h-10 rounded-lg object-cover bg-slate-800"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{song.title}</p>
                    <p className="text-xs text-slate-400 truncate">{song.artistName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 font-mono">
                    {formatTime(song.duration)}
                  </span>
                  <button
                    onClick={() => {
                      addSongToPlaylist(playlist.id, song.id);
                      showToast(`"${song.title}" ditambahkan ke playlist`, 'success');
                    }}
                    className="px-3 py-1.5 rounded-full border border-slate-700 bg-slate-800 hover:bg-indigo-600 hover:border-indigo-600 text-xs font-semibold text-white flex items-center gap-1 transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Tambah
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Edit Modal */}
      <CreatePlaylistModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        playlistToEdit={playlist}
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeletePlaylist}
        title="Hapus Playlist"
        message={`Apakah kamu yakin ingin menghapus "${playlist.name}"? Lagu-lagu tidak akan terhapus dari perpustakaan.`}
        confirmText="Hapus"
        isDestructive
      />
    </div>
  );
};
