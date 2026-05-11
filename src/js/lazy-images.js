/**
 * Ленивая подгрузка изображений с data-src.
 */

const lazyObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      observer.unobserve(img);
    }
  });
});

function observeLazyImages() {
  document.querySelectorAll('img.lazy').forEach((img) => {
    if (img.dataset.src && !img.src) {
      lazyObserver.observe(img);
    }
  });
}
