// =====================================================================
// МОДУЛЬ: contactForm.js
// Главная форма обратной связи: встроенная валидация Bootstrap
// (checkValidity / was-validated) + имитация отправки на сервер
// (в реальном проекте здесь был бы fetch к бэкенду).
// =====================================================================

import { showSuccess } from './successModal.js';

export function initContactForm() {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('cfSubmitBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Отправка...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-send"></i> Отправить сообщение';
      form.reset();
      form.classList.remove('was-validated');
      showSuccess('Спасибо! Ваше сообщение получено, мы ответим на указанный email в течение рабочего дня.');
    }, 900);
  });
}
