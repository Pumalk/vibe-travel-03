/**
 * Избранное в localStorage.
 */

function getFavorites() {
  const raw = localStorage.getItem('vibe_favorites');
  return raw ? JSON.parse(raw) : [];
}

function addFavorite(routeId) {
  const favs = getFavorites();
  if (!favs.includes(routeId)) {
    favs.push(routeId);
    localStorage.setItem('vibe_favorites', JSON.stringify(favs));
  }
}

function removeFavorite(routeId) {
  let favs = getFavorites();
  favs = favs.filter((id) => id !== routeId);
  localStorage.setItem('vibe_favorites', JSON.stringify(favs));
}

function isFavorite(routeId) {
  return getFavorites().includes(routeId);
}
