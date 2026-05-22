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

$id = isset($_GET['id']) ? trim($_GET['id']) : null;

// GET /api/get-programs.php?id=123 — satu program by ID
if ($id !== null) {
    if (!ctype_digit($id)) jsonError(400, 'ID tidak valid');

    $stmt = $db->prepare(
        'SELECT id, icon_name, title, description, popup_content, sort_order
         FROM programs
         WHERE id = ? AND is_active = 1
         LIMIT 1'
    );
    $stmt->execute([(int) $id]);
    $program = $stmt->fetch();

    if (!$program) jsonError(404, 'Program tidak ditemukan');

    echo json_encode($program);
    exit;
}

// GET /api/get-programs.php — semua program aktif
$stmt = $db->query(
    'SELECT id, icon_name, title, description, popup_content, sort_order
     FROM programs
     WHERE is_active = 1
     ORDER BY sort_order ASC, id ASC'
);
$programs = $stmt->fetchAll();

echo json_encode($programs);
exit;