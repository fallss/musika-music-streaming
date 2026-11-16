import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMusicStore } from '../../store/musicStore';
import { usePlayerStore } from '../../store/playerStore';
import { SongCard } from '../../components/music/SongCard';
import { ArtistCard } from '../../components/music/ArtistCard';
import { AlbumCard } from '../../components/music/AlbumCard';
import {
  Sparkles,
  Flame,
  History,
  Disc3,
  Play,
  Compass,
  ArrowRight,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { songs, artists, albums, playHistory } = useMusicStore();
  const { playSong } = usePlayerStore();

  const [activeMood, setActiveMood] = useState<string>('Semua');

  // Filter songs by mood / genre if selected
  const moodTags = ['Semua', 'Indie', 'R&B', 'Synthwave', 'Pop', 'Jazz', 'Rock'];

  const filteredSongs = activeMood === 'Semua'
    ? songs
    : songs.filter((s) => s.genre.toLowerCase().includes(activeMood.toLowerCase()));

  // Continue listening songs from playHistory
  const historySongsWithProgress = playHistory
    .slice(0, 4)
    .map((item) => {
      const song = songs.find((s) => s.id === item.songId);
      return song ? { song, progress: item.progress } : null;
    })
    .filter((item): item is { song: typeof songs[0]; progress: number } => Boolean(item));

  // Daily recommendations
  const dailyRecommendations = filteredSongs.slice(0, 5);

  // New releases
  const newReleases = [...songs].sort(
    (a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  ).slice(0, 5);

  return (
    <div className="px-4 sm:px-8 py-6 space-y-10 max-w-7xl mx-auto">
      {/* ================= HERO SECTION ================= */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/20 p-6 sm:p-10 shadow-2xl">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Platform Musik Generasi Masa Depan</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Selamat datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-300 to-white">MUSIKA</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Temukan musik yang cocok untuk menemani harimu. Dari alunan senja yang hangat hingga ketukan fokus penuh energi.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              onClick={() => {
                if (songs.length > 0) playSong(songs[0], songs);
              }}
              className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2.5 shadow-xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              Putar Rekomendasi
            </button>

            <button
              onClick={() => navigate('/search')}
              className="px-5 py-3 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm flex items-center gap-2 border border-slate-700 transition-colors"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              Jelajahi Semua
            </button>
          </div>
        </div>
      </div>

      {/* Mood Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {moodTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveMood(tag)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeMood === tag
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 scale-105'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* ================= C. LANJUTKAN MENDENGARKAN ================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <History className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Lanjutkan Mendengarkan
            </h2>
          </div>
        </div>

        {historySongsWithProgress.length === 0 ? (
          <div className="p-6 rounded-2xl bg-slate-900/40 border border-dashed border-slate-800 text-slate-400 text-sm text-center">
            Tidak ada musik yang sedang dilanjutkan. Mulai putar lagu untuk melanjutkan mendengarkan!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {historySongsWithProgress.map(({ song, progress }) => {
              const progressPct = Math.min(100, (progress / (song.duration || 100)) * 100);

              return (
                <div
                  key={song.id}
                  onClick={() => playSong(song)}
                  className="group relative p-3 rounded-2xl bg-slate-900/70 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center gap-3.5 shadow-md"
                >
                  <img
                    src={song.coverUrl}
                    alt={song.title}
                    className="w-14 h-14 rounded-xl object-cover flex-shrink-0 bg-slate-800 shadow"
                  />

                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-white truncate group-hover:text-indigo-400 transition-colors">
                      {song.title}
                    </h4>
                    <p className="text-xs text-slate-400 truncate mt-0.5">{song.artistName}</p>

                    {/* Progress indicator */}
                    <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-indigo-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSong(song);
                    }}
                    className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-md active:scale-95 flex-shrink-0"
                    title="Lanjutkan putar"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= A. REKOMENDASI HARIAN ================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Rekomendasi Harian
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Dikurasi khusus sesuai suasana hatimu hari ini.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/search')}
            className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
          >
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {dailyRecommendations.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={dailyRecommendations} />
          ))}
        </div>
      </section>

      {/* ================= B. BARU DIRILIS ================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Flame className="w-5 h-5 text-rose-500" />
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Baru Dirilis
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Karya terbaru dari musisi favorit yang wajib kamu dengar.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {newReleases.map((song) => (
            <SongCard key={song.id} song={song} playlistContext={newReleases} />
          ))}
        </div>
      </section>

      {/* ================= ARTIS POPULER ================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <Disc3 className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-white tracking-wide">
                Artis Populer
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Musisi dengan jutaan pendengar di MUSIKA.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {artists.slice(0, 4).map((artist) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              onSelect={() => navigate(`/search?q=${encodeURIComponent(artist.name)}`)}
            />
          ))}
        </div>
      </section>

      {/* ================= ALBUM PILIHAN ================= */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              Album Terlaris
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Dengarkan mahakarya album penuh tanpa terpotong.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {albums.slice(0, 4).map((album) => (
            <AlbumCard
              key={album.id}
              album={album}
              onSelect={() => navigate(`/search?q=${encodeURIComponent(album.title)}`)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
