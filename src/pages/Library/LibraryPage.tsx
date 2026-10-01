import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useLibraryStore } from '../../store/libraryStore';
import { useMusicStore } from '../../store/musicStore';
import { usePlayerStore } from '../../store/playerStore';
import { useUIStore } from '../../store/uiStore';
import { SongRow } from '../../components/music/SongRow';
import { ArtistCard } from '../../components/music/ArtistCard';
import { AlbumCard } from '../../components/music/AlbumCard';
import {
  Library,
  Heart,
  Disc,
  Users,
  Play,
  Search,
  ArrowUpDown,
  Compass,
} from 'lucide-react';

export const LibraryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { likedSongIds, savedAlbumIds, followedArtistIds } = useLibraryStore();
  const { songs, albums, artists } = useMusicStore();
  const { playSong } = usePlayerStore();
  const { showToast } = useUIStore();

  const tabParam = searchParams.get('tab') as 'liked' | 'albums' | 'artists' | null;
  const [activeTab, setActiveTab] = useState<'liked' | 'albums' | 'artists'>(tabParam || 'liked');
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'title' | 'artist'>('default');

  useEffect(() => {
    if (tabParam && ['liked', 'albums', 'artists'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tab: 'liked' | 'albums' | 'artists') => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  // Resolved entities
  const likedSongs = likedSongIds
    .map((id) => songs.find((s) => s.id === id))
    .filter((s): s is typeof songs[0] => Boolean(s));

  const savedAlbums = savedAlbumIds
    .map((id) => albums.find((a) => a.id === id))
    .filter((a): a is typeof albums[0] => Boolean(a));

  const followedArtists = followedArtistIds
    .map((id) => artists.find((a) => a.id === id))
    .filter((a): a is typeof artists[0] => Boolean(a));

  // Filter & sort liked songs
  const filteredLikedSongs = likedSongs
    .filter((s) =>
      s.title.toLowerCase().includes(filterText.toLowerCase()) ||
      s.artistName.toLowerCase().includes(filterText.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'artist') return a.artistName.localeCompare(b.artistName);
      return 0;
    });

  // Filter saved albums
  const filteredAlbums = savedAlbums.filter(
    (al) =>
      al.title.toLowerCase().includes(filterText.toLowerCase()) ||
      al.artistName.toLowerCase().includes(filterText.toLowerCase())
  );

  // Filter followed artists
  const filteredArtists = followedArtists.filter((art) =>
    art.name.toLowerCase().includes(filterText.toLowerCase())
  );

  const handlePlayAllLiked = () => {
    if (filteredLikedSongs.length > 0) {
      playSong(filteredLikedSongs[0], filteredLikedSongs);
      showToast('Memutar semua lagu disukai', 'success');
    }
  };

  return (
    <div className="px-4 sm:px-8 py-6 space-y-8 max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <Library className="w-8 h-8 text-indigo-400" />
            Perpustakaan Saya
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Semua musik, album, dan artis yang kamu simpan di satu tempat.
          </p>
        </div>

        {activeTab === 'liked' && filteredLikedSongs.length > 0 && (
          <button
            onClick={handlePlayAllLiked}
            className="px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all self-start sm:self-auto"
          >
            <Play className="w-4 h-4 fill-current" />
            Putar Semua ({filteredLikedSongs.length})
          </button>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => handleTabChange('liked')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'liked'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-400" />
          Lagu Disukai ({likedSongIds.length})
        </button>

        <button
          onClick={() => handleTabChange('albums')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'albums'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Disc className="w-4 h-4 text-cyan-400" />
          Album Tersimpan ({savedAlbumIds.length})
        </button>

        <button
          onClick={() => handleTabChange('artists')}
          className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'artists'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-emerald-400" />
          Artis Diikuti ({followedArtistIds.length})
        </button>
      </div>

      {/* Filter and Sort Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Cari di perpustakaan..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {activeTab === 'liked' && (
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="default">Urutan Default</option>
              <option value="title">Judul (A-Z)</option>
              <option value="artist">Nama Artis (A-Z)</option>
            </select>
          </div>
        )}
      </div>

      {/* ================= TAB 1: LAGU DISUKAI ================= */}
      {activeTab === 'liked' && (
        <div>
          {filteredLikedSongs.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800">
              <Heart className="w-12 h-12 text-rose-500/50 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Belum Ada Lagu yang Disukai</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto mb-6">
                Klik ikon hati pada lagu yang kamu dengar untuk menyimpannya ke koleksi ini.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center gap-2 mx-auto"
              >
                <Compass className="w-4 h-4" />
                Jelajahi Musik
              </button>
            </div>
          ) : (
            <div className="space-y-1 bg-slate-900/40 p-2 rounded-2xl border border-slate-800">
              {filteredLikedSongs.map((song, idx) => (
                <SongRow
                  key={song.id}
                  song={song}
                  index={idx}
                  playlistContext={filteredLikedSongs}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 2: ALBUM TERSIMPAN ================= */}
      {activeTab === 'albums' && (
        <div>
          {filteredAlbums.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800">
              <Disc className="w-12 h-12 text-cyan-500/50 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Belum Ada Album Tersimpan</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto mb-6">
                Simpan album favoritmu untuk didengarkan kapan saja tanpa repot mencari.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold mx-auto flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                Cari Album
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {filteredAlbums.map((album) => (
                <AlbumCard key={album.id} album={album} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 3: ARTIS DIIKUTI ================= */}
      {activeTab === 'artists' && (
        <div>
          {filteredArtists.length === 0 ? (
            <div className="text-center py-20 px-4 rounded-3xl bg-slate-900/40 border border-dashed border-slate-800">
              <Users className="w-12 h-12 text-emerald-500/50 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Belum Mengikuti Artis</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto mb-6">
                Ikuti artis favoritmu untuk mendapatkan rekomendasi dan lagu terbaru mereka.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs font-bold mx-auto flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                Temukan Artis
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
              {filteredArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
