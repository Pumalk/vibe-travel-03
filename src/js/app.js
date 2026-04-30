/**
 * app.js – точка входа и рендеры всех страниц VIBE TRAVEL 03.
 * Все функции прокомментированы на русском.
 */

// Глобальные данные
const appData = {
    routes: [],
    events: []
};

// Загрузка JSON
async function loadData() {
    try {
        const [routesRes, eventsRes] = await Promise.all([
            fetch('data/routes.json'),
            fetch('data/events.json')
        ]);
        appData.routes = await routesRes.json();
        appData.events = await eventsRes.json();
        console.log('✅ Данные загружены');
    } catch (e) {
        console.error('Ошибка загрузки', e);
    }
}

// ---------- Рендеры страниц ----------

function renderHome() {
    const main = document.getElementById('main-content');
    const topRoutes = [...appData.routes].sort(() => 0.5 - Math.random()).slice(0, 3);

    main.innerHTML = `
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Открой Бурятию через эмоции</h1>
        <p>Выбери свой вайб и отправляйся в приключение</p>
      </div>
    </section>
    <section class="section">
      <h2>🔥 Топ-подборки</h2>
      <div class="cards-grid">
        ${topRoutes.map(r => renderRouteCard(r)).join('')}
      </div>
    </section>
    <section class="section">
      <h2>🗺 Карта приключений</h2>
      <div id="map-preview" style="height:300px; border-radius:12px;"></div>
    </section>
  `;

    // После вставки HTML инициализируем карту
    initPreviewMap();
}

