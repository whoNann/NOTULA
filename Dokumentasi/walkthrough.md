# Notula Frontend — Walkthrough

## Summary

Melengkapi seluruh UI frontend Notula, menyeragamkan layout (Sidebar/TopNav/BottomNav), dan menambahkan fungsionalitas CRUD notes.

## File Changes

### New Files Created (6 files)

| File | Purpose |
|------|---------|
| [notesStore.js](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/utils/notesStore.js) | localStorage data layer — CRUD, search, time formatting |
| [AppLayout.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/AppLayout.jsx) | Shared layout wrapping Sidebar + TopNav + BottomNav + Outlet |
| [LandingPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/LandingPage.jsx) | Hero, features, CTA, footer — standalone marketing page |
| [ProfilePage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/ProfilePage.jsx) | User info, stats, settings toggles, logout |
| [NotFoundPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/NotFoundPage.jsx) | 404 page with navigation links |

### Modified Files (8 files)

| File | Changes |
|------|---------|
| [App.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/App.jsx) | New routing: `/` landing, `/dashboard` + `/note/:id` + `/profile` wrapped in AppLayout, `*` → 404 |
| [Sidebar.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/Sidebar.jsx) | react-router `<Link>`, active state from `useLocation`, working logout |
| [TopNav.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/TopNav.jsx) | "New Note" creates note & navigates, avatar links to profile, local avatar icon |
| [BottomNav.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/components/BottomNav.jsx) | react-router `<Link>`, active state from route |
| [DashboardPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/DashboardPage.jsx) | CRUD from localStorage, search filter, delete confirmation modal, no more hardcoded data |
| [EditorPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/EditorPage.jsx) | Load/save from localStorage, functional toolbar (Bold/Italic/H1/H2/etc.), word count, auto-save |
| [LoginPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/LoginPage.jsx) | Navigates to `/dashboard` on submit, stores user in localStorage |
| [RegisterPage.jsx](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/pages/RegisterPage.jsx) | Navigates to `/dashboard` on submit, stores user data |
| [index.css](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/src/index.css) | Page transitions, landing animations, stagger, focus-visible, selection color |

## Routing Structure

```
/              → LandingPage (standalone)
/login         → LoginPage (standalone)  
/register      → RegisterPage (standalone)
/dashboard     → DashboardPage (with AppLayout: Sidebar + TopNav + BottomNav)
/note/:id      → EditorPage (with AppLayout)
/profile       → ProfilePage (with AppLayout)
*              → NotFoundPage (standalone)
```

## Key Features Implemented

- **Consistent Layout**: Sidebar, TopNav, BottomNav seragam di semua halaman app via `AppLayout`
- **CRUD Notes**: Create, Read, Update, Delete — semua pakai localStorage
- **Search**: Filter notes berdasarkan judul/konten
- **Auto-Save**: Editor auto-save ke localStorage saat mengetik (800ms debounce)
- **Formatting Toolbar**: Bold, Italic, Strikethrough, H1, H2, Bullet List, Code Block
- **Page Transitions**: Smooth fade-in animations di semua halaman
- **Delete Confirmation**: Modal konfirmasi sebelum hapus note
- **Word/Char Count**: Ditampilkan di editor
- **Profile Page**: Statistik notes + settings

## Testing

- Dev server berjalan tanpa error di `http://localhost:5173/`
