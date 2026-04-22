<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: berita.php');
    exit;
}

verifyCsrf();

require_once __DIR__ . '/../api/db-config.php';

$id = (int) ($_POST['id'] ?? 0);
if ($id) {
    $db   = getDB();
    $stmt = $db->prepare('SELECT gambar FROM posts WHERE id = ?');
    $stmt->execute([$id]);
    $post = $stmt->fetch();

    if ($post) {
        if ($post['gambar']) {
            @unlink(__DIR__ . '/../uploads/berita/' . $post['gambar']);
        }
        $db->prepare('DELETE FROM posts WHERE id = ?')->execute([$id]);
    }
}

header('Location: berita.php?del=1');
