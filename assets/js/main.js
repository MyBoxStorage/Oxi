/* ============================================
   MAIN.JS — ÔXI COZINHA NORDESTINA
   Inicialização geral
   ============================================ */

(function () {

  // ── HERO ANIMATIONS (index.html) ──
  window.initHeroAnimations = function () {
    const heroPhrase = document.querySelector('.hero__phrase-svg');
    const heroTitle  = document.querySelector('.hero__title');
    const heroSub    = document.querySelector('.hero__subtitle');
    const heroBtns   = document.querySelector('.hero__btns');
    const heroScroll = document.querySelector('.hero__scroll');

    if (!heroTitle) return;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Frase manifesto SVG stroke (se existir)
    if (heroPhrase) {
      const paths = heroPhrase.querySelectorAll('text, path');
      tl.fromTo(heroPhrase,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );
    }

    // Título letra por letra
    if (heroTitle) {
      const letters = heroTitle.querySelectorAll('.letter');
      tl.fromTo(letters,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: 'power4.out' },
        heroPhrase ? '+=0.4' : 0
      );
    }

    // Subtítulo
    if (heroSub) {
      tl.fromTo(heroSub,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
    }

    // Botões
    if (heroBtns) {
      tl.fromTo(heroBtns,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
    }

    // Scroll indicator
    if (heroScroll) {
      tl.fromTo(heroScroll,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );
      // Bounce loop
      gsap.to(heroScroll, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 0.9,
        ease: 'sine.inOut',
        delay: 2
      });
    }

    // Chamar animações gerais da página
    if (typeof window.initPageAnimations === 'function') {
      window.initPageAnimations();
    }
  };

  // ── PAGE ANIMATIONS (gsap-fade-up, stagger, parallax, reveal) ──
  window.initPageAnimations = function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Fade up
    document.querySelectorAll('.gsap-fade-up').forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Stagger
    document.querySelectorAll('.gsap-stagger').forEach(container => {
      const items = container.querySelectorAll('.gsap-stagger-item');
      if (!items.length) return;
      gsap.fromTo(items,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: container,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Parallax hero bg
    const parallaxEls = document.querySelectorAll('.gsap-parallax');
    parallaxEls.forEach(el => {
      gsap.to(el, {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('section') || el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    });

    // Image reveal
    document.querySelectorAll('.gsap-reveal-img').forEach(el => {
      gsap.fromTo(el,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  };

  // ── FORM SUBMIT (reserva / contato) ──
  document.querySelectorAll('.form-oxi').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
      let valid = true;

      fields.forEach(field => {
        if (!field.value.trim()) {
          valid = false;
          field.classList.add('field-error');
          gsap.to(field, {
            x: [-8, 8, -6, 6, -3, 3, 0],
            duration: 0.4,
            ease: 'power2.inOut'
          });
          setTimeout(() => field.classList.remove('field-error'), 1200);
        } else {
          field.classList.remove('field-error');
        }
      });

      if (!valid) return;

      // Sucesso
      const formBody = form.querySelector('.form__body');
      const formSuccess = form.querySelector('.form__success');
      if (formBody && formSuccess) {
        gsap.to(formBody, {
          opacity: 0, y: -20, duration: 0.4,
          onComplete: () => {
            formBody.style.display = 'none';
            formSuccess.style.display = 'flex';
            gsap.fromTo(formSuccess,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
            );
          }
        });
      }
    });
  });

  // ── INICIALIZAR PÁGINA APÓS CARREGAMENTO ──
  document.addEventListener('DOMContentLoaded', () => {
    // Se não há preloader (páginas internas), iniciar direto
    if (!document.getElementById('preloader')) {
      document.body.classList.add('preloader-done');
      if (typeof window.initPageAnimations === 'function') {
        setTimeout(window.initPageAnimations, 100);
      }
    }
  });
})();