// =====================================================================
// МОДУЛЬ: courseModal.js
// Модальное окно записи на курс: заголовок и цена заполняются из
// data-атрибутов кнопки, которая открыла модалку (event.relatedTarget —
// стандартное событие Bootstrap show.bs.modal).
// =====================================================================

import { showSuccess } from './successModal.js';

export function initCourseModal() {
  const modalEl = document.getElementById('courseModal');

  modalEl.addEventListener('show.bs.modal', (event) => {
    const button = event.relatedTarget;
    document.getElementById('courseModalName').textContent = button.dataset.course;
    document.getElementById('courseModalPrice').textContent = button.dataset.price;
  });

  document.getElementById('courseForm').addEventListener('submit', function (e) {
    e.preventDefault();
    bootstrap.Modal.getInstance(modalEl).hide();
    const courseName = document.getElementById('courseModalName').textContent;
    showSuccess(`Заявка на курс «${courseName}» принята. Мы позвоним вам для подтверждения.`);
    this.reset();
  });
}
