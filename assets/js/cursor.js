/**
 * ÔXI — COZINHA NORDESTINA
 * cursor.js — Cursor customizado pimenta dedo-de-moça
 */

(function () {
  'use strict';

  // Só roda em dispositivos com hover (desktop)
  if (!window.matchMedia('(hover: hover)').matches) return;

  const cursor = document.querySelector('#custom-cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  const lerp = 0.12;

  // Ativa cursor customizado
  document.body.classList.add('custom-cursor-active');
  cursor.style.display = 'block';

  // Rastreia mouse
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Animação suave com lerp
  function animateCursor() {
    cursorX += (mouseX - cursorX) * lerp;
    cursorY += (mouseY - cursorY) * lerp;

    cursor.style.transform = `translate(${cursorX - 16}px, ${cursorY - 16}px)`;

    requestAnimationFrame(animateCursor);
  }

  requestAnimationFrame(animateCursor);

  // Hover em elementos interativos
  const interactiveSelector = 'a, button, [role="button"], input, textarea, select, label, .highlight-card, .dish-card, .event-card, .blog-card';

  function addHover() { cursor.classList.add('hovering'); }
  function removeHover() { cursor.classList.remove('hovering'); }

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(interactiveSelector)) addHover();
  });

  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(interactiveSelector)) removeHover();
  });

  // Esconde ao sair da janela
  document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
  });

})();
