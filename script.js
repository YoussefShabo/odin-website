// ── Carousel ─────────────────────────────────────────
(function () {
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');
  const prev   = document.querySelector('.carousel-arrow.prev');
  const next   = document.querySelector('.carousel-arrow.next');

  if (!slides.length) return;

  let current   = 0;
  let autoTimer = null;
  const INTERVAL = 5000;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  function stopAuto() {
    clearInterval(autoTimer);
  }

  // Arrow buttons
  prev.addEventListener('click', () => { goTo(current - 1); startAuto(); });
  next.addEventListener('click', () => { goTo(current + 1); startAuto(); });

  // Dot buttons
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { goTo(i); startAuto(); });
  });

  // Touch / swipe support
  const carousel = document.querySelector('.carousel');
  let touchStartX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const delta = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      goTo(delta > 0 ? current + 1 : current - 1);
      startAuto();
    }
  }, { passive: true });

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Keyboard support
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); startAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); startAuto(); }
  });

  startAuto();
})();

// ── Mobile nav toggle ────────────────────────────────
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');

  if (!toggle) return;

  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  // Close menu when a link is clicked
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
    });
  });
})();
