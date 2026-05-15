/*Теги маршрутов, градиенты и карточка маршрута.*/

const tagLabels = {
  кайфовый_ракурс: 'Кайфовый ракурс',
  цифровой_детокс: 'Цифровой детокс',
  место_силы: 'Место силы',
  ветер_в_лицо: 'Ветер в лицо',
  буузы_и_точка: 'Буузы и точка',
  этно_погружение: 'Этно-погружение',
  дикий_Байкал: 'Дикий Байкал',
  городской_вайб: 'Городской вайб'
};

/*Редакционный заголовок секции: «eyebrow» + h2.*/
function sectionIntro(eyebrow, titleHtml) {
  return `
    <header class="section-intro reveal">
      <p class="section-eyebrow">${eyebrow}</p>
      <h2>${titleHtml}</h2>
    </header>`;
}

function renderRouteCard(route) {
  const tagNames = route.tags.map((t) => tagLabels[t] || t).join(' · ');

  return `
    <div class="card reveal" style="background: var(--color-surface)">
      <div class="card-content">
        <h3>${route.title}</h3>
        <p>${tagNames}</p>
        <p>${route.duration} · ${route.budget}</p>
        <a href="#/routes/${route.id}" class="btn">Подробнее</a>
      </div>
    </div>
  `;
}
