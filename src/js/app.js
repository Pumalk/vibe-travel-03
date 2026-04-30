/**
 * Главный модуль приложения VIBE TRAVEL 03.
 * Содержит логику загрузки данных, рендеринга страниц и инициализации.
 */

// Глобальное хранилище данных (загружается из JSON)
const appData = {
    routes: [],
    events: []
};

/**
 * Асинхронная загрузка данных из JSON-файлов.
 * Вызывается при старте приложения.
 */
async function loadData() {
    try {
        // Параллельная загрузка двух файлов для ускорения
        const [routesRes, eventsRes] = await Promise.all([
            fetch('data/routes.json'),
            fetch('data/events.json')
        ]);

        // Парсим JSON и сохраняем в глобальный объект
        appData.routes = await routesRes.json();
        appData.events = await eventsRes.json();

        console.log('✅ Данные загружены:', appData);
    } catch (error) {
        console.error('❌ Ошибка загрузки данных:', error);
        // В случае ошибки можно показать сообщение пользователю, но пока просто логируем
    }
}

/* ========== РЕНДЕРЫ СТРАНИЦ ========== */

/**
 * Главная страница (Home)
 * Содержит Hero-секцию, топ-подборки (3 случайных маршрута) и превью карты (заглушка).
 */
function renderHome() {
    const main = document.getElementById('main-content');

    // Выбираем 3 случайных маршрута для блока "Топ-подборки"
    const topRoutes = [...appData.routes]
        .sort(() => 0.5 - Math.random()) // случайный порядок
        .slice(0, 3);                    // берём первые 3

    // Генерируем HTML
    main.innerHTML = `
    <!-- Hero-секция с параллаксом (фон задаётся в CSS) -->
    <section class="hero">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Открой Бурятию через эмоции</h1>
        <p>Выбери свой вайб и отправляйся в приключение</p>
      </div>
    </section>
    
    <!-- Топ-подборки -->
    <section class="section">
      <h2>🔥 Топ-подборки</h2>
      <div class="cards-grid">
        ${topRoutes.map(route => renderRouteCard(route)).join('')}
      </div>
    </section>
    
    <!-- Карта-превью (заглушка) -->
    <section class="section">
      <h2>🗺 Карта приключений</h2>
      <div id="map-preview" style="height:300px; background:#eee; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#666;">
        Здесь будет интерактивная карта
      </div>
    </section>
  `;
}

/**
 * Страница "Маршруты" – список всех маршрутов.
 * Пока без фильтров, просто вывод карточек.
 */
function renderRoutes() {
    const main = document.getElementById('main-content');

    main.innerHTML = `
    <section class="section">
      <h2>Все маршруты</h2>
      <div class="cards-grid">
        ${appData.routes.map(route => renderRouteCard(route)).join('')}
      </div>
    </section>
  `;
}

/**
 * Детальная страница маршрута.
 * @param {string} id - идентификатор маршрута
 */
function renderRouteDetail(id) {
    const route = appData.routes.find(r => r.id == id);

    if (!route) {
        document.getElementById('main-content').innerHTML = '<h2>Маршрут не найден</h2>';
        return;
    }

    // Преобразуем теги в читаемые названия
    const tagLabels = route.tags.map(tag => {
        const map = {
            'кайфовый_ракурс': 'Кайфовый ракурс',
            'цифровой_детокс': 'Цифровой детокс',
            'место_силы': 'Место силы',
            'ветер_в_лицо': 'Ветер в лицо',
            'буузы_и_точка': 'Буузы и точка',
            'этно_погружение': 'Этно-погружение',
            'дикий_Байкал': 'Дикий Байкал',
            'городской_вайб': 'Городской вайб'
        };
        return map[tag] || tag;
    });

    const main = document.getElementById('main-content');
    main.innerHTML = `
    <section class="section">
      <!-- Заголовок и базовая информация -->
      <h2>${route.title}</h2>
      <p style="font-size:1.1rem;">${route.description}</p>
      
      <div style="margin:1rem 0;">
        <strong>Теги:</strong> ${tagLabels.join(', ')}<br>
        <strong>Длительность:</strong> ${route.duration} |
        <strong>Бюджет:</strong> ${route.budget} |
        <strong>Сезон:</strong> ${route.season.join(', ')}
      </div>
      
      <p><strong>Транспорт:</strong> ${route.transport}</p>
      <p><strong>Советы:</strong> ${route.tips}</p>
      
      <!-- Список точек маршрута -->
      <h3>📍 Точки маршрута</h3>
      <ul>
        ${route.points.map(p => `<li>${p.name} — ${p.description} (${p.type})</li>`).join('')}
      </ul>
      
      <!-- Заглушки кнопок -->
      <button class="btn" onclick="alert('Скачивание PDF будет позже')">📥 Скачать PDF</button>
      <button class="btn" onclick="alert('Поделиться пока не работает')">🔗 Поделиться</button>
      
      <!-- Место под карту -->
      <div id="detail-map" style="height:300px; background:#eee; border-radius:12px; margin-top:1rem; display:flex; align-items:center; justify-content:center; color:#666;">
        Карта маршрута
      </div>
    </section>
  `;
}

