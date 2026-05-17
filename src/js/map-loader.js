/**
 * Ленивая загрузка map.js — только когда нужна карта.
 */
const mapDeferred = {};
let mapScriptLoaded = false;

function loadMapScript() {
    if (mapScriptLoaded) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'src/js/map.js';
        script.onload = () => {
            mapScriptLoaded = true;
            resolve();
        };
        script.onerror = () => reject(new Error('Не удалось загрузить map.js'));
        document.head.appendChild(script);
    });
}

function makeMapFunction(name) {
    // Сохраняем оригинал, если он уже определён (не должно быть)
    window[name] = (...args) => {
        loadMapScript().then(() => {
            // После загрузки map.js настоящая функция уже на месте
            window[name](...args);
        });
    };
}

// Создаём заглушки для всех публичных функций карт
['initPreviewMap', 'initDetailMap', 'initFullMap', 'buildRouteLink'].forEach(makeMapFunction);