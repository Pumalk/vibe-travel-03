// Глобальное хранилище данных
let appData = {
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
        console.log('Данные загружены:', appData);
    } catch (err) {
        console.error('Ошибка загрузки данных:', err);
    }
}

// Рендер страниц (заглушки)
function renderHome() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Открой Бурятию через эмоции</h1>
        <p>Выбери свой вайб и отправляйся в приключение</p>
      </div>
    </section>
    <section class="section">
      <h2>Топ-подборки</h2>
      <div id="top-routes" class="cards-grid"></div>
    </section>
    <section class="section">
      <h2>Карта приключений</h2>
      <div id="map-preview" style="height:300px;background:#eee;">Карта загрузится позже</div>
    </section>
  `;
    // Заполним топ-подборки 3 случайными маршрутами
    const shuffled = [...appData.routes].sort(() => 0.5 - Math.random());
    const top3 = shuffled.slice(0, 3);
    const grid = document.getElementById('top-routes');
    if (grid) {
        grid.innerHTML = top3.map(route => `
      <div class="card" style="background-image: var(--color-gradient-${route.tags[0] === 'кайфовый_ракурс' ? 'sunset' : 'warm'})">
        <div class="card-content">
          <h3>${route.title}</h3>
          <p>${route.duration} · ${route.budget}</p>
          <a href="#/routes/${route.id}" class="btn">Подробнее</a>
        </div>
      </div>
    `).join('');
    }
}

function renderRoutes() {
    const main = document.getElementById('main-content');
    main.innerHTML = `<section class="section"><h2>Маршруты</h2><div id="routes-list" class="cards-grid"></div></section>`;
    const grid = document.getElementById('routes-list');
    if (grid) {
        grid.innerHTML = appData.routes.map(route => `
      <div class="card" style="background-image: var(--color-gradient-${getGradientKey(route.tags[0])})">
        <div class="card-content">
          <h3>${route.title}</h3>
          <p>${route.duration} · ${route.budget}</p>
          <a href="#/routes/${route.id}" class="btn">Подробнее</a>
        </div>
      </div>
    `).join('');
    }
}

function renderRouteDetail(id) {
    const route = appData.routes.find(r => r.id == id);
    const main = document.getElementById('main-content');
    if (!route) {
        main.innerHTML = `<h2>Маршрут не найден</h2>`;
        return;
    }
    main.innerHTML = `
    <section class="section">
      <h2>${route.title}</h2>
      <p>${route.description}</p>
      <p><strong>Длительность:</strong> ${route.duration} | <strong>Бюджет:</strong> ${route.budget}</p>
      <p><strong>Транспорт:</strong> ${route.transport}</p>
      <p><strong>Советы:</strong> ${route.tips}</p>
      <h3>Точки маршрута:</h3>
      <ul>
        ${route.points.map(p => `<li>${p.name} (${p.type})</li>`).join('')}
      </ul>
      <button class="btn" onclick="alert('Скачивание PDF будет позже')">Скачать PDF</button>
      <button class="btn" onclick="alert('Поделиться пока не работает')">Поделиться</button>
      <div id="detail-map" style="height:300px;background:#eee;">Карта</div>
    </section>
  `;
}

function renderMapPage() {
    const main = document.getElementById('main-content');
    main.innerHTML = `<section class="section"><h2>Интерактивная карта</h2><div id="full-map" style="height:500px;background:#eee;">Здесь будет Яндекс.Карта</div></section>`;
}

function renderEvents() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
    <section class="section">
      <h2>События</h2>
      <div class="cards-grid">
        ${appData.events.map(ev => `
          <div class="card event-card">
            <div class="card-content">
              <h3>${ev.name}</h3>
              <p>${ev.date}</p>
              <p>${ev.place}</p>
              <p>${ev.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

function getGradientKey(tag) {
    const map = {
        'кайфовый_ракурс': 'sunset',
        'цифровой_детокс': 'forest',
        'место_силы': 'sacred',
        'ветер_в_лицо': 'sky',
        'буузы_и_точка': 'warm',
        'этно_погружение': 'ethno',
        'дикий_Байкал': 'wild',
        'городской_вайб': 'urban'
    };
    return map[tag] || 'warm';
}

// Инициализация приложения
async function initApp() {
    // Прелоадер
    const preloader = document.getElementById('preloader');
    await loadData();

    // Роутер
    const router = new Router({
        '/': renderHome,
        '/routes': renderRoutes,
        '/routes/:id': (id) => renderRouteDetail(id),
        '/map': renderMapPage,
        '/events': renderEvents,
    });

    // Для динамических маршрутов нужно доработать роутер, пока используем упрощённый вариант
    // Пока вручную будем парсить
    window.addEventListener('hashchange', () => {
        const hash = window.location.hash.slice(1) || '/';
        if (hash.startsWith('/routes/')) {
            const id = hash.split('/')[2];
            renderRouteDetail(id);
        }
    });

    // Скрываем прелоадер
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500);

    // Бургер-меню
    const burger = document.getElementById('burgerBtn');
    const navList = document.getElementById('navList');
    burger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Закрытие меню при клике на ссылку
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });
}

document.addEventListener('DOMContentLoaded', initApp);