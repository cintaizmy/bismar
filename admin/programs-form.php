<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
require_once __DIR__ . '/../api/db-config.php';

$db     = getDB();
$id     = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$row    = null;
$error  = '';

// Daftar icon Lucide yang tersedia untuk dipilih
$iconOptions = [
    'store'            => 'Store (Perdagangan)',
    'briefcase'        => 'Briefcase (Usaha)',
    'user-plus'        => 'User Plus (Recruitment)',
    'users'            => 'Users (Workshop)',
    'refresh-cw'       => 'Refresh (Sinkronisasi)',
    'award'            => 'Award (Sertifikasi)',
    'book-open'        => 'Book Open (Kurikulum)',
    'graduation-cap'   => 'Graduation Cap (Pendidikan)',
    'handshake'        => 'Handshake (Kemitraan)',
    'bar-chart-2'      => 'Bar Chart (Statistik)',
    'settings'         => 'Settings (Pengaturan)',
    'clipboard-list'   => 'Clipboard (Program)',
    'layers'           => 'Layers (Modul)',
    'target'           => 'Target (Tujuan)',
    'trending-up'      => 'Trending Up (Pertumbuhan)',
    'zap'              => 'Zap (Intensif)',
];

// ── Ambil data jika mode edit ─────────────────────────────────────────────
if ($id) {
    $s   = $db->prepare('SELECT * FROM programs WHERE id = ?');
    $s->execute([$id]);
    $row = $s->fetch();
    if (!$row) {
        header('Location: programs.php');
        exit;
    }
}

// ── Proses form submit ────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verifyCsrf();

    $icon_name     = trim($_POST['icon_name']     ?? '');
    $title         = trim($_POST['title']         ?? '');
    $description   = trim($_POST['description']   ?? '');
    $popup_content = trim($_POST['popup_content'] ?? '');
    $sort_order    = (int) ($_POST['sort_order']  ?? 0);
    $is_active     = isset($_POST['is_active']) ? 1 : 0;

    // Validasi
    if (!$title || !$description || !$icon_name) {
        $error = 'Icon, judul, dan deskripsi wajib diisi.';
    } elseif (!array_key_exists($icon_name, $iconOptions)) {
        $error = 'Icon tidak valid.';
    } else {
        if ($id) {
            $s = $db->prepare(
                'UPDATE programs
                    SET icon_name=?, title=?, description=?, popup_content=?,
                        sort_order=?, is_active=?, updated_at=NOW()
                  WHERE id=?'
            );
            $s->execute([$icon_name, $title, $description, $popup_content, $sort_order, $is_active, $id]);
        } else {
            $s = $db->prepare(
                'INSERT INTO programs (icon_name, title, description, popup_content, sort_order, is_active)
                 VALUES (?, ?, ?, ?, ?, ?)'
            );
            $s->execute([$icon_name, $title, $description, $popup_content, $sort_order, $is_active]);
        }
        header('Location: programs.php?ok=1');
        exit;
    }
}

$pageTitle  = $id ? 'Edit Program' : 'Tambah Program';
$activePage = 'programs';
require_once 'includes/header.php';
?>

<!-- Lucide Icons CDN -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>

<div style="margin-bottom:20px;">
  <a href="programs.php" class="btn btn-secondary btn-sm">← Kembali</a>
</div>

<?php if ($error): ?>
<div class="alert alert-danger"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
<?php endif; ?>

