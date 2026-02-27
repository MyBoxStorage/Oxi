/**
 * ÔXI — COZINHA NORDESTINA
 * marquee.js — Marquee infinito (suporta .marquee__track/.marquee__content OU .marquee/.marquee__inner)
 */

(function () {
  'use strict';

  // Estrutura 1: .marquee__track com .marquee__content (clone para loop)
  const tracks = document.querySelectorAll('.marquee__track');
  tracks.forEach((track) => {
    const content = track.querySelector('.marquee__content');
    if (!content) return;
    const cloneCount = Math.ceil(window.innerWidth / content.offsetWidth) + 2;
    for (let i = 0; i < Math.max(2, cloneCount); i++) {
      const clone = content.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
  });

  // Estrutura 2: .marquee com .marquee__inner (animação CSS infinita)
  const marquees = document.querySelectorAll('.marquee');
  marquees.forEach((wrap) => {
    const inner = wrap.querySelector('.marquee__inner');
    if (!inner) return;
    const track = document.createElement('div');
    track.className = 'marquee__track';
    track.setAttribute('aria-hidden', 'true');
    inner.parentNode.insertBefore(track, inner);
    track.appendChild(inner);
    const clone = inner.cloneNode(true);
    track.appendChild(clone);
  });
})();
