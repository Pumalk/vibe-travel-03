/**
Service Worker для кеширования статики VIBE TRAVEL 03.
Стратегия: cache-first при повторных визитах, сеть при первом.


const CACHE_VERSION = 'vibe-travel-v1.0.1'; // !!!МЕНЯЙ ВЕРСИЮ ПРИ ОБНОВЛЕНИИ РЕСУРСОВ!!!
const CACHE_NAME = `static-${CACHE_VERSION}`;

// Ресурсы, которые нужно закешировать при установке
const PRECACHE_ASSETS = [
    '/vibe-travel-03/',                         // главная страница (SPA)
    '/vibe-travel-03/index.html',
    '/vibe-travel-03/src/css/style.css',
    '/vibe-travel-03/src/js/strings.js',
    '/vibe-travel-03/src/js/app-state.js',
    '/vibe-travel-03/src/js/favorites.js',
    '/vibe-travel-03/src/js/tag-helpers.js',
    '/vibe-travel-03/src/js/lazy-images.js',
    '/vibe-travel-03/src/js/toast.js',
    '/vibe-travel-03/src/js/meta.js',
    '/vibe-travel-03/src/js/scroll-reveal.js',
    '/vibe-travel-03/src/js/session-filters.js',
    '/vibe-travel-03/src/js/data-loader.js',
    '/vibe-travel-03/src/js/pdf-export.js',
    '/vibe-travel-03/src/js/easter-egg-buuza.js',
    '/vibe-travel-03/src/js/ui-nav.js',
    '/vibe-travel-03/src/js/navigation.js',
    '/vibe-travel-03/src/js/map.js',
    '/vibe-travel-03/src/js/gallery.js',
    '/vibe-travel-03/src/js/render-pages.js',
    '/vibe-travel-03/src/js/router.js',
    '/vibe-travel-03/src/js/app.js',
    '/vibe-travel-03/assets/images/hero.webp',
    '/vibe-travel-03/assets/images/buuza.webp',
    '/vibe-travel-03/assets/images/logo_white.svg',
    '/vibe-travel-03/assets/images/logo_black.svg'
];

// Установка: кешируем основные ресурсы
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Service Worker: кеширую статику…');
            return cache.addAll(PRECACHE_ASSETS).catch(err => {
                console.warn('Некоторые ресурсы не удалось закешировать:', err);
            });
        })
    );
    // Активируем новый SW сразу, не дожидаясь закрытия старых вкладок
    self.skipWaiting();
});

// Активация: удаляем старые версии кеша
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
    // Забираем контроль над всеми страницами без перезагрузки
    self.clients.claim();
});

// Обработка запросов: сначала кеш, потом сеть
self.addEventListener('fetch', event => {
    // Не кешируем POST-запросы, API и т.д.
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Возвращаем из кеша, если есть; иначе — идём в сеть
            return cachedResponse || fetch(event.request).then(networkResponse => {
                // Можно дополнительно сохранять новые запросы в кеш, но для статики это необязательно
                return networkResponse;
            });
        })
    );
}); */