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