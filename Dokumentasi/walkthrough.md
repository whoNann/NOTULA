# Notula Serverless Supabase — Walkthrough (100% Complete)

## Summary
Migrasi penuh aplikasi Notula dari arsitektur lokal/offline-first ke arsitektur **Serverless Cloud BaaS** menggunakan **Supabase**. Seluruh autentikasi, basis data persisten PostgreSQL dengan keamanan Row Level Security (RLS), dan proksi AI Gemini diatur menggunakan layanan terkelola Supabase.

---

## Supabase Implementation Details

### 1. Inisialisasi & SDK Klien
*   **[package.json](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/package.json)**: Memasang pustaka `@supabase/supabase-js` sebagai pustaka komunikasi utama ke cloud Supabase.
*   **[.env](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/.env)**: Menambahkan parameter `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.
*   **[supabaseClient.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/utils/supabaseClient.js)**: Menyediakan *wrapper instance* Supabase Client untuk mempermudah pemanggilan di berbagai halaman.

### 2. Skema Database & Row Level Security (RLS)
*   **[schema.sql](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Backend/schema.sql)**: Berkas DDL SQL berisi perintah pembuatan tabel `public.notes` ber-relasi ke tabel `auth.users` Supabase. RLS diaktifkan agar data catatan terisolasi secara aman per-pengguna (kebijakan SELECT, INSERT, UPDATE, dan DELETE).

### 3. Supabase Edge Functions (Deno / TypeScript)
*   **[index.ts](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/supabase/functions/gemini/index.ts)**: Kode serverless function `gemini` yang di-host di CDN Supabase. Bertindak sebagai gerbang aman untuk menyimpan rahasia `GEMINI_API_KEY`, memproses prompt *Summarize* atau *Grammar check* menggunakan model **Google Gemini API** (`gemini-2.5-flash`), dan mengembalikan hasil teks olahan ke sisi klien peramban.

---

## React Frontend Integration

### 1. Sinkronisasi Data & Otentikasi
*   **[notesStore.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/utils/notesStore.js)**: Seluruh method CRUD (`getNotes`, `getNote`, `createNote`, `saveNote`, `deleteNote`, `toggleFavorite`, `toggleArchive`) dialihkan untuk melakukan manipulasi data asinkron langsung ke cloud database Supabase. AI *Summarize* dan *Grammar* dipanggil menggunakan `supabase.functions.invoke('gemini', ...)`. Modul ini otomatis mendeteksi sesi dan beralih ke local storage jika pengguna sedang offline/tidak login.
*   **[LoginPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/pages/LoginPage.jsx) & [RegisterPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/pages/RegisterPage.jsx)**: Diintegrasikan dengan Supabase Auth (`signInWithPassword` & `signUp`). Password pengguna di-hash dan dikelola secara aman oleh infrastruktur internal Supabase.
*   **[AppLayout.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/components/AppLayout.jsx)**: Berfungsi sebagai **Auth Guard** untuk memeriksa sesi Supabase Auth yang aktif setiap kali merender rute sensitif.
*   **[ProfilePage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/pages/ProfilePage.jsx)**: Memuat detail user secara asinkron dari Supabase Auth, memanggil statistik catatan, serta melakukan pemanggilan `supabase.auth.signOut()` saat tombol logout ditekan.

---

## Verification Results

### Frontend Compilation ✅
*   `npm run build` sukses berjalan dengan lancar. Seluruh modul di-bundle dan di-minify tanpa kesalahan.

### Skenario Pengujian (E2E Test) ✅
*   Registrasi Pengguna Baru (`aditya@notula.app`) -> Terdaftar secara instan di Supabase Auth.
*   Pembuatan Catatan & Auto-save -> Baris baru tersimpan aman di tabel `public.notes` di cloud PostgreSQL Supabase.
*   Edge Function AI Summarize -> Terpanggil dengan parameter `{ text, task: 'summarize' }`.
*   Sign Out -> Sesi Supabase Auth dibersihkan dan dialihkan kembali ke `/login`.

---

## Vercel Deployment & SPA Routing (Updated)

### 1. SPA Routing Configuration
*   **[vercel.json](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/vercel.json)**: Ditambahkan konfigurasi routing baru untuk Vercel agar mengalihkan semua sub-rute (seperti `/dashboard`, `/profile`, `/login`) kembali ke `index.html` (*client-side routing rewrite*), mencegah error 404 saat melakukan refresh halaman di browser.

### 2. Panduan Integrasi Lingkungan Vercel
*   **Root Directory**: Setel ke subdirektori `Frontend` saat melakukan import repositori di dashboard Vercel.
*   **Environment Variables**: Masukkan kunci akses Supabase pada dashboard Vercel:
    *   `VITE_SUPABASE_URL` = URL Proyek Supabase
    *   `VITE_SUPABASE_ANON_KEY` = Kunci Anonim Supabase

### 3. Hasil Verifikasi Kompilasi (Build Verification) ✅
*   Menjalankan perintah `npm run build` di dalam folder `Frontend`. Proses kompilasi berjalan sukses 100% tanpa kesalahan:
    *   `dist/index.html` (1.53 kB)
    *   `dist/assets/index-CPYpkSen.css` (57.05 kB)
    *   `dist/assets/index-DF81UBWu.js` (510.49 kB)
    *   Waktu bangun: 397 milidetik.

