<?php
/**
 * tinymce-upload.php
 * Handler upload gambar yang disisipkan langsung dari editor TinyMCE.
 * Letakkan file ini di: /bismar/admin/tinymce-upload.php
 *
 * TinyMCE mengirim file via POST (field name: "file")
 * dan mengharapkan response JSON: { "location": "<url gambar>" }
 */

require_once __DIR__ . '/includes/auth.php';
requireLogin();   // Hanya user yang login yang boleh upload

header('Content-Type: application/json');

// ── Konfigurasi ─────────────────────────────────────────────────────────────
$uploadDir  = __DIR__ . '/../uploads/berita/';   // path fisik
$maxSize    = 5 * 1024 * 1024;                   // 5 MB
$allowedMime = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

// ── Bangun base URL absolut ──────────────────────────────────────────────────
$scheme  = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host    = $_SERVER['HTTP_HOST'];                         // localhost:8888
$script  = dirname($_SERVER['SCRIPT_NAME']);              // /bismar/admin
$baseUrl = $scheme . '://' . $host . rtrim(dirname($script), '/'); // http://localhost:8888/bismar

// ── Validasi request ─────────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST' || empty($_FILES['file'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Bad request']);
    exit;
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(['error' => 'Upload error: ' . $file['error']]);
    exit;
}

if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo json_encode(['error' => 'File terlalu besar (maks 5MB)']);
    exit;
}

// Cek MIME type sungguhan (bukan hanya ekstensi)
$finfo    = new finfo(FILEINFO_MIME_TYPE);
$mimeType = $finfo->file($file['tmp_name']);

if (!in_array($mimeType, $allowedMime, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Tipe file tidak diizinkan: ' . $mimeType]);
    exit;
}

// ── Buat direktori jika belum ada ────────────────────────────────────────────
if (!is_dir($uploadDir) && !mkdir($uploadDir, 0755, true)) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal membuat direktori upload']);
    exit;
}

// ── Generate nama file unik ──────────────────────────────────────────────────
$ext      = match($mimeType) {
    'image/jpeg' => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif',
    default      => 'jpg',
};
$filename = 'tinymce_' . uniqid('', true) . '.' . $ext;
$destPath = $uploadDir . $filename;

// ── Pindah file ──────────────────────────────────────────────────────────────
if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Gagal menyimpan file']);
    exit;
}

// ── Response: URL absolut yang bisa ditampilkan TinyMCE ─────────────────────
$location = $baseUrl . '/uploads/berita/' . $filename;
echo json_encode(['location' => $location]);