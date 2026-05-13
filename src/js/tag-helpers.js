/**
 * Теги маршрутов, градиенты и карточка маршрута.
 */

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

function getGradientVar(tag) {
  const map = {
    кайфовый_ракурс: '--gradient-sunset',
    цифровой_детокс: '--gradient-forest',
    место_силы: '--gradient-sacred',
    ветер_в_лицо: '--gradient-sky',
    буузы_и_точка: '--gradient-warm',
    этно_погружение: '--gradient-ethno',
    дикий_Байкал: '--gradient-wild',
    городской_вайб: '--gradient-urban'
  };
  return map[tag] || '--gradient-warm';
}

/**
 * Редакционный заголовок секции: «eyebrow» + h2.
 */
function sectionIntro(eyebrow, titleHtml) {
  return `
    <header class="section-intro reveal">
      <p class="section-eyebrow">${eyebrow}</p>
      <h2>${titleHtml}</h2>
    </header>`;
}

function renderRouteCard(route) {
  const gradientVar = getGradientVar(route.tags[0]);
  const tagNames = route.tags.map((t) => tagLabels[t] || t).join(' · ');

  return `
    <div class="card card-dark card-gradient reveal" style="background: var(${gradientVar})">
      <div class="card-content">
        <h3>${route.title}</h3>
        <p>${tagNames}</p>
        <p>${route.duration} · ${route.budget}</p>
        <a href="#/routes/${route.id}" class="btn">Подробнее</a>
      </div>
    </div>
  `;
}
