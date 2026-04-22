<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: galeri.php');
    exit;
}

verifyCsrf();

require_once __DIR__ . '/../api/db-config.php';

$id = (int) ($_POST['id'] ?? 0);
if ($id) {
    $db   = getDB();
    $stmt = $db->prepare('SELECT filename FROM gallery WHERE id = ?');
    $stmt->execute([$id]);
    $row  = $stmt->fetch();

    if ($row) {
        @unlink(__DIR__ . '/../uploads/gallery/' . $row['filename']);
        $db->prepare('DELETE FROM gallery WHERE id = ?')->execute([$id]);
    }
}

header('Location: galeri.php?del=1');
