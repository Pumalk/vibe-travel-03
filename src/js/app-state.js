/**
 * Глобальное состояние приложения (данные с сервера / JSON).
 */
const appData = {
  routes: [],
  events: []
};

/** true, если fetch JSON завершился ошибкой */
let appDataLoadFailed = false;
