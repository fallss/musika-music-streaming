import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, Bell, User as UserIcon, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { useUserStore } from '../../store/userStore';
import { useMusicStore } from '../../store/musicStore';
import { useUIStore } from '../../store/uiStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, auth, logout } = useUserStore();
  const { searchQuery, setSearchQuery } = useMusicStore();
  const { showToast } = useUIStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSearchPage = location.pathname === '/search';

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    logout();
    showToast('Berhasil keluar dari akun', 'info');
    setIsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 glass-nav px-4 sm:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Back / Forward and Search bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        {/* Navigation arrows */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
            title="Kembali"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => navigate(1)}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
            title="Maju"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Global Quick Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (!isSearchPage) {
                navigate('/search');
              }
            }}
            onFocus={() => {
              if (!isSearchPage) {
                navigate('/search');
              }
            }}
            placeholder="Cari lagu, artis, atau album..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-slate-900/90 border border-slate-800 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Right Controls: Notifications & User profile pill */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          onClick={() => showToast('Tidak ada notifikasi baru saat ini', 'info')}
          className="relative p-2 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Notifikasi"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
        </button>

        {/* User Pill / Login */}
        {auth.isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2.5 p-1 pr-3 rounded-full bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-indigo-500/50"
              />
              <span className="text-xs font-semibold text-white hidden sm:block max-w-[120px] truncate">
                {user.name}
              </span>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50 text-xs">
                <div className="px-4 py-2 border-b border-slate-800/80">
                  <p className="font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">@{user.username}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      navigate('/profile');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 text-left transition-colors"
                  >
                    <UserIcon className="w-4 h-4 text-indigo-400" />
                    Profil Saya
                  </button>

                  <button
                    onClick={() => {
                      navigate('/settings');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-800 text-left transition-colors"
                  >
                    <SettingsIcon className="w-4 h-4 text-slate-400" />
                    Pengaturan
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-800">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2 text-rose-400 hover:bg-slate-800 text-left transition-colors font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/login')}
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/30 transition-all"
            >
              Masuk
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
