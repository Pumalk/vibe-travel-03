This file is a merged representation of a subset of the codebase, containing specifically included files, combined into a single document by Repomix.

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Only files matching these patterns are included: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/assets, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/.gitignore, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/admin.html, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/content.html, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/index.html, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/favorites.html, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/map.html, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/README.md, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/route.html, ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/routes.html
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/.gitignore
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/admin.html
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/assets/images/baikal.jpg
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/content.html
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/.env
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/config.js
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/events.json
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/routes.json
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/secrets.js
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/favorites.html
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/index.html
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/map.html
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/README.md
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/route.html
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/routes.html
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/css/components.css
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/css/main.css
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/admin.js
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/filters.js
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/main.js
../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/pdfGenerator.js
```

# Files

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/.gitignore
````
info
prompts
.env
secrets.js
*.log
*.tmp
*.temp
plan.md
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/admin.html
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Админ-панель | VIBE TRAVEL 03</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/main.css">
    <link rel="stylesheet" href="src/css/components.css">
    <script src="data/secrets.js"></script>
    <script src="data/config.js"></script>
    <script>
        // Password protection
        const password = prompt('Введите пароль администратора:');
        if (password !== 'admin2026') {
            window.location.href = 'index.html';
        }
    </script>
</head>
<body>
    <header class="header">
        <div class="container header__inner">
            <a href="index.html" class="logo">⚙️ ADMIN PANEL</a>
            <a href="index.html" class="btn-pdf" style="padding: 0.5rem 1rem; font-size: 0.9rem;">На главную</a>
        </div>
    </header>

    <main class="container" style="padding-top: 100px;">
        <form id="routeForm" class="admin-form">
            <h2>🛠 Конструктор маршрута</h2>
            <p style="color: #666; margin-bottom: 1.5rem;">Создайте новый маршрут и добавьте его в базу</p>
            
            <div class="form-group">
                <label>ID</label>
                <input type="number" id="r_id" class="form-control" required>
            </div>
            <div class="form-group">
                <label>Название</label>
                <input type="text" id="r_title" class="form-control" required placeholder="Энергия Байкала: 3 дня перезагрузки">
            </div>
            <div class="form-group">
                <label>Вайбы (через запятую)</label>
                <input type="text" id="r_vibes" class="form-control" placeholder="#цифровой_детокс, #место_силы" required>
            </div>
            <div class="form-group" style="display:flex; gap:10px;">
                <div style="flex:1">
                    <label>Цвет градиента 1</label>
                    <input type="color" id="r_g1" class="form-control" value="#2E8B57">
                </div>
                <div style="flex:1">
                    <label>Цвет градиента 2</label>
                    <input type="color" id="r_g2" class="form-control" value="#0077BE">
                </div>
            </div>
            <div class="form-row" style="display: flex; gap: 1rem;">
                <div class="form-group" style="flex: 1;">
                    <label>Длительность</label>
                    <input type="text" id="r_dur" class="form-control" placeholder="3 дня">
                </div>
                <div class="form-group" style="flex: 1;">
                    <label>Бюджет</label>
                    <input type="text" id="r_bud" class="form-control" placeholder="от 5000 ₽">
                </div>
            </div>
            <div class="form-group">
                <label>Сезон</label>
                <select id="r_season" class="form-control">
                    <option value="лето">Лето</option>
                    <option value="зима">Зима</option>
                    <option value="круглый год">Круглый год</option>
                </select>
            </div>
            <div class="form-group">
                <label>Краткое описание</label>
                <input type="text" id="r_desc" class="form-control" placeholder="Почувствуй мощь священного озера...">
            </div>
            <div class="form-group">
                <label>Полное описание</label>
                <textarea id="r_fullDesc" class="form-control" rows="3" placeholder="Погружение в атмосферу байкальской тайги..."></textarea>
            </div>
            <button type="submit" class="btn-admin">✨ Сгенерировать JSON</button>
        </form>

        <div class="container" style="max-width:800px; margin-bottom:4rem;">
            <label style="font-weight: 600; display: block; margin-bottom: 0.5rem;">📋 Результат (скопируйте и вставьте в routes.json):</label>
            <textarea id="jsonOutput" class="output-area" rows="15" readonly></textarea>
            <button onclick="copyJson()" class="btn-pdf" style="margin-top: 1rem;">📋 Копировать в буфер</button>
        </div>
    </main>

    <script src="src/js/admin.js"></script>
</body>
</html>
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/content.html
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>События и Контент | VIBE TRAVEL 03</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/main.css">
    <link rel="stylesheet" href="src/css/components.css">
    <script src="data/secrets.js"></script>
    <script src="data/config.js"></script>
</head>
<body>
    <header class="header">
        <div class="container header__inner">
            <a href="index.html" class="logo">VIBE TRAVEL 03</a>
            <nav class="nav">
                <ul class="nav__list">
                    <li><a href="routes.html" class="nav__link">Маршруты</a></li>
                    <li><a href="map.html" class="nav__link">Карта</a></li>
                </ul>
            </nav>
            <a href="favorites.html" class="fav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="fav-count">0</span>
            </a>
        </div>
    </header>

    <main class="container" style="padding-top: 100px;">
        <section class="events-section">
            <h1 class="section-title">Афиша 2026</h1>
            <p style="text-align: center; color: #666; margin-bottom: 2rem;">Культурные события и фестивали Бурятии</p>
            <div id="eventsContainer" class="events-list">
                <!-- Events loaded by JS -->
            </div>
        </section>

        <section class="video-section">
            <h2 class="section-title">Видео-вайб</h2>
            <p style="text-align: center; color: #666; margin-bottom: 2rem;">Почувствуй атмосферу Бурятии</p>
            <div class="video-grid">
                <div class="video-wrapper wave-effect">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="video-wrapper wave-effect">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" frameborder="0" allowfullscreen></iframe>
                </div>
                <div class="video-wrapper wave-effect">
                    <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0" frameborder="0" allowfullscreen></iframe>
                </div>
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="container">
            <svg class="footer-ornament" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="50" r="10" fill="currentColor"/>
            </svg>
            <p>&copy; 2026 VIBE TRAVEL 03. Проект для конкурса БГСХА.</p>
        </div>
    </footer>

    <script src="src/js/main.js"></script>
    <script>
        fetch('data/events.json')
            .then(r => r.json())
            .then(events => {
                const container = document.getElementById('eventsContainer');
                events.forEach(ev => {
                    const dateParts = ev.date.split(' ');
                    const div = document.createElement('div');
                    div.className = 'event-card fade-in';
                    div.innerHTML = `
                        <div class="event-date">
                            <div class="month">${dateParts[0]}</div>
                            <div class="day">${dateParts[1]}</div>
                        </div>
                        <div class="event-info">
                            <h3>${ev.title}</h3>
                            <p>📍 ${ev.location}</p>
                            <p>${ev.description}</p>
                        </div>
                    `;
                    container.appendChild(div);
                });
            });
    </script>
</body>
</html>
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/.env
````
# API ключи (не коммитить в git)
YANDEX_MAP_KEY=499fd0d4-64f8-484b-811e-5e6270d70d9b
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/config.js
````javascript
// Конфигурация проекта VIBE TRAVEL 03
// Секретные ключи подключаются из secrets.js (файл в .gitignore)
const CONFIG = {
    // API-ключ Яндекс.Карт (из secrets.js)
    YANDEX_MAP_KEY: typeof SECRETS !== 'undefined' ? SECRETS.YANDEX_MAP_KEY : '',
    
    PROJECT_NAME: 'VIBE TRAVEL 03',
    VERSION: '1.0.0',
    
    // Настройки localStorage
    STORAGE_KEYS: {
        FAVORITES: 'vibe_favorites',
        LAST_VIBE: 'vibe_last_mood'
    }
};
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/events.json
````json
[
  {
    "id": 1,
    "title": "Голос кочевников 2026",
    "date": "июля 11-13",
    "location": "с. Турунтаево",
    "description": "Международный музыкальный фестиваль этнической музыки под открытым небом.",
    "image": "assets/images/baikal.jpg"
  },
  {
    "id": 2,
    "title": "Алтаргана 2026",
    "date": "июля 3-5",
    "location": "Улан-Удэ / Иволгинск",
    "description": "Фестиваль бурятской культуры, театра и кино. Масштабные концерты и выставки.",
    "image": "assets/images/baikal.jpg"
  },
  {
    "id": 3,
    "title": "Сурхарбан 2026",
    "date": "июня 20-21",
    "location": "с. Тарбагатай",
    "description": "Национальный праздник спорта и труда. Стрельба из лука, борьба, скачки.",
    "image": "assets/images/baikal.jpg"
  }
]
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/routes.json
````json
[
  {
    "id": 1,
    "title": "Энергия Байкала: 3 дня перезагрузки",
    "vibes": ["#цифровой_детокс", "#место_силы", "#кайфовый_ракурс"],
    "gradient": ["#2E8B57", "#0077BE"],
    "duration": "3 дня",
    "budget": "от 5000 ₽",
    "season": "лето",
    "description": "Почувствуй мощь священного озера. Тишина, которая лечит душу.",
    "fullDescription": "Погружение в атмосферу байкальской тайги. Мы отключим телефоны, будем слушать шум прибоя и медитировать на закате у скал. Маршрут включает посещение старинных дацанов и секретные пляжи.",
    "schedule": [
      { "day": 1, "title": "Прибытие и Дацан", "description": "Встреча в Улан-Удэ, поездка в Иволгинский дацан, обед с буузами." },
      { "day": 2, "title": "Сердце Байкала", "description": "Переезд на берег озера, треккинг по тропам, вечер у костра." },
      { "day": 3, "title": "Рассвет и Возвращение", "description": "Встреча рассвета над водой, сбор трав, возвращение в город." }
    ],
    "logistics": {
      "howToGet": "Автобус от автовокзала Улан-Удэ (маршрут №449) или трансфер.",
      "budgetDetails": "Проживание в юрте ~2000₽, питание ~1500₽/день.",
      "seasonality": "Идеально: Июнь-Сентябрь."
    },
    "points": [
      { "name": "Иволгинский дацан", "coordinates": [51.756, 107.207] },
      { "name": "Пос. Гремячинск", "coordinates": [51.834, 107.584] },
      { "name": "Скала Шаманка", "coordinates": [51.850, 107.600] }
    ],
    "images": [
      { "src": "assets/images/baikal.jpg", "alt": "Байкал" }
    ]
  },
  {
    "id": 2,
    "title": "Вкус Бурятии: Гастро-тур",
    "vibes": ["#буузы_и_точка", "#кайфовый_ракурс"],
    "gradient": ["#FF8C00", "#FFD700"],
    "duration": "2 дня",
    "budget": "от 3500 ₽",
    "season": "круглый год",
    "description": "От настоящей бурятской кухни до современного фьюжна. Ешь как местный!",
    "fullDescription": "Гастрономическое путешествие по лучшим точкам республики. Вы научитесь лепить буузы правильно, попробуете саган-дайля и узнаете секреты приготовления тарасуна (безалкогольного варианта для туристов).",
    "schedule": [
      { "day": 1, "title": "Классика", "description": "Мастер-класс по лепке бууз, дегустация в этнокомплексе 'Тайга'." },
      { "day": 2, "title": "Стритфуд", "description": "Обзор лучших чебупелей и шашлычных города, ужин в ресторане национальной кухни." }
    ],
    "logistics": {
      "howToGet": "Все локации в черте города Улан-Удэ и пригороде (15 км).",
      "budgetDetails": "Включены все дегустации и мастер-классы.",
      "seasonality": "Круглый год."
    },
    "points": [
      { "name": "Площадь Советов", "coordinates": [51.827, 107.606] },
      { "name": "Этнокомплекс Тайга", "coordinates": [51.850, 107.550] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Буузы" }]
  },
  {
    "id": 3,
    "title": "Дыхание Аршана",
    "vibes": ["#место_силы", "#цифровой_детокс"],
    "gradient": ["#2E8B57", "#98FB98"],
    "duration": "1 день",
    "budget": "от 2000 ₽",
    "season": "лето",
    "description": "Горный воздух, минеральные источники и вид на пик Любви.",
    "fullDescription": "Однодневный ретрит в долине Тунка. Прогулка к водопаду, купание в горячих источниках и подъем на смотровую площадку.",
    "schedule": [
      { "day": 1, "title": "Тункинская долина", "description": "Выезд утром, прогулка к водопаду, обед, источники, возвращение." }
    ],
    "logistics": {
      "howToGet": "Автобус до Аршана (2 часа от Улан-Удэ).",
      "budgetDetails": "Вход в парк бесплатный, источники ~300₽.",
      "seasonality": "Май-Октябрь."
    },
    "points": [
      { "name": "Аршан", "coordinates": [51.593, 102.388] },
      { "name": "Водопад Катушка", "coordinates": [51.600, 102.400] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Аршан" }]
  },
  {
    "id": 4,
    "title": "Адреналин: Джип-тур на Котокель",
    "vibes": ["#ветер_в_лицо", "#в_дикую"],
    "gradient": ["#00008B", "#4169E1"],
    "duration": "2 дня",
    "budget": "от 8000 ₽",
    "season": "лето",
    "description": "Грязь, скорость и дикая природа. Только для смелых.",
    "fullDescription": "Экстремальный маршрут на внедорожниках через перевалы к озеру Котокель. Ночевка в палатках под звездным небом.",
    "schedule": [
      { "day": 1, "title": "Преодоление", "description": "Прохождение бродов, подъем в горы, установка лагеря." },
      { "day": 2, "title": "Озеро", "description": "Купание в ледяной воде, рыбалка, спуск обратно." }
    ],
    "logistics": {
      "howToGet": "Сбор на площади, далее на джипах.",
      "budgetDetails": "Аренда джипа с водителем включена.",
      "seasonality": "Июль-Август."
    },
    "points": [
      { "name": "Озеро Котокель", "coordinates": [52.150, 108.100] },
      { "name": "Перевал", "coordinates": [52.100, 108.050] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Джип" }]
  },
  {
    "id": 5,
    "title": "Мистика Старого Селенгинска",
    "vibes": ["#место_силы", "#кайфовый_ракурс"],
    "gradient": ["#800080", "#FF69B4"],
    "duration": "1 день",
    "budget": "от 1500 ₽",
    "season": "круглый год",
    "description": "Купеческий город, где время остановилось. Призраки истории.",
    "fullDescription": "Прогулка по старинным улочкам первого города Бурятии. Посещение Троицкого собора и краеведческого музея.",
    "schedule": [
      { "day": 1, "title": "Путешествие во времени", "description": "Экскурсия по городу, обед в трактире, фотосессия в костюмах." }
    ],
    "logistics": {
      "howToGet": "Электричка или автобус до Селенгинска.",
      "budgetDetails": "Билеты в музеи ~500₽.",
      "seasonality": "Круглый год."
    },
    "points": [
      { "name": "Троицкий собор", "coordinates": [51.333, 106.833] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Селенгинск" }]
  },
  {
    "id": 6,
    "title": "Ледяное царство (Зима)",
    "vibes": ["#кайфовый_ракурс", "#в_дикую"],
    "gradient": ["#E0FFFF", "#00BFFF"],
    "duration": "3 дня",
    "budget": "от 12000 ₽",
    "season": "зима",
    "description": "Прозрачный лед, пузыри метана и бесконечный горизонт.",
    "fullDescription": "Зимняя сказка на Байкале. Катание на коньках по льду, проживание в теплых домиках на берегу.",
    "schedule": [
      { "day": 1, "title": "Знакомство со льдом", "description": "Выход на лед, фотосессия, ужин из омуля." },
      { "day": 2, "title": "Экспедиция", "description": "Поездка на хивусе к самым красивым торосам." },
      { "day": 3, "title": "Рассвет", "description": "Встреча солнца, согретого чаем из самовара." }
    ],
    "logistics": {
      "howToGet": "Трансфер до Малого Моря.",
      "budgetDetails": "Проживание и снаряжение включено.",
      "seasonality": "Февраль-Март."
    },
    "points": [
      { "name": "Ольхон", "coordinates": [53.200, 107.300] },
      { "name": "Мыс Хобой", "coordinates": [53.350, 107.380] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Лед" }]
  },
  {
    "id": 7,
    "title": "Дацанский кольцевой",
    "vibes": ["#место_силы", "#цифровой_детокс"],
    "gradient": ["#B22222", "#FFD700"],
    "duration": "4 дня",
    "budget": "от 9000 ₽",
    "season": "лето",
    "description": "Паломничество по главным храмам региона. Очищение мыслей.",
    "fullDescription": "Посещение 5 крупнейших дацанов Бурятии. Беседы с ламами, участие в ритуалах, вегетарианская кухня.",
    "schedule": [
      { "day": 1, "title": "Иволга", "description": "Иволгинский дацан." },
      { "day": 2, "title": "Тамчин", "description": "Гусиноозерский дацан." },
      { "day": 3, "title": "Ацагат", "description": "Дацан в Ацагате." },
      { "day": 4, "title": "Возвращение", "description": "Аннинский дацан и дорога домой." }
    ],
    "logistics": {
      "howToGet": "Автобусный тур.",
      "budgetDetails": "Пожертвования по желанию.",
      "seasonality": "Май-Сентябрь."
    },
    "points": [
      { "name": "Гусиное Озеро", "coordinates": [51.280, 106.530] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Дацан" }]
  },
  {
    "id": 8,
    "title": "Верховья Баргузина",
    "vibes": ["#в_дикую", "#ветер_в_лицо"],
    "gradient": ["#2F4F4F", "#008B8B"],
    "duration": "5 дней",
    "budget": "от 15000 ₽",
    "season": "лето",
    "description": "Для настоящих туристов. Горы, реки и полная изоляция.",
    "fullDescription": "Сплав по реке Баргузин и пеший переход через перевалы. Дикая природа без следов цивилизации.",
    "schedule": [
      { "day": 1, "title": "Старт", "description": "Заброска в верховья." },
      { "day": 2, "title": "Сплав", "description": "Прохождение порогов." },
      { "day": 3, "title": "Перевал", "description": "Пеший переход." },
      { "day": 4, "title": "Озера", "description": "Отдых у горных озер." },
      { "day": 5, "title": "Финиш", "description": "Выход к тракту." }
    ],
    "logistics": {
      "howToGet": "Вахтовка + пешком.",
      "budgetDetails": "Необходимо свое снаряжение.",
      "seasonality": "Июль."
    },
    "points": [
      { "name": "Река Баргузин", "coordinates": [53.500, 109.500] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Река" }]
  },
  {
    "id": 9,
    "title": "Улан-Удэ: Город контрастов",
    "vibes": ["#кайфовый_ракурс", "#буузы_и_точка"],
    "gradient": ["#FF4500", "#FFA500"],
    "duration": "1 день",
    "budget": "от 1000 ₽",
    "season": "круглый год",
    "description": "Самая большая голова Ленина и лучшие кофейни Сибири.",
    "fullDescription": "Урбан-тур по столице. Стрит-арт, архитектура, современные пространства и история.",
    "schedule": [
      { "day": 1, "title": "Центр", "description": "Площадь Советов, пешеходная улица, набережная." }
    ],
    "logistics": {
      "howToGet": "Пешком по центру.",
      "budgetDetails": "Кофе и перекусы.",
      "seasonality": "Круглый год."
    },
    "points": [
      { "name": "Голова Ленина", "coordinates": [51.828, 107.605] }
    ],
    "images": [{ "src": "assets/images/baikal.jpg", "alt": "Город" }]
  },
  {
    "id": 10,
    "title": "Заповедная сказка",
    "vibes": ["#цифровой_детокс", "#в_дикую"],
    "gradient": ["#006400", "#228B22"],
    "duration": "3 дня",
    "budget": "от 6000 ₽",
    "season": "лето",
    "description": "Баргузинский заповедник. Место, где живут соболя.",
    "fullDescription": "Эко-тур по территории старейшего заповедника России. Наблюдение за животными в естественной среде.",
    "schedule": [
      { "day": 1, "title": "Визит-центр", "description": "Инструктаж, тропа 'Лебединая'." },
      { "day": 2, "title": "Море", "description": "Выход к берегу заповедного пляжа." },
      { "day": 3, "title": "Тайга", "description": "Наблюдение за птицами." }
    ],
    "logistics": {
      "howToGet": "Катер или машина до Курортного.",
      "budgetDetails": "Пропуск в заповедник оформляется заранее.",
      "seasonality": "Июнь-Август."
    },
    "points": [
      { "name": "Баргузинский заповедник", "coordinates": [53.600, 108.200] }
    ],
    "images": [{ "src": "assets/images/placeholders/route10_1.jpg", "alt": "Лес" }]
  },
  {
    "id": 11,
    "title": "Чивыркуйский змей",
    "vibes": ["#ветер_в_лицо", "#кайфовый_ракурс"],
    "gradient": ["#4682B4", "#87CEFA"],
    "duration": "2 дня",
    "budget": "от 4000 ₽",
    "season": "лето",
    "description": "Дикие пляжи и горячие источники прямо у воды.",
    "fullDescription": "Поездка в Чивыркуйский залив. Купание в термальных источниках 'Змеиная бухта'.",
    "schedule": [
      { "day": 1, "title": "Залив", "description": "Переезд, установка лагеря, источники." },
      { "day": 2, "title": "Рыбалка", "description": "Утренняя рыбалка, возвращение." }
    ],
    "logistics": {
      "howToGet": "Машина повышенной проходимости.",
      "budgetDetails": "Национальный парк взнос.",
      "seasonality": "Июль-Август."
    },
    "points": [
      { "name": "Змеиная бухта", "coordinates": [52.800, 108.400] }
    ],
    "images": [{ "src": "assets/images/placeholders/route11_1.jpg", "alt": "Пляж" }]
  },
  {
    "id": 12,
    "title": "Ночь на Шумак",
    "vibes": ["#место_силы", "#в_дикую"],
    "gradient": ["#4B0082", "#9400D3"],
    "duration": "2 дня",
    "budget": "от 10000 ₽",
    "season": "лето",
    "description": "Тибетская медицина под открытым небом. 108 источников здоровья.",
    "fullDescription": "Полет на вертолете или долгий путь на джипах к горячим источникам в горах. Мистическое место силы.",
    "schedule": [
      { "day": 1, "title": "Путь", "description": "Заброска в долину, размещение в домиках." },
      { "day": 2, "title": "Источники", "description": "Прохождение курсов лечения водой, возвращение." }
    ],
    "logistics": {
      "howToGet": "Вертолет (дорого) или джип (долго).",
      "budgetDetails": "Проживание в базовых условиях.",
      "seasonality": "Июнь-Сентябрь."
    },
    "points": [
      { "name": "Шумак", "coordinates": [52.100, 104.800] }
    ],
    "images": [{ "src": "assets/images/placeholders/route12_1.jpg", "alt": "Горы" }]
  }
]
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/data/secrets.js
````javascript
// Секретные ключи (этот файл в .gitignore)
const SECRETS = {
    YANDEX_MAP_KEY: '499fd0d4-64f8-484b-811e-5e6270d70d9b'
};
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/favorites.html
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Избранное | VIBE TRAVEL 03</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/main.css">
    <link rel="stylesheet" href="src/css/components.css">
    <script src="data/secrets.js"></script>
    <script src="data/config.js"></script>
</head>
<body>
    <header class="header">
        <div class="container header__inner">
            <a href="index.html" class="logo">VIBE TRAVEL 03</a>
            <nav class="nav">
                <ul class="nav__list">
                    <li><a href="routes.html" class="nav__link">Маршруты</a></li>
                    <li><a href="map.html" class="nav__link">Карта</a></li>
                    <li><a href="content.html" class="nav__link">События</a></li>
                </ul>
            </nav>
            <a href="favorites.html" class="fav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="fav-count">0</span>
            </a>
        </div>
    </header>

    <main class="container" style="padding-top: 100px;">
        <h1 class="section-title">Моё избранное ❤️</h1>
        <p style="text-align: center; color: #666; margin-bottom: 2rem;">Сохранённые маршруты для будущих путешествий</p>
        <div id="favContainer" class="routes-grid"></div>
    </main>

    <footer class="footer">
        <div class="container">
            <svg class="footer-ornament" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="50" r="10" fill="currentColor"/>
            </svg>
            <p>&copy; 2026 VIBE TRAVEL 03. Проект для конкурса БГСХА.</p>
        </div>
    </footer>

    <script src="src/js/main.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const favIds = getFavorites();
            const container = document.getElementById('favContainer');

            if(favIds.length === 0) {
                container.innerHTML = `
                    <div class="favorites-empty" style="grid-column: 1/-1;">
                        <h2>Пока ничего не сохранено</h2>
                        <p>Добавь маршруты в избранное, чтобы не потерять их</p>
                        <a href="routes.html" class="btn-pdf">Перейти в каталог</a>
                    </div>
                `;
                return;
            }

            fetch('data/routes.json')
                .then(r => r.json())
                .then(allRoutes => {
                    const favRoutes = allRoutes.filter(r => favIds.includes(r.id));
                    
                    favRoutes.forEach(route => {
                        const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
                        const imgSrc = route.images && route.images[0] ? route.images[0].src : 'assets/images/baikal.jpg';
                        const div = document.createElement('div');
                        div.className = 'route-card fade-in';
                        div.innerHTML = `
                            <div class="card-img" style="background: ${gradient}">
                                <img src="${imgSrc}" alt="${route.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
                            </div>
                            <div class="card-body">
                                <h3 class="card-title">${route.title}</h3>
                                <div class="card-tags">
                                    ${route.vibes.slice(0, 4).map(v => `<span class="tag">${v}</span>`).join('')}
                                </div>
                                <div class="card-meta">
                                    <span>⏱ ${route.duration}</span>
                                    <span>💰 ${route.budget}</span>
                                </div>
                                <div style="display: flex; gap: 10px; margin-top: 1rem;">
                                    <a href="route.html?id=${route.id}" class="btn-pdf" style="flex: 1; text-align: center; padding: 0.6rem;">Подробнее</a>
                                    <button class="btn-fav active" onclick="removeFav(${route.id}, this)" style="font-size: 1.2rem;">🗑️</button>
                                </div>
                            </div>
                        `;
                        container.appendChild(div);
                    });
                });
        });

        function removeFav(id, btn) {
            toggleFavorite(id);
            btn.closest('.route-card').style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                btn.closest('.route-card').remove();
                updateFavCounter();
                if(getFavorites().length === 0) location.reload();
            }, 300);
        }
    </script>
    <style>
        @keyframes fadeOut {
            to { opacity: 0; transform: scale(0.9); }
        }
    </style>
</body>
</html>
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/index.html
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VIBE TRAVEL 03 | Бурятия. Найди свой вайб</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/main.css">
    <link rel="stylesheet" href="src/css/components.css">
    <script src="data/secrets.js"></script>
    <script src="data/config.js"></script>
</head>
<body>

    <!-- Header -->
    <header class="header">
        <div class="container header__inner">
            <a href="index.html" class="logo">VIBE TRAVEL 03</a>
            <nav class="nav">
                <ul class="nav__list">
                    <li><a href="index.html" class="nav__link">Главная</a></li>
                    <li><a href="routes.html" class="nav__link">Маршруты</a></li>
                    <li><a href="map.html" class="nav__link">Карта</a></li>
                    <li><a href="content.html" class="nav__link">События</a></li>
                </ul>
            </nav>
            <a href="favorites.html" class="fav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="fav-count">0</span>
            </a>
        </div>
    </header>

    <!-- Hero -->
    <section class="hero">
        <div class="hero__bg"></div>
        <div class="hero__content container fade-in">
            <h1>БУРЯТИЯ.<br>НАЙДИ СВОЙ ВАЙБ</h1>
            <p class="hero__subtitle">Цифровой гид по эмоциям и приключениям</p>
            <a href="routes.html" class="btn-pdf" style="background: white; color: var(--color-baikal);">Выбрать маршрут</a>
        </div>
    </section>

    <!-- Vibes Selector -->
    <section class="vibes-section container">
        <h2 class="section-title">Выбери настроение</h2>
        <div class="vibes-grid">
            <button class="vibe-btn" data-vibe="#кайфовый_ракурс" onclick="selectVibe('#кайфовый_ракурс')">
                <span class="vibe-icon">📸</span>
                <span>#кайфовый_ракурс</span>
            </button>
            <button class="vibe-btn" data-vibe="#цифровой_детокс" onclick="selectVibe('#цифровой_детокс')">
                <span class="vibe-icon">🌿</span>
                <span>#цифровой_детокс</span>
            </button>
            <button class="vibe-btn" data-vibe="#место_силы" onclick="selectVibe('#место_силы')">
                <span class="vibe-icon">🙏</span>
                <span>#место_силы</span>
            </button>
            <button class="vibe-btn" data-vibe="#ветер_в_лицо" onclick="selectVibe('#ветер_в_лицо')">
                <span class="vibe-icon">🌬️</span>
                <span>#ветер_в_лицо</span>
            </button>
            <button class="vibe-btn" data-vibe="#буузы_и_точка" onclick="selectVibe('#буузы_и_точка')">
                <span class="vibe-icon">🥟</span>
                <span>#буузы_и_точка</span>
            </button>
            <button class="vibe-btn" data-vibe="#в_дикую" onclick="selectVibe('#в_дикую')">
                <span class="vibe-icon">🏔️</span>
                <span>#в_дикую</span>
            </button>
        </div>
    </section>

    <!-- Top Routes Preview -->
    <section class="container" style="padding: 4rem 0;">
        <h2 class="section-title">Популярное сейчас</h2>
        <div id="topRoutes" class="routes-grid">
            <!-- Injected via JS -->
        </div>
    </section>

    <!-- Mini Map -->
    <section class="container" style="padding-bottom: 4rem;">
        <h2 class="section-title">Живая карта</h2>
        <div id="miniMap" class="map-preview" style="height: 400px; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1);">
            <div style="display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, var(--color-bg), #e8e3d9);">
                <p style="color: var(--color-text); opacity: 0.6;">Загрузка карты...</p>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <svg class="footer-ornament" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M50 10 L50 90 M10 50 L90 50" stroke="currentColor" stroke-width="2"/>
                <circle cx="50" cy="50" r="10" fill="currentColor"/>
            </svg>
            <p>&copy; 2026 VIBE TRAVEL 03. Проект для конкурса БГСХА.</p>
        </div>
    </footer>

    <!-- Easter Egg Modal -->
    <div id="ornamentModal" class="modal">
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h3>Сила предков</h3>
            <svg class="ornament-anim" viewBox="0 0 100 100">
                <path d="M50 0 L60 40 L100 50 L60 60 L50 100 L40 60 L0 50 L40 40 Z" fill="#FFD700"/>
            </svg>
        </div>
    </div>

    <script src="https://api-maps.yandex.ru/2.1/?apikey=${CONFIG.YANDEX_MAP_KEY}&lang=ru_RU"></script>
    <script src="src/js/main.js"></script>
    <script>
        function selectVibe(vibe) {
            localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_VIBE, vibe);
            window.location.href = `routes.html?vibe=${encodeURIComponent(vibe)}`;
        }

        // Load Top Routes
        fetch('data/routes.json')
            .then(r => r.json())
            .then(data => {
                const container = document.getElementById('topRoutes');
                data.slice(0, 5).forEach(route => {
                    const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
                    const imgSrc = route.images && route.images[0] ? route.images[0].src : 'assets/images/baikal.jpg';
                    const div = document.createElement('div');
                    div.className = 'route-card fade-in';
                    div.innerHTML = `
                        <div class="card-img" style="background: ${gradient}">
                            <img src="${imgSrc}" alt="${route.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
                        </div>
                        <div class="card-body">
                            <h3 class="card-title">${route.title}</h3>
                            <div class="card-tags">
                                ${route.vibes.slice(0, 3).map(v => `<span class="tag">${v}</span>`).join('')}
                            </div>
                            <div class="card-meta">
                                <span>⏱ ${route.duration}</span>
                                <span>💰 ${route.budget}</span>
                            </div>
                            <a href="route.html?id=${route.id}" class="btn-pdf" style="margin-top: 1rem; padding: 0.6rem 1.5rem; font-size: 0.9rem;">Подробнее →</a>
                        </div>
                    `;
                    container.appendChild(div);
                });
                
                // Trigger animations
                setTimeout(() => {
                    document.querySelectorAll('#topRoutes .route-card').forEach(card => {
                        card.classList.add('visible');
                    });
                }, 100);
            });

        // Init Mini Map (Lazy)
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting && !window.mapInitialized) {
                    initMiniMap();
                    window.mapInitialized = true;
                }
            });
        });
        mapObserver.observe(document.getElementById('miniMap'));

        function initMiniMap() {
            if(typeof ymaps === 'undefined') {
                document.getElementById('miniMap').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;color:#666;">Карта загружается...</div>';
                return;
            }
            ymaps.ready(() => {
                const myMap = new ymaps.Map("miniMap", {
                    center: [52.0, 107.0],
                    zoom: 6,
                    controls: ['zoomControl']
                });
                
                fetch('data/routes.json').then(r=>r.json()).then(routes => {
                    const allBounds = [];
                    
                    routes.forEach(route => {
                        if(route.points && route.points.length > 0) {
                            const coords = route.points.map(p => p.coordinates);
                            allBounds.push(...coords);
                            
                            // Polyline for each route
                            const polyline = new ymaps.Polyline(coords, { hintContent: route.title }, { 
                                strokeColor: route.gradient[0], 
                                strokeWidth: 3,
                                strokeOpacity: 0.7
                            });
                            myMap.geoObjects.add(polyline);
                            
                            // Start point
                            const start = route.points[0];
                            const placemark = new ymaps.Placemark(start.coordinates, {
                                balloonContentHeader: route.title,
                                balloonContentBody: `<a href="route.html?id=${route.id}" style="color:var(--color-baikal)">Открыть →</a>`
                            }, { preset: 'islands#greenDotIcon' });
                            myMap.geoObjects.add(placemark);
                        }
                    });
                    
                    if(allBounds.length > 0) {
                        myMap.setBounds(allBounds, { checkZoomRange: true, padding: [20, 20, 20, 20] });
                    }
                });
            });
        }
    </script>
</body>
</html>
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/map.html
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Карта всех маршрутов | VIBE TRAVEL 03</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/main.css">
    <script src="data/secrets.js"></script>
    <script src="data/config.js"></script>
    <style> 
        body { margin: 0; overflow: hidden; } 
        #fullMap { width: 100%; height: 100vh; }
        .map-legend {
            position: absolute;
            bottom: 20px;
            right: 20px;
            background: white;
            padding: 1rem;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 200px;
        }
        .map-legend h4 {
            margin: 0 0 0.5rem 0;
            font-size: 0.9rem;
        }
        .map-legend p {
            font-size: 0.8rem;
            color: #666;
            margin: 0;
        }
    </style>
</head>
<body>
    <div id="fullMap"></div>
    <a href="index.html" class="map-back-btn">
        <span>←</span> На главную
    </a>
    <div class="map-legend">
        <h4>🗺 Все маршруты Бурятии</h4>
        <p>Кликните на метку для подробностей</p>
    </div>

    <script src="https://api-maps.yandex.ru/2.1/?apikey=${CONFIG.YANDEX_MAP_KEY}&lang=ru_RU"></script>
    <script>
        ymaps.ready(init);

        function init() {
            const myMap = new ymaps.Map("fullMap", {
                center: [52.0, 107.0],
                zoom: 6,
                controls: ['zoomControl', 'typeSelector']
            });

            fetch('data/routes.json')
                .then(r => r.json())
                .then(routes => {
                    const allBounds = [];
                    
                    routes.forEach((route, index) => {
                        if(!route.points || route.points.length === 0) return;

                        const color = route.gradient[0];
                        const coords = route.points.map(p => p.coordinates);
                        allBounds.push(...coords);

                        // Line
                        const polyline = new ymaps.Polyline(coords, { 
                            hintContent: route.title 
                        }, { 
                            strokeColor: color, 
                            strokeWidth: 4,
                            strokeOpacity: 0.8
                        });
                        myMap.geoObjects.add(polyline);

                        // Points
                        route.points.forEach((p, i) => {
                            const placemark = new ymaps.Placemark(p.coordinates, {
                                balloonContentHeader: `<strong>${route.title}</strong>`,
                                balloonContentBody: `<p>${p.name}</p><a href="route.html?id=${route.id}" style="color: var(--color-baikal);">Открыть маршрут →</a>`,
                                balloonContentFooter: i === 0 ? 'Точка старта' : (i === route.points.length - 1 ? 'Финиш') : `Точка ${i + 1}`
                            }, { 
                                preset: i === 0 ? 'islands#greenDotIcon' : (i === route.points.length - 1 ? 'islands#redDotIcon' : 'islands#blueCircleIcon')
                            });
                            myMap.geoObjects.add(placemark);
                        });
                    });

                    if(allBounds.length > 0) {
                        myMap.setBounds(allBounds, { checkZoomRange: true, padding: [50, 50, 50, 50] });
                    }
                });
        }
    </script>
</body>
</html>
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/README.md
````markdown
# 🌊 VIBE TRAVEL 03

> Цифровой гид по эмоциям и приключениям Бурятии

Проект для конкурса **«Создай свой турсайт»** (Бурятская ГСХА, 2026) в номинациях:
- «Лучший визуальный дизайн-концепт турсайта»
- «Лучшая подборка маршрутов»

---

## 🎯 Концепция

Главная инновация проекта — **эмоциональная навигация по «вайбам»**. Пользователь выбирает не тип маршрута, а желаемое настроение. Сайт подбирает приключения по внутреннему состоянию.

### Вайб-теги

| Вайб | Описание |
|------|----------|
| `#кайфовый_ракурс` | Фотолокации |
| `#цифровой_детокс` | Релакс, природа |
| `#место_силы` | Духовность, дацаны |
| `#ветер_в_лицо` | Активный отдых |
| `#буузы_и_точка` | Гастрономия |
| `#в_дикую` | Дикая природа, походы |

