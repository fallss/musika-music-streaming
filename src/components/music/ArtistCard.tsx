import React from 'react';
import { Artist } from '../../types/music';
import { useLibraryStore } from '../../store/libraryStore';
import { useUIStore } from '../../store/uiStore';
import { formatNumber } from '../../utils/format';
import { UserCheck, UserPlus } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onSelect?: (artist: Artist) => void;
}

export const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onSelect }) => {
  const { toggleFollowArtist, isArtistFollowed } = useLibraryStore();
  const { showToast } = useUIStore();

  const isFollowed = isArtistFollowed(artist.id);

  const handleFollowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const followed = toggleFollowArtist(artist.id);
    showToast(
      followed ? `Mengikuti ${artist.name}` : `Berhenti mengikuti ${artist.name}`,
      followed ? 'success' : 'info'
    );
  };

  return (
    <div
      onClick={() => onSelect && onSelect(artist)}
      className="group p-4 rounded-2xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 transition-all duration-300 text-center flex flex-col items-center cursor-pointer"
    >
      {/* Circular Avatar */}
      <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-3.5 bg-slate-800 shadow-xl border-2 border-transparent group-hover:border-indigo-500/50 transition-all duration-300">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>

      <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate w-full">
        {artist.name}
      </h4>
      <p className="text-xs text-slate-400 mt-0.5 mb-3">
        {formatNumber(artist.followers)} pengikut
      </p>

      {/* Follow Button */}
      <button
        onClick={handleFollowClick}
        className={`mt-auto px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
          isFollowed
            ? 'bg-slate-800 text-indigo-300 border border-indigo-500/40 hover:bg-slate-700'
            : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-900/30'
        }`}
      >
        {isFollowed ? (
          <>
            <UserCheck className="w-3.5 h-3.5" />
            <span>Mengikuti</span>
          </>
        ) : (
          <>
            <UserPlus className="w-3.5 h-3.5" />
            <span>Ikuti</span>
          </>
        )}
      </button>
    </div>
  );
};
