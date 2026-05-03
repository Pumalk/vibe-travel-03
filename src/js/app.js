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
  observeLazyImages();
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
  observeLazyImages();
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
    grid.innerHTML = '';
    if (filtered.length === 0) {
      grid.innerHTML = '<p class="no-results">😔 Ничего не найдено. Попробуйте изменить фильтры.</p>';
    } else {
      grid.innerHTML = filtered.map(r => renderRouteCard(r)).join('');
    }
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
          ${route.photos.map(p => `<img data-src="assets/images/${p}" alt="Фото маршрута" class="gallery-image lazy" onerror="this.src='https://via.placeholder.com/400x250?text=Фото'">`).join('')}
        </div>
        <div class="gallery-desktop gallery-grid">
          ${route.photos.map(p => `<img data-src="assets/images/${p}" alt="Фото маршрута" class="gallery-image lazy" onerror="this.src='https://via.placeholder.com/400x300?text=Фото'">`).join('')}
        </div>
      </div>

      <!-- Точки маршрута -->
      <h3>📍 Точки маршрута</h3>
      <ul>
        ${route.points.map(p => `<li>${p.name} — ${p.description}</li>`).join('')}
      </ul>

      <!-- Кнопки действий -->
      <div class="detail-actions">
        <button class="btn" id="pdf-btn">📥 Скачать PDF</button>
        <button class="btn" id="fav-btn">${isFavorite(route.id) ? '❤️ В избранном' : '🤍 В избранное'}</button>
        <button class="btn" id="share-btn">🔗 Поделиться</button>
        <button class="btn" id="build-route-yandex">🚗 Открыть в Яндекс.Картах</button>
      </div>

      <!-- Карта -->
      <div id="detail-map" style="height:350px; border-radius:12px; margin-top:1rem;"></div>
    </section>
  `;

  // Инициализация галереи (лайтбокс)
  initGallery('.gallery-container');

  // Карта
  initDetailMap(route);

  // Запускаем ленивую загрузку фото
  observeLazyImages();

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

  // Кнопка избранного
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

  // Кнопка скачать PDF
  document.getElementById('pdf-btn').addEventListener('click', () => downloadPDF(route));

  // Кнопки построения маршрута
  document.getElementById('build-route-yandex').addEventListener('click', () => {
    window.open(buildRouteLink(route, 'yandex'), '_blank');
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
      <div class="cards-grid centered">
        ${appData.events.map(e => `
          <div class="card event-card">
            <img data-src="assets/events/${e.photo}" alt="${e.name}" class="event-photo lazy" onerror="this.style.display='none'">
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
  observeLazyImages();
}

/**
 * Страница избранного – показывает сохранённые маршруты.
 */
