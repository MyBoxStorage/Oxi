/**
 * ÔXI — COZINHA NORDESTINA
 * preloader.js — Gerencia preloader e primeira visita
 */

(function () {
  'use strict';

  const preloader = document.querySelector('.preloader');
  if (!preloader) return;

  // Animação de saída do preloader
  function hidePreloader() {
    preloader.classList.add('exit');
    document.body.classList.remove('no-scroll');
    document.body.classList.add('preloader-done');

    if (typeof window.initHeroAnimations === 'function') {
      window.initHeroAnimations();
    }

    preloader.addEventListener('transitionend', () => {
      preloader.remove();
    }, { once: true });

    setTimeout(() => {
      if (preloader.parentNode) preloader.remove();
    }, 1200);
  }

  // Inicia saída após carregamento + delay mínimo para UX
  const minDelay = 2200; // tempo mínimo de exibição do preloader
  const startTime = Date.now();

  function tryHide() {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDelay - elapsed);
    setTimeout(hidePreloader, remaining);
  }

  if (document.readyState === 'complete') {
    tryHide();
  } else {
    window.addEventListener('load', tryHide);
  }

  // Previne scroll durante preloader
  document.body.classList.add('no-scroll');

})();
