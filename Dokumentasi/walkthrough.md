# Notula Frontend — Walkthrough

## Summary

Melengkapi seluruh UI frontend Notula, menyeragamkan layout (Sidebar/TopNav/BottomNav), mengintegrasikan fungsionalitas CRUD notes, menambahkan live markdown preview, sistem notifikasi toast, validasi kata sandi, filter mobile (bottom sheet), dan pencarian terintegrasi global.

## File Changes

### New Files Created (7 files)

| File | Purpose |
|------|---------|
| [notesStore.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/utils/notesStore.js) | localStorage data layer — CRUD, search, time formatting |
| [useToast.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/utils/useToast.js) | Custom hook for triggering global toast notifications |
| [AppLayout.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/AppLayout.jsx) | Shared layout wrapping Sidebar + TopNav + BottomNav + Toast + Outlet |
| [Toast.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/Toast.jsx) | Global floating feedback toast notifications with animations |
| [LandingPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/LandingPage.jsx) | Hero, features, CTA, footer — standalone marketing page with responsive text |
| [ProfilePage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/ProfilePage.jsx) | User info, stats, settings toggles (theme, auto-save, AI features), logout |
| [NotFoundPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/NotFoundPage.jsx) | 404 error page with navigation back to Dashboard |

### Modified Files (11 files)

| File | Changes |
|------|---------|
| [App.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/App.jsx) | Routing: `/` landing, `/dashboard` + `/note/:id` + `/profile` wrapped in AppLayout, `*` → 404 |
| [Sidebar.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/Sidebar.jsx) | react-router `<Link>`, active state from `useLocation`, working logout |
| [TopNav.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/TopNav.jsx) | Integrated search via URL `?q=`, "New Note" creation, profile link |
| [BottomNav.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/BottomNav.jsx) | Integrated mobile filter bottom sheet trigger, react-router `<Link>` |
| [NoteCard.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/NoteCard.jsx) | Added premium hover scaling & shadow glowing class `.note-card-hover` |
| [DashboardPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/DashboardPage.jsx) | Read URL search query `?q=`, CRUD from localStorage, toast triggers, delete modal |
| [EditorPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/EditorPage.jsx) | Added built-in Markdown Live Preview pane, edit/preview toggle, keyboard shortcuts, toasts |
| [LoginPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/LoginPage.jsx) | Navigates to `/dashboard` on submit, stores user in localStorage |
| [RegisterPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/RegisterPage.jsx) | Added real-time password length & matching checks, disable submit on validation error |
| [index.html](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/index.html) | Configured favicon, updated SEO meta tags (description, Open Graph, lang="id") |
| [index.css](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/index.css) | Page transitions, landing animations, Toast slide-in, Bottom Sheet slide-up, note-card hover glow |

## Routing Structure

```
/              → LandingPage (standalone)
/login         → LoginPage (standalone)  
/register      → RegisterPage (standalone)
/dashboard     → DashboardPage (with AppLayout: Sidebar + TopNav + BottomNav + Toast)
/note/:id      → EditorPage (with AppLayout)
/profile       → ProfilePage (with AppLayout)
*              → NotFoundPage (standalone)
```

## Key Features Implemented

- **Consistent Layout & App Container**: Sidebar, TopNav, BottomNav seragam di semua halaman app via `AppLayout` yang juga menampung `<Toast />`.
- **CRUD Notes**: Create, Read, Update (auto-save), Delete — tersinkronisasi penuh ke `localStorage`.
- **Global Search Integration**: Kotak pencarian TopNav tersambung ke Dashboard menggunakan parameter query URL (`?q=`).
- **Markdown Live Preview**: Toolbar format Markdown dilengkapi panel peninjau langsung (Toggle Edit/Preview).
- **Keyboard Shortcuts**: Listeners Ctrl+B (Bold), Ctrl+I (Italic), Ctrl+S (Save), dan Ctrl+Shift+P (Toggle Preview).
- **Toast Notifications**: Umpan balik visual dinamis menggunakan animasi slide-in saat aksi sukses terjadi.
- **Mobile Filter Drawer (Bottom Sheet)**: Panel navigasi meluncur dari bawah untuk fungsionalitas menu filter mobile yang optimal.
- **Real-time Password Checks**: Form pendaftaran mengevaluasi keamanan kata sandi seketika sebelum pendaftaran disubmit.
- **Design System Polish**: Glow hover di NoteCard, transisi warna mode terang/gelap, dan animasi visual.

## Testing

- Dev server berjalan tanpa error di `http://localhost:5173/` ✅
- Build sukses via `npm run build` dengan optimalisasi bundel ✅
- Seluruh fungsionalitas diuji menggunakan Black-Box testing dan dinyatakan **LULUS** ✅
