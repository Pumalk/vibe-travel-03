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
  const TRANSITION_DURATION = 480; // мс, синхронизировано с CSS animation-duration

  hasCompletedFirstNavigation = true;

  if (useTransition) {
    body.classList.add('fade-out');
    mask?.classList.add('active');
  }

  // Ждём окончания анимации маски, но не дольше TRANSITION_DURATION
  await new Promise((resolve) => setTimeout(resolve, useTransition ? TRANSITION_DURATION : 0));

  if (params) {
    renderFn(params);
  } else {
    renderFn();
  }

  // Небольшая задержка для рендера, затем убираем маску
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (mask && useTransition) {
    mask.classList.remove('active');
    // Сброс анимации лучей для следующего раза
    const rays = mask.querySelector('.transition-mask__rays');
    if (rays) {
      rays.style.animation = 'none';
      void rays.offsetHeight;
      rays.style.animation = '';
    }
  }

  body.classList.remove('fade-out');
  body.style.opacity = '1';

  window.scrollTo(0, 0);
  const headerEl = document.querySelector('.header');
  if (headerEl) {
    headerEl.classList.toggle('scrolled', window.scrollY > 48);
  }
  updateNavActiveState();
  triggerPageEnterAnimation();
  requestAnimationFrame(() => refreshPageReveals());
}