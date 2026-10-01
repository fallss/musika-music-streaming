<div align="center">

# 🎧 MUSIKA — Modern Music Streaming Platform

<p>
  <strong>A modern, responsive, and fully-functional music streaming web platform.</strong><br>
  Built with React 18, TypeScript, Vite, Tailwind CSS, Zustand, and HTML5 Audio API.
</p>

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/Zustand-5.0-4338ca?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

</div>

---

## 📖 Tentang Proyek

**MUSIKA** adalah platform streaming musik berbasis web yang dirancang untuk memberikan pengalaman mendengarkan musik yang mulus, responsif, dan bernuansa visual modern (*dark mode & glassmorphism*). 

Aplikasi ini berjalan **100% di sisi klien (*Zero Backend / Serverless*)** tanpa ketergantungan pada server database eksternal. Seluruh data (playlist, lagu yang disukai, riwayat putar, antrean lagu, profil pengguna, dan preferensi pengaturan) dikelola dan disinkronkan secara presisten ke **Browser Local Storage**.

---

## 🌟 Fitur Utama

1. **Beranda Musik (Home)**
   - *Hero Section* dengan tombol cepat putar rekomendasi & eksplorasi.
   - **Rekomendasi Harian**: Kartu musik dengan visualizer equalizer animasi, play button overlay, dan context menu.
   - **Baru Dirilis**: Koleksi musik terbaru diurutkan berdasarkan tanggal rilis.
   - **Lanjutkan Mendengarkan**: Menampilkan riwayat lagu terakhir yang diputar lengkap dengan *progress bar* posisi pemutaran.
   - **Artis Populer & Album Terlaris**.

2. **Pemutar Musik Global (Global Music Player)**
   - Tersemat di bagian bawah (*fixed bottom*) dan musik tetap berputar mulus saat berpindah halaman.
   - Kontrol lengkap: Putar/Jeda, Lagu Sebelumnya, Lagu Berikutnya, Acak (*Shuffle*), dan Mode Ulang (*Repeat Off / One / All*).
   - Slider progress bar interaktif dengan indikator durasi aktual (`mm:ss`).
   - Kontrol volume dengan slider dan fitur bisu (*mute/unmute*).
   - Indikator visualizer frekuensi dinamis.
   - Integrasi **HTML5 Audio API** + **MediaSession API** (kontrol dari lockscreen OS & tombol media keyboard) serta *harmonic synthesizer fallback generator* saat streaming diblokir ad-blocker.

3. **Tampilan Lagu (Now Playing Modal)**
   - Artwork album berukuran besar dengan *ambient glow*.
   - **Audio Visualizer Canvas**: Batang frekuensi bergerak secara dinamis mengikuti irama musik.
   - Informasi detail lagu, artis, album, dan genre.
   - Aksi cepat: Sukai lagu, Tambahkan ke Playlist, dan Bagikan Tautan.

4. **Antrean Lagu (Queue Drawer)**
   - Panel slide-over di sisi kanan.
   - Menampilkan lagu yang sedang aktif (*Sedang Diputar*) dan daftar lagu berikutnya (*Berikutnya*).
   - Ubah urutan lagu (*Move Up / Move Down*), hapus lagu dari antrean, putar langsung, atau bersihkan seluruh antrean.

5. **Pencarian Cerdas (Search)**
   - Input pencarian cepat dengan pencocokan parsial (*fuzzy match*).
   - Riwayat pencarian terakhir (*Recent Searches*) tersimpan di local storage (maksimal 10 item, dapat dihapus per item atau sekaligus).
   - Filter tab hasil: **Semua**, **Lagu**, **Artis**, dan **Album**.
   - Eksplorasi kategori genre bergaya modern (*gradient cards*).
   - *Empty state* dan efek *skeleton loading*.

6. **Manajemen Playlist**
   - Buat playlist baru dengan nama, deskripsi, dan pilihan cover menarik (*preset* atau kustom URL).
   - Detail playlist: Putar semua (*Play All*), putar acak (*Shuffle Play*), edit informasi playlist, dan hapus playlist (dengan dialog konfirmasi).
   - Kelola urutan lagu di dalam playlist (*Reorder* naik/turun) dan hapus lagu.
   - Rekomendasi lagu pintar di bagian bawah halaman playlist untuk langsung menambahkan lagu baru dengan 1 klik.

7. **Perpustakaan (Library)**
   - Tiga tab utama: **Lagu Disukai**, **Album Tersimpan**, dan **Artis Diikuti**.
   - Filter pencarian lokal di dalam perpustakaan dan fitur pengurutan (Default, Judul A-Z, Artis A-Z).
   - Notifikasi toast saat menyukai/membatalkan suka lagu.

8. **Akun & Profil (Demo Authentication)**
   - Registrasi dan Login simulasi berbasis LocalStorage.
   - Fitur **1-Klik Masuk sebagai Akun Demo** untuk pengujian instan.
   - Halaman Profil dengan statistik: Jumlah Playlist, Lagu Disukai, dan Artis yang Diikuti.
   - Modal Edit Profil (Nama, Username, Bio, Foto Avatar) dan ubah kata sandi simulasi.

9. **Pengaturan & Manajemen Data**
   - **Pengaturan Pemutaran**: Toggle Putar Otomatis (*Autoplay*), Slider *Crossfade* (0–12 detik), Pemilihan Kualitas Audio (*Low, Normal, High, Lossless*), dan Normalisasi Volume.
   - **Preferensi Notifikasi**: Toggle rilis baru, pembaruan playlist, dan rekomendasi mingguan.
   - **Ekspor Data**: Mengunduh seluruh data aplikasi ke berkas `musika-backup.json`.
   - **Impor Data**: Memulihkan data dari berkas JSON cadangan.
   - **Reset Demo Data**: Mengembalikan semua data MUSIKA ke setelan awal pabrikan.

---

## 🛠️ Arsitektur & Teknologi

```text
UI (React Components & Tailwind CSS)
   │
   ▼
State Management (Zustand Stores)
   │
   ▼
Service Layer (audioService, storageService)
   │
   ▼
Browser Local Storage (musika_*)
```

- **Frontend**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan palet kustom Dark Neon & Glassmorphism
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Penyimpanan Data**: Browser Local Storage (Zero Backend / Serverless)
- **Audio Engine**: HTML5 Audio API + MediaSession API + Procedural Web Audio API Synthesizer

---

## 🚀 Panduan Memulai Cepat

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18 ke atas)
- npm / yarn / pnpm

### Instalasi & Menjalankan

1. **Clone repository ini:**
   ```bash
   git clone https://github.com/fallss/musika-music-streaming.git
   cd musika-music-streaming
   ```

2. **Pasang dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm run dev
   ```

4. **Buka di peramban web:**
   Akses `http://localhost:3000` di browser favorit Anda.

---

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.
