<?php
require_once __DIR__ . '/includes/auth.php';
session_unset();
session_destroy();
setcookie(session_name(), '', time() - 3600, '/');
header('Location: ' . BASE_URL . 'admin/login.php');
