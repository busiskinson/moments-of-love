/* ==========================================================================
   OUR MONTHSARY — SCRIPT
   Handles: floating hearts, scroll-reveal, active nav link, mobile menu,
   lightbox gallery, and the optional music toggle.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Bouquet: swap illustration for the real photo once it exists ---------- */
  const bouquetPhoto = document.getElementById('bouquetPhoto');
  const bouquetIllustration = document.getElementById('bouquetIllustration');

  if (bouquetPhoto && bouquetIllustration) {
    const showRealPhoto = () => {
      bouquetPhoto.style.display = 'block';
      bouquetIllustration.style.display = 'none';
    };
    const keepIllustration = () => {
      bouquetPhoto.style.display = 'none';
    };

    bouquetPhoto.addEventListener('load', showRealPhoto);
    bouquetPhoto.addEventListener('error', keepIllustration);

    // If the image was already cached/loaded before listeners attached, check now.
    if (bouquetPhoto.complete) {
      if (bouquetPhoto.naturalWidth > 0) {
        showRealPhoto();
      } else {
        keepIllustration();
      }
    }
  }

  /* ---------- Floating hearts (subtle, capped count) ---------- */
  const heartsLayer = document.getElementById('floatingHearts');
  const HEART_COUNT = 8;

  for (let i = 0; i < HEART_COUNT; i++) {
    const heart = document.createElement('i');
    heart.className = 'fa-solid fa-heart floating-heart';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = (10 + Math.random() * 14) + 'px';
    heart.style.animationDuration = (14 + Math.random() * 10) + 's';
    heart.style.animationDelay = (Math.random() * 14) + 's';
    heartsLayer.appendChild(heart);
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach((el) => revealObserver.observe(el));

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach((section) => navObserver.observe(section));

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.mobile-link').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGallery = [];
  let currentIndex = 0;
  let currentCaption = '';

  function openLightbox(images, caption, startIndex) {
    currentGallery = images;
    currentCaption = caption;
    currentIndex = startIndex;
    updateLightboxImage();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxImage() {
    lightboxImg.src = currentGallery[currentIndex];
    lightboxImg.alt = currentCaption;
    lightboxCaption.textContent = currentGallery.length > 1
      ? `${currentCaption} (${currentIndex + 1}/${currentGallery.length})`
      : currentCaption;
    lightboxPrev.style.display = currentGallery.length > 1 ? 'flex' : 'none';
    lightboxNext.style.display = currentGallery.length > 1 ? 'flex' : 'none';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.polaroid-card:not(.is-placeholder)').forEach((card) => {
    card.addEventListener('click', () => {
      const images = JSON.parse(card.dataset.gallery || '[]');
      const caption = card.dataset.caption || '';
      if (images.length) openLightbox(images, caption, 0);
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  lightboxPrev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
    updateLightboxImage();
  });

  lightboxNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentGallery.length;
    updateLightboxImage();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') lightboxPrev.click();
    if (e.key === 'ArrowRight') lightboxNext.click();
  });

  /* ---------- Optional music playlist (never autoplays) ---------- */
  // Add or reorder songs here. Files go in assets/music/ using these exact names.
  const playlist = [
    { src: 'assets/music/Daniel Caesar Best Part.mp3', title: 'Best Part', artist: 'Daniel Caesar' },
    { src: 'assets/music/Daniel Caesar Neu Roses.mp3', title: "Neu Roses (Transgressor's Song)", artist: 'Daniel Caesar' }
  ];
  let currentTrack = 0;

  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  const musicHint = document.getElementById('musicHint');
  const musicTrackLabel = document.getElementById('musicTrackLabel');
  const trackTitle = document.getElementById('trackTitle');
  const trackArtist = document.getElementById('trackArtist');

  function loadTrack(index) {
    const track = playlist[index];
    bgMusic.src = encodeURI(track.src);
    if (trackTitle) trackTitle.textContent = track.title;
    if (trackArtist) trackArtist.textContent = track.artist;
  }

  // Move to the next song when one finishes; loop back to the first
  // after the last so the playlist repeats for as long as it's playing.
  bgMusic.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    bgMusic.play().catch(() => {});
  });

  loadTrack(currentTrack);

  // Briefly show a hint bubble pointing at the music button so it isn't
  // missed, then fade it out on its own (never plays audio automatically).
  if (musicHint) {
    setTimeout(() => musicHint.classList.add('is-visible'), 1500);
    setTimeout(() => musicHint.classList.remove('is-visible'), 7000);
  }

  musicToggle.addEventListener('click', () => {
    if (musicHint) musicHint.classList.remove('is-visible');

    if (bgMusic.paused) {
      bgMusic.play().catch(() => {
        // If the MP3 files haven't been added to assets/music/ yet, fail silently.
        console.info('Add your two songs to assets/music/ (see js/script.js) to enable playback.');
      });
      musicToggle.classList.add('is-playing');
      musicToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
      if (musicTrackLabel) musicTrackLabel.classList.add('is-visible');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('is-playing');
      musicToggle.innerHTML = '<i class="fa-solid fa-music"></i>';
      if (musicTrackLabel) musicTrackLabel.classList.remove('is-visible');
    }
  });

});
