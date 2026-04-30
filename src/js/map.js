/**
 * map.js – всё, что связано с Яндекс.Картами.
 * Загрузка API динамическая, чтобы не грузить лишнее на страницах без карты.
 */

// Флаг, загружено ли API
let yandexReady = false;

/**
 * Загружает API Яндекс.Карт, если ещё не загружено,
 * и вызывает callback после готовности.
 * @param {Function} callback - что выполнить после загрузки API
 */
function loadYandexMaps(callback) {
    if (yandexReady) {
        callback();
        return;
    }

    // Проверяем, есть ли уже скрипт на странице
    if (document.getElementById('yandex-maps-script')) {
        // Ждём загрузки
        document.getElementById('yandex-maps-script').addEventListener('load', () => {
            yandexReady = true;
            callback();
        });
        return;
    }

    // Создаём скрипт и вешаем обработчик загрузки
    const script = document.createElement('script');
    script.id = 'yandex-maps-script';
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`;
    script.onload = () => {
        ymaps.ready(() => {
            yandexReady = true;
            callback();
        });
    };
    document.head.appendChild(script);
}

/**
 * Маленькая карта на главной странице.
 * Показывает 3–5 случайных маршрутов маркерами.
 */
function initPreviewMap() {
    const container = document.getElementById('map-preview');
    if (!container) return;

    // Сообщение, если ключ не задан
    if (typeof YANDEX_API_KEY === 'undefined' || YANDEX_API_KEY === 'твой_ключ_от_Яндекс.Карт') {
        container.innerHTML = '<p style="text-align:center;padding:40px;">Нужно указать ключ API в config.js</p>';
        return;
    }

    loadYandexMaps(() => {
        // Центр карты – Бурятия
        const map = new ymaps.Map(container, {
            center: [53.2, 108.0],
            zoom: 6,
            controls: ['zoomControl']
        });

        // Берём 4 случайных маршрута
        const previewRoutes = [...appData.routes].sort(() => 0.5 - Math.random()).slice(0, 4);

        previewRoutes.forEach(route => {
            const placemark = new ymaps.Placemark(route.coords, {
                hintContent: route.title
            }, {
                preset: 'islands#circleDotIcon',
                iconColor: '#E07A5F'
            });
            map.geoObjects.add(placemark);
        });
    });
}

/**
 * Карта на детальной странице маршрута.
 * Показывает все точки маршрута, соединённые линией.
 * @param {Object} route - объект маршрута
 */
function initDetailMap(route) {
    const container = document.getElementById('detail-map');
    if (!container) return;

    if (typeof YANDEX_API_KEY === 'undefined' || YANDEX_API_KEY === 'твой_ключ_от_Яндекс.Карт') {
        container.innerHTML = '<p style="text-align:center;padding:40px;">Нужно указать ключ API в config.js</p>';
        return;
    }

    loadYandexMaps(() => {
        const map = new ymaps.Map(container, {
            center: route.points[0].coords,
            zoom: 12,
            controls: ['zoomControl', 'fullscreenControl']
        });

        // Добавляем метки с кастомными иконками (пока стандартные, в следующей итерации — SVG)
        const pointsCoords = route.points.map(p => p.coords);

        // Линия маршрута
        if (pointsCoords.length > 1) {
            const polyline = new ymaps.Polyline(pointsCoords, {}, {
                strokeColor: '#E07A5F',
                strokeWidth: 4,
                strokeOpacity: 0.8
            });
            map.geoObjects.add(polyline);
        }

        // Метки
        route.points.forEach(point => {
            const placemark = new ymaps.Placemark(point.coords, {
                balloonContent: `<strong>${point.name}</strong><br>${point.description}`
            }, {
                preset: 'islands#blueCircleDotIcon'
            });
            map.geoObjects.add(placemark);
        });

        // Подгоняем область показа под все точки
        if (pointsCoords.length > 0) {
            map.setBounds(map.geoObjects.getBounds(), { checkZoomRange: true });
        }
    });
}

/**
 * Полная карта на отдельной странице.
 * Отображает ВСЕ маршруты (только начальные точки) и точки интереса.
 * Слои: маршруты, достопримечательности, кафе, отели.
 */
function initFullMap() {
    const container = document.getElementById('full-map');
    if (!container) return;

    if (typeof YANDEX_API_KEY === 'undefined' || YANDEX_API_KEY === 'твой_ключ_от_Яндекс.Карт') {
        container.innerHTML = '<p style="text-align:center;padding:40px;">Нужно указать ключ API в config.js</p>';
        return;
    }

    loadYandexMaps(() => {
        const map = new ymaps.Map(container, {
            center: [53.2, 108.0],
            zoom: 6,
            controls: ['zoomControl', 'searchControl', 'typeSelector']
        });

        // Слои будем хранить в коллекциях
        const routesCollection = new ymaps.GeoObjectCollection();
        const sightsCollection = new ymaps.GeoObjectCollection();
        const foodCollection = new ymaps.GeoObjectCollection();
        const hotelsCollection = new ymaps.GeoObjectCollection();

        // Обрабатываем все маршруты
        appData.routes.forEach(route => {
            // Стартовая точка маршрута
            const pm = new ymaps.Placemark(route.coords, {
                hintContent: route.title
            }, {
                preset: 'islands#orangeCircleDotIcon'
            });
            routesCollection.add(pm);

            // Разбираем точки по типам
            route.points.forEach(point => {
                switch (point.type) {
                    case 'достопримечательность':
                    case 'пещера':
                    case 'гора':
                    case 'скалы':
                    case 'монумент':
                    case 'ступа':
                    case 'смотровая':
                    case 'остров':
                    case 'заповедник':
                    case 'природа':
                    case 'пляж':
                    case 'маяк':
                    case 'вулканы':
                        sightsCollection.add(new ymaps.Placemark(point.coords, {
                            hintContent: point.name
                        }, { preset: 'islands#greenCircleDotIcon' }));
                        break;
                    case 'кафе':
                        foodCollection.add(new ymaps.Placemark(point.coords, {
                            hintContent: point.name
                        }, { preset: 'islands#brownCircleDotIcon' }));
                        break;
                    case 'отель':
                    case 'кемпинг':
                    case 'источник':
                        hotelsCollection.add(new ymaps.Placemark(point.coords, {
                            hintContent: point.name
                        }, { preset: 'islands#blueCircleDotIcon' }));
                        break;
                    default:
                        sightsCollection.add(new ymaps.Placemark(point.coords, {
                            hintContent: point.name
                        }, { preset: 'islands#violetCircleDotIcon' }));
                }
            });
        });

        // Добавляем слои на карту (все сразу, без переключателей, как ты просил)
        map.geoObjects.add(routesCollection);
        map.geoObjects.add(sightsCollection);
        map.geoObjects.add(foodCollection);
        map.geoObjects.add(hotelsCollection);
    });
}

/**
 * Генерация ссылки для построения маршрута во внешнем сервисе.
 * @param {Object} route - объект маршрута
 * @param {string} service - 'yandex' или '2gis'
 * @returns {string} url
 */
function buildRouteLink(route, service) {
    if (service === 'yandex') {
        const coords = route.points.map(p => p.coords.join(',')).join('~');
        return `https://yandex.ru/maps/?rtext=${coords}&rtt=auto`;
    }
    return '#';
}