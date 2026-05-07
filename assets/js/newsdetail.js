const GET_POSTS_URL = 'api/get-posts.php';
const UPLOADS_DIR   = 'uploads/berita/';

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

/* ── HTML Sanitizer ─────────────────────────────────────────────────────────
   Strips dangerous tags/attributes before inserting API content into the DOM.
   Uses a whitelist approach — anything not explicitly allowed is removed.
── */
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

/* ── Escape helpers ─────────────────────────── */
function escapeHTML(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ── Article UI state ───────────────────────── */
function setArticleState(state, message) {
  document.getElementById('article-loading').classList.toggle('hidden', state !== 'loading');
  document.getElementById('article-error').classList.toggle('hidden',   state !== 'error');
  document.getElementById('article-content').classList.toggle('hidden', state !== 'ready');

  if (state === 'error' && message) {
    document.getElementById('error-message').textContent = message;
  }
}

/* ── Image helpers ──────────────────────────── */
function resolveImage(post) {
  if (post.gambar_url?.trim()) return post.gambar_url;
  if (post.gambar?.trim())     return UPLOADS_DIR + post.gambar;
  return null;
}

function renderHero(imageUrl) {
  const container = document.getElementById('hero-container');
  if (!container || !imageUrl) return;
  const img = document.createElement('img');
  img.src            = imageUrl;
  img.alt            = 'Hero Image';
  img.style.cssText  = 'width:100%;height:320px;object-fit:cover;border-radius:12px;';
  img.onerror        = () => {};
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

/* ── Load article ───────────────────────────── */
async function loadArticle() {
  if (!articleId) return;

  setArticleState('loading');

  try {
    const res = await fetch(`${GET_POSTS_URL}?id=${encodeURIComponent(articleId)}`);

    if (res.status === 404) {
      setArticleState('error', 'Artikel tidak ditemukan.');
      return;
    }
    if (!res.ok) {
      setArticleState('error', 'Terjadi kesalahan server. Silakan coba lagi nanti.');
      return;
    }

    const data = await res.json();
    const post = Array.isArray(data) ? data[0] : data;

    if (!post) {
      setArticleState('error', 'Artikel tidak ditemukan.');
      return;
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

    const authorEl = document.getElementById('article-author');
    if (authorEl && post.author) authorEl.textContent = post.author;

    const bodyEl = document.getElementById('article-body');
    if (bodyEl && post.konten) {
      const isHTML = /<[a-z][\s\S]*>/i.test(post.konten);
      bodyEl.innerHTML = isHTML
        ? sanitizeHTML(post.konten)
        : '<p>' + post.konten.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    }

    renderHero(resolveImage(post));
    setArticleState('ready');

  } catch {
    setArticleState('error', 'Koneksi gagal. Periksa jaringan internet kamu dan coba lagi.');
  }
}

/* ── Load related stories ───────────────────── */
async function loadRelatedStories() {
  try {
    const res = await fetch(`${GET_POSTS_URL}?status=published`);
    if (!res.ok) { initSlider(); return; }

    const posts = await res.json();
    if (!Array.isArray(posts) || posts.length === 0) { initSlider(); return; }

    const related = posts.filter(p => String(p.id) !== String(articleId)).slice(0, 6);
    if (related.length === 0) { initSlider(); return; }

    const track = document.getElementById('sliderTrack');
    track.innerHTML = '';

    related.forEach(post => {
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
      card.className = 'story-card';
      card.style.cursor = 'pointer';
      card.dataset.id = post.id;
      card.innerHTML = `
        ${thumbHTML}
        <div class="story-body">
          <span class="story-badge">News</span>
          <div class="story-card-title">${escapeHTML(post.judul || 'Untitled')}</div>
          <div class="story-date">${escapeHTML(date)}</div>
          <span class="story-link">Read More →</span>
        </div>`;
      track.appendChild(card);
    });

    initSlider();
  } catch {
    initSlider();
  }
}

/* ── Slider ─────────────────────────────────── */
function initSlider() {
  const track         = document.getElementById('sliderTrack');
  const dotsContainer = document.getElementById('sliderDots');
  const cards         = track.querySelectorAll('.story-card');
  const totalCards    = cards.length;

  const visibleCards = () => window.innerWidth <= 600 ? 1 : 3;
  const maxIndex     = () => Math.max(0, totalCards - visibleCards());

  let currentIndex = 0;

  const oldPrev = document.getElementById('prevBtn');
  const oldNext = document.getElementById('nextBtn');
  const prevBtn = oldPrev.cloneNode(true);
  const nextBtn = oldNext.cloneNode(true);
  oldPrev.parentNode.replaceChild(prevBtn, oldPrev);
  oldNext.parentNode.replaceChild(nextBtn, oldNext);

  function getCardWidth() {
  if (!cards[0]) return 0;
  const style = window.getComputedStyle(track);
  const gap = parseFloat(style.gap) || 20;
  return cards[0].offsetWidth + gap;
}``

  function updateDots() {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex()));
    track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;
    updateDots();
  }

  function buildDots() {
    dotsContainer.innerHTML = '';
    const total = maxIndex() + 1;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    }
  }

  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));

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
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 5) hasDragged = true;
    track.style.transform = `translateX(${startTranslate + diff}px)`;
  });

  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const diff = e.clientX - startX;
    if (diff < -50)      goTo(currentIndex + 1);
    else if (diff > 50)  goTo(currentIndex - 1);
    else                 goTo(currentIndex);
  });

  // ── Event delegation: klik card → navigasi ke artikel ──
  track.addEventListener('click', e => {
    if (hasDragged) {
      hasDragged = false;
      return;
    }
    const card = e.target.closest('.story-card');
    if (!card || !card.dataset.id) return;
    window.location.href = `newsdetail.html?id=${encodeURIComponent(card.dataset.id)}`;
  });

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
      if (card && card.dataset.id) {
        window.location.href = `newsdetail.html?id=${encodeURIComponent(card.dataset.id)}`;
      }
    }
    hasDragged = false;
  });

  window.addEventListener('resize', () => {
    currentIndex = 0;
    buildDots();
    goTo(0);
  });

  buildDots();
}

/* ── Share buttons ──────────────────────────── */
(function initShareButtons() {
  const pageUrl = encodeURIComponent(window.location.href);
  const title   = encodeURIComponent(document.title);

  const fb = document.getElementById('share-facebook');
  const li = document.getElementById('share-linkedin');
  const wa = document.getElementById('share-whatsapp');

  if (fb) fb.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  if (li) li.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  if (wa) wa.href = `https://api.whatsapp.com/send?text=${title}%20${pageUrl}`;
})();

/* ── Init ───────────────────────────────────── */
loadArticle();
loadRelatedStories();