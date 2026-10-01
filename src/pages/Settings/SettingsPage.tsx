import React, { useState, useRef } from 'react';
import { useSettingsStore } from '../../store/settingsStore';
import { usePlayerStore } from '../../store/playerStore';
import { useMusicStore } from '../../store/musicStore';
import { usePlaylistStore } from '../../store/playlistStore';
import { useLibraryStore } from '../../store/libraryStore';
import { useUserStore } from '../../store/userStore';
import { useUIStore } from '../../store/uiStore';
import { ConfirmDialog } from '../../components/common/ConfirmDialog';
import { AudioQuality } from '../../types/settings';
import {
  Settings,
  Sliders,
  Bell,
  HardDrive,
  Download,
  Upload,
  RotateCcw,
  Check,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const {
    playerSettings,
    notificationSettings,
    updatePlayerSetting,
    updateNotificationSetting,
    exportData,
    importData,
    resetAllData,
  } = useSettingsStore();

  const { syncWithSettings } = usePlayerStore();
  const { refreshData } = useMusicStore();
  const { refreshPlaylists } = usePlaylistStore();
  const { refreshLibrary } = useLibraryStore();
  const { refreshUser } = useUserStore();
  const { showToast } = useUIStore();

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // SECTION 2: Player setting handlers
  const handleCrossfadeChange = (val: number) => {
    updatePlayerSetting('crossfade', val);
  };

  const handleAudioQualityChange = (val: AudioQuality) => {
    updatePlayerSetting('audioQuality', val);
    showToast(`Kualitas audio diatur ke: ${val.replace('_', ' ').toUpperCase()}`, 'info');
  };

  // SECTION 4: Export Data
  const handleExportData = () => {
    const data = exportData();
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `musika-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Data MUSIKA berhasil diekspor!', 'success');
  };

  // SECTION 4: Import Data
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const ok = importData(parsed);
        if (ok) {
          refreshData();
          refreshPlaylists();
          refreshLibrary();
          refreshUser();
          syncWithSettings();
          showToast('Data berhasil diimpor ke MUSIKA!', 'success');
        }
      } catch (err) {
        showToast('Gagal mengimpor data. Format file JSON tidak valid.', 'error');
      }
    };
    reader.readAsText(file);
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // SECTION 4: Reset Demo Data
  const handleResetConfirm = () => {
    resetAllData();
    refreshData();
    refreshPlaylists();
    refreshLibrary();
    refreshUser();
    syncWithSettings();
    showToast('Seluruh data MUSIKA berhasil direset ke setelan awal!', 'info');
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="px-4 sm:px-8 py-6 space-y-8 max-w-4xl mx-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-indigo-400" />
          Pengaturan
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Sesuaikan preferensi aplikasi, pemutaran suara, notifikasi, dan kelola data lokal.
        </p>
      </div>

      <div className="space-y-6">
        {/* ================= SECTION 2: PENGATURAN PEMUTARAN ================= */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Pengaturan Pemutaran</h2>
          </div>

          <div className="space-y-5">
            {/* Autoplay Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">Putar Otomatis (Autoplay)</p>
                <p className="text-xs text-slate-400">
                  Lanjutkan pemutaran musik serupa tanpa jeda ketika lagu selesai.
                </p>
              </div>
              <button
                onClick={() => updatePlayerSetting('autoplay', !playerSettings.autoplay)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  playerSettings.autoplay ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    playerSettings.autoplay ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Crossfade Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">Crossfade Transisi Lagu</p>
                  <p className="text-xs text-slate-400">
                    Membuat transisi halus antara lagu yang sedang diputar dengan lagu berikutnya.
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                  {playerSettings.crossfade} detik
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={12}
                step={1}
                value={playerSettings.crossfade}
                onChange={(e) => handleCrossfadeChange(Number(e.target.value))}
                className="w-full h-2 accent-indigo-500 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0s (Mati)</span>
                <span>6s</span>
                <span>12s</span>
              </div>
            </div>

            {/* Audio Quality Radio buttons */}
            <div>
              <p className="text-sm font-semibold text-white mb-1">Kualitas Streaming Audio</p>
              <p className="text-xs text-slate-400 mb-3">
                Pilih bitrate audio untuk menyesuaikan kecepatan koneksi internetmu.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: 'low', label: 'Rendah', bitrate: '96 kbps' },
                  { id: 'normal', label: 'Normal', bitrate: '160 kbps' },
                  { id: 'high', label: 'Tinggi', bitrate: '256 kbps' },
                  { id: 'very_high', label: 'Ultra HD', bitrate: '320 kbps (Lossless)' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAudioQualityChange(item.id as AudioQuality)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      playerSettings.audioQuality === item.id
                        ? 'bg-indigo-950/40 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-800/40 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{item.label}</span>
                      {playerSettings.audioQuality === item.id && (
                        <Check className="w-3.5 h-3.5 text-indigo-400" />
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 block">{item.bitrate}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Normalize Volume */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <div>
                <p className="text-sm font-semibold text-white">Normalisasi Volume Suara</p>
                <p className="text-xs text-slate-400">
                  Menyamakan tingkat kekerasan suara antar lagu secara otomatis.
                </p>
              </div>
              <button
                onClick={() =>
                  updatePlayerSetting('normalizeVolume', !playerSettings.normalizeVolume)
                }
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  playerSettings.normalizeVolume ? 'bg-indigo-600' : 'bg-slate-700'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    playerSettings.normalizeVolume ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* ================= SECTION 3: NOTIFIKASI ================= */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <Bell className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Preferensi Notifikasi</h2>
          </div>

          <div className="space-y-4">
            {[
              {
                key: 'newReleases' as const,
                title: 'Rilis Musik Baru',
                desc: 'Beri tahu saya saat artis yang saya ikuti merilis lagu atau album baru.',
              },
              {
                key: 'playlistUpdates' as const,
                title: 'Pembaruan Playlist',
                desc: 'Pemberitahuan saat ada lagu baru yang ditambahkan ke playlist kurasi.',
              },
              {
                key: 'recommendations' as const,
                title: 'Rekomendasi Mingguan',
                desc: 'Saran musik yang disesuaikan dengan kebiasaan mendengarkanmu.',
              },
              {
                key: 'accountNotifications' as const,
                title: 'Aktivitas Akun',
                desc: 'Informasi keamanan dan riwayat akses profil.',
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between py-1">
                <div>
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400">{item.desc}</p>
                </div>
                <button
                  onClick={() =>
                    updateNotificationSetting(item.key, !notificationSettings[item.key])
                  }
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    notificationSettings[item.key] ? 'bg-indigo-600' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      notificationSettings[item.key] ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SECTION 4: MANAJEMEN DATA (EXPORT / IMPORT / RESET) ================= */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
            <HardDrive className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Manajemen Data & Penyimpanan</h2>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Seluruh data musik, playlist, riwayat putar, dan preferensi akun MUSIKA disimpan secara lokal di peramban web kamu (Browser LocalStorage) tanpa memerlukan server backend.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {/* Export Button */}
            <button
              onClick={handleExportData}
              className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all group flex items-start gap-3"
            >
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <Download className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Ekspor Data Cadangan</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Unduh file <code className="text-indigo-300">musika-backup.json</code> ke perangkatmu.
                </p>
              </div>
            </button>

            {/* Import Button */}
            <label className="p-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 text-left transition-all group flex items-start gap-3 cursor-pointer">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportFile}
                className="hidden"
              />
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
                <Upload className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">Impor Data Cadangan</p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pulihkan playlist dan lagu dari file cadangan JSON.
                </p>
              </div>
            </label>
          </div>

          {/* Reset Demo Data Danger Zone */}
          <div className="mt-4 p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-rose-300">Reset Semua Data MUSIKA</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Menghapus seluruh playlist pribadi, lagu yang disukai, riwayat putar, dan mengembalikan data demo ke awal.
              </p>
            </div>

            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-rose-950/40 transition-colors self-start sm:self-auto"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Data
            </button>
          </div>
        </div>
      </div>

      {/* Reset Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetConfirm}
        title="Reset Semua Data?"
        message="Apakah kamu yakin ingin menghapus seluruh data MUSIKA? Tindakan ini akan mengosongkan playlist buatanmu dan mengembalikan seluruh setelan ke kondisi awal demo."
        confirmText="Ya, Reset Data"
        cancelText="Batal"
        isDestructive
      />
    </div>
  );
};
