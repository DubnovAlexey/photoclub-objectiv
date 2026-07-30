// =====================================================================
// МОДУЛЬ: scrollEffects.js
// Три визуальных эффекта, зависящих от позиции прокрутки — «сжатие»
// шапки, параллакс фона hero, показ/скрытие кнопки «наверх» —
// намеренно объединены в ОДИН модуль с ОДНИМ обработчиком scroll,
// throttled через requestAnimationFrame. Если бы каждый эффект жил
// в своём файле с собственным addEventListener('scroll', ...), браузер
// пересчитывал бы layout три раза за кадр вместо одного — это
// единственное осознанное исключение из принципа «один файл — одна
// мелкая функция», сделанное ради производительности.
// =====================================================================

import { prefersReducedMotion } from './utils.js';

export function initScrollEffects() {
  const navbar = document.getElementById('mainNavbar');
  const heroBg = document.getElementById('heroBg');
  const backToTop = document.getElementById('backToTop');
  let ticking = false;

  function update() {
    const y = window.scrollY;
    navbar.classList.toggle('is-scrolled', y > 40);
    backToTop.classList.toggle('is-visible', y > 500);
    if (heroBg && !prefersReducedMotion) {
      heroBg.style.transform = `translateY(${y * 0.35}px)`;
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
  update(); // выставляем корректное состояние сразу при загрузке
}
