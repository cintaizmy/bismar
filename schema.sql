-- Jalankan file ini di phpMyAdmin atau via terminal MySQL
-- mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS bismar_education
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE bismar_education;

CREATE TABLE IF NOT EXISTS posts (
  id         INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  judul      VARCHAR(255)     NOT NULL,
  konten     LONGTEXT         NOT NULL,
  author     VARCHAR(100)     DEFAULT NULL,
  gambar     VARCHAR(255)     DEFAULT NULL COMMENT 'Nama file di folder uploads/',
  gambar_url VARCHAR(500)     DEFAULT NULL COMMENT 'URL eksternal gambar (prioritas lebih rendah dari gambar)',
  status     ENUM('published','draft') NOT NULL DEFAULT 'draft',
  created_at DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_status_created (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contoh data untuk testing
INSERT INTO posts (judul, konten, author, status, created_at) VALUES
(
  'Masa Depan Pembelajaran Digital di 2024',
  '<p>Bismar Education percaya bahwa integrasi teknologi dalam kelas bukan lagi pilihan. Artikel ini membahas bagaimana alat digital membentuk ulang lanskap pendidikan.</p><p>Dari tutoring berbasis AI hingga pelajaran sejarah immersif VR, batas kelas tradisional terus meluas.</p>',
  'Tim Bismar',
  'published',
  NOW()
),
(
  'Workshop Kewirausahaan SMK Batch 3 Resmi Dibuka',
  '<p>Program kewirausahaan Bismar Education untuk siswa SMK batch ketiga resmi dibuka. Program ini mencakup pelatihan bisnis, mentoring, dan kunjungan industri.</p>',
  'Tim Bismar',
  'published',
  DATE_SUB(NOW(), INTERVAL 7 DAY)
),
(
  'Sinkronisasi Kurikulum Bersama 12 SMK Mitra',
  '<p>Bismar Education berhasil menyelesaikan sinkronisasi kurikulum bersama 12 SMK mitra di Jawa dan Bali. Kurikulum baru ini diselaraskan dengan kebutuhan industri terkini.</p>',
  'Tim Bismar',
  'published',
  DATE_SUB(NOW(), INTERVAL 14 DAY)
);
