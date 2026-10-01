import { Song, Artist, Album } from '../types/music';
import { Playlist } from '../types/playlist';
import { User } from '../types/user';
import { PlayerSettings, NotificationSettings } from '../types/settings';

export const INITIAL_USER: User = {
  id: "user-001",
  name: "Ifhal Faizi",
  username: "faizimusic",
  email: "faizi@musika.id",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  bio: "Audiophile, tech enthusiast & nocturnal playlist curator 🎧✨ Mengalir bersama irama.",
  createdAt: "2025-01-15T08:00:00.000Z"
};

export const INITIAL_AUTH = {
  isAuthenticated: true,
  userId: "user-001"
};

export const MOCK_ARTISTS: Artist[] = [
  {
    id: "artist-001",
    name: "NIKI",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80",
    bio: "Penyanyi, penulis lagu, dan produser asal Indonesia yang mendunia dengan vokal R&B yang lembut dan lirik personal.",
    followers: 8420000,
    monthlyListeners: "11.2M",
    headerImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "artist-002",
    name: "The Weeknd",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    bio: "Superstar global pencetak rekor dengan perpaduan synth-wave modern, dark R&B, dan pop sinematik.",
    followers: 34100000,
    monthlyListeners: "105.4M",
    headerImage: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "artist-003",
    name: "Daniel Caesar",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    bio: "Penyanyi neo-soul peraih Grammy asal Kanada yang terkenal dengan harmoni vokal hangat dan melodi romantis.",
    followers: 12500000,
    monthlyListeners: "28.6M",
    headerImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "artist-004",
    name: "Laufey",
    image: "https://images.unsplash.com/photo-1520523839898-507125cd53c1?w=600&auto=format&fit=crop&q=80",
    bio: "Musisi berdarah Islandia-Tiongkok yang merevolusi jazz dan bossa nova klasik untuk generasi baru.",
    followers: 6890000,
    monthlyListeners: "16.1M",
    headerImage: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "artist-005",
    name: "Billie Eilish",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
    bio: "Penyanyi dan penulis lagu visioner pengusung genre dark pop dan bassline atmosferik yang memukau.",
    followers: 29800000,
    monthlyListeners: "89.3M",
    headerImage: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "artist-006",
    name: "Joji",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
    bio: "Artis multi-talenta pelopor melancholic lo-fi R&B dengan nada ballad yang emosional dan mendalam.",
    followers: 15400000,
    monthlyListeners: "31.9M",
    headerImage: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "artist-007",
    name: "Tame Impala",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    bio: "Proyek musik psychedelic rock/pop Kevin Parker yang menghadirkan synthesizer magis dan drum berlapis.",
    followers: 18200000,
    monthlyListeners: "35.2M",
    headerImage: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=1200&auto=format&fit=crop&q=80"
  },
  {
    id: "artist-008",
    name: "Coldplay",
    image: "https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?w=600&auto=format&fit=crop&q=80",
    bio: "Band stadium rock legendaris asal Inggris dengan lagu-lagu anthemic yang menggetarkan panggung dunia.",
    followers: 41000000,
    monthlyListeners: "78.4M",
    headerImage: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=1200&auto=format&fit=crop&q=80"
  }
];

export const MOCK_ALBUMS: Album[] = [
  {
    id: "album-001",
    title: "Nicole",
    artistId: "artist-001",
    artistName: "NIKI",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2022-08-12",
    genre: "R&B / Indie Pop",
    songCount: 12
  },
  {
    id: "album-002",
    title: "After Hours",
    artistId: "artist-002",
    artistName: "The Weeknd",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2020-03-20",
    genre: "Synthwave / R&B",
    songCount: 14
  },
  {
    id: "album-003",
    title: "Freudian",
    artistId: "artist-003",
    artistName: "Daniel Caesar",
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2017-08-25",
    genre: "Neo Soul",
    songCount: 10
  },
  {
    id: "album-004",
    title: "Bewitched",
    artistId: "artist-004",
    artistName: "Laufey",
    coverUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2023-09-08",
    genre: "Traditional Pop / Jazz",
    songCount: 14
  },
  {
    id: "album-005",
    title: "Hit Me Hard and Soft",
    artistId: "artist-005",
    artistName: "Billie Eilish",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2024-05-17",
    genre: "Alternative Pop",
    songCount: 10
  },
  {
    id: "album-006",
    title: "SMITHEREENS",
    artistId: "artist-006",
    artistName: "Joji",
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2022-11-04",
    genre: "Lo-Fi / R&B",
    songCount: 9
  },
  {
    id: "album-007",
    title: "Currents",
    artistId: "artist-007",
    artistName: "Tame Impala",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2015-07-17",
    genre: "Psychedelic Pop",
    songCount: 13
  },
  {
    id: "album-008",
    title: "Everyday Life",
    artistId: "artist-008",
    artistName: "Coldplay",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    releaseDate: "2019-11-22",
    genre: "Alternative Rock",
    songCount: 16
  }
];

