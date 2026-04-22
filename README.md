# Bismar Education

Website profil perusahaan untuk **Bismar Education** — penyedia program pendidikan, pelatihan, dan kemitraan SMK di Indonesia.

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- PHP 8+ dengan PDO untuk API berita
- MySQL (via XAMPP)

## Cara Menjalankan Lokal

1. Pastikan **XAMPP** sudah terinstall dan Apache + MySQL aktif
2. Clone atau salin folder ini ke `C:\xampp\htdocs\bismar`
3. Setup database:
   ```
   mysql -u root < schema.sql
   ```
   Atau buka `http://localhost/phpmyadmin` → Import → pilih `schema.sql`
4. Setup konfigurasi database:
   ```
   cp api/db-config.example.php api/db-config.php
   ```
   Edit `api/db-config.php` jika username/password MySQL berbeda dari default
5. Buka browser dan akses `http://localhost/bismar`

## Struktur Folder

```
bismar/
├── index.html                  # Halaman utama
├── newsdetail.html             # Halaman detail berita
├── 404.html                    # Halaman error 404
├── 500.html                    # Halaman error 500
├── schema.sql                  # Skema + data contoh database
├── .htaccess                   # Konfigurasi Apache
├── api/
│   ├── db-config.php           # Kredensial DB (tidak di-commit)
│   ├── db-config.example.php   # Template konfigurasi DB
│   └── get-posts.php           # API endpoint berita
├── uploads/                    # Upload gambar artikel
└── assets/
    ├── css/
    │   ├── style.css           # Style halaman utama
    │   └── newsdetail.css      # Style halaman berita
    ├── img/                    # Gambar & favicon
    ├── js/
    │   ├── main.js             # Script halaman utama
    │   └── newsdetail.js       # Script halaman berita
    └── files/                  # File download (katalog PDF, dll)
```

## API Endpoints

| Method | URL | Keterangan |
|--------|-----|------------|
| GET | `api/get-posts.php?id={id}` | Ambil satu artikel by ID |
| GET | `api/get-posts.php?status=published` | Ambil semua artikel published |

## Konfigurasi yang Perlu Diisi

Cari dan ganti nilai berikut sebelum deploy:

| Placeholder | File | Keterangan |
|---|---|---|
| `6281234567890` | `index.html` | Nomor WhatsApp Bismar |
| `bismar-education` | `index.html` | Username LinkedIn |
| `bismareducation` | `index.html` | Username Facebook |
| `katalog-bismar.pdf` | `assets/files/` | File katalog untuk diunduh |

## Deploy ke Hosting

Jika deploy ke hosting bukan di root domain (misal `domain.com/bismar`):
- Sesuaikan path di `.htaccess` baris `ErrorDocument`
- Pastikan PHP 8+ dan ekstensi `pdo_mysql` aktif di hosting
