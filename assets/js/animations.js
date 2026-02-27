/**
 * ÔXI — COZINHA NORDESTINA
 * animations.js — GSAP ScrollTrigger animations
 */

(function () {
  'use strict';

  // Aguarda carregamento da página
  window.addEventListener('load', function () {

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      setupFallbackAnimations();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Hero letters: só anima se initHeroAnimations não tiver sido chamado (ex: páginas sem preloader)
    const heroLetters = document.querySelectorAll('.hero__title .letter');
    if (heroLetters.length && !document.body.classList.contains('preloader-done')) {
      gsap.set(heroLetters, { yPercent: 110 });
      gsap.to(heroLetters, {
        yPercent: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.06,
        delay: 0.8,
      });
    }

    // ── FADE UP (gsap-fade-up class) ─────────────────────────
    const fadeUps = document.querySelectorAll('.gsap-fade-up');
    fadeUps.forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // ── LABEL + HEADING SEQUENCIAL ───────────────────────────
    document.querySelectorAll('.section-header, .about-preview__left, .chef-preview__text-col').forEach((group) => {
      const label   = group.querySelector('.label');
      const heading = group.querySelector('h2, h3, .section-title');
      const text    = group.querySelector('p, .section-desc');
      const btn     = group.querySelector('.btn');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      if (label)   tl.fromTo(label,   { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' });
      if (heading) tl.fromTo(heading, { opacity: 0, y: 30  }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2');
      if (text)    tl.fromTo(text,    { opacity: 0, y: 20  }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.3');
      if (btn)     tl.fromTo(btn,     { opacity: 0, y: 15  }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2');
    });

    // ── CARDS STAGGER ────────────────────────────────────────
    const cardGroups = [
      '.destaques__grid',
      '.pratos__grid',
      '.eventos__grid',
      '.blog__grid',
      '.galeria__grid',
      '.chef-filosofia__grid',
      '.eventos-grid-full__list',
    ];

    cardGroups.forEach((selector) => {
      const container = document.querySelector(selector);
      if (!container) return;
      const cards = container.children;

      gsap.fromTo(cards,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // ── IMAGE CLIP REVEAL ────────────────────────────────────
    document.querySelectorAll('.img-reveal').forEach((el) => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // ── GALERIA MASONRY REVEAL ───────────────────────────────
    const galleryItems = document.querySelectorAll('.galeria__item');
    if (galleryItems.length) {
      gsap.fromTo(galleryItems,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.galeria__grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // ── PARALLAX NOSSA TERRA ─────────────────────────────────
    const parallaxBg = document.querySelector('.nossa-terra-preview__bg img');
    if (parallaxBg) {
      gsap.to(parallaxBg, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.nossa-terra-preview',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    // ── NÚMERO CONTADORES (chef page) ────────────────────────
    document.querySelectorAll('[data-count]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-count'));
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo({ val: 0 }, { val: target }, {
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: function () {
              el.textContent = Math.round(this.targets()[0].val);
            }
          });
        }
      });
    });

  }); // end window.load

  // ── FALLBACK: IntersectionObserver ──────────────────────
  function setupFallbackAnimations() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.gsap-fade-up, .img-reveal').forEach((el) => {
      observer.observe(el);
    });
  }

})();
