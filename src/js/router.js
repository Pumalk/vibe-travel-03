class Router {
    constructor(routes) {
        this.routes = routes;
        this.currentRoute = null;
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.resolve());
        window.addEventListener('load', () => this.resolve());
    }

    resolve() {
        const hash = window.location.hash.slice(1) || '/';
        const route = this.routes[hash] || this.routes['/'];
        if (route) {
            this.currentRoute = hash;
            route();
        }
    }

    navigate(path) {
        window.location.hash = path;
    }
}