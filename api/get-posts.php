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

function toSlug(string $str): string {
    $str = mb_strtolower(trim($str), 'UTF-8');
    $str = preg_replace('/[^a-z0-9\s-]/', '', $str);
    $str = preg_replace('/\s+/', '-', $str);
    return preg_replace('/-+/', '-', $str);
}

try {
    $db = getDB();
} catch (PDOException $e) {
    jsonError(503, 'Database tidak dapat dijangkau');
}

$id     = isset($_GET['id'])     ? trim($_GET['id'])     : null;
$slug   = isset($_GET['slug'])   ? trim($_GET['slug'])   : null;
$status = isset($_GET['status']) ? trim($_GET['status']) : null;

// ── GET single artikel by ID ──────────────────────────────────────────────
if ($id !== null) {
    if (!ctype_digit($id)) jsonError(400, 'ID tidak valid');

    $stmt = $db->prepare(
        'SELECT id, judul, slug, konten, author, gambar, gambar_url, status, created_at
         FROM posts
         WHERE id = ? AND status = "published"
         LIMIT 1'
    );
    $stmt->execute([(int) $id]);
    $post = $stmt->fetch();

    if (!$post) jsonError(404, 'Artikel tidak ditemukan');

    // Auto-generate slug jika kolom kosong (migrasi data lama)
    if (empty($post['slug'])) {
        $post['slug'] = toSlug($post['judul']);
        $db->prepare('UPDATE posts SET slug = ? WHERE id = ?')
           ->execute([$post['slug'], $post['id']]);
    }

    echo json_encode($post);
    exit;
}

// ── GET single artikel by slug ────────────────────────────────────────────
if ($slug !== null) {
    // Slug hanya boleh huruf kecil, angka, dan strip
    if (!preg_match('/^[a-z0-9-]+$/', $slug)) jsonError(400, 'Slug tidak valid');

    $stmt = $db->prepare(
        'SELECT id, judul, slug, konten, author, gambar, gambar_url, status, created_at
         FROM posts
         WHERE slug = ? AND status = "published"
         LIMIT 1'
    );
    $stmt->execute([$slug]);
    $post = $stmt->fetch();

    if (!$post) jsonError(404, 'Artikel tidak ditemukan');

    echo json_encode($post);
    exit;
}

// ── GET list artikel by status (dengan pagination) ────────────────────────
if ($status !== null) {
    $allowed = ['published', 'draft'];
    if (!in_array($status, $allowed, true)) jsonError(400, 'Status tidak valid');

    $limit  = isset($_GET['limit'])  ? (int) $_GET['limit']  : 0;
    $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;
    if ($limit  < 0) $limit  = 0;
    if ($offset < 0) $offset = 0;

    $countStmt = $db->prepare('SELECT COUNT(*) FROM posts WHERE status = ?');
    $countStmt->execute([$status]);
    $total = (int) $countStmt->fetchColumn();

    if ($limit > 0) {
        $stmt = $db->prepare(
            'SELECT id, judul, slug, konten, author, gambar, gambar_url, status, created_at
             FROM posts
             WHERE status = ?
             ORDER BY created_at DESC
             LIMIT ? OFFSET ?'
        );
        $stmt->execute([$status, $limit, $offset]);
    } else {
        $stmt = $db->prepare(
            'SELECT id, judul, slug, konten, author, gambar, gambar_url, status, created_at
             FROM posts
             WHERE status = ?
             ORDER BY created_at DESC'
        );
        $stmt->execute([$status]);
    }

    $posts = $stmt->fetchAll();

    // Auto-generate slug untuk post yang belum punya (migrasi data lama)
    foreach ($posts as &$post) {
        if (empty($post['slug'])) {
            $post['slug'] = toSlug($post['judul']);
            $db->prepare('UPDATE posts SET slug = ? WHERE id = ?')
               ->execute([$post['slug'], $post['id']]);
        }
    }
    unset($post);

    if ($limit > 0) {
        echo json_encode([
            'data'    => $posts,
            'total'   => $total,
            'limit'   => $limit,
            'offset'  => $offset,
            'hasMore' => ($offset + $limit) < $total,
        ]);
    } else {
        echo json_encode($posts);
    }
    exit;
}

jsonError(400, 'Parameter tidak dikenali. Gunakan ?id=, ?slug=, atau ?status=');