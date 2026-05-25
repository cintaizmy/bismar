const GET_POSTS_URL = '/bismar/api/get-posts.php';
const UPLOADS_DIR   = '/bismar/uploads/berita/';

/* ── Baca identifier dari URL ───────────────────────────────────────────── */
const _params     = new URLSearchParams(window.location.search);
const articleId   = _params.get('id');
let articleSlug   = _params.get('slug');

if (!articleSlug) {
  try {
    const path = window.location.pathname.replace(/\/+$/, '');
    const parts = path.split('/').filter(Boolean);
    const last = parts[parts.length - 1] || '';
    if (last && !last.includes('.') && last !== 'bismar' && last !== 'index.php' && last !== 'newsdetail.html') {
      articleSlug = decodeURIComponent(last);
    }
  } catch (e) {
    articleSlug = null;
  }
}

/* ── HTML Sanitizer ─────────────────────────────────────────────────────── */
function sanitizeHTML(html) {
  const SAFE_TAGS = new Set([
    'p','br','b','strong','i','em','u','s',
    'h2','h3','h4','ul','ol','li','blockquote',
    'a','img','figure','figcaption','span'
  ]);
  const SAFE_ATTRS = {
    a:   ['href', 'title'],
    img: ['src', 'alt', 'width', 'height'],
    '*': ['class']
  };

  const doc = new DOMParser().parseFromString(html, 'text/html');

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) return node.cloneNode();
    if (node.nodeType !== Node.ELEMENT_NODE) return null;

    const tag = node.tagName.toLowerCase();
    if (!SAFE_TAGS.has(tag)) {
      const frag = document.createDocumentFragment();
      node.childNodes.forEach(c => { const n = walk(c); if (n) frag.appendChild(n); });
      return frag;
    }

    const el      = document.createElement(tag);
    const allowed = [...(SAFE_ATTRS[tag] || []), ...(SAFE_ATTRS['*'] || [])];

    for (const { name, value } of node.attributes) {
      if (!allowed.includes(name)) continue;
      if ((name === 'href' || name === 'src') && /^javascript:/i.test(value.trim())) continue;
      el.setAttribute(name, value);
    }
    if (tag === 'a') {
      el.setAttribute('rel', 'noopener noreferrer');
      if (!el.getAttribute('target')) el.setAttribute('target', '_blank');
    }

    node.childNodes.forEach(c => { const n = walk(c); if (n) el.appendChild(n); });
    return el;
  }

  const out = document.createElement('div');
  doc.body.childNodes.forEach(n => { const c = walk(n); if (c) out.appendChild(c); });
  return out.innerHTML;
}

/* ── Escape helper ──────────────────────────────────────────────────────── */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Article UI state ───────────────────────────────────────────────────── */
function setArticleState(state, message) {
  document.getElementById('article-loading').classList.toggle('hidden', state !== 'loading');
  document.getElementById('article-error').classList.toggle('hidden',   state !== 'error');
  document.getElementById('article-content').classList.toggle('hidden', state !== 'ready');
  if (state === 'error' && message) {
    document.getElementById('error-message').textContent = message;
  }
}

/* ── Image helpers ──────────────────────────────────────────────────────── */
function resolveImage(post) {
  if (post.gambar_url?.trim()) return post.gambar_url;
  if (post.gambar?.trim())     return UPLOADS_DIR + post.gambar;
  return null;
}

function renderHero(imageUrl) {
  const container = document.getElementById('hero-container');
  if (!container || !imageUrl) return;
  const img = document.createElement('img');
  img.src           = imageUrl;
  img.alt           = 'Hero Image';
  img.style.cssText = 'width:100%;height:320px;object-fit:cover;border-radius:12px;';
  img.onerror       = () => {};
  container.innerHTML = '';
  container.appendChild(img);
}

function placeholderThumb() {
  return `
    <div class="story-thumb-placeholder">
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
      <span>Image Placeholder</span>
    </div>`;
}

