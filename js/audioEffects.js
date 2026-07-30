// =====================================================================
// МОДУЛЬ: audioEffects.js
// Короткие звуковые эффекты, синтезированные «на лету» через Web Audio
// API (без единого аудиофайла). Экспортирует две функции, которые
// импортируют другие модули: playShutterSound() — galleryLightbox.js,
// playSuccessSound() — successModal.js. Сам этот модуль ничего не
// знает о том, кто и когда его вызывает — это и есть развязка
// (decoupling) через ES-модули.
// =====================================================================

import { getAudioContext } from './utils.js';

/** Короткий «щелчок затвора» — быстрый спад частоты + громкости. */
export function playShutterSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

  gain.gain.setValueAtTime(0.22, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

  osc.connect(gain).connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.12);
}

/** Короткий «до-ми-соль» арпеджио для успешной отправки формы. */
export function playSuccessSound() {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  [523.25, 659.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;

    const start = now + i * 0.1;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.18, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.3);

    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + 0.35);
  });
}
