// =====================================================================
// МОДУЛЬ: newsletterForm.js
// Мини-форма подписки в футере. Показывает Bootstrap Alert, созданный
// «на лету» через document.createElement — отдельно от successModal.js,
// намеренно: здесь нужен лёгкий инлайн-алерт, а не модальное окно.
// =====================================================================

export function initNewsletterForm() {
  const form = document.getElementById('newsletterForm');
  const zone = document.getElementById('newsletterAlertZone');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail');
    if (!email.checkValidity()) {
      email.classList.add('is-invalid');
      return;
    }
    email.classList.remove('is-invalid');

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show py-2 px-3 small';
    alertDiv.setAttribute('role', 'alert');
    alertDiv.innerHTML =
      '<i class="bi bi-info-circle-fill"></i> Форма работает, но это демо без сервера — подписка нигде не сохраняется.' +
      '<button type="button" class="btn-close btn-close-sm" data-bs-dismiss="alert" aria-label="Закрыть"></button>';

    zone.innerHTML = '';
    zone.appendChild(alertDiv);
    form.reset();

    setTimeout(() => {
      const instance = bootstrap.Alert.getOrCreateInstance(alertDiv);
      if (alertDiv.isConnected) instance.close();
    }, 4000);
  });
}
