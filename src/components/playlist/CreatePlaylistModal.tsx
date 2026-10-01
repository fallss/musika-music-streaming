import React, { useState, useEffect } from 'react';
import { Modal } from '../common/Modal';
import { usePlaylistStore } from '../../store/playlistStore';
import { useUIStore } from '../../store/uiStore';
import { Playlist } from '../../types/playlist';
import { Image as ImageIcon } from 'lucide-react';

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlistToEdit?: Playlist | null;
}

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80'
];

export const CreatePlaylistModal: React.FC<CreatePlaylistModalProps> = ({
  isOpen,
  onClose,
  playlistToEdit,
}) => {
  const { createPlaylist, updatePlaylist } = usePlaylistStore();
  const { showToast } = useUIStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState(PRESET_COVERS[0]);

  useEffect(() => {
    if (playlistToEdit) {
      setName(playlistToEdit.name);
      setDescription(playlistToEdit.description);
      setCoverUrl(playlistToEdit.coverUrl || PRESET_COVERS[0]);
    } else {
      setName('');
      setDescription('');
      setCoverUrl(PRESET_COVERS[Math.floor(Math.random() * PRESET_COVERS.length)]);
    }
  }, [playlistToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('Nama playlist wajib diisi', 'warning');
      return;
    }

    if (playlistToEdit) {
      updatePlaylist(playlistToEdit.id, {
        name: name.trim(),
        description: description.trim(),
        coverUrl,
      });
      showToast('Playlist berhasil diperbarui!', 'success');
    } else {
      createPlaylist({
        userId: 'user-001',
        name: name.trim(),
        description: description.trim(),
        coverUrl,
        songIds: [],
      });
      showToast('Playlist baru berhasil dibuat!', 'success');
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={playlistToEdit ? 'Edit Playlist' : 'Buat Playlist Baru'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Nama Playlist
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Misal: Vibes Senja, Workout 2026..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm"
            required
            autoFocus
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
            Deskripsi (Opsional)
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tuliskan cerita atau mood playlist ini..."
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm resize-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center justify-between">
            <span>Pilih Cover Playlist</span>
            <ImageIcon className="w-3.5 h-3.5 text-slate-500" />
          </label>

          {/* Preset image selector */}
          <div className="grid grid-cols-6 gap-2 mb-3">
            {PRESET_COVERS.map((preset, idx) => (
              <button
                type="button"
                key={idx}
                onClick={() => setCoverUrl(preset)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  coverUrl === preset ? 'border-indigo-500 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={preset} alt={`Cover ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <input
            type="url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="Atau masukkan URL gambar..."
            className="w-full px-3.5 py-2 rounded-xl bg-slate-800/80 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-xs"
          />
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95"
          >
            {playlistToEdit ? 'Simpan Perubahan' : 'Buat Playlist'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
