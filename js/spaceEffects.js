// =====================================================================
// МОДУЛЬ: spaceEffects.js
// Два самостоятельных интерактивных приёма для секции #space-safari:
// (1) ссылка, «убегающая» от курсора несколько раз подряд — классический
//     шуточный веб-приём, реализован через случайное смещение transform;
// (2) счётчик «вероятности защиты диплома», падающий по мере прокрутки
//     секции — использует уже знакомый IntersectionObserver.
// =====================================================================

const DODGE_LIMIT = 3;

export function initDodgeLink() {
  const link = document.getElementById('safetyDodgeLink');
  const reveal = document.getElementById('safetyReveal');
  if (!link || !reveal) return;

  let dodges = 0;

  link.addEventListener('mouseenter', () => {
    if (dodges < DODGE_LIMIT) {
      dodges += 1;
      const dx = (Math.random() - 0.5) * 160;
      const dy = (Math.random() - 0.5) * 40;
      link.style.transform = `translate(${dx}px, ${dy}px)`;
      link.textContent = 'Тебе это не поможет';
    } else {
      link.style.transform = 'none';
      link.textContent = 'Ладно, держи';
    }
  });

  link.addEventListener('click', (e) => {
    e.preventDefault();
    if (dodges < DODGE_LIMIT) return; // клик засчитывается только после того, как ссылка «сдалась»
    reveal.classList.add('is-open');
  });
}

export function initSurvivalCounter() {
  const section = document.getElementById('space-safari');
  const counter = document.getElementById('survivalCounter');
  const note = document.getElementById('survivalNote');
  if (!section || !counter) return;

  const START = 12, END = 1.5;

  function update() {
    const rect = section.getBoundingClientRect();
    const total = rect.height + window.innerHeight;
    const scrolled = Math.min(Math.max(window.innerHeight - rect.top, 0), total);
    const progress = total > 0 ? scrolled / total : 0;
    const value = START - (START - END) * progress;

    counter.textContent = value.toFixed(1) + '%';
    counter.classList.toggle('is-critical', value < 4);
    if (note) note.textContent = progress > 0.85 ? 'Данные оптимизированы для вашего спокойствия.' : '';
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { update(); ticking = false; }); ticking = true; }
  });
  update();
}
