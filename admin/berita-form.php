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
    $konten = trim($_POST['konten'] ?? '');   // TinyMCE akan submit HTML ke sini
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

// ── Helper: bangun URL absolut untuk gambar ─────────────────────────────────
// Deteksi base URL otomatis → misal http://localhost:8888/bismar
function imageUrl(string $filename, string $subfolder = 'berita'): string {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host   = $_SERVER['HTTP_HOST'];                       // localhost:8888
    $script = dirname($_SERVER['SCRIPT_NAME']);            // /bismar/admin
    // Naik satu level dari /admin → /bismar
    $base   = rtrim(dirname($script), '/');                // /bismar
    return $scheme . '://' . $host . $base . '/uploads/' . $subfolder . '/' . $filename;
}

// URL root project untuk TinyMCE image upload handler
$scheme    = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
$host      = $_SERVER['HTTP_HOST'];
$scriptDir = dirname($_SERVER['SCRIPT_NAME']);             // /bismar/admin
$baseUrl   = $scheme . '://' . $host . rtrim(dirname($scriptDir), '/'); // http://localhost:8888/bismar
$uploadHandlerUrl = $baseUrl . '/admin/tinymce-upload.php';

$pageTitle  = $id ? 'Edit Berita' : 'Tambah Berita';
$activePage = 'berita';
require_once 'includes/header.php';
?>

<!-- TinyMCE via CDN (gratis, no API key untuk self-hosted) -->
<script src="https://cdn.jsdelivr.net/npm/tinymce@7/tinymce.min.js"></script>
<script>
tinymce.init({
    selector: '#konten',
    language: 'id',           // Bahasa Indonesia (opsional, perlu file lang)
    height: 480,
    menubar: true,
    plugins: [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
        'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
        'fullscreen', 'insertdatetime', 'media', 'table', 'wordcount'
    ],
    toolbar:
        'undo redo | formatselect | bold italic underline strikethrough | ' +
        'forecolor backcolor | alignleft aligncenter alignright alignjustify | ' +
        'bullist numlist outdent indent | link image media table | ' +
        'removeformat code fullscreen',

    // ── Upload gambar langsung dari editor ──────────────────────────────────
    images_upload_url: '<?= htmlspecialchars($uploadHandlerUrl) ?>',
    images_upload_credentials: true,
    automatic_uploads: true,
    images_reuse_filename: false,   // pakai nama unik agar tidak konflik

    // Konversi path relatif → absolut saat simpan (opsional tapi disarankan)
    convert_urls: false,

    // Izinkan semua tag HTML (sesuaikan jika perlu sanitasi di server)
    valid_elements: '*[*]',

    setup: function(editor) {
        // Pastikan textarea terupdate sebelum form di-submit
        editor.on('change', function() {
            editor.save();
        });
    }
});
</script>

<div style="margin-bottom:20px;">
  <a href="berita.php" class="btn btn-secondary btn-sm">← Kembali</a>
</div>

<?php if ($error): ?>
<div class="alert alert-danger"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></div>
<?php endif; ?>

<div class="card">
  <form method="POST" enctype="multipart/form-data"
        onsubmit="tinymce.triggerSave()">
    <!-- triggerSave() paksa TinyMCE tulis konten ke textarea sebelum submit -->

    <input type="hidden" name="csrf" value="<?= htmlspecialchars(csrf(), ENT_QUOTES, 'UTF-8') ?>">

    <div class="form-row">
      <div class="form-group">
        <label for="judul">Judul *</label>
        <input type="text" id="judul" name="judul"
               value="<?= htmlspecialchars($post['judul'] ?? '', ENT_QUOTES, 'UTF-8') ?>" required>
      </div>
      <div class="form-group">
        <label for="author">Penulis</label>
        <input type="text" id="author" name="author"
               value="<?= htmlspecialchars($post['author'] ?? 'Tim Bismar', ENT_QUOTES, 'UTF-8') ?>">
      </div>
    </div>

    <div class="form-group">
      <label for="konten">Konten *</label>
      <!-- TinyMCE akan replace textarea ini dengan editor visual -->
      <textarea id="konten" name="konten" required><?= htmlspecialchars($post['konten'] ?? '', ENT_QUOTES, 'UTF-8') ?></textarea>
      <p class="form-hint">Gunakan toolbar di atas untuk memformat teks dan menyisipkan gambar.</p>
    </div>

    <div class="form-row">
      <div class="form-group">
        <label>Gambar Utama Artikel</label>

        <?php if (!empty($post['gambar'])): ?>
        <div class="img-preview">
          <!--
            ── FIX PATH GAMBAR ─────────────────────────────────────────────
            Gunakan imageUrl() untuk URL absolut, bukan path relatif ../
            Path relatif sering gagal karena tergantung lokasi file saat ini.
          -->
          <img src="<?= htmlspecialchars(imageUrl($post['gambar']), ENT_QUOTES, 'UTF-8') ?>"
               alt="Gambar saat ini"
               style="max-width:300px;max-height:200px;object-fit:cover;border-radius:6px;">
          <p class="form-hint">Gambar saat ini. Upload baru untuk mengganti.</p>
        </div>
        <?php endif; ?>

        <input type="file" name="gambar" accept="image/jpeg,image/png,image/webp">
        <p class="form-hint">Maks 5MB · JPG, PNG, WebP</p>
      </div>

      <div class="form-group">
        <label for="status">Status</label>
        <select id="status" name="status">
          <option value="draft"
            <?= ($post['status'] ?? 'draft') === 'draft' ? 'selected' : '' ?>>
            Draft (tidak tampil di website)
          </option>
          <option value="published"
            <?= ($post['status'] ?? '') === 'published' ? 'selected' : '' ?>>
            Published (tampil di website)
          </option>
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