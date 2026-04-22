<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
require_once __DIR__ . '/../api/db-config.php';

$db    = getDB();
$error = '';

// Upload baru
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'upload') {
    verifyCsrf();

    $files   = $_FILES['images'] ?? [];
    $caption = trim($_POST['caption'] ?? '');
    $urutan  = (int) ($db->query('SELECT COALESCE(MAX(urutan),0)+1 FROM gallery')->fetchColumn());
    $success = 0;

    if (!empty($files['name'][0])) {
        foreach ($files['name'] as $i => $name) {
            if ($files['error'][$i] !== UPLOAD_ERR_OK) continue;
            $singleFile = [
                'name'     => $files['name'][$i],
                'type'     => $files['type'][$i],
                'tmp_name' => $files['tmp_name'][$i],
                'error'    => $files['error'][$i],
                'size'     => $files['size'][$i],
            ];
            try {
                $filename = uploadImage($singleFile, __DIR__ . '/../uploads/gallery/');
                $db->prepare('INSERT INTO gallery (filename, caption, urutan) VALUES (?,?,?)')
                   ->execute([$filename, $caption ?: null, $urutan++]);
                $success++;
            } catch (RuntimeException $e) {
                $error = $e->getMessage();
                break;
            }
        }
    }

    if (!$error) {
        header('Location: galeri.php?ok=' . $success);
        exit;
    }
}

$photos = $db->query('SELECT * FROM gallery ORDER BY urutan ASC, id ASC')->fetchAll();

$pageTitle  = 'Galeri';
$activePage = 'galeri';
require_once 'includes/header.php';
?>

<?php if (isset($_GET['ok'])): ?>
<div class="alert alert-success"><?= (int)$_GET['ok'] ?> foto berhasil diupload.</div>
<?php endif; ?>
<?php if (isset($_GET['del'])): ?>
<div class="alert alert-success">Foto berhasil dihapus.</div>
<?php endif; ?>
<?php if ($error): ?>
<div class="alert alert-danger"><?= h($error) ?></div>
<?php endif; ?>

<!-- Upload form -->
<div class="card">
  <p class="card-title">Upload Foto Baru</p>
  <form method="POST" enctype="multipart/form-data">
    <input type="hidden" name="csrf"   value="<?= h(csrf()) ?>">
    <input type="hidden" name="action" value="upload">
    <div class="form-row">
      <div class="form-group">
        <label>Pilih Foto (bisa lebih dari satu)</label>
        <input type="file" name="images[]" accept="image/jpeg,image/png,image/webp" multiple required>
        <p class="form-hint">Maks 5MB per foto · JPG, PNG, WebP</p>
      </div>
      <div class="form-group">
        <label>Keterangan (opsional, berlaku untuk semua foto yang diupload)</label>
        <input type="text" name="caption" placeholder="Contoh: Workshop 2024">
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Upload</button>
  </form>
</div>

<!-- Gallery grid -->
<div class="card">
  <p class="card-title">Foto Saat Ini (<?= count($photos) ?>)</p>

  <?php if (empty($photos)): ?>
  <div class="gallery-empty">
    <p>Belum ada foto. Upload foto di atas untuk mulai.</p>
  </div>
  <?php else: ?>
  <div class="gallery-grid-admin">
    <?php foreach ($photos as $photo): ?>
    <div>
      <div class="gallery-item-admin">
        <img src="../uploads/gallery/<?= h($photo['filename']) ?>"
             alt="<?= h($photo['caption'] ?? '') ?>"
             loading="lazy">
        <div class="gallery-item-overlay">
          <form method="POST" action="galeri-hapus.php"
                onsubmit="return confirm('Hapus foto ini?')">
            <input type="hidden" name="csrf" value="<?= h(csrf()) ?>">
            <input type="hidden" name="id"   value="<?= $photo['id'] ?>">
            <button type="submit" class="btn btn-danger btn-sm">Hapus</button>
          </form>
        </div>
      </div>
      <?php if ($photo['caption']): ?>
      <p class="gallery-caption"><?= h($photo['caption']) ?></p>
      <?php endif; ?>
    </div>
    <?php endforeach; ?>
  </div>
  <?php endif; ?>
</div>

<?php require_once 'includes/footer.php'; ?>
