<?php
require_once __DIR__ . '/includes/auth.php';
requireLogin();
require_once __DIR__ . '/../api/db-config.php';

$db    = getDB();
$id    = isset($_GET['id']) ? (int) $_GET['id'] : 0;
$post  = null;
$error = '';

if ($id) {
    $s    = $db->prepare('SELECT * FROM posts WHERE id = ?');
    $s->execute([$id]);
    $post = $s->fetch();
    if (!$post) {
        header('Location: berita.php');
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    verifyCsrf();

    $judul  = trim($_POST['judul']  ?? '');
    $konten = trim($_POST['konten'] ?? '');
    $author = trim($_POST['author'] ?? 'Tim Bismar');
    $status = in_array($_POST['status'] ?? '', ['published', 'draft'])
              ? $_POST['status'] : 'draft';
    $gambar = $post['gambar'] ?? null;

    if (!$judul || !$konten) {
        $error = 'Judul dan konten wajib diisi.';
    } else {
        if (!empty($_FILES['gambar']['name'])) {
            try {
                $newFile = uploadImage($_FILES['gambar'], __DIR__ . '/../uploads/berita/');
                if ($gambar) @unlink(__DIR__ . '/../uploads/berita/' . $gambar);
                $gambar = $newFile;
            } catch (RuntimeException $e) {
                $error = $e->getMessage();
            }
        }

        if (!$error) {
            if ($id) {
                $s = $db->prepare(
                    'UPDATE posts SET judul=?,konten=?,author=?,gambar=?,status=?,updated_at=NOW() WHERE id=?'
                );
                $s->execute([$judul, $konten, $author, $gambar, $status, $id]);
            } else {
                $s = $db->prepare(
                    'INSERT INTO posts (judul,konten,author,gambar,status) VALUES (?,?,?,?,?)'
                );
                $s->execute([$judul, $konten, $author, $gambar, $status]);
            }
            header('Location: berita.php?ok=1');
            exit;
        }
    }
}

$pageTitle  = $id ? 'Edit Berita' : 'Tambah Berita';
$activePage = 'berita';
require_once 'includes/header.php';
?>

<div style="margin-bottom:20px;">
  <a href="berita.php" class="btn btn-secondary btn-sm">← Kembali</a>
</div>

<?php if ($error): ?>
<div class="alert alert-danger"><?= h($error) ?></div>
<?php endif; ?>

<div class="card">
  <form method="POST" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="<?= h(csrf()) ?>">

    <div class="form-row">
      <div class="form-group">
        <label for="judul">Judul *</label>
        <input type="text" id="judul" name="judul"
               value="<?= h($post['judul'] ?? '') ?>" required>
      </div>
      <div class="form-group">
        <label for="author">Penulis</label>
        <input type="text" id="author" name="author"
               value="<?= h($post['author'] ?? 'Tim Bismar') ?>">
      </div>
    </div>

    <div class="form-group">
      <label for="konten">Konten *</label>
      <textarea id="konten" name="konten" required><?= h($post['konten'] ?? '') ?></textarea>
      <p class="form-hint">HTML didukung — gunakan &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, &lt;b&gt;, &lt;a&gt;, dll.</p>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Gambar Artikel</label>
        <?php if (!empty($post['gambar'])): ?>
        <div class="img-preview">
          <img src="../uploads/berita/<?= h($post['gambar']) ?>" alt="Gambar saat ini">
          <p class="form-hint">Gambar saat ini. Upload baru untuk mengganti.</p>
        </div>
        <?php endif; ?>
        <input type="file" name="gambar" accept="image/jpeg,image/png,image/webp">
        <p class="form-hint">Maks 5MB · JPG, PNG, WebP</p>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" name="status">
          <option value="draft"     <?= ($post['status'] ?? 'draft') === 'draft'     ? 'selected' : '' ?>>Draft (tidak tampil di website)</option>
          <option value="published" <?= ($post['status'] ?? '')       === 'published' ? 'selected' : '' ?>>Published (tampil di website)</option>
        </select>
      </div>
    </div>

    <div class="form-actions">
      <a href="berita.php" class="btn btn-secondary">Batal</a>
      <button type="submit" class="btn btn-primary">
        <?= $id ? 'Simpan Perubahan' : 'Tambah Berita' ?>
      </button>
    </div>
  </form>
</div>

<?php require_once 'includes/footer.php'; ?>