---

## 🚀 Запуск

1. **Откройте `index.html`** в браузере (или используйте локальный сервер, например Live Server в VS Code).
2. **API-ключ** уже настроен в `data/secrets.js` (файл в `.gitignore`).

---

## 📁 Структура проекта

```
VIBE TRAVEL 03/
├── index.html          # Главная страница
├── routes.html         # Каталог маршрутов
├── route.html          # Детальная страница маршрута
├── map.html            # Интерактивная карта всех маршрутов
├── content.html        # События и видео
├── favorites.html      # Избранное
├── admin.html          # Админ-панель (пароль: admin2026)
├── data/
│   ├── config.js       # Конфигурация
│   ├── secrets.js      # Секретные ключи (в .gitignore)
│   ├── routes.json     # 12 туристических маршрутов
│   └── events.json     # События и фестивали
├── src/
│   ├── css/
│   │   ├── main.css    # Основные стили
│   │   └── components.css # Компоненты и страницы
│   └── js/
│       ├── main.js     # Основная логика
│       ├── filters.js  # Фильтрация и сортировка
│       ├── pdfGenerator.js # Генерация PDF
│       └── admin.js    # Админ-панель
└── .env                # Переменные окружения (в .gitignore)
```

---

## ✨ Функциональность

- **Эмоциональная навигация** — выбор маршрутов по вайбам
- **Умная фильтрация** — логика AND для вайбов, фильтры по длительности и сезону
- **Интерактивные карты** — Яндекс.Карты с маршрутами и точками
- **Избранное** — сохранение в localStorage
- **PDF-гиды** — генерация туристических брошюр
- **Пасхалки** — анимированные бурятские орнаменты
- **Адаптивность** — полная поддержка мобильных устройств

