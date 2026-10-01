import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, ListMusic, Library, User } from 'lucide-react';
import { usePlayerStore } from '../../store/playerStore';

export const MobileNav: React.FC = () => {
  const { currentSong } = usePlayerStore();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-col items-center justify-center gap-1 py-1.5 flex-1 transition-colors ${
      isActive ? 'text-indigo-400 font-bold' : 'text-slate-400 hover:text-slate-200'
    }`;

  return (
    <nav
      className={`md:hidden fixed left-0 right-0 z-30 glass-nav border-t border-slate-800/90 transition-all ${
        currentSong ? 'bottom-[65px]' : 'bottom-0'
      }`}
    >
      <div className="flex items-center justify-around px-2">
        <NavLink to="/" end className={navClass}>
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Beranda</span>
        </NavLink>

        <NavLink to="/search" className={navClass}>
          <Search className="w-5 h-5" />
          <span className="text-[10px]">Cari</span>
        </NavLink>

        <NavLink to="/playlists" className={navClass}>
          <ListMusic className="w-5 h-5" />
          <span className="text-[10px]">Playlist</span>
        </NavLink>

        <NavLink to="/library" className={navClass}>
          <Library className="w-5 h-5" />
          <span className="text-[10px]">Library</span>
        </NavLink>

        <NavLink to="/profile" className={navClass}>
          <User className="w-5 h-5" />
          <span className="text-[10px]">Akun</span>
        </NavLink>
      </div>
    </nav>
  );
};
