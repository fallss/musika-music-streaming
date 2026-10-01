import React from 'react';
import { Modal } from '../common/Modal';
import { usePlaylistStore } from '../../store/playlistStore';
import { useMusicStore } from '../../store/musicStore';
import { useUIStore } from '../../store/uiStore';
import { Plus, Check, ListMusic } from 'lucide-react';

export const AddToPlaylistModal: React.FC = () => {
  const { isAddToPlaylistModalOpen, songToAddToPlaylist, closeAddToPlaylistModal, showToast, setCreatePlaylistModalOpen } = useUIStore();
  const { playlists, addSongToPlaylist, removeSongFromPlaylist } = usePlaylistStore();
  const { getSongById } = useMusicStore();

  const song = songToAddToPlaylist ? getSongById(songToAddToPlaylist) : null;

  if (!isAddToPlaylistModalOpen || !song) return null;

  const handleToggleSongInPlaylist = (playlistId: string, playlistName: string, isAlreadyIn: boolean) => {
    if (isAlreadyIn) {
      removeSongFromPlaylist(playlistId, song.id);
      showToast(`Dihapus dari "${playlistName}"`, 'info');
    } else {
      addSongToPlaylist(playlistId, song.id);
      showToast(`Ditambahkan ke "${playlistName}"`, 'success');
    }
  };

  return (
    <Modal
      isOpen={isAddToPlaylistModalOpen}
      onClose={closeAddToPlaylistModal}
      title="Tambahkan ke Playlist"
    >
      <div className="space-y-4">
        {/* Target Song Info */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60">
          <img
            src={song.coverUrl}
            alt={song.title}
            className="w-12 h-12 rounded-lg object-cover shadow-sm"
          />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{song.title}</h4>
            <p className="text-xs text-slate-400 truncate">{song.artistName}</p>
          </div>
        </div>

        {/* Playlists List */}
        <div className="max-h-60 overflow-y-auto space-y-1.5 pr-1">
          {playlists.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-sm">
              <ListMusic className="w-8 h-8 mx-auto mb-2 opacity-50 text-indigo-400" />
              <p>Belum ada playlist.</p>
            </div>
          ) : (
            playlists.map((playlist) => {
              const isAlreadyIn = playlist.songIds.includes(song.id);
              return (
                <button
                  key={playlist.id}
                  onClick={() => handleToggleSongInPlaylist(playlist.id, playlist.name, isAlreadyIn)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
                    isAlreadyIn
                      ? 'border-indigo-500/50 bg-indigo-950/20 text-indigo-200'
                      : 'border-slate-800 bg-slate-800/40 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={playlist.coverUrl}
                      alt={playlist.name}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">{playlist.name}</p>
                      <p className="text-xs text-slate-400">{playlist.songIds.length} lagu</p>
                    </div>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isAlreadyIn ? 'bg-indigo-600 text-white' : 'border border-slate-600 text-slate-400'
                    }`}
                  >
                    {isAlreadyIn ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Action to create new playlist */}
        <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
          <button
            onClick={() => {
              closeAddToPlaylistModal();
              setCreatePlaylistModalOpen(true);
            }}
            className="flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Buat Playlist Baru
          </button>
          <button
            onClick={closeAddToPlaylistModal}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </Modal>
  );
};