---

## 🎨 Дизайн-система

- **Стиль:** Минимализм Notion + Airbnb с элементами glassmorphism
- **Цветовая палитра:**
  - Синий Байкал: `#0077BE`
  - Зелёный кедр: `#2E8B57`
  - Золото: `#FFD700`
  - Тёплый фон: `#F5F0E6`
- **Шрифт:** Inter (Google Fonts)
- **Анимации:** Плавные переходы, fade-in при скролле, градиентные эффекты

---

## 🔐 Админ-панель

Для добавления новых маршрутов:
1. Откройте `admin.html`
2. Введите пароль: `admin2026`
3. Заполните форму и скопируйте JSON
4. Добавьте в `data/routes.json`

---

## 📝 Технический стек

- **HTML5** — семантическая вёрстка
- **CSS3** — Grid, Flexbox, CSS Variables, анимации (BEM)
- **Vanilla JavaScript** — ES6+, без фреймворков
- **Яндекс.Карты** — интерактивные карты
- **jsPDF** — генерация PDF-документов

---

## 📄 Лицензия

Проект создан для образовательных целей и конкурса БГСХА 2026.

---

*Бурятия. Найди свой вайб 🏔️*
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/route.html
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Маршрут | VIBE TRAVEL 03</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/main.css">
    <link rel="stylesheet" href="src/css/components.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="data/secrets.js"></script>
    <script src="data/config.js"></script>
