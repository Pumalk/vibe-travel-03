/**
 * Ненавязчивые уведомления (вместо alert).
 */

function ensureToastHost() {
  let el = document.getElementById('toast-host');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast-host';
    el.className = 'toast-host';
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', 'polite');
    el.setAttribute('aria-atomic', 'true');
    document.body.appendChild(el);
  }
  return el;
}

/**
 * @param {string} message
 * @param {number} [durationMs]
 */
function showToast(message, durationMs = 3200) {
  const host = ensureToastHost();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  host.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('toast--visible'));
  const t = setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 400);
  }, durationMs);
  toast.addEventListener('click', () => {
    clearTimeout(t);
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 400);
  });
}
