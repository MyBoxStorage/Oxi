/**
 * ÔXI — COZINHA NORDESTINA
 * navbar.js — Navbar scroll, mobile menu (fullmenu), active links
 */

(function () {
  'use strict';

  const navbar      = document.querySelector('.navbar');
  const hamburger   = document.querySelector('.navbar__hamburger');
  const mobileMenu  = document.querySelector('.mobile-menu') || document.querySelector('.navbar__fullmenu');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link, .fullmenu__link');
  const body        = document.body;

  if (!navbar) return;

  // ── SCROLL BEHAVIOR ──────────────────────────────────────
  let lastScroll = 0;
  let ticking = false;

  function onScroll() {
    const currentScroll = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(() => {
        if (currentScroll > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        if (currentScroll > 200 && currentScroll > lastScroll) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  navbar.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1)';

  // ── MOBILE / FULLMENU ─────────────────────────────────────
  function openMenu() {
    hamburger.classList.add('open');
    if (mobileMenu) mobileMenu.classList.add('open');
    body.classList.add('no-scroll');
    hamburger.setAttribute('aria-expanded', 'true');
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'false');
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    if (mobileMenu) mobileMenu.classList.remove('open');
    body.classList.remove('no-scroll');
    hamburger.setAttribute('aria-expanded', 'false');
    if (mobileMenu) mobileMenu.setAttribute('aria-hidden', 'true');
  }

  function toggleMenu() {
    if (mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // ── ACTIVE LINK ───────────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.navbar__link, .mobile-menu__link, .fullmenu__link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPath)) {
      link.classList.add('active');
    }
    if ((currentPath === '' || currentPath === 'index.html') && (href === 'index.html' || href === './')) {
      link.classList.add('active');
    }
  });

  const style = document.createElement('style');
  style.textContent = `body.no-scroll { overflow: hidden; }`;
  document.head.appendChild(style);

})();