<div class="card">
  <form method="POST">
    <input type="hidden" name="csrf" value="<?= htmlspecialchars(csrf(), ENT_QUOTES, 'UTF-8') ?>">

    <!-- Baris 1: Icon & Judul -->
    <div class="form-row">

      <div class="form-group">
        <label for="icon_name">Icon *</label>
        <select id="icon_name" name="icon_name" required onchange="previewIcon(this.value)">
          <option value="">-- Pilih Icon --</option>
          <?php foreach ($iconOptions as $value => $label): ?>
            <option value="<?= htmlspecialchars($value, ENT_QUOTES, 'UTF-8') ?>"
              <?= ($row['icon_name'] ?? '') === $value ? 'selected' : '' ?>>
              <?= htmlspecialchars($label, ENT_QUOTES, 'UTF-8') ?>
            </option>
          <?php endforeach; ?>
        </select>

        <!-- Preview icon yang dipilih -->
        <div id="icon-preview" style="margin-top:10px; display:flex; align-items:center; gap:8px;">
          <?php if (!empty($row['icon_name'])): ?>
            <i data-lucide="<?= htmlspecialchars($row['icon_name'], ENT_QUOTES, 'UTF-8') ?>"
               style="width:28px;height:28px;color:#8B1A1A;"></i>
            <span style="font-size:13px;color:#666;">
              Preview: <?= htmlspecialchars($row['icon_name'], ENT_QUOTES, 'UTF-8') ?>
            </span>
          <?php else: ?>
            <span style="font-size:13px;color:#aaa;">Pilih icon untuk melihat preview</span>
          <?php endif; ?>
        </div>
        <p class="form-hint">Icon dari <a href="https://lucide.dev/icons/" target="_blank">Lucide Icons</a></p>
      </div>

      <div class="form-group">
        <label for="sort_order">Urutan Tampil</label>
        <input type="number" id="sort_order" name="sort_order" min="0"
               value="<?= (int) ($row['sort_order'] ?? 0) ?>">
        <p class="form-hint">Angka lebih kecil tampil lebih dulu (0, 1, 2, …)</p>
      </div>

    </div>

    <!-- Judul -->
    <div class="form-group">
      <label for="title">Judul Program *</label>
      <input type="text" id="title" name="title" required maxlength="150"
             placeholder="cth: SMK PK Partner Perdagangan"
             value="<?= htmlspecialchars($row['title'] ?? '', ENT_QUOTES, 'UTF-8') ?>">
    </div>

    <!-- Deskripsi singkat (yang tampil di card) -->
    <div class="form-group">
      <label for="description">Deskripsi Singkat * <small>(tampil di kartu)</small></label>
      <textarea id="description" name="description" rows="3" required maxlength="300"
                placeholder="Deskripsi singkat yang tampil di kartu program…"><?= htmlspecialchars($row['description'] ?? '', ENT_QUOTES, 'UTF-8') ?></textarea>
      <p class="form-hint">Maks 300 karakter. Ini yang tampil langsung di kartu.</p>
    </div>

    <!-- Konten popup (detail lengkap) -->
    <div class="form-group">
      <label for="popup_content">Konten Detail <small>(tampil di popup saat kartu diklik)</small></label>
      <textarea id="popup_content" name="popup_content" rows="6"
                placeholder="Penjelasan lengkap program, syarat, manfaat, dll…"><?= htmlspecialchars($row['popup_content'] ?? '', ENT_QUOTES, 'UTF-8') ?></textarea>
      <p class="form-hint">Bisa dikosongkan jika belum ada detail popup.</p>
    </div>

    <!-- Status aktif -->
    <div class="form-group">
      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;">
        <input type="checkbox" name="is_active" value="1"
               <?= ($row['is_active'] ?? 1) ? 'checked' : '' ?>
               style="width:18px;height:18px;">
        <span>Aktif (tampil di website)</span>
      </label>
      <p class="form-hint">Nonaktifkan untuk menyembunyikan kartu tanpa menghapusnya.</p>
    </div>

    <!-- Tombol aksi -->
    <div class="form-actions">
      <a href="programs.php" class="btn btn-secondary">Batal</a>
      <button type="submit" class="btn btn-primary">
        <?= $id ? 'Simpan Perubahan' : 'Tambah Program' ?>
      </button>
    </div>

  </form>
</div>

<script>
// ── Inisialisasi Lucide Icons ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();
});

// ── Preview icon saat dropdown berubah ───────────────────────────────────
function previewIcon(iconName) {
    const previewEl = document.getElementById('icon-preview');
    if (!iconName) {
        previewEl.innerHTML = '<span style="font-size:13px;color:#aaa;">Pilih icon untuk melihat preview</span>';
        return;
    }
    previewEl.innerHTML = `
        <i data-lucide="${iconName}" style="width:28px;height:28px;color:#8B1A1A;"></i>
        <span style="font-size:13px;color:#666;">Preview: ${iconName}</span>
    `;
    lucide.createIcons(); // render icon baru
}
</script>

<?php require_once 'includes/footer.php'; ?>