function renderRoutes() {
    const main = document.getElementById('main-content');

    // Уникальные теги для чипсов
    const allTags = [...new Set(appData.routes.flatMap(r => r.tags))];

    main.innerHTML = `
    <section class="section">
      <h2>Все маршруты</h2>
      <!-- Фильтры -->
      <div class="filters">
        <div class="chip-group" id="tag-filters">
          ${allTags.map(tag => `<button class="chip" data-tag="${tag}">#${tagLabels[tag] || tag}</button>`).join('')}
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
      <!-- Сетка -->
      <div class="cards-grid" id="routes-grid"></div>
    </section>
  `;

    // Привязываем фильтры
    setupFilters();
    updateRoutesGrid();
}

/**
 * Навешивает обработчики на фильтры и вызывает обновление списка.
 */
function setupFilters() {
    const chips = document.querySelectorAll('#tag-filters .chip');
    chips.forEach(chip => {
        chip.addEventListener('click', function () {
            this.classList.toggle('active');
            updateRoutesGrid();
        });
    });

    document.getElementById('filter-duration').addEventListener('change', updateRoutesGrid);
    document.getElementById('filter-budget').addEventListener('change', updateRoutesGrid);
    document.getElementById('filter-season').addEventListener('change', updateRoutesGrid);
}

/**
 * Фильтрует маршруты по выбранным параметрам и перерисовывает сетку.
 */
function updateRoutesGrid() {
    const activeTags = [...document.querySelectorAll('#tag-filters .chip.active')].map(c => c.dataset.tag);
    const duration = document.getElementById('filter-duration').value;
    const budget = document.getElementById('filter-budget').value;
    const season = document.getElementById('filter-season').value;

    let filtered = appData.routes;
    if (activeTags.length > 0) {
        filtered = filtered.filter(r => activeTags.some(tag => r.tags.includes(tag)));
    }
    if (duration) filtered = filtered.filter(r => r.duration === duration);
    if (budget) filtered = filtered.filter(r => r.budget === budget);
    if (season) filtered = filtered.filter(r => r.season.includes(season));

    const grid = document.getElementById('routes-grid');
    if (grid) {
        grid.innerHTML = filtered.map(r => renderRouteCard(r)).join('');
    }
}

function renderRouteDetail(id) {
    const route = appData.routes.find(r => r.id == id);
    if (!route) {
        document.getElementById('main-content').innerHTML = '<h2>Маршрут не найден</h2>';
        return;
    }

    const tagNames = route.tags.map(t => tagLabels[t] || t).join(', ');

    const main = document.getElementById('main-content');
    main.innerHTML = `
    <section class="section">
      <h2>${route.title}</h2>
      <p style="font-size:1.1rem;">${route.description}</p>
      <p><strong>Теги:</strong> ${tagNames}</p>
      <p><strong>Длительность:</strong> ${route.duration} | <strong>Бюджет:</strong> ${route.budget} | <strong>Сезон:</strong> ${route.season.join(', ')}</p>
      <p><strong>Транспорт:</strong> ${route.transport}</p>
      <p><strong>Советы:</strong> ${route.tips}</p>

      <!-- Галерея -->
      <div class="gallery-container">
        <div class="gallery-mobile gallery-scroll">
          ${route.photos.map(p => `<img src="assets/images/${p}" alt="Фото маршрута" class="gallery-image" onerror="this.src='https://via.placeholder.com/400x250?text=Фото'">`).join('')}
        </div>
        <div class="gallery-desktop gallery-grid">
          ${route.photos.map(p => `<img src="assets/images/${p}" alt="Фото маршрута" class="gallery-image" onerror="this.src='https://via.placeholder.com/400x300?text=Фото'">`).join('')}
        </div>
      </div>

      <!-- Точки маршрута -->
      <h3>📍 Точки маршрута</h3>
      <ul>
        ${route.points.map(p => `<li>${p.name} — ${p.description}</li>`).join('')}
      </ul>

      <!-- Кнопки действий -->
      <div class="detail-actions">
        <button class="btn" onclick="alert('Скачивание PDF будет позже')">📥 Скачать PDF</button>
        <button class="btn" id="share-btn">🔗 Поделиться</button>
        <button class="btn" id="build-route-yandex">🚗 Открыть в Яндекс.Картах</button>
        <button class="btn" id="build-route-2gis">🚕 Открыть в 2ГИС</button>
      </div>

      <!-- Карта -->
      <div id="detail-map" style="height:350px; border-radius:12px; margin-top:1rem;"></div>
    </section>
  `;

    // Инициализация галереи (лайтбокс)
    initGallery('.gallery-container');

    // Карта
    initDetailMap(route);

    // Кнопка «Поделиться»
    document.getElementById('share-btn').addEventListener('click', function () {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: route.title,
                text: route.description,
                url: url
            }).catch(() => { });
        } else {
            navigator.clipboard.writeText(url).then(() => {
                alert('Ссылка скопирована!');
            });
        }
    });

    // Кнопки построения маршрута
    document.getElementById('build-route-yandex').addEventListener('click', () => {
        window.open(buildRouteLink(route, 'yandex'), '_blank');
    });
    document.getElementById('build-route-2gis').addEventListener('click', () => {
        window.open(buildRouteLink(route, '2gis'), '_blank');
    });
}

function renderMapPage() {
    document.getElementById('main-content').innerHTML = `
    <section class="section">
      <h2>Интерактивная карта</h2>
      <div id="full-map" style="height:500px; border-radius:12px;"></div>
    </section>
  `;
    initFullMap();
}

function renderEvents() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
    <section class="section">
      <h2>📅 Ближайшие события</h2>
      <div class="cards-grid">
        ${appData.events.map(e => `
          <div class="card">
            <div class="card-content">
              <h3>${e.name}</h3>
              <p><strong>${e.date}</strong></p>
              <p>${e.place}</p>
              <p>${e.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// ---------- Вспомогательные функции ----------

const tagLabels = {
    'кайфовый_ракурс': 'Кайфовый ракурс',
    'цифровой_детокс': 'Цифровой детокс',
    'место_силы': 'Место силы',
    'ветер_в_лицо': 'Ветер в лицо',
    'буузы_и_точка': 'Буузы и точка',
    'этно_погружение': 'Этно-погружение',
    'дикий_Байкал': 'Дикий Байкал',
    'городской_вайб': 'Городской вайб'
};

function getGradientVar(tag) {
    const map = {
        'кайфовый_ракурс': '--gradient-sunset',
        'цифровой_детокс': '--gradient-forest',
        'место_силы': '--gradient-sacred',
        'ветер_в_лицо': '--gradient-sky',
        'буузы_и_точка': '--gradient-warm',
        'этно_погружение': '--gradient-ethno',
        'дикий_Байкал': '--gradient-wild',
        'городской_вайб': '--gradient-urban'
    };
    return map[tag] || '--gradient-warm';
}

function renderRouteCard(route) {
    const gradientVar = getGradientVar(route.tags[0]);
    const tagNames = route.tags.map(t => tagLabels[t] || t).join(' · ');

    return `
    <div class="card" style="background: var(${gradientVar})">
      <div class="card-content">
        <h3>${route.title}</h3>
        <p>${tagNames}</p>
        <p>${route.duration} · ${route.budget}</p>
        <a href="#/routes/${route.id}" class="btn">Подробнее</a>
      </div>
    </div>
  `;
}

// ---------- Инициализация ----------
async function initApp() {
    const preloader = document.getElementById('preloader');
    await loadData();

    const router = new Router({
        '/': () => renderHome(),
        '/routes': () => renderRoutes(),
        '/routes/:id': (params) => renderRouteDetail(params.id),
        '/map': () => renderMapPage(),
        '/events': () => renderEvents()
    });

    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500);

    // Бургер-меню
    const burger = document.getElementById('burgerBtn');
    const navList = document.getElementById('navList');
    burger.addEventListener('click', () => navList.classList.toggle('active'));
    navList.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navList.classList.remove('active')));
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && !e.target.closest('.burger')) {
            navList.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', initApp);