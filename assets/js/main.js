/* ══════════════════════════════════════════
   PROGRAM DATA
══════════════════════════════════════════ */
const programs = [
  { title: 'SMK PK Partner Perdagangan', tag: 'Partnership', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v4H3z"/><path d="M5 7v13h14V7"/><path d="M10 12h4"/></svg>`, body: 'Program kemitraan resmi antara Bismar Education dengan SMK Program Keahlian Perdagangan. Kami menghadirkan pengalaman dunia usaha nyata langsung ke dalam kurikulum sekolah — mulai dari simulasi transaksi, kunjungan industri, hingga mentoring oleh praktisi aktif di bidang perdagangan.' },
  { title: 'Pendampingan Pembukaan Usaha', tag: 'Kewirausahaan', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>`, body: 'Bimbingan menyeluruh bagi siswa dan lulusan SMK yang ingin merintis usaha mandiri. Program ini mencakup penyusunan rencana bisnis, pendampingan perizinan usaha, akses permodalan, hingga strategi pemasaran digital agar usaha dapat berdiri dan berkembang dengan fondasi yang kuat.' },
  { title: 'Recruitment', tag: 'Karier', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>`, body: 'Layanan rekrutmen yang menghubungkan lulusan SMK terbaik dengan perusahaan mitra industri. Bismar Education memfasilitasi seluruh proses mulai dari job fair, seleksi administrasi, tes kompetensi, hingga penempatan kerja — memastikan lulusan mendapat peluang karier yang sesuai bidang keahliannya.' },
  { title: 'Workshop', tag: 'Pelatihan', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`, body: 'Pelatihan intensif satu hingga tiga hari yang dipandu langsung oleh praktisi industri berpengalaman. Setiap workshop dirancang berbasis praktik, bukan teori semata — peserta langsung mengerjakan studi kasus nyata dan pulang dengan keterampilan yang siap diterapkan di dunia kerja.' },
  { title: 'Sinkronisasi Kurikulum', tag: 'Kurikulum', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>`, body: 'Proses penyelarasan kurikulum SMK dengan kebutuhan riil industri yang terus berkembang. Tim Bismar Education bekerja bersama guru dan kepala program keahlian untuk memetakan gap kompetensi, merevisi silabus, dan memastikan setiap materi pembelajaran relevan dengan standar dunia kerja terkini.' },
  { title: 'Sertifikasi Kompetensi Guru', tag: 'Sertifikasi', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21l5-3 5 3"/></svg>`, body: 'Program peningkatan kompetensi dan sertifikasi bagi guru SMK sesuai standar Lembaga Sertifikasi Profesi (LSP). Guru mendapatkan pembekalan materi terkini, uji kompetensi terstruktur, dan sertifikat yang diakui industri — meningkatkan kualitas pengajaran sekaligus kredibilitas profesional mereka.' },
  { title: 'Kelas Entrepreneur', tag: 'Kewirausahaan', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`, body: 'Kelas khusus yang dirancang untuk menumbuhkan jiwa wirausaha siswa SMK sejak dini. Melalui simulasi bisnis, pitching ide kepada mentor industri, dan proyek usaha kelompok nyata, siswa belajar berpikir kreatif, mengambil keputusan, dan membangun mentalitas pengusaha yang tangguh.' },
  { title: 'Pendamping UKK', tag: 'Ujian Kompetensi', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`, body: 'Pendampingan intensif bagi siswa SMK dalam mempersiapkan diri menghadapi Uji Kompetensi Keahlian (UKK). Program ini mencakup simulasi ujian, review materi keahlian, dan bimbingan langsung dari asesor berpengalaman — membantu siswa tampil optimal dan lulus dengan nilai terbaik.' },
  { title: 'Industri Mengajar', tag: 'Kolaborasi', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`, body: 'Program kolaborasi di mana profesional dari perusahaan mitra hadir langsung ke kelas sebagai pengajar tamu. Siswa mendapatkan wawasan autentik dari pelaku industri aktif, memahami dinamika dunia kerja sesungguhnya, dan membangun jaringan sejak masih di bangku sekolah.' },
  { title: 'Guru Magang', tag: 'Pengembangan Guru', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`, body: 'Program pemagangan guru SMK di perusahaan mitra selama 1–4 minggu untuk memperbarui wawasan dan keterampilan industri terkini. Guru kembali ke kelas dengan pengalaman langsung, materi ajar yang relevan, dan pemahaman mendalam tentang kompetensi yang benar-benar dibutuhkan dunia kerja.' },
  { title: 'Praktek Lapangan Kerja', tag: 'Praktik', icon: `<svg viewBox="0 0 24 24" stroke="var(--red)" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><polyline points="12,12 12,16"/><polyline points="10,14 14,14"/></svg>`, body: 'Program PKL terstruktur yang menempatkan siswa SMK di perusahaan mitra Bismar Education untuk pengalaman kerja nyata. Setiap peserta didampingi mentor industri, dievaluasi secara berkala, dan mendapatkan laporan kompetensi yang dapat digunakan sebagai portofolio melamar kerja.' }
];

/* ══════════════════════════════════════════
   PROGRAM POPUP
══════════════════════════════════════════ */
function openPopup(index) {
  const p = programs[index];
  document.getElementById('popupTitle').textContent = p.title;
  document.getElementById('popupTag').textContent   = p.tag;
  document.getElementById('popupIcon').innerHTML    = p.icon;
  document.getElementById('popupBody').textContent  = p.body;
  document.getElementById('popupOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popupOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closePopupOutside(e) {
  if (e.target === document.getElementById('popupOverlay')) closePopup();
}

/* ══════════════════════════════════════════
   PROGRAMS SLIDER
══════════════════════════════════════════ */
(function () {
  const track    = document.getElementById('programsTrack');
  const dotsWrap = document.getElementById('programsDots');
  const btnPrev  = document.getElementById('progPrev');
  const btnNext  = document.getElementById('progNext');
  const pages    = track.querySelectorAll('.programs-page').length;
  let currentPage = 0;

  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('button');
    dot.className = 'programs-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Page ' + (i + 1));
    dot.addEventListener('click', () => goToPage(i));
    dotsWrap.appendChild(dot);
  }

  function goToPage(page) {
    currentPage = Math.max(0, Math.min(page, pages - 1));
    track.style.transform = `translateX(-${currentPage * 100}%)`;
    dotsWrap.querySelectorAll('.programs-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentPage);
    });
    btnPrev.disabled = currentPage === 0;
    btnNext.disabled = currentPage === pages - 1;
  }

  btnPrev.addEventListener('click', () => goToPage(currentPage - 1));
  btnNext.addEventListener('click', () => goToPage(currentPage + 1));
  goToPage(0);
})();

