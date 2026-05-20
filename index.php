<?php
require_once __DIR__ . '/api/db-config.php';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Indo Bisnis Education</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&family=Rethink+Sans:ital,wght@0,400;0,500;0,600;0,800&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <link rel="icon" type="image/svg+xml" href="assets/img/favicon.svg">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- NAVBAR -->
  <nav>
    <div class="nav-logo">
      <img src="assets/img/logo.png" alt="Indo Bisnis Education Logo">
    </div>
    <div class="nav-links-wrapper">
      <ul class="nav-links">
        <li><a href="#tentang">Tentang</a></li>
        <li><a href="#programs">Our Programs</a></li>
        <li><a href="#partnership">Partnership</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#news">News</a></li>
        <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">Contact Us</a></li>
      </ul>
    </div>
  </nav>

  <!-- HERO TEXT -->
  <section class="hero">
    <div class="hero-left">
      <h1>Where Learning Turns Into<br>Real World Experience</h1>
    </div>
    <div class="hero-right">
      <div class="hero-right-inner">
        <p>A place where knowledge, practice, and experience come together.</p>
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" class="btn-work">Work with Us</a>
      </div>
    </div>
  </section>

  <!-- HERO CAROUSEL -->
  <div class="hero-image-wrapper">
    <div class="hero-carousel" id="heroCarousel">
      <div class="carousel-track" id="carouselTrack">
        <div class="carousel-slide"><img src="assets/img/galeri_1.jpeg" alt="Gallery 1"></div>
        <div class="carousel-slide"><img src="assets/img/galeri_2.jpeg" alt="Gallery 2"></div>
        <div class="carousel-slide"><img src="assets/img/galeri_3.jpeg" alt="Gallery 3"></div>
        <div class="carousel-slide"><img src="assets/img/galeri_4.jpeg" alt="Gallery 4"></div>
        <div class="carousel-slide"><img src="assets/img/galeri_5.jpeg" alt="Gallery 5"></div>
        <div class="carousel-slide"><img src="assets/img/galeri_6.jpeg" alt="Gallery 6"></div>
      </div>
      <button class="carousel-btn prev" id="carouselPrev" aria-label="Previous">
        <svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"/></svg>
      </button>
      <button class="carousel-btn next" id="carouselNext" aria-label="Next">
        <svg viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6"/></svg>
      </button>
      <div class="carousel-dots" id="carouselDots"></div>
      <div class="carousel-progress" id="carouselProgress"></div>
    </div>
  </div>

  <!-- ABOUT SECTION -->
  <section class="about-section" id="tentang">
    <h2 class="about-heading">More Than a<br>Course – We're<br>Your Learning Partner.</h2>
    <hr class="about-divider">
    <div class="about-body">
      <p class="about-desc">We believe learning should be practical and meaningful. Through expert guidance and hands-on experience, we help you develop skills with confidence.</p>
    </div>
  </section>

  <!-- PROGRAMS SECTION — HARDCODED -->
  <section class="programs-section" id="programs">
    <h2 class="programs-heading">Programs That<br>Shape Your Growth</h2>
    <div class="programs-slider-wrapper">
      <div class="programs-track" id="programsTrack">

        <!-- PAGE 1 -->
        <div class="programs-page">
          <div class="program-card" onclick="openPopup(0)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M3 3h18v4H3z"/><path d="M5 7v13h14V7"/><path d="M10 12h4"/></svg></div>
              <span class="card-title">SMK PK Partner Perdagangan</span>
            </div>
            <p class="card-desc">Kemitraan resmi SMK bidang perdagangan dengan simulasi bisnis dan mentoring praktisi industri.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(1)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg></div>
              <span class="card-title">Pendampingan Pembukaan Usaha</span>
            </div>
            <p class="card-desc">Bimbingan merintis usaha mandiri: rencana bisnis, perizinan, permodalan, hingga pemasaran digital.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(2)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg></div>
              <span class="card-title">Recruitment</span>
            </div>
            <p class="card-desc">Menghubungkan lulusan SMK terbaik dengan perusahaan mitra melalui seleksi terstruktur dan transparan.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(3)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <span class="card-title">Workshop</span>
            </div>
            <p class="card-desc">Pelatihan intensif berbasis praktik yang dipandu praktisi industri aktif selama 1–3 hari.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(4)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"/><path d="M20.49 15a9 9 0 0 1-14.85 3.36L1 14"/></svg></div>
              <span class="card-title">Sinkronisasi Kurikulum</span>
            </div>
            <p class="card-desc">Penyelarasan kurikulum SMK dengan kebutuhan industri untuk memastikan kompetensi lulusan relevan.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(5)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><circle cx="12" cy="10" r="3"/><path d="M7 21l5-3 5 3"/></svg></div>
              <span class="card-title">Sertifikasi Kompetensi Guru</span>
            </div>
            <p class="card-desc">Uji kompetensi dan sertifikasi guru SMK sesuai standar LSP, diakui oleh dunia industri.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
        </div>

        <!-- PAGE 2 -->
        <div class="programs-page">
          <div class="program-card" onclick="openPopup(6)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></div>
              <span class="card-title">Kelas Entrepreneur</span>
            </div>
            <p class="card-desc">Menumbuhkan jiwa wirausaha siswa melalui simulasi bisnis, pitching ide, dan mentoring langsung.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(7)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg></div>
              <span class="card-title">Pendamping UKK</span>
            </div>
            <p class="card-desc">Pendampingan intensif persiapan Uji Kompetensi Keahlian oleh asesor berpengalaman.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(8)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
              <span class="card-title">Industri Mengajar</span>
            </div>
            <p class="card-desc">Profesional industri hadir langsung ke kelas sebagai pengajar tamu untuk berbagi pengalaman nyata.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(9)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
              <span class="card-title">Guru Magang</span>
            </div>
            <p class="card-desc">Guru SMK magang di perusahaan mitra untuk memperbarui wawasan dan keterampilan industri terkini.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div class="program-card" onclick="openPopup(10)">
            <div class="card-header">
              <div class="card-icon"><svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><polyline points="12,12 12,16"/><polyline points="10,14 14,14"/></svg></div>
              <span class="card-title">Praktek Lapangan Kerja</span>
            </div>
            <p class="card-desc">PKL terstruktur di perusahaan mitra dengan mentor industri dan portofolio kompetensi untuk melamar kerja.</p>
            <div class="card-arrow"><div class="arrow-box"><svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg></div></div>
          </div>
          <div style="visibility:hidden; pointer-events:none;" class="program-card"></div>
        </div>

      </div>
    </div>
    <div class="programs-nav">
      <div class="programs-dots" id="programsDots"></div>
      <div class="programs-nav-btns">
        <button class="programs-nav-btn" id="progPrev">
          <svg viewBox="0 0 14 14"><polyline points="9,3 5,7 9,11"/></svg>
        </button>
        <button class="programs-nav-btn" id="progNext">
          <svg viewBox="0 0 14 14"><polyline points="5,3 9,7 5,11"/></svg>
        </button>
      </div>
    </div>
  </section>

  <!-- PROGRAM POPUP -->
  <div class="popup-overlay" id="popupOverlay" onclick="closePopupOutside(event)">
    <div class="popup-box" id="popupBox">
      <button class="popup-close" onclick="closePopup()">
        <svg viewBox="0 0 16 16"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
      </button>
      <div class="popup-icon" id="popupIcon"></div>
      <span class="popup-tag" id="popupTag">Program</span>
      <h3 class="popup-title" id="popupTitle"></h3>
      <p class="popup-body" id="popupBody"></p>
    </div>
  </div>

  <!-- STEPS TO PARTNER SECTION -->
  <section class="steps-section" id="partnership">
    <h2 class="steps-heading">Steps to Partner<br>With Us</h2>
    <div class="steps-wrapper">
      <div class="steps-timeline">
        <div class="step-item">
          <div class="step-circle-wrap">
            <span class="step-num-bg">01</span>
            <div class="step-circle">
              <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            </div>
          </div>
          <p class="step-title">Initial Visit</p>
          <p class="step-desc">Tahap awal pemetaan kebutuhan dan visi institusi Anda untuk menentukan arah strategi.</p>
        </div>
        <div class="step-item">
          <div class="step-circle-wrap">
            <span class="step-num-bg">02</span>
            <div class="step-circle">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
            </div>
          </div>
          <p class="step-title">MoU Draft Review</p>
          <p class="step-desc">Pertukaran ide dan strategi kolaboratif untuk mematangkan konsep program.</p>
        </div>
        <div class="step-item">
          <div class="step-circle-wrap">
            <span class="step-num-bg">03</span>
            <div class="step-circle">
              <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
          </div>
          <p class="step-title">Program Discussion</p>
          <p class="step-desc">Finalisasi rencana kerja detail dan kurikulum yang disesuaikan dengan standar industri.</p>
        </div>
        <div class="step-item">
          <div class="step-circle-wrap">
            <span class="step-num-bg">04</span>
            <div class="step-circle">
              <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            </div>
          </div>
          <p class="step-title">MoU Signing</p>
          <p class="step-desc">Eksekusi program secara terukur dengan pengawasan tim ahli profesional.</p>
        </div>
        <div class="step-item">
          <div class="step-circle-wrap">
            <span class="step-num-bg">05</span>
            <div class="step-circle">
              <svg viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"/><path d="M20.618 5.984A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 0 0-.382-3.016z"/></svg>
            </div>
          </div>
          <p class="step-title">Partnership Implementation</p>
          <p class="step-desc">Analisis hasil akhir dan perbaikan berkelanjutan untuk dampak maksimal.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- GALLERY SECTION -->
  <section class="gallery-section" id="gallery">
    <div class="gallery-header">
      <h2 class="gallery-heading">A Glimpse of<br>Our Journey</h2>
      <button class="btn-see-more" onclick="openGalleryPopup()">
        See More
        <svg viewBox="0 0 14 14"><line x1="3" y1="11" x2="11" y2="3"/><polyline points="5,3 11,3 11,9"/></svg>
      </button>
    </div>
    <div class="gallery-grid">
      <div class="gallery-img img-1" onclick="openLightbox(0)">
        <img src="assets/img/galeri_1.jpeg" alt="Gallery 1">
        <div class="expand-icon"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>
      </div>
      <div class="gallery-img img-2" onclick="openLightbox(1)">
        <img src="assets/img/galeri_2.jpeg" alt="Gallery 2">
        <div class="expand-icon"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>
      </div>
      <div class="gallery-img img-3" onclick="openLightbox(2)">
        <img src="assets/img/galeri_3.jpeg" alt="Gallery 3">
        <div class="expand-icon"><svg viewBox="0 0 24 24"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg></div>
      </div>
    </div>
  </section>

  <!-- LIGHTBOX -->
  <div class="lb-overlay" id="lbOverlay" onclick="handleLbOverlayClick(event)">
    <div class="lb-box" id="lbBox">
      <button class="lb-close" onclick="closeLightbox()">
        <svg viewBox="0 0 16 16"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
      </button>
      <div class="lb-img-wrap"><img id="lbImg" src="" alt=""></div>
      <div class="lb-bar">
        <span class="lb-caption" id="lbCaption"></span>
        <div class="lb-right">
          <div class="lb-dots" id="lbDots"></div>
          <div class="lb-nav">
            <button class="lb-nav-btn" onclick="lbNavigate(-1)" aria-label="Previous">
              <svg viewBox="0 0 24 24"><polyline points="15,18 9,12 15,6"/></svg>
            </button>
            <button class="lb-nav-btn" onclick="lbNavigate(1)" aria-label="Next">
              <svg viewBox="0 0 24 24"><polyline points="9,18 15,12 9,6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- GALLERY POPUP -->
  <div class="gallery-popup-overlay" id="galleryPopupOverlay" onclick="handleGalleryOverlayClick(event)">
    <div class="gallery-popup-sheet" id="galleryPopupSheet">
      <div style="position:relative;"><div class="gallery-drag-handle"></div></div>
      <div class="gallery-popup-header">
        <span class="gallery-popup-title">A Glimpse of Our Journey</span>
        <button class="gallery-popup-close" onclick="closeGalleryPopup()">
          <svg viewBox="0 0 16 16"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
        </button>
      </div>
      <div class="gallery-popup-body" id="galleryPopupBody">
        <div class="gallery-masonry" id="galleryMasonry"></div>
        <div class="gallery-load-hint" id="galleryLoadHint">Scroll untuk melihat lebih banyak foto ↓</div>
      </div>
    </div>
  </div>

  <!-- LATEST NEWS SECTION -->
  <section class="news-section" id="news">
    <div class="news-header">
      <h2 class="news-heading">Latest News.</h2>
      <div class="news-nav">
        <button class="news-nav-btn" onclick="scrollNews(-1)">
          <svg viewBox="0 0 14 14"><polyline points="9,3 5,7 9,11"/></svg>
        </button>
        <button class="news-nav-btn" onclick="scrollNews(1)">
          <svg viewBox="0 0 14 14"><polyline points="5,3 9,7 5,11"/></svg>
        </button>
      </div>
    </div>
    <div class="news-track-wrapper">
      <div class="news-track" id="newsTrack">
        <!-- Diisi oleh main.js dari API -->
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="cta-section">
    <div class="cta-inner">
      <h2 class="cta-heading">Ready To Collaborate?</h2>
      <p class="cta-desc">Let's develop your potential with innovative training programs, industry partnerships, and practical learning experiences from Bismar Education.</p>
      <div class="cta-buttons">
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" class="btn-cta-primary">Start Free Consultation</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="footer-main">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="assets/img/logo.png" alt="Bismar Education Logo">
          <span class="footer-brand-name">Bismar Education</span>
        </div>
        <p class="footer-brand-desc">Solusi terintegrasi untuk transformasi pendidikan dan pengembangan sumber daya manusia unggul di Indonesia.</p>
        <div class="footer-socials">
          <a href="https://linkedin.com/company/bismar-education" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="LinkedIn"><svg viewBox="0 0 24 24" stroke="#4A5568" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></a>
          <a href="https://facebook.com/bismareducation" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="Facebook"><svg viewBox="0 0 24 24" stroke="#4A5568" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 18 0A9 9 0 0 0 3 12z"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg></a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" class="social-btn" aria-label="WhatsApp"><svg viewBox="0 0 24 24" stroke="#4A5568" fill="none" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11v2a9 9 0 0 0 9 9"/><path d="M21 5c0 0-5 2-8 2H7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h1l1 5h2l1-5c3 0 8 2 8 2V5z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Quick Link</p>
        <a href="#programs" class="footer-link">Programs</a>
        <a href="#partnership" class="footer-link">Partnership</a>
        <a href="#gallery" class="footer-link">Gallery</a>
        <a href="#news" class="footer-link">News</a>
      </div>
      <div class="footer-col">
        <p class="footer-col-title">Legal</p>
        <a href="#" class="footer-link">Privacy Policy</a>
        <a href="#" class="footer-link">Terms & Conditions</a>
        <a href="#" class="footer-link">Help Center</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2024 Bismar Education. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
    </div>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>