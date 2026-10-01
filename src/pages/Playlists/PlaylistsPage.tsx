import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlaylistStore } from '../../store/playlistStore';
import { useMusicStore } from '../../store/musicStore';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { Playlist } from '../../types/playlist';
import {
  Plus,
  Play,
  ListMusic,
  MoreVertical,
  Edit2,
  Trash2,
  Sparkles,
} from 'lucide-react';

export const PlaylistsPage: React.FC = () => {
  const navigate = useNavigate();
  const { playlists, deletePlaylist } = usePlaylistStore();
  const { songs } = useMusicStore();
  const { playSong } = usePlayerStore();
  const { setCreatePlaylistModalOpen, showToast } = useUIStore();

  const [playlistToDelete, setPlaylistToDelete] = useState<Playlist | null>(null);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  const handlePlayPlaylist = (playlist: Playlist, e: React.MouseEvent) => {
    e.stopPropagation();
    const playlistSongs = playlist.songIds
      .map((id) => songs.find((s) => s.id === id))
      .filter((s): s is typeof songs[0] => Boolean(s));

    if (playlistSongs.length > 0) {
      playSong(playlistSongs[0], playlistSongs);
      showToast(`Memutar playlist "${playlist.name}"`, 'success');
    } else {
      showToast('Playlist ini masih kosong', 'info');
    }
  };

  const handleDeleteConfirm = () => {
    if (playlistToDelete) {
      deletePlaylist(playlistToDelete.id);
      showToast(`Playlist "${playlistToDelete.name}" dihapus`, 'info');
      setPlaylistToDelete(null);
    }
  };

  return (
    <div className="px-4 sm:px-8 py-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <ListMusic className="w-8 h-8 text-indigo-400" />
            Playlist Saya
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Koleksi daftar putar musik pribadi yang kamu kurasi sendiri.
          </p>
        </div>

        <button
          onClick={() => setCreatePlaylistModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          Buat Playlist Baru
        </button>
      </div>

      {/* Playlists Grid */}
      {playlists.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800">
          <Sparkles className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Belum Ada Playlist</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto mb-6">
            Mulai atur lagu-lagu favoritmu menjadi satu daftar putar untuk berbagai momen.
          </p>
          <button
            onClick={() => setCreatePlaylistModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold"
          >
            Buat Playlist Pertamamu
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => navigate(`/playlist/${playlist.id}`)}
              className="group relative p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col shadow-lg"
            >
              {/* Cover with Play overlay */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-slate-800 shadow-md">
                <img
                  src={playlist.coverUrl}
                  alt={playlist.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <button
                  onClick={(e) => handlePlayPlaylist(playlist, e)}
                  className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-900/40 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  title="Putar Playlist"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
              </div>

              {/* Title & info */}
              <div className="flex items-start justify-between gap-1">
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {playlist.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 truncate">
                    {playlist.songIds.length} lagu
                  </p>
                </div>

                {/* More options button */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenuId(activeMenuId === playlist.id ? null : playlist.id);
                    }}
                    className="p-1 rounded text-slate-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Opsi"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {activeMenuId === playlist.id && (
                    <div
                      className="absolute right-0 top-full mt-1 w-36 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl py-1 z-30 text-xs"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          navigate(`/playlist/${playlist.id}`);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white text-left"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-indigo-400" />
                        Detail / Edit
                      </button>
                      <button
                        onClick={() => {
                          setActiveMenuId(null);
                          setPlaylistToDelete(playlist);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-rose-400 hover:bg-slate-800 text-left"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        Hapus Playlist
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmDialog
        isOpen={Boolean(playlistToDelete)}
        onClose={() => setPlaylistToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Hapus Playlist"
        message={`Apakah kamu yakin ingin menghapus playlist "${playlistToDelete?.name}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Hapus"
        isDestructive
      />
    </div>
  );
};
