// =====================================================================
// МОДУЛЬ: galleryFilter.js
// Кнопки-фильтры над галереей (Все / Пейзаж / Природа / Ч/Б / Архитектура).
// Полностью независим от галерейного лайтбокса (galleryLightbox.js) —
// оба модуля работают с одной и той же разметкой, но не знают друг
// о друге и могут использоваться по отдельности.
// =====================================================================

export function initGalleryFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach((item) => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.classList.toggle('is-hidden', !show);
      });
    });
  });
}
