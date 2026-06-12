# Rencana Migrasi ke Arsitektur Serverless Supabase

Dokumen ini mendeskripsikan rencana implementasi arsitektur **Serverless Supabase** penuh untuk Notula, memindahkan seluruh otentikasi, basis data, dan proxy AI ke layanan terkelola Supabase.

## User Review Required

> [!IMPORTANT]
> **Kredensial Supabase Klien**: Anda perlu menyiapkan sebuah project Supabase dan meletakkan URL serta Anon Key pada file `.env` di Frontend:
> - `VITE_SUPABASE_URL=https://[project-ref].supabase.co`
> - `VITE_SUPABASE_ANON_KEY=[anon-key]`
>
> **Supabase Edge Function**: Kita akan membuat folder `supabase/functions/gemini/` berisi kode Deno TypeScript untuk memproses panggilan AI. Untuk mendeploy fungsi ini dan memasukkan API Key Gemini, Anda dapat menjalankan perintah berikut di terminal Anda setelah menginstal Supabase CLI:
> 1. `supabase secrets set GEMINI_API_KEY=your_actual_gemini_key`
> 2. `supabase functions deploy gemini`

---

## Proposed Changes

### 1. Integrasi Supabase SDK di Frontend
Kita akan menghapus ketergantungan pada backend Node/Express lokal dan langsung menggunakan client-side SDK Supabase.

#### [MODIFY] [Frontend/package.json](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/package.json)
Memasang `@supabase/supabase-js`.

#### [NEW] [Frontend/.env](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/.env)
Menyimpan variabel lingkungan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY`.

#### [NEW] [supabaseClient.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/utils/supabaseClient.js)
Inisialisasi klien SDK Supabase untuk digunakan di seluruh aplikasi.

#### [MODIFY] [notesStore.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/utils/notesStore.js)
Mengubah fungsi-fungsi store agar memanggil SDK Supabase:
- `getNotes()`: Membaca tabel `notes` ter-filter `is_archived: false` diurutkan dari yang terbaru.
- `createNote()`: Menyisipkan baris baru di tabel `notes` dengan `user_id` dari sesi Supabase Auth yang aktif.
- `saveNote()`: Melakukan update baris berdasarkan ID.
- `deleteNote()`: Melakukan operasi delete.
- `summarizeNote()` / `fixGrammarNote()`: Memanggil Supabase Edge Function `gemini` menggunakan `supabase.functions.invoke('gemini', ...)`.

#### [MODIFY] [LoginPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/pages/LoginPage.jsx) & [RegisterPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/pages/RegisterPage.jsx)
Menggunakan `supabase.auth.signInWithPassword` dan `supabase.auth.signUp` untuk otentikasi pengguna langsung melalui Supabase Auth.

#### [MODIFY] [AppLayout.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/components/AppLayout.jsx)
Memeriksa status sesi otentikasi aktif menggunakan `supabase.auth.getSession()` untuk proteksi halaman (auth guard).

#### [MODIFY] [ProfilePage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Frontend/src/pages/ProfilePage.jsx)
Membaca email pengguna dari data sesi aktif Supabase Auth, serta melakukan `supabase.auth.signOut()` saat logout.

---

### 2. Struktur Database & Edge Function di Supabase
Kita akan menyiapkan file skema SQL dan kode fungsi untuk dideploy ke Supabase.

#### [NEW] [schema.sql](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Backend/schema.sql)
Skema DDL PostgreSQL untuk dijalankan di SQL Editor Supabase:
- Membuat tabel `public.notes` ber-relasi ke `auth.users`.
- Mengaktifkan Row Level Security (RLS) agar user hanya bisa membaca dan memanipulasi catatannya sendiri.

#### [NEW] [index.ts](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/supabase/functions/gemini/index.ts)
Kode Supabase Edge Function menggunakan Deno & TypeScript untuk menerima request dari frontend klien, menambahkan `GEMINI_API_KEY` secara aman, memanggil API Google Gemini, dan mengembalikan respon ringkasan/perbaikan tata bahasa.

---

## Verification Plan

### Automated/Edge Function Tests
- Lakukan pemanggilan Edge Function secara lokal menggunakan Supabase CLI:
  `supabase start` dan `supabase functions serve`

### Manual Verification
1. Lakukan pendaftaran pengguna baru di halaman Register. Pengguna akan langsung terdaftar di Supabase Auth (dapat diperiksa di dashboard Supabase -> Authentication).
2. Buat catatan baru dan pastikan baris data masuk ke tabel `notes` di dashboard Supabase.
3. Jalankan tombol Summarize dan Fix Grammar di editor untuk memanggil Supabase Edge Function.
4. Lakukan logout dan verifikasi bahwa sesi Supabase Auth telah dibersihkan sepenuhnya.

---

## Rencana Tambahan: Deployment ke Vercel (UAS Perubahan)

### Proposed Changes
1. **Buat File `Frontend/vercel.json`**: Menambahkan konfigurasi SPA routing rewrite rule untuk mengarahkan semua path URL virtual kembali ke `index.html`.
2. **Perbarui `README.md`**: Menulis instruksi setting *Root Directory* dan *Environment Variables* di Vercel.
3. **Perbarui `Dokumentasi/LAPORAN.md`**: Menyesuaikan dokumen arsitektur dan link dengan platform deployment yang aktif.

### Verification Plan
1. Jalankan `npm run build` di folder `Frontend` untuk memastikan build produksi lokal berhasil tanpa error.
2. Pastikan file `vercel.json` tersusun dengan benar di bawah `Frontend`.

