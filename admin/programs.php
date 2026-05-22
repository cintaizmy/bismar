<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
require_once __DIR__ . '/../api/db-config.php';

$db       = getDB();
$programs = $db->query(
    'SELECT id, icon_name, title, description, sort_order, is_active FROM programs ORDER BY sort_order ASC, id ASC'
)->fetchAll();

$pageTitle  = 'Programs';
$activePage = 'programs';
require_once 'includes/header.php';
?>

<!-- Lucide Icons CDN -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<?php if (isset($_GET['ok'])): ?>
<div class="alert alert-success">Program berhasil disimpan.</div>
<?php endif; ?>
<?php if (isset($_GET['del'])): ?>
<div class="alert alert-success">Program berhasil dihapus.</div>
<?php endif; ?>

<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
  <p style="color:var(--muted)"><?= count($programs) ?> program</p>
  <a href="programs-form.php" class="btn btn-primary">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/>
      <line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
    Tambah Program
  </a>
</div>

<div class="card" style="padding:0;overflow:hidden;">
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th style="width:48px">Icon</th>
          <th>Judul</th>
          <th>Deskripsi</th>
          <th style="width:80px">Urutan</th>
          <th style="width:90px">Status</th>
          <th style="width:130px"></th>
        </tr>
      </thead>
      <tbody>
        <?php foreach ($programs as $p): ?>
        <tr>
          <!-- Icon -->
          <td>
            <div class="table-img" style="display:flex;align-items:center;justify-content:center;">
              <i data-lucide="<?= htmlspecialchars($p['icon_name'], ENT_QUOTES, 'UTF-8') ?>"
                 style="width:20px;height:20px;color:#8B1A1A;"></i>
            </div>
          </td>

          <!-- Judul -->
          <td><strong><?= htmlspecialchars($p['title'], ENT_QUOTES, 'UTF-8') ?></strong></td>

          <!-- Deskripsi (potong jika terlalu panjang) -->
          <td style="color:var(--muted);max-width:280px;">
            <?= htmlspecialchars(mb_strimwidth($p['description'], 0, 80, '…'), ENT_QUOTES, 'UTF-8') ?>
          </td>

          <!-- Urutan -->
          <td style="text-align:center;color:var(--muted);">
            <?= (int) $p['sort_order'] ?>
          </td>

          <!-- Status aktif/nonaktif -->
          <td>
            <?php if ($p['is_active']): ?>
              <span class="badge badge-published">Aktif</span>
            <?php else: ?>
              <span class="badge badge-draft">Nonaktif</span>
            <?php endif; ?>
          </td>

          <!-- Aksi Edit & Hapus -->
          <td>
            <div class="table-actions">
              <a href="programs-form.php?id=<?= $p['id'] ?>" class="btn btn-secondary btn-sm">Edit</a>
              <form method="POST" action="programs-hapus.php"
                    onsubmit="return confirm('Hapus program ini?')">
                <input type="hidden" name="csrf" value="<?= htmlspecialchars(csrf(), ENT_QUOTES, 'UTF-8') ?>">
                <input type="hidden" name="id"   value="<?= $p['id'] ?>">
                <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
              </form>
            </div>
          </td>
        </tr>
        <?php endforeach; ?>

        <?php if (empty($programs)): ?>
        <tr>
          <td colspan="6" style="text-align:center;color:var(--muted);padding:32px;">
            Belum ada program.
          </td>
        </tr>
        <?php endif; ?>
      </tbody>
    </table>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
});
</script>

<?php require_once 'includes/footer.php'; ?>