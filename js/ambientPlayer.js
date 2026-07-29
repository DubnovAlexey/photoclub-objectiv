// =====================================================================
// МОДУЛЬ: ambientPlayer.js
// Управление фоновым звуком через обычный тег <audio> (HTMLMediaElement),
// в отличие от синтеза в audioEffects.js — это классический Audio API:
// play() / pause() / volume, а не граф узлов Web Audio API.
// =====================================================================

import { getAudioContext } from './utils.js';

export function initAmbientPlayer() {
  const ambient = document.getElementById('ambientAudio');
  const toggleBtn = document.getElementById('ambientToggle');
  const icon = document.getElementById('ambientIcon');
  const volumeSlider = document.getElementById('ambientVolume');
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