/**
 * Страница "Интерактивная карта" (заглушка).
 */
function renderMapPage() {
    document.getElementById('main-content').innerHTML = `
    <section class="section">
      <h2>Интерактивная карта</h2>
      <div id="full-map" style="height:500px; background:#eee; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#666;">
        Здесь будет Яндекс.Карта со всеми маршрутами
      </div>
    </section>
  `;
}

/**
 * Страница "События" – вывод карточек из events.json.
 */
function renderEvents() {
    const main = document.getElementById('main-content');

    main.innerHTML = `
    <section class="section">
      <h2>📅 Ближайшие события</h2>
      <div class="cards-grid">
        ${appData.events.map(event => `
          <div class="card">
            <div class="card-content">
              <h3>${event.name}</h3>
              <p><strong>${event.date}</strong></p>
              <p>${event.place}</p>
              <p>${event.description}</p>
            </div>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

/* ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ========== */

/**
 * Возвращает CSS-переменную градиента по тегу маршрута.
 * @param {string} tag - slug тега (например, 'кайфовый_ракурс')
 * @returns {string} - имя переменной (например, '--gradient-sunset')
 */
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

/**
 * Генерирует HTML-разметку одной карточки маршрута.
 * Использует градиент первого тега как фон.
 * @param {Object} route - объект маршрута
 * @returns {string} - HTML-строка
 */
function renderRouteCard(route) {
    const gradientVar = getGradientVar(route.tags[0]); // берём первый тег для фона
    const tagNames = route.tags.map(t => {
        const names = {
            'кайфовый_ракурс': '#кайфовый_ракурс',
            'цифровой_детокс': '#цифровой_детокс',
            'место_силы': '#место_силы',
            'ветер_в_лицо': '#ветер_в_лицо',
            'буузы_и_точка': '#буузы_и_точка',
            'этно_погружение': '#этно_погружение',
            'дикий_Байкал': '#дикий_Байкал',
            'городской_вайб': '#городской_вайб'
        };
        return names[t] || t;
    });

    return `
    <div class="card" style="background: var(${gradientVar})">
      <div class="card-content">
        <h3>${route.title}</h3>
        <p>${tagNames.join(' · ')}</p>
        <p>${route.duration} · ${route.budget}</p>
        <a href="#/routes/${route.id}" class="btn">Подробнее</a>
      </div>
    </div>
  `;
}

/* ========== ИНИЦИАЛИЗАЦИЯ ПРИЛОЖЕНИЯ ========== */

/**
 * Основная функция, запускаемая после загрузки DOM.
 */
async function initApp() {
    const preloader = document.getElementById('preloader');

    // 1. Загружаем данные
    await loadData();

    // 2. Регистрируем маршруты в роутере
    const router = new Router({
        '/': () => renderHome(),
        '/routes': () => renderRoutes(),
        '/routes/:id': (params) => renderRouteDetail(params.id),
        '/map': () => renderMapPage(),
        '/events': () => renderEvents()
    });

    // 3. Скрываем прелоадер
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500);

    // 4. Настраиваем бургер-меню
    const burger = document.getElementById('burgerBtn');
    const navList = document.getElementById('navList');

    burger.addEventListener('click', () => {
        navList.classList.toggle('active');
    });

    // Закрываем меню при клике на любую ссылку
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
        });
    });

    // Дополнительно: закрываем меню при клике вне его на мобильном (по желанию)
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav') && !e.target.closest('.burger')) {
            navList.classList.remove('active');
        }
    });
}

// Запуск после полной загрузки DOM
document.addEventListener('DOMContentLoaded', initApp);