/* ══════════════════════════════════════════
   HERO CAROUSEL
══════════════════════════════════════════ */
(function () {
  const INTERVAL = 3000;
  const track    = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const progress = document.getElementById('carouselProgress');
  const slides   = track.querySelectorAll('.carousel-slide');
  const total    = slides.length;
  let current    = 0;
  let timer      = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    dotsWrap.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  }

  function startProgress() {
    progress.style.transition = 'none';
    progress.style.width = '0%';
    progress.getBoundingClientRect();
    progress.style.transition = `width ${INTERVAL}ms linear`;
    progress.style.width = '100%';
  }

  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    updateDots();
    resetTimer();
    startProgress();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(next, INTERVAL);
  }

  document.getElementById('carouselPrev').addEventListener('click', prev);
  document.getElementById('carouselNext').addEventListener('click', next);

  document.getElementById('heroCarousel').addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  });

  const carousel = document.getElementById('heroCarousel');
  carousel.addEventListener('mouseenter', () => {
    clearInterval(timer);
    const computed = getComputedStyle(progress).width;
    progress.style.transition = 'none';
    progress.style.width = computed;
  });
  carousel.addEventListener('mouseleave', () => {
    resetTimer();
    startProgress();
  });

  resetTimer();
  startProgress();
})();

/* ══════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════ */
const lightboxPhotos = [
  { src: 'assets/img/galeri_1.jpeg', caption: 'Gallery 1' },
  { src: 'assets/img/galeri_2.jpeg', caption: 'Gallery 2' },
  { src: 'assets/img/galeri_3.jpeg', caption: 'Gallery 3' },
  { src: 'assets/img/galeri_4.jpeg', caption: 'Gallery 4' },
  { src: 'assets/img/galeri_5.jpeg', caption: 'Gallery 5' },
  { src: 'assets/img/galeri_6.jpeg', caption: 'Gallery 6' },
];

