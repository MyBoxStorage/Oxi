/**
 * ÔXI — COZINHA NORDESTINA
 * cardapio.js — Abas do quadro (Terça–Domingo) + animação
 */

(function () {
  const tabs = document.querySelectorAll('.cardapio-tab');
  const dias = document.querySelectorAll('.cardapio-dia');
  if (!tabs.length) return;

  function activateTab(index) {
    tabs.forEach((t, i) => {
      t.classList.toggle('active', i === index);
      t.setAttribute('aria-selected', i === index);
    });
    dias.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });

    if (typeof gsap !== 'undefined') {
      gsap.fromTo(dias[index],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
      );
    }
  }

  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateTab(i));
  });

  // Detectar dia atual (0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sab)
  const dayMap = { 2: 0, 3: 1, 4: 2, 5: 3, 6: 4, 0: 5 }; // Ter=index0 ... Dom=index5
  const today = new Date().getDay();
  const todayIndex = dayMap[today];

  if (todayIndex !== undefined) {
    tabs[todayIndex]?.classList.add('hoje');
    activateTab(todayIndex);
  } else {
    activateTab(0);
  }
})();