</head>
<body>
    <header class="header">
        <div class="container header__inner">
            <a href="index.html" class="logo">VIBE TRAVEL 03</a>
            <a href="routes.html" style="font-weight:600">← Назад</a>
        </div>
    </header>

    <div id="routeDetail" class="route-detail">
        <!-- Content injected by JS -->
    </div>

    <script src="src/js/main.js"></script>
    <script src="src/js/pdfGenerator.js"></script>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=${CONFIG.YANDEX_MAP_KEY}&lang=ru_RU"></script>
    <script>
        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        if(!id) {
            document.getElementById('routeDetail').innerHTML = '<div class="container" style="padding-top:100px; text-align:center"><h1>Маршрут не найден</h1><a href="routes.html" class="btn-pdf">В каталог</a></div>';
        } else {
            fetch('data/routes.json')
                .then(r => r.json())
                .then(data => {
                    const route = data.find(x => x.id == id);
                    if(!route) {
                        document.getElementById('routeDetail').innerHTML = '<div class="container" style="padding-top:100px; text-align:center"><h1>404 - Маршрут не найден</h1><a href="routes.html" class="btn-pdf">В каталог</a></div>';
                        return;
                    }
                    renderDetail(route);
                });
        }

        function renderDetail(route) {
            const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
            const container = document.getElementById('routeDetail');
            const isFav = getFavorites().includes(route.id);
            
            const scheduleHtml = route.schedule.map(s => `
                <div class="schedule-item">
                    <h4>День ${s.day}: ${s.title}</h4>
                    <p>${s.description}</p>
                </div>
            `).join('');

            container.innerHTML = `
                <div class="detail-header" style="background: ${gradient}">
                    <h1>${route.title}</h1>
                </div>
                <div class="container detail-content">
                    <div>
                        <div class="info-block">
                            <h2>О вайбе</h2>
                            <p>${route.fullDescription}</p>
                            <div class="card-tags" style="margin-top:1rem">
                                ${route.vibes.map(v => `<span class="tag">${v}</span>`).join('')}
                            </div>
                        </div>
                        <div class="info-block">
                            <h2>Программа</h2>
                            ${scheduleHtml}
                        </div>
                        <div class="info-block">
                            <h2>Логистика</h2>
                            <p><strong>🚗 Как добраться:</strong> ${route.logistics.howToGet}</p>
                            <p><strong>💰 Бюджет:</strong> ${route.logistics.budgetDetails}</p>
                            <p><strong>📅 Сезон:</strong> ${route.logistics.seasonality}</p>
                            <button class="btn-pdf" onclick="generatePDF(${route.id})">📄 Скачать PDF-гид</button>
                        </div>
                    </div>
                    <div>
                        <div class="info-block">
                            <h3>Информация</h3>
                            <p style="display: flex; align-items: center; gap: 8px;">⏱ <strong>Длительность:</strong> ${route.duration}</p>
                            <p style="display: flex; align-items: center; gap: 8px;">💰 <strong>Бюджет:</strong> ${route.budget}</p>
                            <p style="display: flex; align-items: center; gap: 8px;">📆 <strong>Сезон:</strong> ${route.season}</p>
                            <button class="btn-fav-detail ${isFav ? 'active' : ''}" data-id="${route.id}">
                                ${isFav ? '❤️ В избранном' : '🤍 Добавить в избранное'}
                            </button>
                        </div>
                        <div id="map" class="map-container"></div>
                    </div>
                </div>
            `;

            initMap(route);
            initFavorites();
        }

        function initMap(route) {
            if(typeof ymaps === 'undefined') {
                document.getElementById('map').innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;background:#f5f5f5;color:#666;">Карта загружается...</div>';
                return;
            }
            ymaps.ready(() => {
                const map = new ymaps.Map("map", {
                    center: route.points[0].coordinates,
                    zoom: 9,
                    controls: ['zoomControl']
                });

                const coords = route.points.map(p => p.coordinates);
                
                // Polyline
                const polyline = new ymaps.Polyline(coords, {}, { 
                    strokeColor: route.gradient[0], 
                    strokeWidth: 4,
                    strokeOpacity: 0.8
                });
                map.geoObjects.add(polyline);

                // Placemarks
                route.points.forEach((p, i) => {
                    const mark = new ymaps.Placemark(p.coordinates, { 
                        balloonContent: `<strong>${p.name}</strong>${i === 0 ? '<br><em>Точка старта</em>' : (i === route.points.length - 1 ? '<br><em>Финиш</em>' : '')}`
                    }, {
                        preset: i === 0 ? 'islands#greenDotIcon' : (i === route.points.length - 1 ? 'islands#redDotIcon' : 'islands#blueCircleIcon')
                    });
                    map.geoObjects.add(mark);
                });

                map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true });
            });
        }
    </script>
