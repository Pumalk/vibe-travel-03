# VIBE TRAVEL 03 — твой гид по Бурятии

Эмоциональный гид по Бурятии для молодёжи.  
Вайб-фильтры, маршруты, события, интерактивная карта и пасхалки.

Проект создан для конкурса **«Создай свой турсайт»** (Бурятская ГСХА, 2026).

[Посмотреть сайт](https://pumalk.github.io/vibe-travel-03/)

---

## Технологии

- HTML5, CSS3 (модульная структура)
- JavaScript (SPA на hash-роутере)
- Яндекс.Карты API 2.1
- Service Worker (кеширование для повторных визитов)
- PDF-экспорт (html2canvas + jsPDF)

---

## Требования

- Любой современный браузер (Chrome, Firefox, Safari, Edge)
- Для локального запуска — любой статический сервер (Live Server, `npx serve`, Python HTTP-сервер)
- Для работы карт — API-ключ Яндекс.Карт

---

## Установка и запуск

1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/Pumalk/vibe-travel-03.git
   cd vibe-travel-03
   ```

2. Скопируйте файл конфигурации:
   ```bash
   cp config.example.js config.js
   ```

3. Откройте `config.js` и вставьте ваш API-ключ Яндекса:
   ```js
   const YANDEX_API_KEY = 'ваш_реальный_ключ';
   ```

4. Запустите локальный сервер из корня проекта. Например:
   ```bash
   npx serve .
   ```

5. Откройте в браузере адрес, который покажет сервер (обычно `http://localhost:3000`).

> **Важно:** файл `config.js` добавлен в `.gitignore` и не должен попадать в репозиторий.

---

## Настройка Яндекс.Карт

1. Зарегистрируйтесь в [Кабинете разработчика Яндекса](https://developer.tech.yandex.ru/).
2. Создайте новый проект и подключите **JavaScript API и HTTP Геокодер**.
3. Получите API-ключ.
4. Вставьте его в файл `config.js` (см. пункт 3 выше).

Без ключа на месте карт будет показано сообщение с инструкцией.

---

## Структура проекта

```
├── index.html              # главная страница (SPA)
├── config.example.js       # образец конфигурации
├── sw.js                   # Service Worker
├── data/
│   ├── routes.json         # маршруты (10 шт.)
│   └── events.json         # события (3 шт.)
├── assets/
│   ├── gallery/            # фото маршрутов
│   ├── events/             # фото событий
│   ├── images/             # hero, логотипы, бууза, орнаменты
│   └── favicon/            # иконки сайта
├── src/
│   ├── css/                # стили (variables, base, animations, components, layout, responsive)
│   └── js/                 # скрипты (роутер, рендер, карты, галерея, пасхалка и др.)
└── temp/                   # временные файлы (игнорируются git)
```

---

## Контакты
Автор: Лебедев Кирилл Артёмович  
Репозиторий: [github.com/Pumalk/vibe-travel-03](https://github.com/Pumalk/vibe-travel-03)  
Сайт: [pumalk.github.io/vibe-travel-03](https://pumalk.github.io/vibe-travel-03/)



