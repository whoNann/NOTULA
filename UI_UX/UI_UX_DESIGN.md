# PANDUAN DESAIN UI/UX — NOTULA
**Dokumentasi Desain Konseptual & Visual Aplikasi Catatan Notula**

---

## 1. Filosofi Desain & Kepribadian Brand

Desain antarmuka Notula mengusung prinsip **Modern Minimalist & Focus-First**. Kepribadian brand Notula adalah:
*   **Fokus & Sunyi**: UI dirancang agar tidak mengganggu perhatian saat pengguna menuangkan pemikiran.
*   **Cerdas & Responsif**: Elemen kecerdasan buatan (AI) diisyaratkan dengan aksen visual yang berpendar lembut (*glowing gradient*).
*   **Presisi & Profesional**: Grid, margin, dan tipografi yang sangat terstruktur mencerminkan presisi produk premium untuk pekerja pengetahuan.

---

## 2. Sistem Warna (Design Tokens)

Sistem warna Notula menggunakan variabel CSS kustom untuk mendukung transisi dinamis antara **Mode Gelap (Dark Mode)** dan **Mode Terang (Light Mode)**.

### A. Palet Mode Gelap (Bawaan)
*   **Latar Belakang (Background)**: `#131318` — Hitam legam dengan tint ungu dingin untuk mengurangi kelelahan retina.
*   **Permukaan (Surfaces)**:
    *   Level 1 (Card/Sidebar): `#1b1b20`
    *   Level 2 (Active/Hover States): `#1f1f24`
    *   Level 3 (Modal/High Elevation): `#2a292f`
*   **Aksen Utama (Primary Accent)**: `#cabeff` / `#7c5cfc` — Ungu lavender elektrik.
*   **Aksen AI (Glowing Tertiary)**: Perpaduan gradien HSL antara Ungu Ultra (`#7c5cfc`) dan Lavender Cerah (`#cebdff`).

### B. Palet Mode Terang
*   **Latar Belakang (Background)**: `#f8f9fa` — Putih bersih dengan nuansa abu hangat.
*   **Permukaan (Surfaces)**:
    *   Level 1: `#ffffff`
    *   Level 2: `#f1f3f5`
    *   Level 3: `#e9ecef`
*   **Warna Teks**: `#212529` (Kontras tinggi untuk keterbacaan optimal di bawah sinar matahari langsung).

---

## 3. Tipografi

Notula menggunakan kombinasi jenis huruf modern dari Google Fonts untuk memisahkan konteks membaca UI dan menulis konten:

1.  **Inter (UI Font)**:
    *   Digunakan untuk navigasi, tombol, judul modul, nama folder, dan teks keterangan antarmuka.
    *   Kelebihan: Memiliki kerning yang sangat baik untuk ukuran teks kecil dan teks padat pada layar komputer.
2.  **JetBrains Mono (Editor Font)**:
    *   Digunakan eksklusif untuk area penulisan catatan (`textarea`).
    *   Kelebihan: Karakter berjarak tetap (*monospace*) yang memudahkan penyusunan draf Markdown, penulisan daftar, dan blok kode pemrograman.

---

## 4. Efek Khusus & Animasi (Micro-interactions)

Untuk menghadirkan nuansa premium, Notula menerapkan beberapa detail mikro-antarmuka:
*   **Glassmorphism Backdrop**: Menggunakan CSS `backdrop-filter: blur(12px)` pada komponen navigasi header (`TopNav`) dan modal AI (`AIModal`) untuk membiarkan bayangan konten di belakangnya meluncur transparan saat digulir.
*   **AI Glow Border**: Garis pinggir setebal `1px` dengan bayangan berpendar ungu (`box-shadow: 0 0 15px rgba(124, 92, 252, 0.2)`) yang dipicu saat fitur AI aktif.
*   **Page Transitions**: Kelas `.page-fade-in` menyuntikkan animasi *fade-in* lembut selama 300ms untuk meredam kedipan kasar saat pengguna berpindah halaman.
*   **Note Card Hover Glow**: Menerapkan kelas `.note-card-hover` yang menghasilkan transformasi perbesaran skala halus (*1.02x*) dan bayangan pendar ungu lavendar lembut (`box-shadow: 0 10px 20px rgba(124, 92, 252, 0.15)`) saat diarahkan kursor.
*   **Floating Toast Notifications**: Umpan balik visual dinamis menggunakan animasi masuk meluncur dari bawah (*slide-in-up*) dan menghilang lembut (*fade-out*), diimplementasikan secara global untuk konfirmasi CRUD.
*   **Mobile Bottom Sheet**: Laci filter kategori meluncur mulus dari dasar layar (*slide-up overlay*) khusus pada resolusi mobile/tablet guna menjaga fungsionalitas dan estetika layout.

---

## 5. Tangkapan Layar Desain Aktual (Screenshots)
Seluruh screenshot desain antarmuka tersimpan pada direktori utama proyek di:
`../Frontend/public/screenshots/`

*   **Landing Page**: [landing_page_top.png](../Frontend/public/screenshots/landing_page_top.png)
*   **Validasi Keamanan Sandi**: [register_validation.png](../Frontend/public/screenshots/register_validation.png)
*   **Dashboard Utama**: [dashboard_page.png](../Frontend/public/screenshots/dashboard_page.png)
*   **Editor Markdown (Edit)**: [editor_page.png](../Frontend/public/screenshots/editor_page.png)
*   **Pratinjau Markdown Live (Preview)**: [editor_preview.png](../Frontend/public/screenshots/editor_preview.png)
*   **Modal Fitur AI**: [ai_summary_modal.png](../Frontend/public/screenshots/ai_summary_modal.png)
*   **Pengaturan Mode Gelap**: [profile_dark_mode.png](../Frontend/public/screenshots/profile_dark_mode.png)
*   **Pengaturan Mode Terang**: [profile_light_mode.png](../Frontend/public/screenshots/profile_light_mode.png)
*   **Dashboard Mode Terang**: [dashboard_light_mode.png](../Frontend/public/screenshots/dashboard_light_mode.png)

