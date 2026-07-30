// =====================================================================
// МОДУЛЬ: fontSize.js
// Кнопки A− / A / A+, меняющие CSS-переменную --base-font-size,
// от которой в variables.css зависит font-size на <html>.
// Самодостаточен: не импортирует ничего из других модулей.
// =====================================================================

const MIN = 14;
const MAX = 22;
const STEP = 1;
const DEFAULT_SIZE = 16;

function getSize(root) {
  return parseFloat(getComputedStyle(root).getPropertyValue('--base-font-size'));
}

function setSize(root, px) {
  const clamped = Math.max(MIN, Math.min(MAX, px));
  root.style.setProperty('--base-font-size', clamped + 'px');
}

export function initFontSizeControls() {
  const root = document.documentElement;

  document.getElementById('fontIncrease').addEventListener('click', () => {
    setSize(root, getSize(root) + STEP);
  });
  document.getElementById('fontDecrease').addEventListener('click', () => {
    setSize(root, getSize(root) - STEP);
  });
  document.getElementById('fontReset').addEventListener('click', () => {
    setSize(root, DEFAULT_SIZE);
  });
}