/* ── Load article ───────────────────────────────────────────────────────── */
async function loadArticle() {
  if (!articleId && !articleSlug) {
    setArticleState('error', 'Artikel tidak ditemukan.');
    return;
  }
  setArticleState('loading');

  try {
    const query = articleSlug
        ? `slug=${encodeURIComponent(clientSlugify(articleSlug))}`
      : `id=${encodeURIComponent(articleId)}`;

    const res = await fetch(`${GET_POSTS_URL}?${query}`);
    if (res.status === 404) { setArticleState('error', 'Artikel tidak ditemukan.'); return; }
    if (!res.ok) {
      try {
        const err = await res.json();
        setArticleState('error', err.error || 'Terjadi kesalahan server.');
      } catch {
        setArticleState('error', 'Terjadi kesalahan server.');
      }
      return;
    }

    const data = await res.json();
    const post = Array.isArray(data) ? data[0] : data;
    if (!post) { setArticleState('error', 'Artikel tidak ditemukan.'); return; }

    if (post.slug) {
      const prettyUrl = `/bismar/${post.slug}`;
      if (window.location.pathname + window.location.search !== prettyUrl) {
        history.replaceState({ id: post.id, slug: post.slug }, post.judul || '', prettyUrl);
      }
    }

    if (post.judul) document.title = post.judul + ' | Bismar Education';

    const titleEl = document.getElementById('article-title');
    if (titleEl && post.judul) titleEl.textContent = post.judul;

    const dateEl = document.getElementById('article-date');
    if (dateEl && post.created_at) {
      dateEl.textContent = new Date(post.created_at).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    }

    const authorEl   = document.getElementById('article-author');
    const authorMeta = document.getElementById('author-meta');
    if (authorEl && post.author) {
      authorEl.textContent = post.author;
      if (authorMeta) authorMeta.style.display = 'flex';
    }

    const bodyEl = document.getElementById('article-body');
    if (bodyEl && post.konten) {
      const isHTML = /<[a-z][\s\S]*>/i.test(post.konten);
      bodyEl.innerHTML = isHTML
        ? sanitizeHTML(post.konten)
        : '<p>' + post.konten.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    }

    renderHero(resolveImage(post));
    updateShareButtons();
    setArticleState('ready');

  } catch {
    setArticleState('error', 'Koneksi gagal. Periksa jaringan internet kamu dan coba lagi.');
  }
}

  // Client-side slugify to match server `toSlug()` behavior (basic)
  function clientSlugify(str) {
    if (!str) return '';
    // Normalize, remove diacritics
    try { str = str.normalize('NFKD').replace(/\p{Diacritic}/gu, ''); } catch (e) {}
    str = String(str).toLowerCase().trim();
    // Remove invalid chars, keep a-z0-9 and spaces and dashes
    str = str.replace(/[^a-z0-9\s-]/g, '');
    str = str.replace(/\s+/g, '-');
    str = str.replace(/-+/g, '-');
    return str;
  }

/* ══════════════════════════════════════════
   RELATED STORIES
══════════════════════════════════════════ */
const RELATED_LIMIT = 9;
let relatedOffset  = 0;
let relatedHasMore = true;
let relatedLoading = false;

const currentId   = articleId;
const currentSlug = articleSlug;

function createStoryCard(post) {
  const imgUrl    = resolveImage(post);
  const thumbHTML = imgUrl
    ? `<img class="story-thumb" src="${escapeHTML(imgUrl)}" alt="${escapeHTML(post.judul || '')}">`
    : placeholderThumb();

  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString('id-ID', {
        year: 'numeric', month: 'short', day: 'numeric'
      })
    : '';

  const card = document.createElement('div');
  card.className    = 'story-card';
  card.style.cursor = 'pointer';
  card.dataset.id   = post.id;
  card.dataset.slug = post.slug || '';
  card.innerHTML = `
    ${thumbHTML}
    <div class="story-body">
      <span class="story-badge">News</span>
      <div class="story-card-title">${escapeHTML(post.judul || 'Untitled')}</div>
      <div class="story-date">${escapeHTML(date)}</div>
      <span class="story-link">Read More →</span>
    </div>`;
  return card;
}

async function fetchRelatedBatch() {
  if (relatedLoading || !relatedHasMore) return 0;
  relatedLoading = true;

  const track = document.getElementById('sliderTrack');
  let added   = 0;

  try {
    const res = await fetch(
      `${GET_POSTS_URL}?status=published&limit=${RELATED_LIMIT}&offset=${relatedOffset}`
    );
    if (!res.ok) throw new Error();

    const json  = await res.json();
    const posts = (json.data ?? []).filter(p => {
      if (currentId   && String(p.id) === String(currentId))   return false;
      if (currentSlug && p.slug       === currentSlug)          return false;
      return true;
    });

    relatedHasMore  = json.hasMore ?? false;
    relatedOffset  += (json.data ?? []).length;

    posts.forEach(post => {
      track.appendChild(createStoryCard(post));
      added++;
    });

  } catch {
    relatedHasMore = false;
  }

  relatedLoading = false;
  return added;
}

