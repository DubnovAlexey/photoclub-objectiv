// =====================================================================
// МОДУЛЬ: theme.js
// Кнопка переключения темы оформления (data-bs-theme на <html>).
// Не зависит ни от одного другого модуля — можно удалить этот файл
// и одну строку импорта в main.js, ничего больше в проекте не сломается.
// =====================================================================

export function initThemeToggle() {
  const btn = document.getElementById('themeToggle');
  const icon = document.getElementById('themeIcon');

  btn.addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-bs-theme') === 'dark';
    html.setAttribute('data-bs-theme', isDark ? 'light' : 'dark');
    icon.className = isDark ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
    btn.setAttribute('aria-pressed', String(!isDark));
  });
}