let lbCurrentIndex = 0;

function openLightbox(index) {
  lbCurrentIndex = index;
  renderLightbox();
  document.getElementById('lbOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lbOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleLbOverlayClick(e) {
  if (e.target === document.getElementById('lbOverlay')) closeLightbox();
}

function renderLightbox() {
  const photo = lightboxPhotos[lbCurrentIndex];
  document.getElementById('lbImg').src     = photo.src;
  document.getElementById('lbImg').alt     = photo.caption;
  document.getElementById('lbCaption').textContent = photo.caption;

  const dotsEl = document.getElementById('lbDots');
  dotsEl.innerHTML = '';
  lightboxPhotos.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'lb-dot' + (i === lbCurrentIndex ? ' active' : '');
    dot.setAttribute('aria-label', 'Foto ' + (i + 1));
    dot.addEventListener('click', () => { lbCurrentIndex = i; renderLightbox(); });
    dotsEl.appendChild(dot);
  });
}

function lbNavigate(dir) {
  lbCurrentIndex = (lbCurrentIndex + dir + lightboxPhotos.length) % lightboxPhotos.length;
  renderLightbox();
}

document.addEventListener('keydown', function(e) {
  const lbOpen  = document.getElementById('lbOverlay').classList.contains('open');
  const gpOpen  = document.getElementById('galleryPopupOverlay').classList.contains('active');
  const popOpen = document.getElementById('popupOverlay').classList.contains('active');

  if (e.key === 'Escape') {
    if (lbOpen) closeLightbox();
    else if (gpOpen) closeGalleryPopup();
    else if (popOpen) closePopup();
  }
  if (lbOpen) {
    if (e.key === 'ArrowLeft')  lbNavigate(-1);
    if (e.key === 'ArrowRight') lbNavigate(1);
  }
});

(function () {
  let startX = 0;
  const lbBox = document.getElementById('lbBox');
  lbBox.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  lbBox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) dx < 0 ? lbNavigate(1) : lbNavigate(-1);
  });
})();

/* ══════════════════════════════════════════
   GALLERY POPUP (bottom sheet)
══════════════════════════════════════════ */
const galleryPhotos = [
  { src: 'assets/img/galeri_1.jpeg', ratio: 'r-wide' },
  { src: 'assets/img/galeri_2.jpeg', ratio: 'r-tall' },
  { src: 'assets/img/galeri_3.jpeg', ratio: 'r-land' },
  { src: 'assets/img/galeri_4.jpeg', ratio: 'r-square' },
  { src: 'assets/img/galeri_5.jpeg', ratio: 'r-cinema' },
  { src: 'assets/img/galeri_6.jpeg', ratio: 'r-port' },
  { src: 'assets/img/galeri_1.jpeg', ratio: 'r-land' },
  { src: 'assets/img/galeri_2.jpeg', ratio: 'r-square' },
  { src: 'assets/img/galeri_3.jpeg', ratio: 'r-wide' },
  { src: 'assets/img/galeri_4.jpeg', ratio: 'r-tall' },
  { src: 'assets/img/galeri_5.jpeg', ratio: 'r-land' },
  { src: 'assets/img/galeri_6.jpeg', ratio: 'r-port' },
];

let galleryLoaded      = 0;
const BATCH_SIZE       = 4;
let galleryInitialized = false;

