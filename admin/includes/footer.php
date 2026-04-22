  </div><!-- /.content -->
</div><!-- /.main -->

<script>
  const hamburger = document.getElementById('hamburger');
  const sidebar   = document.getElementById('sidebar');
  const overlay   = document.getElementById('sidebarOverlay');

  function toggleSidebar() {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  }

  hamburger?.addEventListener('click', toggleSidebar);
  overlay?.addEventListener('click', toggleSidebar);
</script>
</body>
</html>
