/**
 * Загрузка JSON и экран ошибки.
 */

async function loadData() {
  appDataLoadFailed = false;
  try {
    const [routesRes, eventsRes] = await Promise.all([
      fetch('data/routes.json'),
      fetch('data/events.json')
    ]);
    if (!routesRes.ok || !eventsRes.ok) {
      throw new Error(`HTTP ${routesRes.status} / ${eventsRes.status}`);
    }
    appData.routes = await routesRes.json();
    appData.events = await eventsRes.json();
    console.log('✅ Данные загружены');
    return true;
  } catch (e) {
    console.error('Ошибка загрузки', e);
    appDataLoadFailed = true;
    appData.routes = [];
    appData.events = [];
    return false;
  }
}

function renderDataErrorScreen() {
  const main = document.getElementById('main-content');
  if (!main) return;
  main.innerHTML = `
    <section class="section section--error">
      <header class="section-intro">
        <p class="section-eyebrow">Ошибка</p>
        <h2>${VIBE_STRINGS.loadErrorTitle}</h2>
      </header>
      <p class="detail-lead">${VIBE_STRINGS.loadErrorHint}</p>
      <p class="detail-actions">
        <button type="button" class="btn" id="data-retry-btn">${VIBE_STRINGS.retry}</button>
        <a href="#/" class="btn btn-outline">На главную</a>
      </p>
    </section>`;
  document.getElementById('data-retry-btn')?.addEventListener('click', () => {
    window.location.reload();
  });
  setPageMeta({ title: VIBE_STRINGS.loadErrorTitle, description: VIBE_STRINGS.loadErrorHint });
}