function openGalleryPopup() {
  const overlay = document.getElementById('galleryPopupOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (!galleryInitialized) {
    loadGalleryBatch();
    galleryInitialized = true;
  }
}

function closeGalleryPopup() {
  document.getElementById('galleryPopupOverlay').classList.remove('active');
  document.body.style.overflow = '';
}

function handleGalleryOverlayClick(e) {
  if (e.target === document.getElementById('galleryPopupOverlay')) closeGalleryPopup();
}

function loadGalleryBatch() {
  const masonry = document.getElementById('galleryMasonry');
  const hint    = document.getElementById('galleryLoadHint');
  const end     = Math.min(galleryLoaded + BATCH_SIZE, galleryPhotos.length);

  for (let i = galleryLoaded; i < end; i++) {
    const photo = galleryPhotos[i];
    const div   = document.createElement('div');
    div.className = 'gallery-masonry-item ' + photo.ratio;

    const img   = document.createElement('img');
    img.src     = photo.src;
    img.alt     = 'Gallery photo ' + (i + 1);
    img.loading = 'lazy';

    div.appendChild(img);

    const lbIndex = i % lightboxPhotos.length;
    div.addEventListener('click', function() {
      closeGalleryPopup();
      setTimeout(() => openLightbox(lbIndex), 320);
    });

    masonry.appendChild(div);
  }

  galleryLoaded = end;

  if (galleryLoaded >= galleryPhotos.length) {
    hint.textContent = 'Semua ' + galleryPhotos.length + ' foto sudah ditampilkan ✓';
  }
}

document.getElementById('galleryPopupBody').addEventListener('scroll', function () {
  if (galleryLoaded >= galleryPhotos.length) return;
  const { scrollTop, scrollHeight, clientHeight } = this;
  if (scrollTop + clientHeight >= scrollHeight - 120) {
    loadGalleryBatch();
  }
});

/* ══════════════════════════════════════════
   NEWS CAROUSEL
══════════════════════════════════════════ */
let newsIndex = 0;

function getCardWidth() {
  const track = document.getElementById('newsTrack');
  const card  = track.querySelector('.news-card');
  return card.offsetWidth + 24;
}

function scrollNews(dir) {
  const totalCards = document.querySelectorAll('.news-card').length;
  const visible    = window.innerWidth <= 768 ? 1 : 4;
  const maxIndex   = totalCards - visible;
  newsIndex = Math.max(0, Math.min(newsIndex + dir, maxIndex));
  document.getElementById('newsTrack').style.transform =
    `translateX(-${newsIndex * getCardWidth()}px)`;
}

/* ══════════════════════════════════════════
   NEWS — DYNAMIC LOAD FROM API
══════════════════════════════════════════ */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

(async function loadNews() {
  const track = document.getElementById('newsTrack');
  if (!track) return;

  const staticHTML = track.innerHTML;

  track.innerHTML = Array.from({ length: 4 }, () =>
    '<a class="news-card news-skeleton" aria-hidden="true" tabindex="-1"></a>'
  ).join('');

  try {
    const res = await fetch('api/get-posts.php?status=published');
    if (!res.ok) throw new Error();

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) throw new Error();

    track.innerHTML = '';
    posts.slice(0, 6).forEach(post => {
      const date = post.created_at
        ? new Date(post.created_at).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'short', year: 'numeric'
          })
        : '';
      const a = document.createElement('a');
      a.href      = `newsdetail.html?id=${encodeURIComponent(post.id)}`;
      a.className = 'news-card';
      a.innerHTML = `
        <div class="news-img"></div>
        <span class="news-tag">Berita</span>
        <p class="news-title">${escapeHTML(post.judul || '')}</p>
        <div class="news-meta">
          <span>${escapeHTML(post.author || 'Tim Bismar')}</span>
          <span class="news-dot">•</span>
          <span>${escapeHTML(date)}</span>
        </div>`;
      track.appendChild(a);
    });

    newsIndex = 0;
  } catch {
    track.innerHTML = staticHTML;
  }
})();
