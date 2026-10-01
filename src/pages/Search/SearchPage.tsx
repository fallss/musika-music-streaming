import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useMusicStore } from '../../store/musicStore';
import { SongRow } from '../../components/music/SongRow';
import { ArtistCard } from '../../components/music/ArtistCard';
import { AlbumCard } from '../../components/music/AlbumCard';
import { Search, X, History, Music, Users, Disc, Frown } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    songs,
    artists,
    albums,
    recentSearches,
    searchQuery,
    setSearchQuery,
    saveSearch,
    removeSearch,
    clearSearches,
  } = useMusicStore();

  const [activeTab, setActiveTab] = useState<'all' | 'songs' | 'artists' | 'albums'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Sync with URL query param if present
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  // Simulate subtle skeleton loading on search input
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
        saveSearch(searchQuery);
      }, 250);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, [searchQuery]);

  const query = searchQuery.trim().toLowerCase();

  const matchingSongs = query
    ? songs.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.artistName.toLowerCase().includes(query) ||
          s.albumName.toLowerCase().includes(query) ||
          s.genre.toLowerCase().includes(query)
      )
    : [];

  const matchingArtists = query
    ? artists.filter((a) => a.name.toLowerCase().includes(query) || a.bio.toLowerCase().includes(query))
    : [];

  const matchingAlbums = query
    ? albums.filter(
        (al) =>
          al.title.toLowerCase().includes(query) ||
          al.artistName.toLowerCase().includes(query) ||
          al.genre.toLowerCase().includes(query)
      )
    : [];

  const hasResults =
    matchingSongs.length > 0 || matchingArtists.length > 0 || matchingAlbums.length > 0;

  const handleClear = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  const handleChipClick = (term: string) => {
    setSearchQuery(term);
    setSearchParams({ q: term });
  };

  return (
    <div className="px-4 sm:px-8 py-6 space-y-8 max-w-7xl mx-auto">
      {/* Search Input Banner */}
      <div className="relative">
        <div className="relative max-w-3xl">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSearchParams(e.target.value ? { q: e.target.value } : {});
            }}
            placeholder="Cari judul lagu, artis, atau album..."
            className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-base shadow-xl transition-all"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Bersihkan pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Recent Searches */}
      {!query && recentSearches.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <History className="w-4 h-4 text-indigo-400" />
              Pencarian Terakhir
            </h3>
            <button
              onClick={clearSearches}
              className="text-xs text-slate-400 hover:text-rose-400 transition-colors"
            >
              Hapus Semua
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term) => (
              <div
                key={term}
                className="group flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition-all cursor-pointer"
                onClick={() => handleChipClick(term)}
              >
                <span>{term}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSearch(term);
                  }}
                  className="text-slate-500 hover:text-rose-400 p-0.5 rounded-full"
                  title="Hapus item ini"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs Filter */}
      {query && (
        <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            Semua
          </button>
          <button
            onClick={() => setActiveTab('songs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'songs'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Music className="w-3.5 h-3.5" />
            Lagu ({matchingSongs.length})
          </button>
          <button
            onClick={() => setActiveTab('artists')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'artists'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Artis ({matchingArtists.length})
          </button>
          <button
            onClick={() => setActiveTab('albums')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'albums'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            <Disc className="w-3.5 h-3.5" />
            Album ({matchingAlbums.length})
          </button>
        </div>
      )}

      {/* Skeleton Loading State */}
      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 rounded-xl bg-slate-900/60 animate-pulse border border-slate-800"
            />
          ))}
        </div>
      )}

      {/* Results or Empty State */}
      {!isLoading && query && !hasResults && (
        <div className="text-center py-16 px-4 rounded-3xl bg-slate-900/40 border border-slate-800">
          <Frown className="w-12 h-12 text-slate-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">Musik tidak ditemukan</h3>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Tidak ada lagu, artis, atau album yang cocok dengan "{searchQuery}". Coba kata kunci lain atau periksa ejaan.
          </p>
        </div>
      )}

      {/* Results Content */}
      {!isLoading && query && hasResults && (
        <div className="space-y-10">
          {/* Songs Results */}
          {(activeTab === 'all' || activeTab === 'songs') && matchingSongs.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Music className="w-4 h-4 text-indigo-400" />
                Lagu
              </h3>
              <div className="space-y-1 bg-slate-900/40 rounded-2xl p-2 border border-slate-800/80">
                {matchingSongs.map((song, idx) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    index={idx}
                    playlistContext={matchingSongs}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Artists Results */}
          {(activeTab === 'all' || activeTab === 'artists') && matchingArtists.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" />
                Artis
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {matchingArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            </section>
          )}

          {/* Albums Results */}
          {(activeTab === 'all' || activeTab === 'albums') && matchingAlbums.length > 0 && (
            <section className="space-y-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Disc className="w-4 h-4 text-cyan-400" />
                Album
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {matchingAlbums.map((album) => (
                  <AlbumCard key={album.id} album={album} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* Explore Genres when no search query */}
      {!query && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Jelajahi Genre Populer</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
              { name: 'Pop Hits', color: 'from-pink-600 to-rose-500' },
              { name: 'Indie & Folk', color: 'from-amber-600 to-orange-500' },
              { name: 'R&B / Soul', color: 'from-purple-600 to-indigo-600' },
              { name: 'Lo-Fi Chill', color: 'from-teal-600 to-emerald-600' },
              { name: 'Alternative Rock', color: 'from-red-600 to-amber-700' },
              { name: 'Synthwave', color: 'from-cyan-600 to-blue-600' },
            ].map((genre) => (
              <div
                key={genre.name}
                onClick={() => {
                  setSearchQuery(genre.name.split(' ')[0]);
                }}
                className={`h-24 rounded-2xl bg-gradient-to-br ${genre.color} p-4 font-bold text-white flex items-end cursor-pointer shadow-lg hover:scale-105 active:scale-95 transition-all`}
              >
                <span>{genre.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
