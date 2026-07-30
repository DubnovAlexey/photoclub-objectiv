// =====================================================================
// МОДУЛЬ: smoothScroll.js
// Плавная прокрутка ко всем якорным ссылкам (href="#...") с поправкой
// на высоту фиксированной шапки, плюс закрытие мобильного Offcanvas
// после перехода. Импортирует только флаг из utils.js.
// =====================================================================

import { prefersReducedMotion } from './utils.js';

function scrollToTarget(target) {
  const headerOffset = document.getElementById('mainNavbar').offsetHeight;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset + 1;
  window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

export function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      scrollToTarget(target);

      // Если ссылка была внутри мобильного меню — закрываем Offcanvas
      const offcanvasEl = document.getElementById('mainOffcanvas');
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
      if (offcanvasInstance) offcanvasInstance.hide();
    });
  });

  document.getElementById('scrollCue').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  });

  // Кнопка «наверх»: видимость переключает scrollEffects.js (класс .is-visible),
  // а сам клик-переход — задача именно этого модуля.
  document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
}
