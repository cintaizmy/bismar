<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
require_once __DIR__ . '/../api/db-config.php';

$db = getDB();

$totalPosts   = $db->query('SELECT COUNT(*) FROM posts WHERE status = "published"')->fetchColumn();
$totalDraft   = $db->query('SELECT COUNT(*) FROM posts WHERE status = "draft"')->fetchColumn();
$totalGaleri  = $db->query('SELECT COUNT(*) FROM gallery')->fetchColumn();
$recentPosts  = $db->query(
    'SELECT id, judul, status, created_at FROM posts ORDER BY created_at DESC LIMIT 5'
)->fetchAll();

$pageTitle  = 'Dashboard';
$activePage = 'dashboard';
require_once 'includes/header.php';
?>

<div class="stats-grid">
  <div class="stat-card">
    <p class="stat-label">Berita Published</p>
    <p class="stat-value"><?= $totalPosts ?></p>
  </div>
  <div class="stat-card">
    <p class="stat-label">Draft</p>
    <p class="stat-value"><?= $totalDraft ?></p>
  </div>
  <div class="stat-card">
    <p class="stat-label">Foto Galeri</p>
    <p class="stat-value"><?= $totalGaleri ?></p>
  </div>
</div>

<div class="card">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
    <p class="card-title" style="margin:0">Berita Terbaru</p>
    <a href="berita.php" class="btn btn-secondary btn-sm">Lihat Semua</a>
  </div>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Judul</th>
          <th>Status</th>
          <th>Tanggal</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($recentPosts as $p): ?>
        <tr>
          <td><?= h($p['judul']) ?></td>
          <td><span class="badge badge-<?= h($p['status']) ?>"><?= h($p['status']) ?></span></td>
          <td style="color:var(--muted)"><?= date('d M Y', strtotime($p['created_at'])) ?></td>
          <td><a href="berita-form.php?id=<?= $p['id'] ?>" class="btn btn-secondary btn-sm">Edit</a></td>
        </tr>
        <?php endforeach; ?>
        <?php if (empty($recentPosts)): ?>
        <tr><td colspan="4" style="color:var(--muted);text-align:center;padding:24px;">Belum ada berita.</td></tr>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<div style="display:flex;gap:12px;flex-wrap:wrap;">
  <a href="berita-form.php" class="btn btn-primary">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Tambah Berita
  </a>
  <a href="galeri.php" class="btn btn-secondary">Kelola Galeri</a>
  <a href="../index.html" target="_blank" class="btn btn-secondary">Lihat Website ↗</a>
</div>

<?php require_once 'includes/footer.php'; ?>
