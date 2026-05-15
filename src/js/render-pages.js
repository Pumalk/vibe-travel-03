/**
 * Рендер страниц SPA (контент #main-content).
 */

function renderHome() {
  const main = document.getElementById('main-content');
  const topRoutes = [...appData.routes].sort(() => 0.5 - Math.random()).slice(0, 3);

  main.innerHTML = `
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-shimmer" aria-hidden="true"></div>
      <div class="hero-content">
        <h1>Открой Бурятию через эмоции</h1>
        <p>Выбери свой вайб и отправляйся в приключение</p>
        <a href="#/routes" class="btn-outline">Смотреть маршруты</a>
      </div>
    </section>
    <div class="kinetic-bar reveal" aria-hidden="true">
      <div class="kinetic-bar reveal" aria-hidden="true">
        <div class="kinetic-bar__track">
          <span>Бурятия · Байкал · буузы · шаманский круг · степь · Улан-Удэ · дорога к солнцу · вайб · </span>
          <span>Бурятия · Байкал · буузы · шаманский круг · степь · Улан-Удэ · дорога к солнцу · вайб · </span>
          <span>Бурятия · Байкал · буузы · шаманский круг · степь · Улан-Удэ · дорога к солнцу · вайб · </span>
          <span>Бурятия · Байкал · буузы · шаманский круг · степь · Улан-Удэ · дорога к солнцу · вайб · </span>
          <span>Бурятия · Байкал · буузы · шаманский круг · степь · Улан-Удэ · дорога к солнцу · вайб · </span>
        </div>
      </div>
    </div>
    <section class="section">
      ${sectionIntro('Кураторская подборка', '🔥 Топ-подборки')}
      <div class="cards-grid" id="home-top-grid">
        ${topRoutes.map((r) => renderRouteCard(r)).join('')}
      </div>
    </section>
    <section class="section">
      ${sectionIntro('Исследование', '🗺 Карта приключений')}
      <div id="map-preview" class="map-preview reveal"></div>
    </section>
  `;

  initPreviewMap();
  observeLazyImages();
  setPageMeta({ title: 'Главная' });
}

