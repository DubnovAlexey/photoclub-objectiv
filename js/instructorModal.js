// =====================================================================
// МОДУЛЬ: instructorModal.js
// Данные о преподавателях хранятся прямо в модуле (в реальном проекте
// это мог бы быть fetch к API) и подставляются в ОДНО общее модальное
// окно по клику на карточку — самодостаточный модуль, ни от кого
// не зависит и ни на кого не влияет.
// =====================================================================

const INSTRUCTORS = {
  anna: {
    name: 'Анна Соколова',
    role: 'Портретная и свадебная съёмка',
    img: 'https://i.pravatar.cc/200?img=47',
    bio: 'В фотографии 10 лет, специализируется на естественном свете и работе с людьми, которые «не умеют фотографироваться». Ведёт курс «Портретная съёмка».',
  },
  dmitry: {
    name: 'Дмитрий Волков',
    role: 'Пейзаж и travel-фотография',
    img: 'https://i.pravatar.cc/200?img=12',
    bio: 'Снимает горы и долгие выдержки уже 8 лет, объездил более 20 стран в поисках света. Автор большинства кадров в разделе «Лучшие кадры недели».',
  },
  maria: {
    name: 'Мария Кузнецова',
    role: 'Обработка и ретушь',
    img: 'https://i.pravatar.cc/200?img=33',
    bio: 'Ретушёр и преподаватель Lightroom/Photoshop, помогает превратить исходник в готовую к печати фотографию без потери естественности.',
  },
};

export function initInstructorModal() {
  const modalEl = document.getElementById('instructorModal');

  document.querySelectorAll('[data-instructor]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const info = INSTRUCTORS[btn.dataset.instructor];
      document.getElementById('instructorModalImg').src = info.img;
      document.getElementById('instructorModalName').textContent = info.name;
      document.getElementById('instructorModalRole').textContent = info.role;
      document.getElementById('instructorModalBio').textContent = info.bio;
      new bootstrap.Modal(modalEl).show();
    });
  });
}
