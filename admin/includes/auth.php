<?php
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_samesite', 'Lax');
session_start();

/* ── Akses guard ─────────────────────────── */
function requireLogin(): void {
    if (empty($_SESSION['admin_id'])) {
        header('Location: ' . BASE_URL . 'admin/login.php');
        exit;
    }
    // Idle timeout 60 menit
    if (isset($_SESSION['last_active']) && time() - $_SESSION['last_active'] > 3600) {
        session_unset();
        session_destroy();
        header('Location: ' . BASE_URL . 'admin/login.php?timeout=1');
        exit;
    }
    $_SESSION['last_active'] = time();
}

/* ── CSRF ────────────────────────────────── */
function csrf(): string {
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function verifyCsrf(): void {
    if (!hash_equals($_SESSION['csrf'] ?? '', $_POST['csrf'] ?? '')) {
        http_response_code(403);
        exit('Request tidak valid.');
    }
}

/* ── Output escaping ─────────────────────── */
function h(mixed $s): string {
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
}

/* ── File upload ─────────────────────────── */
function uploadImage(array $file, string $dir): string {
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new RuntimeException('Upload gagal. Coba lagi.');
    }

    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime  = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    $allowed = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    if (!array_key_exists($mime, $allowed)) {
        throw new RuntimeException('Format tidak didukung. Gunakan JPG, PNG, atau WebP.');
    }
    if ($file['size'] > 5 * 1024 * 1024) {
        throw new RuntimeException('Ukuran file maksimal 5MB.');
    }

    $filename = bin2hex(random_bytes(10)) . '.' . $allowed[$mime];
    if (!move_uploaded_file($file['tmp_name'], $dir . $filename)) {
        throw new RuntimeException('Gagal menyimpan file.');
    }

    return $filename;
}

define('BASE_URL', '/bismar/');
