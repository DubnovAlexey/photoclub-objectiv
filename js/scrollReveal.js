// =====================================================================
// МОДУЛЬ: scrollReveal.js
// «Появление» блоков с классом .reveal при прокрутке — через
// IntersectionObserver. Каждый элемент проявляется один раз,
// после чего снимается с наблюдения (не тратим ресурсы впустую).
// =====================================================================

import { prefersReducedMotion } from './utils.js';

export function initScrollReveal() {
  const items = document.querySelectorAll('.reveal');

  // Если браузер не поддерживает IntersectionObserver, либо пользователь
  // просит уменьшить анимацию — просто показываем всё сразу, без эффекта.
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((el) => observer.observe(el));
}
