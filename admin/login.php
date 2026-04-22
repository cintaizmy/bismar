<?php
ini_set('session.cookie_httponly', '1');
ini_set('session.cookie_samesite', 'Lax');
session_start();

define('BASE_URL', '/bismar/');

// Sudah login → ke dashboard
if (!empty($_SESSION['admin_id'])) {
    header('Location: ' . BASE_URL . 'admin/dashboard.php');
    exit;
}

require_once __DIR__ . '/../api/db-config.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';

    // Rate limit: max 5 percobaan per 15 menit
    $attempts  = $_SESSION['login_attempts'] ?? 0;
    $blockUntil = $_SESSION['login_block_until'] ?? 0;

    if (time() < $blockUntil) {
        $wait = ceil(($blockUntil - time()) / 60);
        $error = "Terlalu banyak percobaan. Coba lagi dalam {$wait} menit.";
    } elseif (!$username || !$password) {
        $error = 'Username dan password wajib diisi.';
    } else {
        $db   = getDB();
        $stmt = $db->prepare('SELECT id, username, password_hash FROM admin_users WHERE username = ? LIMIT 1');
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['admin_id']       = $user['id'];
            $_SESSION['admin_username'] = $user['username'];
            $_SESSION['last_active']    = time();
            unset($_SESSION['login_attempts'], $_SESSION['login_block_until']);
            header('Location: ' . BASE_URL . 'admin/dashboard.php');
            exit;
        } else {
            $_SESSION['login_attempts'] = $attempts + 1;
            if ($_SESSION['login_attempts'] >= 5) {
                $_SESSION['login_block_until'] = time() + 900;
                $error = 'Terlalu banyak percobaan. Akses diblokir 15 menit.';
            } else {
                $error = 'Username atau password salah.';
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login | Bismar Admin</title>
  <link rel="icon" type="image/svg+xml" href="../assets/img/favicon.svg">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/admin.css">
</head>
<body class="login-body">
  <div class="login-wrap">
    <div class="login-card">
      <div class="login-header">
        <img src="../assets/img/logo.png" alt="Bismar Education">
        <h1>Admin Panel</h1>
        <p>Masuk untuk mengelola konten website</p>
      </div>

      <?php if ($error): ?>
      <div class="alert alert-danger"><?= htmlspecialchars($error) ?></div>
      <?php endif; ?>

      <?php if (isset($_GET['timeout'])): ?>
      <div class="alert alert-danger">Sesi habis. Silakan login kembali.</div>
      <?php endif; ?>

      <form method="POST" novalidate>
        <div class="form-group">
          <label for="username">Username</label>
          <input type="text" id="username" name="username"
                 value="<?= htmlspecialchars($_POST['username'] ?? '') ?>"
                 autocomplete="username" required autofocus>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" id="password" name="password" autocomplete="current-password" required>
        </div>
        <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;padding:12px;">
          Masuk
        </button>
      </form>
    </div>
  </div>
</body>
</html>
