/**
 * Пасхалка «падающие буузы».
 */

function initBuuzaEasterEgg() {
  const fab = document.getElementById('buuza-fab');
  if (!fab) return;

  fab.addEventListener('click', () => {
    spawnBuuza();
    if (navigator.vibrate) navigator.vibrate(50);
  });
}

function spawnBuuza() {
  const count = Math.floor(Math.random() * 11) + 10;
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.src = 'assets/images/buuza.webp';
    img.className = 'falling-buuza';
    img.style.left = Math.random() * 90 + 5 + '%';
    const duration = Math.random() * 2 + 2;
    img.style.animationDuration = `${duration}s`;
    img.style.animationDelay = `${Math.random() * 0.5}s`;
    document.body.appendChild(img);

    img.addEventListener('click', (e) => {
      e.stopPropagation();
      img.style.opacity = '0';
      setTimeout(() => img.remove(), 300);
    });

    const autoRemoveTimer = setTimeout(() => {
      if (img.parentNode) {
        img.style.opacity = '0';
        setTimeout(() => img.remove(), 300);
      }
    }, 60000);

    img.addEventListener(
      'click',
      () => {
        clearTimeout(autoRemoveTimer);
      },
      { once: true }
    );

    const allBuuz = document.querySelectorAll('.falling-buuza');
    if (allBuuz.length > 30) {
      allBuuz[0].style.opacity = '0';
      setTimeout(() => allBuuz[0].remove(), 300);
    }
  }
}
