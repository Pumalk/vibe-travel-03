/**
 * Появление блоков при скролле (IntersectionObserver).
 */

let scrollRevealObserver = null;

function initScrollRevealObserver() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    scrollRevealObserver = null;
    return;
  }
  scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        scrollRevealObserver.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
  );
}

function observeReveal(el) {
  if (!el) return;
  if (!scrollRevealObserver) {
    el.classList.add('is-visible');
    return;
  }
  el.classList.remove('is-visible');
  scrollRevealObserver.observe(el);
}

function refreshPageReveals() {
  const root = document.getElementById('main-content');
  if (!root) return;
  root.querySelectorAll('.reveal').forEach((el) => observeReveal(el));
}

function bindRoutesGridReveals() {
  const grid = document.getElementById('routes-grid');
  if (!grid) return;
  const cards = grid.querySelectorAll('.card.reveal');
  cards.forEach((card, index) => {
    // Сбрасываем анимацию
    card.classList.remove('is-visible');
    void card.offsetHeight; // reflow
    // Задаём задержку на основе индекса
    card.style.animationDelay = (index * 60) + 'ms';
    // Подключаем Observer (или сразу запускаем, если Observer не используется)
    if (scrollRevealObserver) {
      scrollRevealObserver.observe(card);
    } else {
      card.classList.add('is-visible');
    }
  });
}
