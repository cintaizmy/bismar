-- Jalankan SETELAH schema.sql
-- mysql -u root bismar_education < schema-admin.sql

USE bismar_education;

CREATE TABLE IF NOT EXISTS admin_users (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  username      VARCHAR(60)   NOT NULL,
  password_hash VARCHAR(255)  NOT NULL COMMENT 'bcrypt via password_hash()',
  created_at    DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_username (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS gallery (
  id         INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  filename   VARCHAR(255)  NOT NULL COMMENT 'nama file di uploads/gallery/',
  caption    VARCHAR(255)  DEFAULT NULL,
  urutan     SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'urutan tampil, kecil = duluan',
  created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_urutan (urutan)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
