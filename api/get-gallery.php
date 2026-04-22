<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db-config.php';

try {
    $db   = getDB();
    $stmt = $db->query(
        'SELECT id, filename, caption FROM gallery ORDER BY urutan ASC, id ASC'
    );
    $rows = $stmt->fetchAll();

    $items = array_map(fn($r) => [
        'id'      => (int) $r['id'],
        'url'     => 'uploads/gallery/' . $r['filename'],
        'caption' => $r['caption'] ?? '',
    ], $rows);

    echo json_encode($items);
} catch (PDOException) {
    echo json_encode([]);
}
