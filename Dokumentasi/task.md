# Notula Serverless Supabase — Task Tracker

## Setup & Inisialisasi Supabase
- [x] 1. Install `@supabase/supabase-js` di Frontend
- [x] 2. Buat `Frontend/.env` untuk menyimpan url & anon key Supabase
- [x] 3. Buat file inisialisasi client `Frontend/src/utils/supabaseClient.js`
- [x] 4. Buat skema DDL SQL `Backend/schema.sql` untuk di-import di Supabase
- [x] 5. Buat kode Supabase Edge Function `supabase/functions/gemini/index.ts`

## Integrasi Autentikasi & Database Klien
- [x] 6. Perbarui `notesStore.js` agar memanggil SDK Supabase untuk CRUD catatan & Edge Function AI
- [x] 7. Perbarui `LoginPage.jsx` dan `RegisterPage.jsx` untuk Supabase Auth
- [x] 8. Perbarui `AppLayout.jsx` (Auth Guard) menggunakan sesi Supabase Auth
- [x] 9. Perbarui `ProfilePage.jsx` untuk memuat sesi & statistik Supabase Auth

## Pengujian & Verifikasi
- [x] 10. Verifikasi pendaftaran, masuk, CRUD catatan, dan pemrosesan AI secara penuh
