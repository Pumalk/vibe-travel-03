/**
 * Лайтбокс галереи: клик, Escape, стрелки влево/вправо между фото.
 */

let lightboxEscapeListenerBound = false;
let lightboxSources = [];
let lightboxIndex = 0;

function getLightboxElements() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return null;
  return {
    lightbox,
    img: lightbox.querySelector('.lightbox-img')
  };
}

function showLightboxAtIndex() {
  const els = getLightboxElements();
  if (!els || !lightboxSources.length) return;
  const item = lightboxSources[lightboxIndex];
  els.img.src = item.src;
  els.img.alt = item.alt;
}

function openLightboxFromList(src, alt, allItems) {
  lightboxSources = allItems && allItems.length ? allItems : [{ src, alt }];
  lightboxIndex = Math.max(
    0,
    lightboxSources.findIndex((x) => x.src === src)
  );
  if (lightboxIndex < 0) lightboxIndex = 0;

  const els = getLightboxElements();
  if (!els) return;
  showLightboxAtIndex();
  els.lightbox.classList.toggle('lightbox--multi', lightboxSources.length > 1);
  els.lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const els = getLightboxElements();
  if (!els) return;
  els.lightbox.classList.remove('active');
  document.body.style.overflow = '';
  lightboxSources = [];
}

function stepLightbox(delta) {
  const els = getLightboxElements();
  if (!els || !els.lightbox.classList.contains('active') || lightboxSources.length < 2) {
    return;
  }
  lightboxIndex = (lightboxIndex + delta + lightboxSources.length) % lightboxSources.length;
  showLightboxAtIndex();
}

/**
 * @param {string} containerSelector
 */
function initGallery(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const images = container.querySelectorAll('.gallery-image');
  const imageList = Array.from(images).map((img) => ({
    src: img.dataset.src || img.src,
    alt: img.alt || ''
  }));

  let lightbox = document.getElementById('lightbox');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <button type="button" class="lightbox-close" aria-label="Закрыть"></button>
      <button type="button" class="lightbox-nav lightbox-nav--prev" aria-label="Предыдущее фото"></button>
      <button type="button" class="lightbox-nav lightbox-nav--next" aria-label="Следующее фото"></button>
      <img class="lightbox-img" src="" alt="">
    `;
    document.body.appendChild(lightbox);

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.lightbox-nav--prev').addEventListener('click', (e) => {
      e.stopPropagation();
      stepLightbox(-1);
    });
    lightbox.querySelector('.lightbox-nav--next').addEventListener('click', (e) => {
      e.stopPropagation();
      stepLightbox(1);
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    if (!lightboxEscapeListenerBound) {
      lightboxEscapeListenerBound = true;
      document.addEventListener('keydown', function (e) {
        const lb = document.getElementById('lightbox');
        if (!lb || !lb.classList.contains('active')) return;
        if (e.key === 'Escape') {
          closeLightbox();
          return;
        }
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          stepLightbox(-1);
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          stepLightbox(1);
        }
      });
    }
  }

  images.forEach((img) => {
    img.addEventListener('click', function () {
      const src = this.dataset.src || this.src;
      openLightboxFromList(src, this.alt || '', imageList);
    });
  });
}
