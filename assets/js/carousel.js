/**
 * ÔXI — COZINHA NORDESTINA
 * carousel.js — Testimonials carousel auto-play
 */

(function () {
  'use strict';

  const carousel = document.querySelector('.testimonials__carousel') || document.querySelector('.carousel');
  if (!carousel) return;

  const track  = carousel.querySelector('.testimonials__track') || carousel.querySelector('.carousel__track');
  const dots   = carousel.querySelectorAll('.testimonials__dot') || carousel.querySelectorAll('.carousel__dot');
  const slides = carousel.querySelectorAll('.testimonial-slide') || carousel.querySelectorAll('.carousel__slide');

  if (!track || !slides.length) return;

  let current  = 0;
  let interval = null;
  const DURATION = 5000;

  function goTo(index) {
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  function next() {
    goTo(current + 1);
  }

  function startAuto() {
    interval = setInterval(next, DURATION);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  goTo(0);
  startAuto();

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stopAuto();
      goTo(i);
      startAuto();
    });
  });

  const prevBtn = carousel.querySelector('.carousel__prev');
  const nextBtn = carousel.querySelector('.carousel__next');
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); goTo(current - 1); startAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });

  carousel.addEventListener('mouseenter', stopAuto);
  carousel.addEventListener('mouseleave', startAuto);

  // Suporte a swipe mobile
  let touchStartX = 0;
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(deltaX) > 50) {
      goTo(current + (deltaX < 0 ? 1 : -1));
    }
    startAuto();
  }, { passive: true });

})();
