<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
require_once __DIR__ . '/../api/db-config.php';

$db    = getDB();
$posts = $db->query(
    'SELECT id, judul, author, status, created_at, gambar FROM posts ORDER BY created_at DESC'
)->fetchAll();

$pageTitle  = 'Berita';
$activePage = 'berita';
require_once 'includes/header.php';
?>

<?php if (isset($_GET['ok'])): ?>
<div class="alert alert-success">Berita berhasil disimpan.</div>
<?php endif; ?>
<?php if (isset($_GET['del'])): ?>
<div class="alert alert-success">Berita berhasil dihapus.</div>
<?php endif; ?>

<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
  <p style="color:var(--muted)"><?= count($posts) ?> artikel</p>
  <a href="berita-form.php" class="btn btn-primary">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
    Tambah Berita
  </a>
</div>

<div class="card" style="padding:0;overflow:hidden;">
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:48px"></th>
          <th>Judul</th>
          <th>Penulis</th>
          <th>Status</th>
          <th>Tanggal</th>
          <th style="width:130px"></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($posts as $p): ?>
        <tr>
          <td>
            <?php if ($p['gambar'] ?? null): ?>
            <img src="../uploads/berita/<?= h($p['gambar']) ?>" class="table-img" alt="">
            <?php else: ?>
            <div class="table-img" style="display:flex;align-items:center;justify-content:center;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            </div>
            <?php endif; ?>
          </td>
          <td><strong><?= h($p['judul']) ?></strong></td>
          <td style="color:var(--muted)"><?= h($p['author'] ?? '-') ?></td>
          <td><span class="badge badge-<?= h($p['status']) ?>"><?= h($p['status']) ?></span></td>
          <td style="color:var(--muted);white-space:nowrap"><?= date('d M Y', strtotime($p['created_at'])) ?></td>
          <td>
            <div class="table-actions">
              <a href="berita-form.php?id=<?= $p['id'] ?>" class="btn btn-secondary btn-sm">Edit</a>
              <form method="POST" action="berita-hapus.php" onsubmit="return confirm('Hapus berita ini?')">
                <input type="hidden" name="csrf" value="<?= h(csrf()) ?>">
                <input type="hidden" name="id"   value="<?= $p['id'] ?>">
                <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
              </form>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>
        <?php if (empty($posts)): ?>
        <tr><td colspan="6" style="text-align:center;color:var(--muted);padding:32px;">Belum ada berita.</td></tr>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<?php require_once 'includes/footer.php'; ?>
