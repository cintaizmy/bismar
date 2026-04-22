<?php
/**
 * One-time setup: buat akun admin pertama.
 * Jalankan sekali di browser: http://localhost/bismar/admin/setup.php
 * HAPUS file ini setelah selesai!
 */
require_once __DIR__ . '/../api/db-config.php';

$username = 'admin';
$password = 'admin123'; // GANTI sebelum deploy ke server!

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
$db   = getDB();

$stmt = $db->prepare(
    'INSERT INTO admin_users (username, password_hash)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)'
);
$stmt->execute([$username, $hash]);
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Setup Admin</title>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 80px auto; padding: 24px; }
    .box { background: #f0fff4; border: 1px solid #9ae6b4; border-radius: 10px; padding: 24px; }
    code { background: #eee; padding: 2px 6px; border-radius: 4px; font-size: 15px; }
    .warn { color: #c53030; margin-top: 16px; font-weight: bold; }
  </style>
</head>
<body>
  <div class="box">
    <h2>✓ Admin berhasil dibuat</h2>
    <p><strong>Username:</strong> <code><?= htmlspecialchars($username) ?></code></p>
    <p><strong>Password:</strong> <code><?= htmlspecialchars($password) ?></code></p>
    <p class="warn">⚠ Hapus file ini sekarang lalu login di
      <a href="login.php">admin/login.php</a>
    </p>
  </div>
</body>
</html>
