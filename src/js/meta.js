/**
 * Заголовок вкладки и мета для SPA-навигации.
 */

const SITE_TITLE_BASE = `${VIBE_STRINGS.siteName} — твой гид по Бурятии`;

/**
 * @param {{ title?: string; description?: string }} opts
 *   title — короткий заголовок страницы (без суффикса бренда)
 */
function setPageMeta(opts) {
  const title = opts.title
    ? `${opts.title} · ${VIBE_STRINGS.siteName}`
    : SITE_TITLE_BASE;
  document.title = title;

  const desc = opts.description || VIBE_STRINGS.defaultDescription;
  let metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', desc);
  }

  let ogTitle = document.querySelector('meta[property="og:title"]');
  if (!ogTitle) {
    ogTitle = document.createElement('meta');
    ogTitle.setAttribute('property', 'og:title');
    document.head.appendChild(ogTitle);
  }
  ogTitle.setAttribute('content', title);

  let ogDesc = document.querySelector('meta[property="og:description"]');
  if (!ogDesc) {
    ogDesc = document.createElement('meta');
    ogDesc.setAttribute('property', 'og:description');
    document.head.appendChild(ogDesc);
  }
  ogDesc.setAttribute('content', desc);
}
