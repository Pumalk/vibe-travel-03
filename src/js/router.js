/**
 * Простой SPA-роутер на основе hash.
 * Поддерживает статические пути и динамические сегменты (например, /routes/:id)
 */
class Router {
    /**
     * @param {Object} routes - объект, где ключ - путь (строка), значение - функция-обработчик
     */
    constructor(routes) {
        this.routes = routes;

        // Слушаем изменения hash и загрузку страницы
        window.addEventListener('hashchange', () => this.resolve());
        window.addEventListener('load', () => this.resolve());
    }

    /**
     * Разбирает текущий hash, ищет подходящий маршрут и вызывает его обработчик.
     */
    resolve() {
        // Текущий hash без символа # (например, /routes/1)
        const hash = window.location.hash.slice(1) || '/';

        // Перебираем зарегистрированные маршруты
        for (let pattern in this.routes) {
            const handler = this.routes[pattern];

            // Превращаем шаблон /routes/:id в регулярное выражение
            const regexPattern = pattern.replace(/:\w+/g, '([^/]+)');
            const regex = new RegExp(`^${regexPattern}$`);
            const match = hash.match(regex);

            if (match) {
                // Извлекаем параметры из захваченных групп
                const paramNames = (pattern.match(/:\w+/g) || []).map(p => p.slice(1));
                const params = {};
                paramNames.forEach((name, i) => {
                    params[name] = match[i + 1]; // match[0] — полное совпадение
                });

                // Вызываем обработчик, передавая параметры
                handler(params);
                return; // Маршрут найден, выходим
            }
        }

        // Если ничего не найдено — показываем 404 (пока заглушка)
        const main = document.getElementById('main-content');
        if (main) {
            main.innerHTML = '<h2>Страница не найдена</h2><p><a href="#/">Вернуться на главную</a></p>';
        }
    }

    /**
     * Программная навигация
     * @param {string} path - путь (начинается с /)
     */
    navigate(path) {
        window.location.hash = path;
    }
}