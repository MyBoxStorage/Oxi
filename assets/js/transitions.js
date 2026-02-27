/* ============================================
   TRANSITIONS.JS — ÔXI COZINHA NORDESTINA
   Transições de página com dissolve/fade elegante
   ============================================ */

(function () {
  const overlay = document.getElementById('page-transition');
  if (!overlay) return;

  // Ao entrar na página: overlay sai de cima para baixo (revela)
  window.addEventListener('DOMContentLoaded', () => {
    gsap.fromTo(overlay,
      { yPercent: 0 },
      {
        yPercent: -100,
        duration: 0.7,
        ease: 'power3.inOut',
        delay: 0.1,
        onComplete: () => {
          overlay.style.transform = 'translateY(-100%)';
          // Iniciar animações de entrada da página
          if (typeof window.initPageAnimations === 'function') {
            window.initPageAnimations();
          }
        }
      }
    );
  });

  // Ao sair da página: overlay entra de baixo para cima
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Ignorar âncoras, links externos, mailto, tel
    if (
      href.startsWith('#') ||
      href.startsWith('http') ||
      href.startsWith('mailto') ||
      href.startsWith('tel') ||
      link.hasAttribute('target')
    ) return;

    e.preventDefault();

    gsap.fromTo(overlay,
      { yPercent: 100 },
      {
        yPercent: 0,
        duration: 0.55,
        ease: 'power3.inOut',
        onComplete: () => {
          window.location.href = href;
        }
      }
    );
  });
})();