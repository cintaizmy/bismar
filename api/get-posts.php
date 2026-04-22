<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once __DIR__ . '/db-config.php';

function jsonError(int $code, string $message): never {
    http_response_code($code);
    echo json_encode(['error' => $message]);
    exit;
}

try {
    $db = getDB();
} catch (PDOException $e) {
    jsonError(503, 'Database tidak dapat dijangkau');
}

$id     = isset($_GET['id'])     ? trim($_GET['id'])     : null;
$status = isset($_GET['status']) ? trim($_GET['status']) : null;

// GET /api/get-posts.php?id=123 — satu artikel
if ($id !== null) {
    if (!ctype_digit($id)) jsonError(400, 'ID tidak valid');

    $stmt = $db->prepare(
        'SELECT id, judul, konten, author, gambar, gambar_url, status, created_at
         FROM posts
         WHERE id = ? AND status = "published"
         LIMIT 1'
    );
    $stmt->execute([(int) $id]);
    $post = $stmt->fetch();

    if (!$post) jsonError(404, 'Artikel tidak ditemukan');

    echo json_encode($post);
    exit;
}

// GET /api/get-posts.php?status=published — semua artikel
if ($status !== null) {
    $allowed = ['published', 'draft'];
    if (!in_array($status, $allowed, true)) jsonError(400, 'Status tidak valid');

    $stmt = $db->prepare(
        'SELECT id, judul, konten, author, gambar, gambar_url, status, created_at
         FROM posts
         WHERE status = ?
         ORDER BY created_at DESC'
    );
    $stmt->execute([$status]);
    $posts = $stmt->fetchAll();

    echo json_encode($posts);
    exit;
}

jsonError(400, 'Parameter tidak dikenali. Gunakan ?id= atau ?status=');