</body>
</html>
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/routes.html
````html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Каталог маршрутов | VIBE TRAVEL 03</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="src/css/main.css">
    <link rel="stylesheet" href="src/css/components.css">
    <script src="data/secrets.js"></script>
    <script src="data/config.js"></script>
</head>
<body>
    <header class="header">
        <div class="container header__inner">
            <a href="index.html" class="logo">VIBE TRAVEL 03</a>
            <a href="favorites.html" class="fav-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span class="fav-count">0</span>
            </a>
        </div>
    </header>

    <main class="container" style="padding-top: 100px;">
        <button class="filter-toggle" onclick="toggleFilters()">⚙️ Фильтры и сортировка</button>
        <div class="overlay" onclick="toggleFilters()"></div>
        
        <div class="filters-panel">
            <div class="filter-group">
                <label>Вайбы (AND)</label>
                <div class="filter-options">
                    <label class="checkbox-label"><input type="checkbox" name="vibe" value="#кайфовый_ракурс" class="filter-option"><span>📸 #кайфовый_ракурс</span></label>
                    <label class="checkbox-label"><input type="checkbox" name="vibe" value="#цифровой_детокс" class="filter-option"><span>🌿 #цифровой_детокс</span></label>
                    <label class="checkbox-label"><input type="checkbox" name="vibe" value="#место_силы" class="filter-option"><span>🙏 #место_силы</span></label>
                    <label class="checkbox-label"><input type="checkbox" name="vibe" value="#ветер_в_лицо" class="filter-option"><span>🌬️ #ветер_в_лицо</span></label>
                    <label class="checkbox-label"><input type="checkbox" name="vibe" value="#буузы_и_точка" class="filter-option"><span>🥟 #буузы_и_точка</span></label>
                    <label class="checkbox-label"><input type="checkbox" name="vibe" value="#в_дикую" class="filter-option"><span>🏔️ #в_дикую</span></label>
                </div>
            </div>
            
            <div class="filter-row">
                <div class="filter-group">
                    <label>Длительность</label>
                    <select name="duration" class="form-control filter-option" style="width: auto;">
                        <option value="">Любая</option>
                        <option value="short">1-2 дня</option>
                        <option value="medium">3-4 дня</option>
                        <option value="long">5+ дней</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label>Сезон</label>
                    <select name="season" class="form-control filter-option" style="width: auto;">
                        <option value="">Любой</option>
                        <option value="лето">Лето</option>
                        <option value="зима">Зима</option>
                        <option value="круглый год">Круглый год</option>
                    </select>
                </div>

                <div class="filter-group">
                    <label>Сортировка</label>
                    <select id="sortSelect" class="form-control" style="width: auto;">
                        <option value="default">По умолчанию</option>
                        <option value="duration_asc">Сначала короткие</option>
                        <option value="budget_asc">Сначала дешевые</option>
                    </select>
                </div>
            </div>
        </div>

        <div id="routesContainer" class="routes-grid">
            <!-- Cards injected by JS -->
            <div class="skeleton" style="height: 300px; border-radius: 20px;"></div>
            <div class="skeleton" style="height: 300px; border-radius: 20px;"></div>
            <div class="skeleton" style="height: 300px; border-radius: 20px;"></div>
        </div>
    </main>

    <script src="src/js/main.js"></script>
    <script src="src/js/filters.js"></script>
    <script>
        function toggleFilters() {
            document.querySelector('.filters-panel').classList.toggle('open');
            document.querySelector('.overlay').classList.toggle('active');
        }
    </script>
</body>
</html>
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/css/components.css
````css
/* Components & Page Specific Styles */

/* Filters Panel */
.filters-panel {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: transform 0.3s ease;
}

.filter-group { margin-bottom: 1.5rem; }
.filter-group label { 
    display: block; 
    font-weight: 600; 
    margin-bottom: 0.5rem; 
    color: var(--color-dark);
    font-size: 0.9rem;
}

.filter-options { 
    display: flex; 
    flex-wrap: wrap; 
    gap: 0.5rem; 
}

.filter-row {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    align-items: flex-end;
}

.filter-row .filter-group {
    flex: 1;
    min-width: 150px;
}

.checkbox-label {
    display: inline-flex;
    align-items: center;
    padding: 0.6rem 1rem;
    background: var(--color-bg);
    border-radius: 25px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all var(--transition-normal);
    border: 2px solid transparent;
}

.checkbox-label:hover {
    background: #e8e3d9;
}

.checkbox-label input { display: none; }
.checkbox-label.selected { 
    background: var(--color-baikal); 
    color: white;
    border-color: var(--color-baikal);
}

.checkbox-label span {
    display: flex;
    align-items: center;
    gap: 6px;
}

/* Form Controls */
.form-control {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 2px solid #eee;
    border-radius: 10px;
    font-family: inherit;
    font-size: 0.9rem;
    transition: all var(--transition-normal);
    background: var(--color-bg);
}

.form-control:focus {
    outline: none;
    border-color: var(--color-baikal);
    background: white;
    box-shadow: 0 0 0 4px rgba(0, 119, 190, 0.1);
}

