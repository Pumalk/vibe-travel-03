/**
 * Шапка, бургер-меню, активный пункт навигации.
 */

function syncNavDrawerItems(navList, isOpen) {
  const items = navList.querySelectorAll('li');
  const stagger = window.matchMedia('(max-width: 768px)').matches;
  items.forEach((li, i) => {
    if (isOpen && stagger) {
      li.style.transitionDelay = `${0.05 + i * 0.08}s`;
      requestAnimationFrame(() => li.classList.add('appear'));
    } else {
      li.classList.remove('appear');
      li.style.transitionDelay = '';
    }
  });
}

function normalizeHashPath() {
  let path = window.location.hash.slice(1) || '/';
  if (!path.startsWith('/')) path = `/${path}`;
  return path;
}

function updateNavActiveState() {
  const path = normalizeHashPath();
  document.querySelectorAll('.nav-link').forEach((link) => {
    let target = (link.getAttribute('href') || '').replace('#', '');
    if (!target.startsWith('/')) target = `/${target}`;
    const isActive =
      path === target || (target !== '/' && path.startsWith(`${target}/`));
    link.classList.toggle('active', isActive);
  });
}

function setNavDrawerOpen(open) {
  const navList = document.getElementById('navList');
  const burger = document.getElementById('burgerBtn');
  const backdrop = document.getElementById('navBackdrop');
  if (!navList || !burger) return;

  if (open) {
    // Закрываем все открытые выпадающие списки фильтров
    document.querySelectorAll('.custom-select__dropdown.open').forEach(d => d.classList.remove('open'));
    document.querySelectorAll('.custom-select__button.open').forEach(b => b.classList.remove('open'));
  }

  navList.classList.toggle('active', open);
  burger.classList.toggle('is-open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  document.body.classList.toggle('nav-drawer-open', open);
  if (backdrop) {
    backdrop.classList.toggle('is-visible', open);
    backdrop.setAttribute('aria-hidden', open ? 'false' : 'true');
  }
  syncNavDrawerItems(navList, open);
}

/**
 * Скролл шапки и обработчики бургера (один раз при старте).
 */
function initNavChrome(headerEl) {
  function updateHeaderScrolled() {
    if (!headerEl) return;
    headerEl.classList.toggle('scrolled', window.scrollY > 48);
  }
  window.addEventListener('scroll', updateHeaderScrolled, { passive: true });
  updateHeaderScrolled();

  const burger = document.getElementById('burgerBtn');
  const navList = document.getElementById('navList');
  const navBackdrop = document.getElementById('navBackdrop');

  burger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const open = !navList.classList.contains('active');
    setNavDrawerOpen(open);
  });

  navList?.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => setNavDrawerOpen(false))
  );

  navBackdrop?.addEventListener('click', () => setNavDrawerOpen(false));

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav')) {
      setNavDrawerOpen(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navList?.classList.contains('active')) {
      setNavDrawerOpen(false);
    }
  });

  window.addEventListener(
    'resize',
    () => {
      if (window.innerWidth > 768 && navList?.classList.contains('active')) {
        setNavDrawerOpen(false);
      }
    },
    { passive: true }
  );

  return { updateHeaderScrolled };
}