function renderFavorites() {
  const favIds = getFavorites();
  const favRoutes = appData.routes.filter(r => favIds.includes(r.id));
  const main = document.getElementById('main-content');

  if (favRoutes.length === 0) {
    main.innerHTML = `
            <section class="section">
                <h2>❤️ Избранное</h2>
                <p style="text-align:center; color:#6c757d; padding:2rem;">
                    Пока ничего не добавлено. Нажми сердечко на странице маршрута, чтобы сохранить его здесь.
                </p>
            </section>`;
  } else {
    main.innerHTML = `
            <section class="section">
                <h2>❤️ Избранное (${favRoutes.length})</h2>
                <div class="cards-grid centered">
                    ${favRoutes.map(r => renderRouteCard(r)).join('')}
                </div>
            </section>`;
  }
  // Ленивая загрузка после рендера
  observeLazyImages();
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

// Ленивая загрузка изображений – глобальный observer
const lazyObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

function observeLazyImages() {
  document.querySelectorAll('img.lazy').forEach(img => {
    if (img.dataset.src && !img.src) {
      lazyObserver.observe(img);
    }
  });
}

// ---------- ИЗБРАННОЕ (localStorage) ----------

/**
 * Получает массив id избранных маршрутов из localStorage.
 * @returns {number[]}
 */
function getFavorites() {
  const raw = localStorage.getItem('vibe_favorites');
  return raw ? JSON.parse(raw) : [];
}

/**
 * Добавляет id маршрута в избранное, если его там нет.
 * @param {number} routeId
 */
function addFavorite(routeId) {
  const favs = getFavorites();
  if (!favs.includes(routeId)) {
    favs.push(routeId);
    localStorage.setItem('vibe_favorites', JSON.stringify(favs));
  }
}

/**
 * Удаляет id маршрута из избранного.
 * @param {number} routeId
 */
function removeFavorite(routeId) {
  let favs = getFavorites();
  favs = favs.filter(id => id !== routeId);
  localStorage.setItem('vibe_favorites', JSON.stringify(favs));
}

/**
 * Проверяет, находится ли маршрут в избранном.
 * @param {number} routeId
 * @returns {boolean}
 */
function isFavorite(routeId) {
  return getFavorites().includes(routeId);
}

/**
 * Генерирует PDF-гид маршрута.
 * Без карты — только текст, координаты и оформление.
 * @param {Object} route - объект маршрута
 */
async function downloadPDF(route) {
  // Создаём временный невидимый контейнер с контентом
  const pdfDiv = document.createElement('div');
  pdfDiv.style.position = 'absolute';
  pdfDiv.style.left = '-9999px';
  pdfDiv.style.top = '0';
  pdfDiv.style.width = '800px';
  pdfDiv.style.padding = '30px';
  pdfDiv.style.backgroundColor = '#ffffff';
  pdfDiv.style.fontFamily = 'Inter, Montserrat, sans-serif';
  pdfDiv.style.color = '#212529';

  pdfDiv.innerHTML = `
    <div style="background-color:#e07a5f; padding:20px; margin-bottom:20px; color:white; font-family:Montserrat; font-size:22px; font-weight:800;">
      VIBE TRAVEL 03
    </div>
    <h1 style="font-family:Montserrat; font-weight:800; font-size:28px; margin-top:0;">${route.title}</h1>
    <p style="color:#6c757d; font-size:14px;">
      ${route.tags.map(t => tagLabels[t] || t).join(', ')} · ${route.duration} · ${route.budget} · Сезон: ${route.season.join(', ')}
    </p>
    <p style="font-size:16px;">${route.description}</p>
    <h3 style="font-family:Montserrat; font-weight:700;">📍 Транспорт</h3>
    <p>${route.transport}</p>
    <h3 style="font-family:Montserrat; font-weight:700;">💡 Советы</h3>
    <p>${route.tips}</p>
    <h3 style="font-family:Montserrat; font-weight:700;">📍 Точки и координаты</h3>
    <ul style="list-style:none; padding-left:0;">
      ${route.points.map((p, i) => `
        <li style="margin-bottom:8px; font-size:14px;">
          <strong>${i + 1}. ${p.name} (${p.type})</strong><br>
          ${p.description}<br>
          <span style="color:#6c757d;">Координаты: ${p.coords.join(', ')}</span>
        </li>
      `).join('')}
    </ul>
    <hr style="margin-top:30px;">
    <p style="text-align:center; color:#adb5bd; font-size:12px;">Этот гид создан VIBE TRAVEL 03 · Сохрани и путешествуй!</p>
  `;

  document.body.appendChild(pdfDiv);

  // Захватываем всё содержимое через html2canvas
  const canvas = await html2canvas(pdfDiv, { scale: 1.5 });
  document.body.removeChild(pdfDiv);

  const imgData = canvas.toDataURL('image/png');

  // Генерируем PDF с учётом возможной многостраничности
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const imgWidth = pageWidth - margin * 2;
  const totalCanvasHeight = canvas.height;
  const scaleRatio = canvas.width / imgWidth;
  const totalHeightMm = totalCanvasHeight / scaleRatio;
  const maxContentHeight = pageHeight - margin * 2;

  let sourceY = 0;
  let remainingHeight = totalHeightMm;

  // Если всё помещается на одну страницу — выводим один раз
  if (remainingHeight <= maxContentHeight + 1) {
    doc.addImage(imgData, 'PNG', margin, margin, imgWidth, totalHeightMm);
  } else {
    // Разбиваем на несколько страниц
    while (remainingHeight > 1) {
      const sliceHeightMm = Math.min(remainingHeight, maxContentHeight);
      const sliceHeightPx = sliceHeightMm * scaleRatio;

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.ceil(sliceHeightPx);
      const ctx = sliceCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, sourceY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);

      const sliceData = sliceCanvas.toDataURL('image/png');
      if (sourceY > 0) doc.addPage();
      doc.addImage(sliceData, 'PNG', margin, margin, imgWidth, sliceHeightMm);

      sourceY += sliceCanvas.height;
      remainingHeight -= sliceCanvas.height / scaleRatio;
    }
  }

  doc.save(`${route.title.replace(/[^a-zа-яё0-9]/gi, '_')}.pdf`);
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
    '/events': () => renderEvents(),
    '/favorites': () => renderFavorites()
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