function renderRoutes() {
  const main = document.getElementById('main-content');
  const allTags = [...new Set(appData.routes.flatMap((r) => r.tags))];

  main.innerHTML = `
    <section class="section">
      ${sectionIntro('Каталог', 'Все маршруты')}
      <div class="filters reveal">
        <div class="chip-group" id="tag-filters">
          ${allTags.map((tag) => `<button type="button" class="chip" data-tag="${tag}">#${tagLabels[tag] || tag}</button>`).join('')}
        </div>
        <select class="filter-select" id="filter-duration">
          <option value="">Любая длительность</option>
          <option value="1 день">1 день</option>
          <option value="2 дня">2 дня</option>
          <option value="3 дня">3 дня</option>
          <option value="4 дня">4 дня</option>
          <option value="5 дней">5 дней</option>
        </select>
        <select class="filter-select" id="filter-budget">
          <option value="">Любой бюджет</option>
          <option value="эконом">Эконом</option>
          <option value="комфорт">Комфорт</option>
        </select>
        <select class="filter-select" id="filter-season">
          <option value="">Любой сезон</option>
          <option value="весна">Весна</option>
          <option value="лето">Лето</option>
          <option value="осень">Осень</option>
          <option value="зима">Зима</option>
        </select>
      </div>
      <div class="cards-grid" id="routes-grid"></div>
    </section>
  `;

  applySavedRouteFiltersToDom();
  setupFilters();
  updateRoutesGrid();
  observeLazyImages();
  setPageMeta({ title: 'Все маршруты' });
}

function setupFilters() {
  const chips = document.querySelectorAll('#tag-filters .chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', function () {
      this.classList.toggle('active');
      updateRoutesGrid();
    });
  });

  document.getElementById('filter-duration').addEventListener('change', updateRoutesGrid);
  document.getElementById('filter-budget').addEventListener('change', updateRoutesGrid);
  document.getElementById('filter-season').addEventListener('change', updateRoutesGrid);
}

function updateRoutesGrid() {
  const activeTags = [...document.querySelectorAll('#tag-filters .chip.active')].map(
    (c) => c.dataset.tag
  );
  const duration = document.getElementById('filter-duration').value;
  const budget = document.getElementById('filter-budget').value;
  const season = document.getElementById('filter-season').value;

  let filtered = appData.routes;
  if (activeTags.length > 0) {
    filtered = filtered.filter((r) => activeTags.some((tag) => r.tags.includes(tag)));
  }
  if (duration) filtered = filtered.filter((r) => r.duration === duration);
  if (budget) filtered = filtered.filter((r) => r.budget === budget);
  if (season) filtered = filtered.filter((r) => r.season.includes(season));

  const grid = document.getElementById('routes-grid');
  if (grid) {
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML =
        '<p class="no-results">😔 Ничего не найдено. Попробуйте изменить фильтры.</p>';
    } else {
      grid.innerHTML = filtered.map((r) => renderRouteCard(r)).join('');
    }
    bindRoutesGridReveals();
  }
  writeSavedRouteFilters();
}

function renderRouteDetail(id) {
  const route = appData.routes.find((r) => r.id == id);
  if (!route) {
    const main = document.getElementById('main-content');
    main.innerHTML = `
      <section class="section">
        <h2>${VIBE_STRINGS.routeNotFound}</h2>
        <p class="detail-lead"><a href="#/routes">Ко всем маршрутам</a></p>
      </section>`;
    setPageMeta({ title: VIBE_STRINGS.routeNotFound });
    return;
  }

  const tagNames = route.tags.map((t) => tagLabels[t] || t).join(', ');

  const main = document.getElementById('main-content');
  main.innerHTML = `
    <section class="section">
      <header class="section-intro reveal">
        <p class="section-eyebrow">Маршрут</p>
        <h2>${route.title}</h2>
      </header>
      <p class="detail-lead reveal">${route.description}</p>
      <div class="detail-stack reveal">
      <p><strong>Теги:</strong> ${tagNames}</p>
      <p><strong>Длительность:</strong> ${route.duration} | <strong>Бюджет:</strong> ${route.budget} | <strong>Сезон:</strong> ${route.season.join(', ')}</p>
      <p><strong>Транспорт:</strong> ${route.transport}</p>
      <p><strong>Советы:</strong> ${route.tips}</p>
      </div>

      <div class="gallery-magazine reveal">
        <div class="magazine-hero">
          <img data-src="assets/gallery/${route.photos[0]}" alt="${route.title}" class="gallery-image lazy" onerror="this.src='https://via.placeholder.com/600x400?text=Фото'">
        </div>
        ${route.photos.length > 1
      ? `
        <div class="magazine-side">
          ${route.photos
        .slice(1, 3)
        .map(
          (p) => `
            <img data-src="assets/gallery/${p}" alt="${route.title}" class="gallery-image lazy" onerror="this.src='https://via.placeholder.com/300x200?text=Фото'">
          `
        )
        .join('')}
        </div>`
      : ''
    }
      </div>

      <h3 class="reveal">📍 Точки маршрута</h3>
      <ul class="reveal">
        ${route.points.map((p) => `<li>${p.name} — ${p.description}</li>`).join('')}
      </ul>

      <div class="detail-actions reveal">
        <button type="button" class="btn" id="pdf-btn">📥 Скачать PDF</button>
        <button type="button" class="btn" id="fav-btn">${isFavorite(route.id) ? '❤️ В избранном' : '🤍 В избранное'}</button>
        <button type="button" class="btn" id="share-btn">🔗 Поделиться</button>
        <button type="button" class="btn" id="build-route-yandex">🚗 Открыть в Яндекс.Картах</button>
      </div>

      <div id="detail-map" class="map-detail reveal"></div>
    </section>
  `;

  initGallery('.gallery-magazine');
  initDetailMap(route);
  observeLazyImages();

  document.getElementById('share-btn').addEventListener('click', function () {
    const url = window.location.href;
    if (navigator.share) {
      navigator
        .share({
          title: route.title,
          text: route.description,
          url: url
        })
        .catch(() => { });
    } else {
      navigator.clipboard.writeText(url).then(() => {
        showToast(VIBE_STRINGS.linkCopied);
      });
    }
  });

  const favBtn = document.getElementById('fav-btn');
  favBtn.addEventListener('click', function () {
    if (isFavorite(route.id)) {
      removeFavorite(route.id);
      this.innerHTML = '🤍 В избранное';
    } else {
      addFavorite(route.id);
      this.innerHTML = '❤️ В избранном';
    }
  });

  document.getElementById('pdf-btn').addEventListener('click', () => {
    downloadPDF(route).catch((err) => {
      console.error(err);
      showToast('Не удалось сформировать PDF. Попробуйте ещё раз.');
    });
  });

  document.getElementById('build-route-yandex').addEventListener('click', () => {
    window.open(buildRouteLink(route, 'yandex'), '_blank');
  });

  setPageMeta({ title: route.title, description: route.description.slice(0, 155) });
}

function renderMapPage() {
  document.getElementById('main-content').innerHTML = `
    <section class="section">
      ${sectionIntro('Карта', 'Интерактивная карта')}
      <div id="full-map" class="map-full reveal"></div>
    </section>
  `;
  initFullMap();
  setPageMeta({ title: 'Карта' });
}

function renderEvents() {
  const main = document.getElementById('main-content');
  main.innerHTML = `
    <section class="section">
      ${sectionIntro('Афиша', '📅 Ближайшие события')}
      <div class="cards-grid centered">
        ${appData.events
      .map(
        (e) => `
          <div class="card event-card reveal">
            <img data-src="assets/events/${e.photo}" alt="${e.name}" class="event-photo lazy" onerror="this.style.display='none'">
            <div class="card-content">
              <h3>${e.name}</h3>
              <p><strong>${e.date}</strong></p>
              <p>${e.place}</p>
              <p>${e.description}</p>
            </div>
          </div>
        `
      )
      .join('')}
      </div>
    </section>
  `;
  observeLazyImages();
  setPageMeta({ title: 'События' });
}

function renderFavorites() {
  const favIds = getFavorites();
  const favRoutes = appData.routes.filter((r) => favIds.includes(r.id));
  const main = document.getElementById('main-content');

  if (favRoutes.length === 0) {
    main.innerHTML = `
            <section class="section">
                ${sectionIntro('Коллекция', '❤️ Избранное')}
                <p class="fav-empty reveal">
                    Пока ничего не добавлено. Нажми сердечко на странице маршрута, чтобы сохранить его здесь.
                </p>
            </section>`;
    setPageMeta({ title: 'Избранное' });
  } else {
    main.innerHTML = `
            <section class="section">
                ${sectionIntro('Коллекция', `❤️ Избранное (${favRoutes.length})`)}
                <div class="cards-grid centered">
                    ${favRoutes.map((r) => renderRouteCard(r)).join('')}
                </div>
            </section>`;
    setPageMeta({ title: 'Избранное' });
  }
  observeLazyImages();
}
