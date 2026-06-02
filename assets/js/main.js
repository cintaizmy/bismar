const CARDS_PER_PAGE = 6;
let programsData = [];

/* ── Icon mapping: nama → SVG ── */
const ICON_MAP = {
  'store':          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3h18v4H3z"/><path d="M5 7v13h14V7"/><path d="M10 12h4"/></svg>',
  'briefcase':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>',
  'user-plus':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>',
  'users':          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  'refresh-cw':     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg>',
  'award':          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  'zap':            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
  'layers':         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  'graduation-cap': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>',
  'book-open':      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  'user':           '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  'map-pin':        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>',
};

function getIconSVG(iconName) {
  if (!iconName) return '';
  if (iconName.trim().startsWith('<svg')) return iconName;
  return ICON_MAP[iconName] || ICON_MAP['layers'];
}

/* ── Helper escape ── */
function escProgram(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Popup ── */
function openPopup(programId) {
  const p = programsData.find(x => x.id === programId);
  if (!p) return;

  document.getElementById('popupIcon').innerHTML    = getIconSVG(p.icon_name);
  document.getElementById('popupTitle').textContent = p.title || '';
  document.getElementById('popupBody').textContent  = p.popup_content || p.description || '';
  document.getElementById('popupTag').textContent   = 'Program';

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

/* ── Build satu card ── */
function buildProgramCard(program) {
  const card = document.createElement('div');
  card.className = 'program-card';
  card.onclick = () => openPopup(program.id);
  card.innerHTML = `
    <div class="card-header">
      <div class="card-icon">${getIconSVG(program.icon_name)}</div>
      <span class="card-title">${escProgram(program.title)}</span>
    </div>
    <p class="card-desc">${escProgram(program.description)}</p>
    <div class="card-arrow">
      <div class="arrow-box">
        <svg viewBox="0 0 14 14">
          <line x1="3" y1="11" x2="11" y2="3"/>
          <polyline points="5,3 11,3 11,9"/>
        </svg>
      </div>
    </div>`;
  return card;
}

/* ── Render semua page ke track ── */
function renderProgramsTrack(programs) {
  const track = document.getElementById('programsTrack');
  track.innerHTML = '';

  for (let i = 0; i < programs.length; i += CARDS_PER_PAGE) {
    const chunk = programs.slice(i, i + CARDS_PER_PAGE);
    const page  = document.createElement('div');
    page.className = 'programs-page';

    chunk.forEach(p => page.appendChild(buildProgramCard(p)));

    // Isi sisa slot biar grid tetap rapi
    const rem = chunk.length % CARDS_PER_PAGE;
    if (rem !== 0) {
      for (let f = 0; f < CARDS_PER_PAGE - rem; f++) {
        const ghost = document.createElement('div');
        ghost.className = 'program-card';
        ghost.style.cssText = 'visibility:hidden;pointer-events:none;';
        page.appendChild(ghost);
      }
    }

    track.appendChild(page);
  }
}

/* ── Init slider ── */
function initProgramsSlider() {
  const track    = document.getElementById('programsTrack');
  const dotsWrap = document.getElementById('programsDots');
  const btnPrev  = document.getElementById('progPrev');
  const btnNext  = document.getElementById('progNext');
  const pages    = track.querySelectorAll('.programs-page').length;
  let cur = 0;

  dotsWrap.innerHTML = '';
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('button');
    dot.className = 'programs-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Page ' + (i + 1));
    dot.addEventListener('click', () => goToPage(i));
    dotsWrap.appendChild(dot);
  }

  function goToPage(page) {
    cur = Math.max(0, Math.min(page, pages - 1));
    track.style.transform = `translateX(-${cur * 100}%)`;
    dotsWrap.querySelectorAll('.programs-dot')
      .forEach((d, i) => d.classList.toggle('active', i === cur));
    btnPrev.disabled = cur === 0;
    btnNext.disabled = cur === pages - 1;
  }

  btnPrev.addEventListener('click', () => goToPage(cur - 1));
  btnNext.addEventListener('click', () => goToPage(cur + 1));
  goToPage(0);
}

