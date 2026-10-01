import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Home,
  Search,
  ListMusic,
  Library,
  Heart,
  Disc,
  Users,
  User,
  Settings,
  PlusCircle,
  Headphones,
} from 'lucide-react';
import { usePlaylistStore } from '../../store/playlistStore';
import { useUIStore } from '../../store/uiStore';
import { useLibraryStore } from '../../store/libraryStore';

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { playlists } = usePlaylistStore();
  const { likedSongIds, savedAlbumIds, followedArtistIds } = useLibraryStore();
  const { setCreatePlaylistModalOpen } = useUIStore();

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25 font-semibold'
        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
    }`;

  return (
    <aside className="hidden md:flex flex-col w-64 bg-slate-950 border-r border-slate-800/80 h-screen sticky top-0 flex-shrink-0 select-none overflow-hidden">
      {/* Brand Header */}
      <div className="p-6 pb-5 flex items-center justify-between">
        <div
          onClick={() => navigate('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Headphones className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl tracking-wider text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
              MUSIKA
            </h1>
            <p className="text-[10px] tracking-widest text-indigo-400 font-semibold uppercase">
              Stream & Vibe
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Scrollable Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {/* Main Nav */}
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Menu
          </p>
          <div className="space-y-1">
            <NavLink to="/" end className={navLinkClass}>
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </NavLink>
            <NavLink to="/search" className={navLinkClass}>
              <Search className="w-4 h-4" />
              <span>Pencarian</span>
            </NavLink>
          </div>
        </div>

        {/* Your Music Section */}
        <div>
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Musik Saya
            </p>
            <button
              onClick={() => setCreatePlaylistModalOpen(true)}
              className="text-slate-400 hover:text-indigo-400 transition-colors"
              title="Buat Playlist Baru"
            >
              <PlusCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1">
            <NavLink to="/playlists" className={navLinkClass}>
              <ListMusic className="w-4 h-4" />
              <span>Playlist</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-slate-900 text-slate-400">
                {playlists.length}
              </span>
            </NavLink>
            <NavLink to="/library" className={navLinkClass}>
              <Library className="w-4 h-4" />
              <span>Perpustakaan</span>
            </NavLink>
            <NavLink to="/library?tab=liked" className={navLinkClass}>
              <Heart className="w-4 h-4 text-rose-400" />
              <span>Lagu Disukai</span>
              <span className="ml-auto text-xs text-slate-400">
                {likedSongIds.length}
              </span>
            </NavLink>
            <NavLink to="/library?tab=albums" className={navLinkClass}>
              <Disc className="w-4 h-4 text-cyan-400" />
              <span>Album Tersimpan</span>
              <span className="ml-auto text-xs text-slate-400">
                {savedAlbumIds.length}
              </span>
            </NavLink>
            <NavLink to="/library?tab=artists" className={navLinkClass}>
              <Users className="w-4 h-4 text-emerald-400" />
              <span>Artis Diikuti</span>
              <span className="ml-auto text-xs text-slate-400">
                {followedArtistIds.length}
              </span>
            </NavLink>
          </div>
        </div>

        {/* Quick User Playlists list */}
        {playlists.length > 0 && (
          <div>
            <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Daftar Putar
            </p>
            <div className="space-y-0.5 max-h-36 overflow-y-auto pr-1">
              {playlists.map((playlist) => (
                <NavLink
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className={({ isActive }) =>
                    `block px-3 py-1.5 rounded-lg text-xs truncate transition-colors ${
                      isActive
                        ? 'text-indigo-400 font-semibold bg-indigo-950/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                    }`
                  }
                >
                  {playlist.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* Account & Settings */}
        <div>
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Akun
          </p>
          <div className="space-y-1">
            <NavLink to="/profile" className={navLinkClass}>
              <User className="w-4 h-4" />
              <span>Profil</span>
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              <Settings className="w-4 h-4" />
              <span>Pengaturan</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Bottom Mini Banner */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
        <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-900/40 to-cyan-900/30 border border-indigo-500/20">
          <p className="text-xs font-semibold text-white">Musika Pro Edition</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Streaming tanpa batas & audio jernih.</p>
        </div>
      </div>
    </aside>
  );
};
