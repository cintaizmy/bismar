/* ══════════════════════════════════════════
   PROGRAM POPUP
   Data dari PROGRAMS_DATA yang di-inject PHP di index.php
══════════════════════════════════════════ */
function openPopup(id) {
  const p = PROGRAMS_DATA.find(x => x.id === id);
  if (!p) return;
  document.getElementById('popupIconEl').className = 'bi bi-' + p.icon;
  document.getElementById('popupTitle').textContent = p.title;
  document.getElementById('popupBody').textContent  = p.description;
  document.getElementById('popupTag').textContent   = 'Program';
  const overlay = document.getElementById('popupOverlay');
  overlay.classList.add('active');
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
   GALLERY — DYNAMIC LOAD FROM API
══════════════════════════════════════════ */
(async function loadGalleryFromAPI() {
  try {
    const res = await fetch('api/get-gallery.php');
    if (!res.ok) throw new Error();
    const items = await res.json();
    if (!Array.isArray(items) || items.length === 0) throw new Error();

    const ratios = ['r-wide','r-tall','r-land','r-square','r-cinema','r-port'];

    lightboxPhotos = items.map((item, i) => ({
      src:     item.url,
      caption: item.caption || ('Gallery ' + (i + 1))
    }));

    galleryPhotos = items.map((item, i) => ({
      src:   item.url,
      ratio: ratios[i % ratios.length]
    }));

    galleryLoaded      = 0;
    galleryInitialized = false;
    document.getElementById('galleryMasonry').innerHTML   = '';
    document.getElementById('galleryLoadHint').textContent = 'Scroll untuk melihat lebih banyak foto ↓';

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