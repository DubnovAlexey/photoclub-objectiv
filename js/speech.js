// =====================================================================
// МОДУЛЬ: speech.js
// Вся логика SpeechSynthesis API в одном месте: кнопка во вступлении
// hero, кнопка «прослушать статью» в блоке «О хобби» и маленькие
// кнопки-колонки в каждом пункте FAQ — все три используют одну и ту
// же функцию speak(), объявленную внутри модуля.
// =====================================================================

const introText =
  'Добро пожаловать в фотоклуб Объектив! Мы поможем вам научиться видеть свет, композицию и момент — и уверенно снимать на любую камеру.';

export function initSpeechFeatures() {
  const introBtn = document.getElementById('listenIntroBtn');
  const aboutBtn = document.getElementById('listenAboutBtn');

  if (!('speechSynthesis' in window)) {
    // Прогрессивное ухудшение: если браузер не поддерживает API,
    // просто отключаем связанные кнопки, а не ломаем страницу.
    introBtn.disabled = true;
    aboutBtn.disabled = true;
    return;
  }

  let currentButton = null;

  function setButtonSpeaking(button) {
    const icon = button.querySelector('i');
    if (icon) icon.className = 'bi bi-stop-fill';
  }

  function resetButton(button) {
    const icon = button.querySelector('i');
    if (icon) icon.className = button.id === 'listenIntroBtn' ? 'bi bi-volume-up' : 'bi bi-play-fill';
  }

  function speak(text, button) {
    window.speechSynthesis.cancel();
    if (currentButton && currentButton !== button) resetButton(currentButton);

    // Повторный клик по той же кнопке, что уже говорит, — останавливает речь
    if (currentButton === button) {
      currentButton = null;
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ru-RU';
    utterance.rate = 1;
    utterance.pitch = 1;

    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('ru'));
    if (ruVoice) utterance.voice = ruVoice;

    utterance.onstart = () => { setButtonSpeaking(button); currentButton = button; };
    utterance.onend = () => { resetButton(button); currentButton = null; };
    utterance.onerror = () => { resetButton(button); currentButton = null; };

    window.speechSynthesis.speak(utterance);
  }

  introBtn.addEventListener('click', function () { speak(introText, this); });

  aboutBtn.addEventListener('click', function () {
    const text = document.getElementById(this.dataset.targetText).textContent;
    speak(text, this);
  });

  document.querySelectorAll('.faq-listen').forEach((btn) => {
    btn.addEventListener('click', function () {
      const text = this.closest('.accordion-body').querySelector('p').textContent;
      speak(text, this);
    });
  });
}
