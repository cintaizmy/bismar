# Bismar Education

Website profil perusahaan untuk **Bismar Education** — penyedia program pendidikan, pelatihan, dan kemitraan SMK di Indonesia.

## Tech Stack

- HTML5 / CSS3 / Vanilla JavaScript
- Tidak ada framework atau build tool
- Backend API opsional via PHP (`get-posts.php`) untuk halaman berita

## Cara Menjalankan Lokal

1. Pastikan **XAMPP** sudah terinstall dan Apache aktif
2. Clone atau salin folder ini ke `C:\xampp\htdocs\bismar`
3. Buka browser dan akses `http://localhost/bismar`

## Struktur Folder

```
bismar/
├── index.html          # Halaman utama
├── newsdetail.html     # Halaman detail berita
├── 404.html            # Halaman error 404
├── 500.html            # Halaman error 500
├── .htaccess           # Konfigurasi Apache
└── assets/
    ├── css/
    │   ├── style.css         # Style halaman utama
    │   └── newsdetail.css    # Style halaman berita
    ├── img/                  # Gambar & favicon
    ├── js/
    │   ├── main.js           # Script halaman utama
    │   └── newsdetail.js     # Script halaman berita
    └── files/                # File download (katalog PDF, dll)
```

## Konfigurasi yang Perlu Diisi

Cari dan ganti nilai berikut di file HTML/JS sebelum deploy:

| Placeholder | File | Keterangan |
|---|---|---|
| `6281234567890` | `index.html` | Nomor WhatsApp Bismar |
| `bismar-education` | `index.html` | Username LinkedIn |
| `bismareducation` | `index.html` | Username Facebook |
| `katalog-bismar.pdf` | `assets/files/` | File katalog untuk diunduh |
| `localhost:8888` | `newsdetail.js` | URL API backend berita |

## Deploy ke Hosting

Jika deploy ke hosting bukan di root domain (misal `domain.com/bismar`):
- Sesuaikan path di `.htaccess` baris `ErrorDocument`
- Sesuaikan URL API di `assets/js/newsdetail.js`
