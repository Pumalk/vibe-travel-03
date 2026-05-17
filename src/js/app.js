/**
 * Точка входа: загрузка данных, роутер, прелоадер.
 */

async function initApp() {
  const preloader = document.getElementById('preloader');
  initScrollRevealObserver();

  const headerEl = document.querySelector('.header');
  initNavChrome(headerEl);
  initSkipLink();

  const dataOk = await loadData();
  if (!dataOk) {
    renderDataErrorScreen();
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 500);
    return;
  }

  const router = new Router({
    '/': () => navigateTo(renderHome),
    '/routes': () => navigateTo(renderRoutes),
    '/routes/:id': (params) => navigateTo(() => renderRouteDetail(params.id)),
    '/map': () => navigateTo(renderMapPage),
    '/events': () => navigateTo(renderEvents),
    '/favorites': () => navigateTo(renderFavorites)
  });

  hasCompletedFirstNavigation = true; // чтобы маска не срабатывала при первом заходе

  router.resolve();

  preloader.classList.add('hidden');
  setTimeout(() => preloader.remove(), 500);

  initBuuzaEasterEgg();
}

document.addEventListener('DOMContentLoaded', initApp);
