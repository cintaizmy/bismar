<?php
// $pageTitle dan $activePage harus diset oleh halaman yang meng-include ini
$pageTitle  ??= 'Admin';
$activePage ??= '';
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= h($pageTitle) ?> | Bismar Admin</title>
  <link rel="icon" type="image/svg+xml" href="../assets/img/favicon.svg">
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<?= h(BASE_URL) ?>admin/assets/admin.css">
</head>
<body>

<div class="sidebar-overlay" id="sidebarOverlay"></div>

<aside class="sidebar" id="sidebar">
  <div class="sidebar-logo">
    <p class="sidebar-logo-name">Bismar Education</p>
    <p class="sidebar-logo-sub">Admin Panel</p>
  </div>

  <nav class="sidebar-nav">
    <p class="nav-label">Menu</p>
    <a href="<?= h(BASE_URL) ?>admin/dashboard.php" class="sidebar-link <?= $activePage === 'dashboard' ? 'active' : '' ?>">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
      </svg>
      Dashboard
    </a>
    <a href="<?= h(BASE_URL) ?>admin/berita.php" class="sidebar-link <?= $activePage === 'berita' ? 'active' : '' ?>">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
      Berita
    </a>
    <a href="<?= h(BASE_URL) ?>admin/galeri.php" class="sidebar-link <?= $activePage === 'galeri' ? 'active' : '' ?>">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      Galeri
    </a>
  </nav>

  <div class="sidebar-footer">
    <a href="<?= h(BASE_URL) ?>admin/logout.php" class="sidebar-link link-danger">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16 17 21 12 16 7"/>
        <line x1="21" y1="12" x2="9" y2="12"/>
      </svg>
      Logout
    </a>
  </div>
</aside>

<div class="main">
  <header class="topbar">
    <div class="topbar-left">
      <button class="hamburger" id="hamburger" aria-label="Toggle menu">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
      </button>
      <span class="topbar-title"><?= h($pageTitle) ?></span>
    </div>
    <span class="topbar-breadcrumb">
      Halo, <strong><?= h($_SESSION['admin_username'] ?? 'Admin') ?></strong>
    </span>
  </header>

  <div class="content">
