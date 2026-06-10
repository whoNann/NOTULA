# NOTULA — Aplikasi Catatan Cerdas Berbasis AI
### Proyek Tugas Besar Mata Kuliah Kapita Selekta — UAS Kelompok 2

---

**Notula** adalah aplikasi catatan web modern yang dirancang untuk mereduksi beban kognitif pengguna (*cognitive overload*) melalui antarmuka minimalis *Focus-First* dan dukungan integrasi kecerdasan buatan (*Artificial Intelligence*) untuk merangkum serta memperbaiki tata bahasa.

Repositori ini disusun secara terstruktur dengan konsep monorepo modular demi mempermudah kolaborasi dan penataan aset proyek UAS.

---

## 📂 Struktur Repositori

```
tubes-kapita-selekta-kelompok2/
├── UI_UX/                  # Aset & Dokumentasi Desain Antarmuka
│   ├── DESIGN.md           # Token desain warna & tipografi bawaan
│   └── UI_UX_DESIGN.md     # Panduan detail desain & micro-animations
│
├── Frontend/               # Kode Sumber Aplikasi Client (React + Vite)
│   ├── src/                # Komponen React & Halaman (Views)
│   ├── public/             # Aset statis & screenshots sistem
│   ├── package.json        # Dependensi pustaka npm
│   └── vite.config.js      # Konfigurasi Vite & Tailwind CSS v4
│
├── Backend/                # Rancangan Database & Alur Server
│   └── BACKEND_DATABASE.md # Skema LocalStorage & rencana migrasi REST API
│
├── Dokumentasi/            # Laporan & Berkas Hasil Pengujian
│   ├── LAPORAN.md          # Laporan utama UAS Implementasi Sistem (10 Bab)
│   ├── testing_report.md   # Laporan pengujian fungsionalitas & performa
│   ├── walkthrough.md      # Rekaman perubahan kode frontend
│   ├── implementation_plan.md # Rencana kerja pengembangan
│   └── task.md             # Daftar tugas checklist (Todo List)
│
└── README.md               # Hub utama repositori (Berkas ini)
```

---

## ⚙️ Cara Menjalankan Aplikasi Frontend

Ikuti langkah-langkah di bawah ini untuk menjalankan aplikasi Notula di komputer lokal Anda:

1.  **Masuk ke Direktori Frontend**:
    ```bash
    cd Frontend
    ```
2.  **Instalasi Dependensi** *(jika diperlukan/belum diinstal)*:
    ```bash
    npm install
    ```
3.  **Jalankan Server Pengembangan**:
    ```bash
    npm run dev
    ```
4.  **Buka di Browser**:
    Buka peramban dan akses alamat yang tertera di terminal (biasanya [http://localhost:5173/](http://localhost:5173/)).

---

## 🧪 Dokumentasi Utama & Laporan UAS

Seluruh berkas administrasi dan laporan proyek dapat diakses melalui folder **[Dokumentasi/](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Dokumentasi/)**:
*   **Laporan UAS Utama**: **[LAPORAN.md](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Dokumentasi/LAPORAN.md)** (Berisi pendahuluan, arsitektur data, alur data sistem, hasil pengujian, evaluasi kinerja, analisis performa, dan lampiran URL).
*   **Laporan Pengujian UI**: **[testing_report.md](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Dokumentasi/testing_report.md)** (Berisi hasil audit Lighthouse, SUS score, dan saran perbaikan).
*   **Panduan Desain**: **[UI_UX_DESIGN.md](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/UI_UX/UI_UX_DESIGN.md)** (Berisi token warna, tipografi Inter/JetBrains Mono, dan efek khusus).
*   **Panduan Data & DB**: **[BACKEND_DATABASE.md](file:///d:/TUGAS%20ITTP/SEMESTER%206/Kapita%20Selekta/UAS/tubes-kapita-selekta-kelompok2/Backend/BACKEND_DATABASE.md)** (Berisi skema penyimpanan JSON lokal & rencana migrasi database backend).

---

### 👥 Kelompok 2 — UAS Kapita Selekta
*   **Proyek**: Notula Note-Taking Application
*   **Teknologi**: React.js (v19), Vite (v8), Tailwind CSS (v4), LocalStorage API.
*   **Status**: Prototipe Fungsional (Lulus Pengujian Black-box).
