/**
 * Переходы между страницами: маска, fade, scroll-reveal.
 */

let hasCompletedFirstNavigation = false;

function triggerPageEnterAnimation() {
  const main = document.getElementById('main-content');
  if (!main) return;
  main.classList.remove('page-enter');
  void main.offsetWidth;
  main.classList.add('page-enter');
}

/**
 * @param {Function} renderFn
 * @param {*} [params]
 */
async function navigateTo(renderFn, params) {
  const body = document.body;
  const mask = document.getElementById('transition-mask');
  const useTransition = hasCompletedFirstNavigation;
  hasCompletedFirstNavigation = true;

  if (useTransition) {
    body.classList.add('fade-out');
    mask?.classList.add('active');
  }

  await new Promise((resolve) => setTimeout(resolve, useTransition ? 280 : 0));

  if (params) {
    renderFn(params);
  } else {
    renderFn();
  }

  await new Promise((resolve) => setTimeout(resolve, useTransition ? 300 : 0));

  if (mask && useTransition) {
    mask.classList.remove('active');
    const rays = mask.querySelector('.transition-mask__rays');
    if (rays) {
      rays.style.animation = 'none';
      void rays.offsetHeight;
      rays.style.animation = '';
    }
  }

  if (useTransition) {
    body.classList.remove('fade-out');
    body.style.opacity = '1';
  }

  window.scrollTo(0, 0);
  const headerEl = document.querySelector('.header');
  if (headerEl) {
    headerEl.classList.toggle('scrolled', window.scrollY > 48);
  }
  updateNavActiveState();
  triggerPageEnterAnimation();
  requestAnimationFrame(() => refreshPageReveals());
}
