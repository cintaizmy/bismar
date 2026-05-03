// Otomatis menghasilkan: http://localhost:8888/bismar/uploads/berita/foto.jpg
function imageUrl(string $filename, string $subfolder = 'berita'): string {
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
    $host   = $_SERVER['HTTP_HOST'];
    $base   = rtrim(dirname(dirname($_SERVER['SCRIPT_NAME'])), '/');
    return $scheme . '://' . $host . $base . '/uploads/' . $subfolder . '/' . $filename;
}