/* Route Detail Page */
.route-detail { 
    padding-top: 80px; 
    min-height: 100vh;
}

.detail-header {
    height: 450px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2.5rem;
    font-weight: 800;
    text-shadow: 0 4px 20px rgba(0,0,0,0.4);
    text-align: center;
    padding: 2rem;
}

.detail-header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.5) 100%);
}

.detail-header h1 {
    position: relative;
    z-index: 1;
    max-width: 800px;
}

.detail-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-top: 2rem;
    padding-bottom: 4rem;
}

.info-block {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.info-block h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-dark);
    position: relative;
    padding-bottom: 0.5rem;
}

.info-block h2::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, var(--color-baikal), var(--color-gold));
    border-radius: 2px;
}

.schedule-item {
    border-left: 3px solid var(--color-baikal);
    padding-left: 1.5rem;
    margin-bottom: 1.5rem;
    position: relative;
}

.schedule-item::before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    background: var(--color-baikal);
    border-radius: 50%;
}

.schedule-item h4 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    color: var(--color-dark);
}

.schedule-item p {
    color: #666;
    line-height: 1.6;
}

.map-container {
    height: 400px;
    border-radius: 16px;
    overflow: hidden;
    margin: 1.5rem 0;
    background: #eee;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.btn-pdf {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: var(--color-dark);
    color: white;
    padding: 1rem 2rem;
    border-radius: 30px;
    font-weight: 600;
    margin-top: 1rem;
    cursor: pointer;
    border: none;
    transition: all var(--transition-normal);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.btn-pdf:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    background: var(--color-gold);
    color: var(--color-dark);
}

.btn-fav-detail {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(231, 76, 60, 0.1);
    color: var(--color-danger);
    padding: 0.8rem 1.5rem;
    border-radius: 25px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all var(--transition-normal);
    margin-top: 1rem;
}

.btn-fav-detail:hover {
    background: var(--color-danger);
    color: white;
}

.btn-fav-detail.active {
    background: var(--color-danger);
    color: white;
}

/* Content Page */
.events-section {
    padding: var(--spacing-lg) 0;
}

.events-list { 
    display: grid; 
    gap: 1.5rem; 
}

.event-card {
    background: white;
    padding: 1.5rem;
    border-radius: 16px;
    display: flex;
    gap: 1.5rem;
    align-items: center;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: all var(--transition-normal);
}

.event-card:hover {
    transform: translateX(10px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
}

.event-date {
    background: linear-gradient(135deg, var(--color-gold), #ffb700);
    padding: 1rem 1.5rem;
    border-radius: 12px;
    text-align: center;
    font-weight: bold;
    min-width: 100px;
    color: var(--color-dark);
    box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.event-date .month {
    font-size: 0.8rem;
    text-transform: uppercase;
    opacity: 0.8;
}

.event-date .day {
    font-size: 1.8rem;
    line-height: 1;
}

.event-info h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: var(--color-dark);
}

.event-info p {
    color: #666;
    font-size: 0.9rem;
}

.video-section {
    padding: var(--spacing-lg) 0;
}

.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.video-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 2rem;
    background: #000;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
    transition: all var(--transition-normal);
}

.video-wrapper:hover {
    transform: scale(1.02);
    box-shadow: 0 15px 50px rgba(0,0,0,0.3);
}

.video-wrapper iframe {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
}

.wave-effect {
    position: relative;
    overflow: hidden;
}

.wave-effect::after {
    content: '';
    position: absolute;
    bottom: -50px; left: 0; width: 100%; height: 50px;
    background: linear-gradient(to top, rgba(0,119,190,0.2), transparent);
    opacity: 0;
    transition: opacity 0.3s;
}

.wave-effect:hover::after { 
    opacity: 1; 
    animation: wave 2s infinite linear; 
}

@keyframes wave {
    0% { transform: translateX(0); }
    50% { transform: translateX(-10px); }
    100% { transform: translateX(0); }
}

/* Admin Page */
.admin-form {
    max-width: 800px;
    margin: 2rem auto;
    background: white;
    padding: 2rem;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.admin-form h1 {
    margin-bottom: 1.5rem;
    color: var(--color-dark);
}

.form-group { margin-bottom: 1rem; }
.form-group label { 
    display: block; 
    margin-bottom: 0.5rem; 
    font-weight: 600; 
    color: var(--color-dark);
}

.form-control {
    width: 100%;
    padding: 0.8rem 1rem;
    border: 2px solid #eee;
    border-radius: 10px;
    font-family: inherit;
    font-size: 0.9rem;
    transition: all var(--transition-normal);
    background: var(--color-bg);
}

.form-control:focus {
    outline: none;
    border-color: var(--color-baikal);
    background: white;
}

textarea.form-control { 
    min-height: 100px; 
    resize: vertical;
}

.btn-admin {
    background: linear-gradient(135deg, var(--color-baikal), var(--color-cedar));
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 30px;
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-normal);
    margin-top: 1rem;
}

.btn-admin:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 119, 190, 0.3);
}

.output-area {
    margin-top: 2rem;
    padding: 1rem;
    background: #1a1a1a;
    border-radius: 12px;
    color: #0f0;
    font-family: monospace;
    font-size: 0.85rem;
    max-height: 300px;
    overflow: auto;
}

/* Map Page */
.full-map {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 1;
}

.map-back-btn {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1000;
    background: white;
    padding: 12px 24px;
    border-radius: 30px;
    font-weight: 600;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
    transition: all var(--transition-normal);
    display: flex;
    align-items: center;
    gap: 8px;
}

.map-back-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    background: var(--color-gold);
}

/* Favorites Page */
.favorites-empty {
    text-align: center;
    padding: 4rem 2rem;
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.favorites-empty h2 {
    color: var(--color-dark);
    margin-bottom: 1rem;
}

.favorites-empty p {
    color: #666;
    margin-bottom: 2rem;
}

.favorites-empty .btn-pdf {
    background: var(--color-baikal);
    color: white;
}

/* Responsive */
@media (max-width: 768px) {
    .detail-content { 
        grid-template-columns: 1fr; 
    }
    
    .event-card { 
        flex-direction: column; 
        text-align: center; 
    }
    
    .filter-row {
        flex-direction: column;
    }
    
    .filter-row .filter-group {
        width: 100%;
    }
}
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/css/main.css
````css
/* VIBE TRAVEL 03 - Main Styles (Enhanced) */
:root {
    /* Palette */
    --color-baikal: #0077BE;
    --color-cedar: #2E8B57;
    --color-gold: #FFD700;
    --color-bg: #F5F0E6;
    --color-dark: #1A1A1A;
    --color-white: #FFFFFF;
    --color-text: #333333;
    --color-danger: #e74c3c;
    
    /* Vibe Colors */
    --vibe-photo: #FF6B35;
    --vibe-relax: #2E8B57;
    --vibe-spirit: #B8860B;
    --vibe-active: #0077BE;
    --vibe-food: #FFB347;
    --vibe-wild: #20B2AA;
    
    /* Typography */
    --font-main: 'Inter', sans-serif;
    
    /* Spacing */
    --spacing-xs: 0.5rem;
    --spacing-sm: 1rem;
    --spacing-md: 2rem;
    --spacing-lg: 4rem;
    
    /* Transitions */
    --transition-fast: 0.2s ease;
    --transition-normal: 0.4s ease;
    --transition-smooth: 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-main);
    background-color: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    overflow-x: hidden;
}

a { text-decoration: none; color: inherit; transition: var(--transition-fast); }
ul { list-style: none; }
img { max-width: 100%; display: block; }

/* Container */
.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-sm);
}

/* Header */
.header {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 1000;
    box-shadow: 0 2px 20px rgba(0,0,0,0.08);
    padding: var(--spacing-sm) 0;
    transition: all var(--transition-normal);
}

.header.scrolled {
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 4px 30px rgba(0,0,0,0.12);
}

.header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 800;
    color: var(--color-baikal);
    letter-spacing: -1px;
    position: relative;
    overflow: hidden;
}

.logo::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, var(--color-baikal), var(--color-cedar), var(--color-gold));
    transform: scaleX(0);
    transform-origin: right;
    transition: transform var(--transition-smooth);
}

.logo:hover::after {
    transform: scaleX(1);
    transform-origin: left;
}

.nav__list {
    display: flex;
    gap: var(--spacing-md);
}

.nav__link {
    font-weight: 500;
    color: var(--color-dark);
    position: relative;
    padding: 0.5rem 0;
}

.nav__link::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--color-baikal);
    transition: width var(--transition-normal);
}

.nav__link:hover { 
    color: var(--color-baikal); 
}

.nav__link:hover::after {
    width: 100%;
}

.fav-icon {
    position: relative;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(0, 119, 190, 0.1);
    transition: all var(--transition-normal);
}

.fav-icon:hover {
    background: rgba(0, 119, 190, 0.2);
    transform: scale(1.1);
}

.fav-icon svg {
    color: var(--color-baikal);
}

.fav-count {
    position: absolute;
    top: -4px;
    right: -4px;
    background: var(--color-danger);
    color: white;
    font-size: 0.7rem;
    min-width: 18px;
    height: 18px;
    border-radius: 9px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    padding: 0 4px;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

/* Hero Section */
.hero {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: white;
    position: relative;
    overflow: hidden;
    margin-top: 0;
}

.hero__bg {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: linear-gradient(135deg, 
        var(--color-baikal) 0%, 
        #005f9e 25%, 
        var(--color-cedar) 50%, 
        #1e6b47 75%, 
        var(--color-gold) 100%);
    background-size: 400% 400%;
    animation: gradientShift 15s ease infinite;
    z-index: -1;
}

@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.hero__bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
}

.hero__content {
    position: relative;
    z-index: 1;
}

.hero__content h1 {
    font-size: clamp(2.5rem, 6vw, 5rem);
    font-weight: 900;
    margin-bottom: var(--spacing-sm);
    line-height: 1.1;
    text-shadow: 0 4px 30px rgba(0,0,0,0.3);
    letter-spacing: -2px;
    animation: fadeInUp 1s ease-out;
}

.hero__subtitle {
    font-size: 1.2rem;
    opacity: 0.9;
    margin-bottom: var(--spacing-md);
    animation: fadeInUp 1s ease-out 0.2s both;
}

