const API_BASE      = 'http://localhost:8888';
const GET_POSTS_URL = `${API_BASE}/get-posts.php`;
const UPLOADS_DIR   = `${API_BASE}/uploads/`;

const urlParams = new URLSearchParams(window.location.search);
const articleId = urlParams.get('id');

function resolveImage(post) {
  if (post.gambar_url && post.gambar_url.trim() !== '') {
    return post.gambar_url;
  }
  if (post.gambar && post.gambar.trim() !== '') {
    return UPLOADS_DIR + post.gambar;
  }
  return null;
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

function renderHero(imageUrl) {
  const container = document.getElementById('hero-container');
  if (!container || !imageUrl) return;
  container.innerHTML = `
    <img
      src="${imageUrl}"
      alt="Hero Image"
      style="width:100%;height:320px;object-fit:cover;border-radius:12px;"
      onerror="this.outerHTML='<svg class=\'placeholder-icon\' width=\'48\' height=\'48\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.5\'><rect x=\'3\' y=\'3\' width=\'18\' height=\'18\' rx=\'2\'/><circle cx=\'8.5\' cy=\'8.5\' r=\'1.5\'/><polyline points=\'21 15 16 10 5 21\'/></svg><span class=\'placeholder-text\'>Image Placeholder</span>'"
    />`;
}

async function loadArticle() {
  if (!articleId) return;

  try {
    const res  = await fetch(`${GET_POSTS_URL}?id=${encodeURIComponent(articleId)}`);
    const data = await res.json();

    const post = Array.isArray(data) ? data[0] : data;
    if (!post) return;

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
        ? post.konten
        : '<p>' + post.konten.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
    }

    renderHero(resolveImage(post));

  } catch (err) {
    console.error('Gagal memuat artikel:', err);
  }
}

async function loadRelatedStories() {
  try {
    const res   = await fetch(`${GET_POSTS_URL}?status=published`);
    const posts = await res.json();

    if (!Array.isArray(posts) || posts.length === 0) {
      initSlider();
      return;
    }

    const related = posts
      .filter(p => String(p.id) !== String(articleId))
      .slice(0, 6);

    if (related.length === 0) {
      initSlider();
      return;
    }

    const track = document.getElementById('sliderTrack');
    track.innerHTML = '';

    related.forEach(post => {
      const imgUrl = resolveImage(post);
      const thumbHTML = imgUrl
        ? `<img
            class="story-thumb"
            src="${imgUrl}"
            alt="${post.judul || ''}"
            onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
          />${placeholderThumb()}`
        : placeholderThumb();

      const date = post.created_at
        ? new Date(post.created_at).toLocaleDateString('id-ID', {
            year: 'numeric', month: 'short', day: 'numeric'
          })
        : '';

      const card = document.createElement('div');
      card.className = 'story-card';
      card.innerHTML = `
        ${thumbHTML}
        <div class="story-body">
          <span class="story-badge">News</span>
          <div class="story-card-title">${post.judul || 'Untitled'}</div>
          <div class="story-date">${date}</div>
          <a href="news-detail.html?id=${post.id}" class="story-link">Read More →</a>
        </div>
      `;
      track.appendChild(card);
    });

    initSlider();

  } catch (err) {
    console.error('Gagal memuat related stories:', err);
    initSlider();
  }
}

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
    return cards[0] ? cards[0].offsetWidth + 20 : 0;
  }

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

  let startX = 0, isDragging = false, startTranslate = 0;

  track.addEventListener('mousedown', e => {
    isDragging = true;
    startX = e.clientX;
    startTranslate = -currentIndex * getCardWidth();
    track.classList.add('dragging');
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    track.style.transform = `translateX(${startTranslate + (e.clientX - startX)}px)`;
  });
  document.addEventListener('mouseup', e => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    const diff = e.clientX - startX;
    if (diff < -50) goTo(currentIndex + 1);
    else if (diff > 50) goTo(currentIndex - 1);
    else goTo(currentIndex);
  });

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    startTranslate = -currentIndex * getCardWidth();
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff < -50) goTo(currentIndex + 1);
    else if (diff > 50) goTo(currentIndex - 1);
    else goTo(currentIndex);
  });

  window.addEventListener('resize', () => {
    currentIndex = 0;
    buildDots();
    goTo(0);
  });

  buildDots();
}

loadArticle();
loadRelatedStories();
