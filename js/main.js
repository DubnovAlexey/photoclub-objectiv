// =====================================================================
// МОДУЛЬ: main.js — ТОЧКА ВХОДА
// Единственный файл, подключённый в index.html (<script type="module">).
// Ничего не реализует сам — только импортирует функции-инициализаторы
// из остальных 16 модулей и запускает их после готовности DOM.
// Чтобы убрать со страницы какую-то функцию (например, фоновый плеер),
// достаточно удалить одну строку импорта и одну строку вызова здесь —
// остальные 15 модулей это никак не затронет.
// =====================================================================

import { initThemeToggle }       from './theme.js';
import { initFontSizeControls }  from './fontSize.js';
import { initSmoothScroll }      from './smoothScroll.js';
import { initScrollReveal }      from './scrollReveal.js';
import { initScrollEffects }     from './scrollEffects.js';
import { initGalleryFilter }     from './galleryFilter.js';
import { initGalleryLightbox }   from './galleryLightbox.js';
import { initAmbientPlayer }     from './ambientPlayer.js';
import { initCourseModal }       from './courseModal.js';
import { initInstructorModal }   from './instructorModal.js';
import { initContactForm }       from './contactForm.js';
import { initNewsletterForm }    from './newsletterForm.js';
import { initSpeechFeatures }    from './speech.js';
import { initSpaceSafariFacts }  from './spaceSafari.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initFontSizeControls();
  initSmoothScroll();
  initScrollReveal();
  initScrollEffects();
  initGalleryFilter();
  initGalleryLightbox();

  // Один и тот же параметризованный модуль обслуживает два независимых плеера
  initAmbientPlayer({ audioId: 'ambientAudio', toggleId: 'ambientToggle', iconId: 'ambientIcon', volumeId: 'ambientVolume' });
  initAmbientPlayer({ audioId: 'spaceAmbientAudio', toggleId: 'spaceAmbientToggle', iconId: 'spaceAmbientIcon', volumeId: 'spaceAmbientVolume' });

  initCourseModal();
  initInstructorModal();
  initContactForm();
  initNewsletterForm();
  initSpeechFeatures();
  initSpaceSafariFacts();
});
