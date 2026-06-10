# Notula Frontend — Lengkapi Semua UI & Seragamkan Layout

Melengkapi semua halaman UI untuk app **Notula - AI Note-taking**, menyeragamkan Sidebar/TopNav/BottomNav di semua halaman yang butuh, dan menambahkan halaman yang belum ada.

## Proposed Changes

### 1. Shared Layout Component

Buat `AppLayout.jsx` yang membungkus halaman-halaman utama (Dashboard, Editor) supaya Sidebar, TopNav, BottomNav **konsisten** dan tidak perlu di-copy-paste di setiap page.

#### [NEW] [AppLayout.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/AppLayout.jsx)
- Membungkus `<Sidebar />`, `<TopNav />`, `<BottomNav />` + `<Outlet />` dari react-router
- Semua halaman yang butuh nav akan menggunakan layout ini
- Sidebar otomatis highlight item berdasarkan route aktif

---

### 2. Landing Page (NEW)

#### [NEW] [LandingPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/LandingPage.jsx)
- Hero section dengan tagline + CTA (Login / Register)
- Features section (3 fitur utama: AI Summarize, Dark Mode, Markdown Editor)
- Footer sederhana
- Menggunakan favicon.svg sebagai logo/icon
- Tidak pakai Sidebar/TopNav (standalone page)

---

### 3. Seragamkan Sidebar

#### [MODIFY] [Sidebar.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/Sidebar.jsx)
- Gunakan `useLocation()` + `<Link>` dari react-router untuk navigasi sesungguhnya
- Tambah props `activePath` supaya highlight otomatis
- Logout link ke `/login`

#### [MODIFY] [TopNav.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/TopNav.jsx)
- "New Note" button linking ke `/note/new`
- Search bar sebagai controlled input (menerima props `onSearch`, `searchQuery`)

#### [MODIFY] [BottomNav.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/BottomNav.jsx)
- Gunakan `useLocation()` + `<Link>` supaya navigasi beneran jalan
- Active state berdasarkan route

---

### 4. Dashboard Page — Fungsional CRUD

#### [MODIFY] [DashboardPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/DashboardPage.jsx)
- Hapus `sampleNotes` hardcoded → load dari `localStorage`
- Search filter berdasarkan judul/konten note
- Hapus Sidebar/TopNav/BottomNav yang di-import langsung (pakai dari AppLayout)
- "Create New Note" membuat note baru di localStorage & redirect ke editor
- Delete note dari card

---

### 5. Editor Page — Konsisten Layout

#### [MODIFY] [EditorPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/EditorPage.jsx)
- Load/save note dari/ke localStorage berdasarkan `:id` param
- Auto-save ke localStorage saat mengetik
- Toolbar formatting (Bold, Italic, Heading) fungsional — insert markdown syntax
- Sidebar/TopNav muncul konsisten (via AppLayout)

---

### 6. Halaman Tambahan

#### [NEW] [ProfilePage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/ProfilePage.jsx)
- Tampilkan info user (nama, email) dari localStorage
- Statistik sederhana (jumlah notes, total words)
- Tombol logout

#### [NEW] [NotFoundPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/NotFoundPage.jsx)
- 404 page yang sesuai design system
- Link kembali ke Dashboard

---

### 7. Notes Helper (Data Layer)

#### [NEW] [notesStore.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/utils/notesStore.js)
- Helper functions: `getNotes()`, `getNote(id)`, `saveNote(note)`, `deleteNote(id)`, `createNote()`
- Semua pakai `localStorage` sebagai storage
- Seed data default kalau kosong (3 sample notes)

---

### 8. Routing & App.jsx Update

#### [MODIFY] [App.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/App.jsx)
- Landing page di `/`
- Login di `/login`, Register di `/register`
- Dashboard di `/dashboard` (wrapped in AppLayout)
- Editor di `/note/:id` (wrapped in AppLayout)
- Profile di `/profile` (wrapped in AppLayout)
- 404 catch-all `*`

---

### 9. CSS Enhancements

#### [MODIFY] [index.css](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/index.css)
- Tambah animasi fade-in untuk page transitions
- Tambah hover/active states yang lebih smooth
- Landing page specific styles (gradient hero, feature cards)

---

## Verification Plan

### Manual Verification
- Jalankan `npm run dev` dan cek semua halaman
- Verifikasi navigasi antar halaman berjalan smooth
- Verifikasi Sidebar/TopNav/BottomNav konsisten di Dashboard, Editor, Profile
- Verifikasi CRUD notes (buat, edit, hapus note)
- Verifikasi search filter di Dashboard
- Verifikasi responsive (mobile vs desktop)
- Verifikasi Landing Page tampil di `/`
- Verifikasi 404 page muncul untuk route tidak dikenal
