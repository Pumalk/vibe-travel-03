/**
 * Сохранение фильтров страницы «Маршруты» в sessionStorage.
 */

const ROUTES_FILTERS_KEY = 'vibe_routes_filters';

function readSavedRouteFilters() {
  try {
    const raw = sessionStorage.getItem(ROUTES_FILTERS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeSavedRouteFilters() {
  const durationEl = document.getElementById('filter-duration');
  const budgetEl = document.getElementById('filter-budget');
  const seasonEl = document.getElementById('filter-season');
  if (!durationEl || !budgetEl || !seasonEl) return;

  const activeTags = [...document.querySelectorAll('#tag-filters .chip.active')].map(
    (c) => c.dataset.tag
  );
  const state = {
    tags: activeTags,
    duration: durationEl.value,
    budget: budgetEl.value,
    season: seasonEl.value
  };
  try {
    sessionStorage.setItem(ROUTES_FILTERS_KEY, JSON.stringify(state));
  } catch {
    /* ignore quota */
  }
}

/**
 * Восстанавливает UI фильтров после вставки разметки /routes.
 */
function applySavedRouteFiltersToDom() {
  const saved = readSavedRouteFilters();
  if (!saved) return;

  if (Array.isArray(saved.tags)) {
    saved.tags.forEach((tag) => {
      const chip = document.querySelector(`#tag-filters .chip[data-tag="${tag}"]`);
      if (chip) chip.classList.add('active');
    });
  }
  const durationEl = document.getElementById('filter-duration');
  const budgetEl = document.getElementById('filter-budget');
  const seasonEl = document.getElementById('filter-season');
  if (durationEl && saved.duration) durationEl.value = saved.duration;
  if (budgetEl && saved.budget) budgetEl.value = saved.budget;
  if (seasonEl && saved.season) seasonEl.value = saved.season;
}
