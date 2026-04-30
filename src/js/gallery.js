/**
 * gallery.js – простой лайтбокс для фотографий на детальной странице.
 * На мобильных фото выводятся в горизонтальный скролл, на десктопе – сеткой.
 * Клик по фото открывает полноэкранный просмотр.
 */

/**
 * Инициализирует галерею внутри контейнера.
 * @param {string} containerSelector - селектор элемента, где лежат фото
 */
function initGallery(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const images = container.querySelectorAll('.gallery-image');

    // Создаём лайтбокс, если его ещё нет
    let lightbox = document.getElementById('lightbox');
    if (!lightbox) {
        lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
      <span class="lightbox-close">&times;</span>
      <img class="lightbox-img" src="" alt="Просмотр фото">
    `;
        document.body.appendChild(lightbox);

        // Закрытие по клику на крестик или по фону
        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Вешаем обработчик на каждое фото
    images.forEach(img => {
        img.addEventListener('click', function () {
            openLightbox(this.src, this.alt);
        });
    });
}

function openLightbox(src, alt) {
    const lightbox = document.getElementById('lightbox');
    const img = lightbox.querySelector('.lightbox-img');
    img.src = src;
    img.alt = alt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}