export const MOCK_SONGS: Song[] = [
  {
    id: "song-001",
    title: "High School in Jakarta",
    artistId: "artist-001",
    artistName: "NIKI",
    albumId: "album-001",
    albumName: "Nicole",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    coverUrl: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=600&auto=format&fit=crop&q=80",
    duration: 219,
    genre: "Indie Pop",
    releaseDate: "2022-08-05",
    plays: 1420500
  },
  {
    id: "song-002",
    title: "Blinding Lights",
    artistId: "artist-002",
    artistName: "The Weeknd",
    albumId: "album-002",
    albumName: "After Hours",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    duration: 200,
    genre: "Synthwave",
    releaseDate: "2019-11-29",
    plays: 3840210
  },
  {
    id: "song-003",
    title: "Best Part (feat. H.E.R.)",
    artistId: "artist-003",
    artistName: "Daniel Caesar",
    albumId: "album-003",
    albumName: "Freudian",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    duration: 210,
    genre: "Neo Soul",
    releaseDate: "2017-08-25",
    plays: 2950100
  },
  {
    id: "song-004",
    title: "From The Start",
    artistId: "artist-004",
    artistName: "Laufey",
    albumId: "album-004",
    albumName: "Bewitched",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    coverUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop&q=80",
    duration: 169,
    genre: "Jazz / Bossa Nova",
    releaseDate: "2023-06-20",
    plays: 1890300
  },
  {
    id: "song-005",
    title: "BIRDS OF A FEATHER",
    artistId: "artist-005",
    artistName: "Billie Eilish",
    albumId: "album-005",
    albumName: "Hit Me Hard and Soft",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    duration: 190,
    genre: "Alternative Pop",
    releaseDate: "2024-05-17",
    plays: 4210000
  },
  {
    id: "song-006",
    title: "Glimpse of Us",
    artistId: "artist-006",
    artistName: "Joji",
    albumId: "album-006",
    albumName: "SMITHEREENS",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    coverUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600&auto=format&fit=crop&q=80",
    duration: 233,
    genre: "Lo-Fi / R&B",
    releaseDate: "2022-06-10",
    plays: 3120000
  },
  {
    id: "song-007",
    title: "The Less I Know The Better",
    artistId: "artist-007",
    artistName: "Tame Impala",
    albumId: "album-007",
    albumName: "Currents",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    duration: 216,
    genre: "Psychedelic Pop",
    releaseDate: "2015-11-29",
    plays: 3670900
  },
  {
    id: "song-008",
    title: "Yellow",
    artistId: "artist-008",
    artistName: "Coldplay",
    albumId: "album-008",
    albumName: "Everyday Life",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&auto=format&fit=crop&q=80",
    duration: 269,
    genre: "Alternative Rock",
    releaseDate: "2000-06-26",
    plays: 5120000
  },
  {
    id: "song-009",
    title: "Oceans & Engines",
    artistId: "artist-001",
    artistName: "NIKI",
    albumId: "album-001",
    albumName: "Nicole",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
    coverUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
    duration: 338,
    genre: "Ballad / Indie",
    releaseDate: "2022-07-08",
    plays: 980200
  },
  {
    id: "song-010",
    title: "Save Your Tears",
    artistId: "artist-002",
    artistName: "The Weeknd",
    albumId: "album-002",
    albumName: "After Hours",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80",
    duration: 215,
    genre: "Synthpop",
    releaseDate: "2020-08-09",
    plays: 2890000
  },
  {
    id: "song-011",
    title: "Get You (feat. Kali Uchis)",
    artistId: "artist-003",
    artistName: "Daniel Caesar",
    albumId: "album-003",
    albumName: "Freudian",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3",
    coverUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=600&auto=format&fit=crop&q=80",
    duration: 278,
    genre: "Neo Soul",
    releaseDate: "2016-10-21",
    plays: 2100400
  },
  {
    id: "song-012",
    title: "Falling Behind",
    artistId: "artist-004",
    artistName: "Laufey",
    albumId: "album-004",
    albumName: "Bewitched",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3",
    coverUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80",
    duration: 173,
    genre: "Bossa Nova",
    releaseDate: "2022-08-11",
    plays: 1650300
  }
];