.hero .btn-pdf {
    animation: fadeInUp 1s ease-out 0.4s both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Vibes Block */
.vibes-section {
    padding: var(--spacing-lg) 0;
    text-align: center;
    background: linear-gradient(180deg, transparent, rgba(0, 119, 190, 0.03));
}

.section-title {
    font-size: 2.5rem;
    margin-bottom: var(--spacing-md);
    color: var(--color-dark);
    position: relative;
    display: inline-block;
}

.section-title::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, var(--color-baikal), var(--color-gold));
    border-radius: 2px;
}

.vibes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: var(--spacing-sm);
    margin-top: var(--spacing-md);
}

.vibe-btn {
    padding: var(--spacing-md);
    border: 2px solid transparent;
    border-radius: 16px;
    background: white;
    color: var(--color-dark);
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.vibe-btn:hover, .vibe-btn.active {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    border-color: currentColor;
}

.vibe-btn[data-vibe="#кайфовый_ракурс"] { color: var(--vibe-photo); }
.vibe-btn[data-vibe="#цифровой_детокс"] { color: var(--vibe-relax); }
.vibe-btn[data-vibe="#место_силы"] { color: var(--vibe-spirit); }
.vibe-btn[data-vibe="#ветер_в_лицо"] { color: var(--vibe-active); }
.vibe-btn[data-vibe="#буузы_и_точка"] { color: var(--vibe-food); }
.vibe-btn[data-vibe="#в_дикую"] { color: var(--vibe-wild); }

.vibe-btn:hover, .vibe-btn.active {
    background: currentColor;
    color: white;
}

.vibe-btn .vibe-icon {
    font-size: 1.5rem;
}

/* Cards Grid */
.routes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: var(--spacing-md);
    padding: var(--spacing-md) 0;
}

.route-card {
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
    transition: all var(--transition-normal);
    display: flex;
    flex-direction: column;
    position: relative;
}

.route-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--color-baikal), var(--color-cedar));
    opacity: 0;
    transition: opacity var(--transition-normal);
}

.route-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.12);
}

.route-card:hover::before {
    opacity: 1;
}

.card-img {
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    text-align: center;
    padding: 1rem;
    position: relative;
    overflow: hidden;
}

.card-img::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%);
}

.card-body {
    padding: var(--spacing-md);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.card-title {
    font-size: 1.25rem;
    margin-bottom: var(--spacing-xs);
    color: var(--color-dark);
    font-weight: 700;
}

.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: var(--spacing-sm);
}

.tag {
    font-size: 0.75rem;
    padding: 4px 10px;
    background: var(--color-bg);
    border-radius: 20px;
    color: var(--color-text);
    font-weight: 500;
    transition: all var(--transition-fast);
}

.tag:hover {
    background: var(--color-baikal);
    color: white;
}

.card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: var(--spacing-sm);
    font-size: 0.9rem;
    color: #777;
    border-top: 1px solid #eee;
}

.card-meta span {
    display: flex;
    align-items: center;
    gap: 4px;
}

.btn-fav {
    background: none;
    border: none;
    cursor: pointer;
    color: #ccc;
    transition: all var(--transition-normal);
    font-size: 1.2rem;
    padding: 4px;
}

.btn-fav:hover {
    transform: scale(1.2);
}

.btn-fav.active { 
    color: var(--color-danger); 
    animation: heartBeat 0.6s ease;
}

@keyframes heartBeat {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.3); }
}

/* Footer */
.footer {
    background: var(--color-dark);
    color: white;
    padding: var(--spacing-lg) 0;
    margin-top: var(--spacing-lg);
    text-align: center;
    position: relative;
    overflow: hidden;
}

.footer::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, 
        var(--color-baikal), 
        var(--color-cedar), 
        var(--color-gold), 
        var(--color-cedar), 
        var(--color-baikal));
    background-size: 200% 100%;
    animation: shimmer 3s linear infinite;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

.footer-ornament {
    width: 80px;
    height: 80px;
    margin: 0 auto var(--spacing-md);
    fill: var(--color-gold);
    transition: all var(--transition-smooth);
    opacity: 0.8;
}

.footer-ornament:hover {
    opacity: 1;
    transform: rotate(10deg) scale(1.1);
    fill: var(--color-baikal);
}

.footer p {
    opacity: 0.7;
    font-size: 0.9rem;
}

/* Mobile Filter Toggle */
.filter-toggle {
    display: none;
    width: 100%;
    padding: 1rem;
    background: linear-gradient(135deg, var(--color-baikal), var(--color-cedar));
    color: white;
    border: none;
    border-radius: 12px;
    margin-bottom: 1rem;
    font-weight: 600;
    font-size: 1rem;
    cursor: pointer;
    transition: all var(--transition-normal);
    box-shadow: 0 4px 15px rgba(0, 119, 190, 0.3);
}

.filter-toggle:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 119, 190, 0.4);
}

/* Responsive */
@media (max-width: 768px) {
    .filter-toggle { display: block; }
    
    .nav__list {
        display: none;
    }
    
    .header__inner {
        padding: 0;
    }
    
    .vibes-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .vibe-btn {
        flex-direction: column;
        padding: var(--spacing-sm);
        font-size: 0.85rem;
    }
    
    .vibe-btn .vibe-icon {
        font-size: 1.8rem;
    }
    
    .routes-grid {
        grid-template-columns: 1fr;
    }
    
    .hero__content h1 {
        letter-spacing: -1px;
    }
    
    .section-title {
        font-size: 1.8rem;
    }
}

/* Animations for scroll reveal */
.fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: all var(--transition-smooth);
}

.fade-in.visible {
    opacity: 1;
    transform: translateY(0);
}

/* Stagger animation delays */
.route-card:nth-child(1) { transition-delay: 0s; }
.route-card:nth-child(2) { transition-delay: 0.1s; }
.route-card:nth-child(3) { transition-delay: 0.2s; }
.route-card:nth-child(4) { transition-delay: 0.3s; }
.route-card:nth-child(5) { transition-delay: 0.4s; }
.route-card:nth-child(6) { transition-delay: 0.5s; }

/* Glassmorphism utility */
.glass {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Button styles */
.btn-pdf {
    display: inline-block;
    background: white;
    color: var(--color-baikal);
    padding: 1rem 2.5rem;
    border-radius: 30px;
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
    border: none;
    transition: all var(--transition-normal);
    box-shadow: 0 4px 20px rgba(0, 119, 190, 0.3);
}

.btn-pdf:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 30px rgba(0, 119, 190, 0.4);
    background: var(--color-gold);
    color: var(--color-dark);
}

/* Loading skeleton */
.skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

/* Scrollbar styling */
::-webkit-scrollbar {
    width: 8px;
}

::-webkit-scrollbar-track {
    background: var(--color-bg);
}

::-webkit-scrollbar-thumb {
    background: var(--color-baikal);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background: var(--color-cedar);
}

/* Cedar Icon (Easter Egg) */
.cedar-icon {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--color-cedar);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    z-index: 900;
    transition: transform 0.3s;
}

.cedar-icon:hover { transform: scale(1.1); }

/* Modal for Easter Egg */
.modal {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 3000;
    display: none;
    align-items: center;
    justify-content: center;
}

.modal.active { display: flex; }

.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 16px;
    text-align: center;
    max-width: 90%;
    position: relative;
}

.close-modal {
    position: absolute;
    top: 10px; right: 15px;
    font-size: 1.5rem;
    cursor: pointer;
}

.ornament-anim {
    width: 200px;
    height: 200px;
    animation: spin 10s linear infinite;
}

@keyframes spin { 100% { transform: rotate(360deg); } }
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/admin.js
````javascript
// admin.js - Admin Panel Logic
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('routeForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateJson();
        });
    }
});

function generateJson() {
    const id = document.getElementById('r_id').value;
    const title = document.getElementById('r_title').value;
    const vibes = document.getElementById('r_vibes').value.split(',').map(s => s.trim());
    const g1 = document.getElementById('r_g1').value;
    const g2 = document.getElementById('r_g2').value;
    const duration = document.getElementById('r_dur').value;
    const budget = document.getElementById('r_bud').value;
    const season = document.getElementById('r_season').value;
    const description = document.getElementById('r_desc').value;
    const fullDescription = document.getElementById('r_fullDesc').value;
    
    // Build complete route object
    const newRoute = {
        id: parseInt(id) || Date.now(),
        title: title,
        vibes: vibes,
        gradient: [g1, g2],
        duration: duration || "1 день",
        budget: budget || "от 0 ₽",
        season: season,
        description: description || "Описание маршрута",
        fullDescription: fullDescription || description || "Подробное описание маршрута",
        schedule: [
            { day: 1, title: "День 1", description: "Описание первого дня" }
        ],
        logistics: {
            howToGet: "Указать способ добраться",
            budgetDetails: budget || "Указать бюджет",
            seasonality: season === "круглый год" ? "Круглый год" : (season === "лето" ? "Июнь-Сентябрь" : "Декабрь-Март")
        },
        points: [
            { name: "Точка 1", coordinates: [51.8, 107.6] }
        ],
        images: [
            { src: "assets/images/placeholders/route" + id + ".jpg", alt: title }
        ]
    };

    const output = document.getElementById('jsonOutput');
    output.value = JSON.stringify(newRoute, null, 2);
}

function copyJson() {
    const copyText = document.getElementById("jsonOutput");
    copyText.select();
    document.execCommand("copy");
    alert("JSON скопирован! Добавьте его в routes.json вручную.");
}
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/filters.js
````javascript
// filters.js - Filtering and Sorting Logic
let allRoutes = [];

document.addEventListener('DOMContentLoaded', async () => {
    const routesContainer = document.getElementById('routesContainer');
    if (!routesContainer) return;

    try {
        const response = await fetch('data/routes.json');
        allRoutes = await response.json();
        applyFilters();
    } catch (error) {
        console.error('Error loading routes:', error);
        routesContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">Ошибка загрузки данных.</p>';
    }

    setupFilterListeners();
    setupSortListener();
    
    // Restore vibe from URL or LocalStorage
    restoreVibeSelection();
});

