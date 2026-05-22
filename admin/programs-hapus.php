<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
require_once __DIR__ . '/../api/db-config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: programs.php');
    exit;
}

verifyCsrf();

$db = getDB();
$id = isset($_POST['id']) ? (int) $_POST['id'] : 0;

if ($id) {
    $s = $db->prepare('DELETE FROM programs WHERE id = ?');
    $s->execute([$id]);
}

header('Location: programs.php?del=1');
exit;