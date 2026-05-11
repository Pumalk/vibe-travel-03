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
  root.querySelectorAll('.reveal').forEach((el) => {
    if (el.classList.contains('card') && el.closest('#routes-grid')) return;
    observeReveal(el);
  });
}

function bindRoutesGridReveals() {
  const grid = document.getElementById('routes-grid');
  if (!grid) return;
  grid.querySelectorAll('.card.reveal').forEach((card) => observeReveal(card));
}