async function loadRelatedStories() {
  const track = document.getElementById('sliderTrack');
  track.innerHTML = '';

  // Fetch semua batch dulu sebelum init slider
  while (relatedHasMore) {
    await fetchRelatedBatch();
  }

  initSlider();
}

/* ── Slider ─────────────────────────────────────────────────────────────── */
function initSlider() {
  const track          = document.getElementById('sliderTrack');
  const progressFill   = document.getElementById('sliderProgress');

  const visibleCards = () => window.innerWidth <= 600 ? 1 : 3;
  const totalCards   = () => track.querySelectorAll('.story-card').length;
  const maxIndex     = () => Math.max(0, totalCards() - visibleCards());

  let currentIndex = 0;

  const oldPrev = document.getElementById('prevBtn');
  const oldNext = document.getElementById('nextBtn');
  const prevBtn = oldPrev.cloneNode(true);
  const nextBtn = oldNext.cloneNode(true);
  oldPrev.parentNode.replaceChild(prevBtn, oldPrev);
  oldNext.parentNode.replaceChild(nextBtn, oldNext);

  function getCardWidth() {
    const c = track.querySelector('.story-card');
    if (!c) return 0;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 20;
    return c.offsetWidth + gap;
  }

function updateProgress() {
  const max = maxIndex();
  if (!progressFill) return;

  if (max === 0) {
    progressFill.style.width = '100%';
    return;
  }

  const pct = ((currentIndex + visibleCards()) / totalCards()) * 100;
  progressFill.style.width = Math.min(pct, 100) + '%';
}

  function goTo(index) {
    const max = maxIndex();
    currentIndex = Math.max(0, Math.min(index, max));
    track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    updateProgress();
  }

  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));

  // ── Drag (mouse) ──────────────────────────────────────────────────────
  let startX = 0, isDragging = false, hasDragged = false, startTranslate = 0;

  track.addEventListener('mousedown', e => {
    isDragging     = true;
    hasDragged     = false;
    startX         = e.clientX;
    startTranslate = -currentIndex * getCardWidth();
    track.classList.add('dragging');
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    if (Math.abs(e.clientX - startX) > 5) hasDragged = true;
    track.style.transform = `translateX(${startTranslate + (e.clientX - startX)}px)`;
  });

  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const diff = e.clientX - startX;
    if (diff < -50)     goTo(currentIndex + 1);
    else if (diff > 50) goTo(currentIndex - 1);
    else                goTo(currentIndex);
  });

  // ── Klik card → navigasi ──────────────────────────────────────────────
  track.addEventListener('click', e => {
    if (hasDragged) { hasDragged = false; return; }
    const card = e.target.closest('.story-card');
    if (!card) return;
    if (card.dataset.slug) {
      window.location.href = `/bismar/${encodeURIComponent(card.dataset.slug)}`;
    } else if (card.dataset.id) {
      window.location.href = `newsdetail.html?id=${encodeURIComponent(card.dataset.id)}`;
    }
  });

  // ── Touch ─────────────────────────────────────────────────────────────
  track.addEventListener('touchstart', e => {
    startX         = e.touches[0].clientX;
    startTranslate = -currentIndex * getCardWidth();
    hasDragged     = false;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (Math.abs(e.touches[0].clientX - startX) > 5) hasDragged = true;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -50)     goTo(currentIndex + 1);
    else if (diff > 50) goTo(currentIndex - 1);
    else if (!hasDragged) {
      const card = e.target.closest('.story-card');
      if (!card) return;
      if (card.dataset.slug) {
        window.location.href = `/bismar/${encodeURIComponent(card.dataset.slug)}`;
      } else if (card.dataset.id) {
        window.location.href = `newsdetail.html?id=${encodeURIComponent(card.dataset.id)}`;
      }
    }
    hasDragged = false;
  });

  window.addEventListener('resize', () => {
    currentIndex = 0;
    goTo(0);
  });

  goTo(0);
}

/* ── Share buttons ──────────────────────────────────────────────────────── */
function updateShareButtons() {
  const pageUrl = encodeURIComponent(window.location.href);
  const title   = encodeURIComponent(document.title);

  const fb = document.getElementById('share-facebook');
  const li = document.getElementById('share-linkedin');
  const wa = document.getElementById('share-whatsapp');

  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  if (li) li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  if (wa) wa.href = `https://api.whatsapp.com/send?text=${title}%20${pageUrl}`;
}

updateShareButtons();

/* ── Init ───────────────────────────────────────────────────────────────── */
loadArticle();
loadRelatedStories();