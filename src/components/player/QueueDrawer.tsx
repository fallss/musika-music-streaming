import React, { useEffect } from 'react';
import { useUIStore } from '../../store/uiStore';
import { usePlayerStore } from '../../store/playerStore';
import { formatTime } from '../../utils/format';
import { X, Trash2, ArrowUp, ArrowDown, Play, ListMusic } from 'lucide-react';

export const QueueDrawer: React.FC = () => {
  const { isQueueDrawerOpen, setQueueDrawerOpen } = useUIStore();
  const {
    currentSong,
    isPlaying,
    queue,
    queueIndex,
    playQueueIndex,
    removeFromQueue,
    clearQueue,
    reorderQueue,
  } = usePlayerStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isQueueDrawerOpen) {
        setQueueDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isQueueDrawerOpen, setQueueDrawerOpen]);

  if (!isQueueDrawerOpen) return null;

  // Split queue into current and upcoming
  const upcomingSongs = queue.slice(queueIndex + 1);

  const handleMoveUp = (relativeIdx: number) => {
    const actualIdx = queueIndex + 1 + relativeIdx;
    if (actualIdx > queueIndex + 1) {
      reorderQueue(actualIdx, actualIdx - 1);
    }
  };

  const handleMoveDown = (relativeIdx: number) => {
    const actualIdx = queueIndex + 1 + relativeIdx;
    if (actualIdx < queue.length - 1) {
      reorderQueue(actualIdx, actualIdx + 1);
    }
  };

  const handleRemove = (relativeIdx: number) => {
    const actualIdx = queueIndex + 1 + relativeIdx;
    removeFromQueue(actualIdx);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setQueueDrawerOpen(false)}
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl h-full flex flex-col z-10">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-indigo-400" />
            <h3 className="font-bold text-white text-base">Antrean Lagu</h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
              {queue.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {upcomingSongs.length > 0 && (
              <button
                onClick={clearQueue}
                className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-slate-800 transition-colors"
                title="Bersihkan antrean"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Bersihkan</span>
              </button>
            )}
            <button
              onClick={() => setQueueDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content scroll area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Current Song */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Sedang Diputar
            </h4>
            {currentSong ? (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                <img
                  src={currentSong.coverUrl}
                  alt={currentSong.title}
                  className="w-12 h-12 rounded-lg object-cover bg-slate-800 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-indigo-300 truncate">
                    {currentSong.title}
                  </p>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {currentSong.artistName}
                  </p>
                </div>
                {isPlaying && (
                  <div className="flex items-end gap-0.5 h-4 flex-shrink-0">
                    <span className="w-1 bg-indigo-400 rounded-full animate-eq-1" />
                    <span className="w-1 bg-indigo-400 rounded-full animate-eq-2" />
                    <span className="w-1 bg-indigo-400 rounded-full animate-eq-3" />
                  </div>
                )}
              </div>
            ) : (
              <p className="text-sm text-slate-500 italic">Tidak ada lagu yang sedang diputar.</p>
            )}
          </div>

          {/* Up Next */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Berikutnya Dari Antrean</span>
              <span className="text-slate-500">{upcomingSongs.length} lagu</span>
            </h4>

            {upcomingSongs.length === 0 ? (
              <div className="text-center py-10 px-4 rounded-xl border border-dashed border-slate-800 text-slate-500 text-xs">
                <p>Antrean berikutnya kosong.</p>
                <p className="mt-1 text-slate-600">
                  Gunakan menu opsi lagu (tiga titik) untuk menambahkan lagu ke antrean.
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {upcomingSongs.map((song, idx) => (
                  <div
                    key={`${song.id}-${idx}`}
                    className="group flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 transition-all"
                  >
                    <button
                      onClick={() => playQueueIndex(queueIndex + 1 + idx)}
                      className="w-7 h-7 rounded-lg bg-indigo-600/0 group-hover:bg-indigo-600 text-indigo-400 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors"
                      title="Putar sekarang"
                    >
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </button>

                    <img
                      src={song.coverUrl}
                      alt={song.title}
                      className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-slate-800"
                    />

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-white truncate">{song.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">{song.artistName}</p>
                    </div>

                    <span className="text-[11px] text-slate-500 font-mono flex-shrink-0">
                      {formatTime(song.duration)}
                    </span>

                    {/* Move and delete controls */}
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                        title="Pindah ke atas"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === upcomingSongs.length - 1}
                        className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                        title="Pindah ke bawah"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleRemove(idx)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400"
                        title="Hapus dari antrean"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