export const INITIAL_PLAYLISTS: Playlist[] = [
  {
    id: "playlist-001",
    userId: "user-001",
    name: "Late Night Chill & Lo-Fi",
    description: "Koleksi melodi hangat dan menenangkan untuk menemani larut malam dan overthinking produktifmu.",
    coverUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    songIds: ["song-001", "song-003", "song-006", "song-009"],
    createdAt: "2025-02-10T14:20:00.000Z",
    updatedAt: "2025-02-10T14:20:00.000Z"
  },
  {
    id: "playlist-002",
    userId: "user-001",
    name: "Focus & Coding Flow",
    description: "Ketukan berirama dinamis tanpa distraksi untuk produktivitas maksimal saat coding atau belajar.",
    coverUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&auto=format&fit=crop&q=80",
    songIds: ["song-002", "song-007", "song-010"],
    createdAt: "2025-02-15T09:12:00.000Z",
    updatedAt: "2025-02-15T09:12:00.000Z"
  },
  {
    id: "playlist-003",
    userId: "user-001",
    name: "Indie & Cozy Afternoon",
    description: "Cahaya senja keemasan, secangkir kopi hangat, dan vokal akustik yang memeluk harimu.",
    coverUrl: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=600&auto=format&fit=crop&q=80",
    songIds: ["song-004", "song-005", "song-008", "song-012"],
    createdAt: "2025-03-01T17:45:00.000Z",
    updatedAt: "2025-03-01T17:45:00.000Z"
  }
];

export const INITIAL_LIKED_SONGS: string[] = [
  "song-001",
  "song-003",
  "song-005",
  "song-006"
];

export const INITIAL_SAVED_ALBUMS: string[] = [
  "album-001",
  "album-003",
  "album-005"
];

export const INITIAL_FOLLOWED_ARTISTS: string[] = [
  "artist-001",
  "artist-003",
  "artist-004",
  "artist-006"
];

export const INITIAL_PLAY_HISTORY = [
  {
    songId: "song-001",
    progress: 42,
    playedAt: "2026-09-30T22:15:00.000Z"
  },
  {
    songId: "song-005",
    progress: 110,
    playedAt: "2026-09-30T21:40:00.000Z"
  },
  {
    songId: "song-002",
    progress: 75,
    playedAt: "2026-09-30T19:20:00.000Z"
  }
];

export const INITIAL_QUEUE = [
  { songId: "song-001", position: 0 },
  { songId: "song-003", position: 1 },
  { songId: "song-004", position: 2 },
  { songId: "song-005", position: 3 }
];

export const INITIAL_SETTINGS: PlayerSettings = {
  autoplay: true,
  crossfade: 2,
  audioQuality: "high",
  normalizeVolume: false,
  volume: 0.8,
  shuffle: false,
  repeatMode: "off"
};

export const INITIAL_NOTIFICATIONS: NotificationSettings = {
  newReleases: true,
  playlistUpdates: true,
  recommendations: true,
  accountNotifications: true
};

export const INITIAL_RECENT_SEARCHES: string[] = [
  "NIKI",
  "The Weeknd",
  "Coldplay",
  "Laufey"
];
