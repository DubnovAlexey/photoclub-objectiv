// =====================================================================
// МОДУЛЬ: ambientPlayer.js
// Управление фоновым звуком через <audio> (HTMLMediaElement): play()/pause()/
// volume — классический Audio API, в отличие от синтеза в audioEffects.js.
// Функция принимает набор id элементов и настраивает ОДИН плеер — на сайте
// используется дважды (студийная атмосфера + космический эмбиент) с разными
// id, без копирования кода.
// =====================================================================

import { getAudioContext } from './utils.js';

export function initAmbientPlayer({ audioId, toggleId, iconId, volumeId }) {
  const ambient = document.getElementById(audioId);
  const toggleBtn = document.getElementById(toggleId);
  const icon = document.getElementById(iconId);
  const volumeSlider = document.getElementById(volumeId);
  const player = toggleBtn.closest('.audio-player');

  ambient.volume = volumeSlider.value / 100;
  player.classList.add('is-paused');

  toggleBtn.addEventListener('click', () => {
    getAudioContext(); // «пробуждает» общий AudioContext по жесту пользователя
    if (ambient.paused) {
      ambient.play();
      icon.className = 'bi bi-pause-fill';
      player.classList.remove('is-paused');
    } else {
      ambient.pause();
      icon.className = 'bi bi-play-fill';
      player.classList.add('is-paused');
    }
  });

  volumeSlider.addEventListener('input', () => {
    ambient.volume = volumeSlider.value / 100;
  });
}
