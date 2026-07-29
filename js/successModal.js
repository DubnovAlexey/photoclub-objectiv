// =====================================================================
// МОДУЛЬ: successModal.js
// Окно «Спасибо!» вызывается ИЗ ДВУХ РАЗНЫХ мест — из формы записи
// на курс (courseModal.js) и из основной формы обратной связи
// (contactForm.js). Ровно случай «используется больше одного раза» →
// вынесено в собственный модуль, чтобы не дублировать одну и ту же
// логику показа модалки и звука в двух файлах.
// =====================================================================

import { playSuccessSound } from './audioEffects.js';

export function showSuccess(text) {
  document.getElementById('successModalText').textContent = text;
  new bootstrap.Modal(document.getElementById('successModal')).show();
  playSuccessSound();
}