function setupFilterListeners() {
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const label = e.target.closest('.checkbox-label');
            if(e.target.checked) label.classList.add('selected');
            else label.classList.remove('selected');
            applyFilters();
        });
    });

    // Select filters
    const selects = document.querySelectorAll('.filter-option:not(input[type="checkbox"])');
    selects.forEach(sel => {
        sel.addEventListener('change', applyFilters);
    });
}

function setupSortListener() {
    const sortSelect = document.getElementById('sortSelect');
    if(sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
}

function restoreVibeSelection() {
    const params = new URLSearchParams(window.location.search);
    const vibeParam = params.get('vibe');
    
    if (vibeParam) {
        const checkbox = document.querySelector(`input[value="${vibeParam}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.closest('.checkbox-label').classList.add('selected');
            localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_VIBE, vibeParam);
        }
    } else {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
        if(saved) {
            const checkbox = document.querySelector(`input[value="${saved}"]`);
            if(checkbox) {
                checkbox.checked = true;
                checkbox.closest('.checkbox-label').classList.add('selected');
            }
        }
    }
}

function applyFilters() {
    // Get selected values
    const selectedVibes = Array.from(document.querySelectorAll('input[name="vibe"]:checked')).map(el => el.value);
    const selectedDuration = document.querySelector('select[name="duration"]')?.value;
    const selectedSeason = document.querySelector('select[name="season"]')?.value;
    const sortBy = document.getElementById('sortSelect')?.value || 'default';

    // Filter Logic (AND)
    let filtered = allRoutes.filter(route => {
        // Vibe Check (Route must have ALL selected vibes)
        const hasVibes = selectedVibes.every(v => route.vibes.includes(v));
        
        // Duration Check
        let hasDuration = true;
        if(selectedDuration) {
            const days = parseInt(route.duration) || 0;
            if(selectedDuration === 'short') hasDuration = days <= 2;
            if(selectedDuration === 'medium') hasDuration = days >= 3 && days <= 4;
            if(selectedDuration === 'long') hasDuration = days >= 5;
        }

        // Season Check
        let hasSeason = true;
        if(selectedSeason) {
            hasSeason = route.season.toLowerCase().includes(selectedSeason.toLowerCase()) || 
                        route.season === 'круглый год';
        }

        return hasVibes && hasDuration && hasSeason;
    });

    // Sorting
    if (sortBy === 'duration_asc') {
        filtered.sort((a, b) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0));
    } else if (sortBy === 'budget_asc') {
        const getBudget = s => parseInt(s.replace(/[^0-9]/g, '')) || 0;
        filtered.sort((a, b) => getBudget(a.budget) - getBudget(b.budget));
    }

    renderRoutes(filtered);
}

function renderRoutes(routes) {
    const container = document.getElementById('routesContainer');
    
    if (routes.length === 0) {
        container.innerHTML = `
            <div class="favorites-empty" style="grid-column: 1/-1;">
                <h2>Маршруты не найдены</h2>
                <p>Попробуйте изменить фильтры</p>
                <button class="btn-pdf" onclick="resetFilters()">Сбросить фильтры</button>
            </div>
        `;
        return;
    }

    container.innerHTML = routes.map(route => {
        const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
        const isFav = getFavorites().includes(route.id);
        const imgSrc = route.images && route.images[0] ? route.images[0].src : 'assets/images/baikal.jpg';
        
        return `
            <div class="route-card fade-in">
                <div class="card-img" style="background: ${gradient}">
                    <img src="${imgSrc}" alt="${route.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${route.title}</h3>
                    <div class="card-tags">
                        ${route.vibes.slice(0, 4).map(v => `<span class="tag">${v}</span>`).join('')}
                    </div>
                    <div class="card-meta">
                        <span>⏱ ${route.duration}</span>
                        <span>💰 ${route.budget}</span>
                        <button class="btn-fav ${isFav ? 'active' : ''}" data-id="${route.id}">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <a href="route.html?id=${route.id}" class="btn-pdf" style="margin-top: 1rem; padding: 0.6rem 1.5rem; font-size: 0.9rem;">Подробнее</a>
                </div>
            </div>
        `;
    }).join('');

    // Re-init favorites after render
    initFavorites();
    
    // Trigger animation
    setTimeout(() => {
        document.querySelectorAll('.route-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}

function resetFilters() {
    document.querySelectorAll('input[name="vibe"]').forEach(cb => {
        cb.checked = false;
        cb.closest('.checkbox-label').classList.remove('selected');
    });
    document.querySelectorAll('.filter-option').forEach(sel => {
        if(sel.tagName === 'SELECT') sel.value = '';
    });
    document.getElementById('sortSelect').value = 'default';
    localStorage.removeItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
    applyFilters();
}

function renderRoutes(routes) {
    const container = document.getElementById('routesContainer');
    container.innerHTML = '';
    
    const favs = getFavorites();

    if (routes.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Ничего не найдено :( Попробуйте снять фильтры.</div>';
        return;
    }

    routes.forEach(route => {
        const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
        const isFav = favs.includes(route.id) ? 'active' : '';
        const imgSrc = route.images && route.images[0] ? route.images[0].src : 'assets/images/baikal.jpg';
        
        const tagsHtml = route.vibes.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('');
        
        const card = document.createElement('div');
        card.className = 'route-card fade-in visible';
        card.innerHTML = `
            <div class="card-img" style="background: ${gradient}">
                <img src="${imgSrc}" alt="${route.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
            </div>
            <div class="card-body">
                <h3 class="card-title">${escapeHTML(route.title)}</h3>
                <div class="card-tags">${tagsHtml}</div>
                <div class="card-meta">
                    <span>⏱ ${route.duration}</span>
                    <span>💰 ${route.budget}</span>
                </div>
                <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <a href="route.html?id=${route.id}" style="color: var(--color-baikal); font-weight: 600;">Подробнее →</a>
                    <button class="btn-fav ${isFav}" data-id="${route.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Re-init favorites listeners for new elements
    initFavorites(); 
}

// Mobile Filter Toggle
const filterToggle = document.querySelector('.filter-toggle');
const filtersPanel = document.querySelector('.filters-panel');
const overlay = document.querySelector('.overlay');

if(filterToggle) {
    filterToggle.addEventListener('click', () => {
        filtersPanel.classList.add('open');
        overlay.classList.add('active');
    });
}

if(overlay) {
    overlay.addEventListener('click', () => {
        filtersPanel.classList.remove('open');
        overlay.classList.remove('active');
    });
}
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/main.js
````javascript
// main.js - Core functionality
document.addEventListener('DOMContentLoaded', () => {
    initFavorites();
    initAnimations();
    initEasterEggs();
    loadLastVibe();
    initHeaderScroll();
});

// --- Header Scroll Effect ---
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// --- Favorites Logic ---
function initFavorites() {
    updateFavCounter();
    
    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(btn.dataset.id);
            toggleFavorite(id);
            btn.classList.toggle('active');
            btn.textContent = btn.classList.contains('active') ? '❤️' : '🤍';
            updateFavCounter();
        });
    });
}

function getFavorites() {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES) || '[]');
}

function toggleFavorite(id) {
    let favs = getFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(fid => fid !== id);
    } else {
        favs.push(id);
    }
    localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
}

function updateFavCounter() {
    const count = getFavorites().length;
    const badge = document.querySelector('.fav-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// --- Animations (Intersection Observer) ---
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// --- Easter Eggs ---
function initEasterEggs() {
    // Cedar Icon
    const cedar = document.createElement('div');
    cedar.className = 'cedar-icon';
    cedar.innerHTML = '🌲';
    cedar.title = 'Нажми меня';
    cedar.onclick = () => {
        const modal = document.getElementById('ornamentModal');
        if(modal) modal.classList.add('active');
    };
    document.body.appendChild(cedar);

    // Close Modal
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('ornamentModal').classList.remove('active');
        };
    }

    // Close on background click
    const modal = document.getElementById('ornamentModal');
    if(modal) {
        modal.addEventListener('click', (e) => {
            if(e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }
}

// --- Vibe Persistence ---
function loadLastVibe() {
    const lastVibe = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
    if (lastVibe && window.location.pathname.includes('routes.html')) {
        console.log('Restoring vibe:', lastVibe);
    }
}

// Helper to escape HTML
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}
````

## File: ../../../../../../CLOUD500/проекты/VIBE TRAVEL 03/src/js/pdfGenerator.js
````javascript
// pdfGenerator.js - PDF Generation using jsPDF
async function generatePDF(routeId) {
    // Find route data
    let route;
    try {
        const res = await fetch('data/routes.json');
        const data = await res.json();
        route = data.find(r => r.id == routeId);
    } catch (e) {
        alert('Ошибка загрузки данных для PDF');
        return;
    }

    if (!route) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cover
    doc.setFillColor(0, 119, 190); // Baikal blue
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("VIBE TRAVEL 03", 105, 40, null, null, "center");
    
    doc.setFontSize(16);
    doc.text("Гид по маршруту:", 105, 60, null, null, "center");
    
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    // Split text if too long
    const titleLines = doc.splitTextToSize(route.title, 180);
    doc.text(titleLines, 105, 80, null, null, "center");

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Место для вашего лучшего фото", 105, 120, null, null, "center");
    doc.rect(55, 130, 100, 60); // Placeholder box

    // Content
    doc.addPage();
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(route.title, 20, 20);
    
    doc.setFontSize(12);
    let y = 35;
    
    doc.setFont("helvetica", "bold");
    doc.text("Описание:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(route.fullDescription, 170);
    doc.text(descLines, 20, y);
    y += (descLines.length * 7) + 10;

    doc.setFont("helvetica", "bold");
    doc.text("Программа:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    
    route.schedule.forEach(item => {
        doc.setFont("helvetica", "bold");
        doc.text(`День ${item.day}: ${item.title}`, 20, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        const schLines = doc.splitTextToSize(item.description, 170);
        doc.text(schLines, 25, y);
        y += (schLines.length * 7) + 5;
        
        if (y > 270) { doc.addPage(); y = 20; }
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Логистика:", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Как добраться: ${route.logistics.howToGet}`, 20, y);
    y += 7;
    doc.text(`Бюджет: ${route.logistics.budgetDetails}`, 20, y);
    y += 7;
    doc.text(`Сезон: ${route.logistics.seasonality}`, 20, y);

    doc.save(`VIBE_${route.id}.pdf`);
}
````
