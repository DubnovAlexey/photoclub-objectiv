// =====================================================================
// МОДУЛЬ: galleryLightbox.js
// Просмотр фото в полноэкранном Bootstrap Modal с навигацией
// «вперёд/назад». Импортирует звук затвора из audioEffects.js —
// наглядный пример того, как один независимый модуль используется
// внутри другого через явный import.
// =====================================================================

import { playShutterSound } from './audioEffects.js';

export function initGalleryLightbox() {
  const items = Array.from(document.querySelectorAll('.gallery-item'));
  const modalEl = document.getElementById('photoModal');
  const modal = new bootstrap.Modal(modalEl);

  const imgEl = document.getElementById('photoModalImg');
  const titleEl = document.getElementById('photoModalTitle');
  const exifEl = document.getElementById('photoModalExif');
  let currentIndex = 0;

  function renderCurrent() {
    const item = items[currentIndex];
    const img = item.querySelector('img');
    imgEl.src = img.src.replace('/700/525', '/1000/750'); // версия с большим разрешением
    imgEl.alt = img.alt;
    titleEl.textContent = item.querySelector('.gallery-item__title').textContent;
    exifEl.textContent = item.querySelector('.gallery-item__exif').textContent;
  }

  items.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      renderCurrent();
      playShutterSound();
      modal.show();
    });
  });

  document.getElementById('photoNextBtn').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % items.length;
    renderCurrent();
  });
  document.getElementById('photoPrevBtn').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    renderCurrent();
  });
}