/* ── Entry point ── */
(async function loadPrograms() {
  try {
    const res = await fetch('/bismar/api/get-programs.php');
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const programs = await res.json();
    if (!Array.isArray(programs) || programs.length === 0) throw new Error('empty');

    programsData = programs;
    renderProgramsTrack(programs);
    initProgramsSlider();

  } catch (err) {
    console.warn('[Programs] Gagal load dari API:', err);
    const track = document.getElementById('programsTrack');
    if (track) track.innerHTML =
      '<p style="color:#888;padding:24px 0;">Program sedang tidak dapat dimuat.</p>';
  }
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
let lightboxPhotos = [
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
let galleryPhotos = [
  { src: 'assets/img/galeri_1.jpeg' },
  { src: 'assets/img/galeri_2.jpeg' },
  { src: 'assets/img/galeri_3.jpeg' },
  { src: 'assets/img/galeri_4.jpeg' },
  { src: 'assets/img/galeri_5.jpeg' },
  { src: 'assets/img/galeri_6.jpeg' },
];

let galleryInitialized = false;

function openGalleryPopup() {
  const overlay = document.getElementById('galleryPopupOverlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  if (!galleryInitialized) {
    renderGalleryAll();
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

function renderGalleryAll() {
  const masonry = document.getElementById('galleryMasonry');
  masonry.innerHTML = '';

  galleryPhotos.forEach((photo, i) => {
    const div = document.createElement('div');
    div.className = 'gallery-masonry-item';

    const img = document.createElement('img');
    img.src     = photo.src;
    img.alt     = 'Gallery photo ' + (i + 1);
    img.loading = 'lazy';

    div.appendChild(img);

    const lbIndex = i % lightboxPhotos.length;
    div.addEventListener('click', function () {
      closeGalleryPopup();
      setTimeout(() => openLightbox(lbIndex), 320);
    });

    masonry.appendChild(div);
  });
}

/* ══════════════════════════════════════════
   GALLERY — DYNAMIC LOAD FROM API
══════════════════════════════════════════ */
(async function loadGalleryFromAPI() {
  try {
    const res = await fetch('api/get-gallery.php');
    if (!res.ok) throw new Error();
    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) throw new Error();

    lightboxPhotos = items.map((item, i) => ({
      src:     item.url,
      caption: item.caption || ('Gallery ' + (i + 1))
    }));

    galleryPhotos = items.map(item => ({ src: item.url }));

    galleryInitialized = false;
    document.getElementById('galleryMasonry').innerHTML = '';

    document.querySelectorAll('.gallery-img img').forEach((img, i) => {
      if (lightboxPhotos[i]) {
        img.src = lightboxPhotos[i].src;
        img.alt = lightboxPhotos[i].caption;
      }
    });
  } catch {
    // Fallback: gunakan data hardcoded
  }
})();

/* ══════════════════════════════════════════
   NEWS — INFINITE SCROLL
   Load 12 artikel pertama saat halaman dibuka.
   Saat user scroll ke ujung kanan slider,
   otomatis fetch 12 artikel berikutnya.
══════════════════════════════════════════ */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const NEWS_LIMIT = 12;
let newsOffset   = 0;
let newsHasMore  = true;
let newsLoading  = false;
let newsIndex    = 0;

function getCardWidth() {
  const track = document.getElementById('newsTrack');
  const card  = track.querySelector('.news-card');
  if (!card) return 0;
  return card.offsetWidth + 24;
}

function scrollNews(dir) {
  const track      = document.getElementById('newsTrack');
  const totalCards = track.querySelectorAll('.news-card').length;
  const visible    = window.innerWidth <= 768 ? 1 : 3;
  const maxIndex   = Math.max(0, totalCards - visible);

  newsIndex = Math.max(0, Math.min(newsIndex + dir, maxIndex));
  track.style.transform = `translateX(-${newsIndex * getCardWidth()}px)`;

  // Mendekati ujung → load lebih
  if (newsIndex >= maxIndex - 2 && newsHasMore && !newsLoading) {
    loadMoreNews();
  }
}

function createNewsCard(post) {
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    : '';
  const imgSrc = post.gambar
    ? `uploads/berita/${post.gambar}`
    : (post.gambar_url || '');

  const a = document.createElement('a');
  a.href = `/bismar/newsdetail.html?id=${encodeURIComponent(post.id)}`;
  a.className = 'news-card';
  a.innerHTML = `
    <div class="news-img">${imgSrc
      ? `<img src="${escapeHTML(imgSrc)}" alt="${escapeHTML(post.judul || '')}">`
      : ''}</div>
    <span class="news-tag">Berita</span>
    <p class="news-title">${escapeHTML(post.judul || '')}</p>
    <div class="news-meta">
      <span>${escapeHTML(post.author || 'Tim Bismar')}</span>
      <span class="news-dot">•</span>
      <span>${escapeHTML(date)}</span>
    </div>`;
  return a;
}

async function loadMoreNews() {
  if (newsLoading || !newsHasMore) return;
  newsLoading = true;

  const track = document.getElementById('newsTrack');

  // Skeleton sementara
  const skeletons = Array.from({ length: 3 }, () => {
    const el = document.createElement('a');
    el.className = 'news-card news-skeleton';
    el.setAttribute('aria-hidden', 'true');
    track.appendChild(el);
    return el;
  });

  try {
    const res = await fetch(
      `api/get-posts.php?status=published&limit=${NEWS_LIMIT}&offset=${newsOffset}`
    );
    if (!res.ok) throw new Error();
    const json = await res.json();

    skeletons.forEach(s => s.remove());

    const posts  = json.data    ?? [];
    newsHasMore  = json.hasMore ?? false;
    newsOffset  += posts.length;

    posts.forEach(post => track.appendChild(createNewsCard(post)));

  } catch {
    skeletons.forEach(s => s.remove());
    newsHasMore = false;
  }

  newsLoading = false;
}

// Init: load batch pertama
(async function initNews() {
  const track = document.getElementById('newsTrack');
  if (!track) return;

  // Skeleton awal
  track.innerHTML = Array.from({ length: 4 }, () =>
    '<a class="news-card news-skeleton" aria-hidden="true" tabindex="-1"></a>'
  ).join('');

  try {
    const res = await fetch(
      `api/get-posts.php?status=published&limit=${NEWS_LIMIT}&offset=0`
    );
    if (!res.ok) throw new Error();

    const json  = await res.json();
    const posts = json.data    ?? [];
    newsHasMore = json.hasMore ?? false;
    newsOffset  = posts.length;

    track.innerHTML = '';

    if (posts.length === 0) {
      track.innerHTML = '<p style="color:#888;padding:24px 0;">Belum ada berita.</p>';
      return;
    }

    posts.forEach(post => track.appendChild(createNewsCard(post)));
    newsIndex = 0;

  } catch {
    track.innerHTML = '';
  }
})();