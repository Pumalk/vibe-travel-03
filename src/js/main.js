// main.js - Core functionality
document.addEventListener('DOMContentLoaded', () => {
    initFavorites();
    initAnimations();
    initEasterEggs();
    loadLastVibe();
});

// --- Favorites Logic ---
function initFavorites() {
    updateFavCounter();
    
    document.querySelectorAll('.btn-fav').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const id = parseInt(btn.dataset.id);
            toggleFavorite(id);
            btn.classList.toggle('active');
            updateFavCounter();
        });
    });
}

function getFavorites() {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES) || '[]');
}

function toggleFavorite(id) {
    let favs = getFavorites();
    if (favs.includes(id)) {
        favs = favs.filter(fid => fid !== id);
    } else {
        favs.push(id);
    }
    localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
}

function updateFavCounter() {
    const count = getFavorites().length;
    const badge = document.querySelector('.fav-count');
    if (badge) {
        badge.textContent = count;
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

// --- Animations (Intersection Observer) ---
function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// --- Easter Eggs ---
function initEasterEggs() {
    // Cedar Icon
    const cedar = document.createElement('div');
    cedar.className = 'cedar-icon';
    cedar.innerHTML = '🌲'; // Simple emoji as icon
    cedar.onclick = () => {
        const modal = document.getElementById('ornamentModal');
        if(modal) modal.classList.add('active');
    };
    document.body.appendChild(cedar);

    // Close Modal
    const closeBtn = document.querySelector('.close-modal');
    if(closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById('ornamentModal').classList.remove('active');
        };
    }
}

// --- Vibe Persistence ---
function loadLastVibe() {
    const lastVibe = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
    if (lastVibe && window.location.pathname.includes('routes.html')) {
        // Will be handled by filters.js if present
        console.log('Restoring vibe:', lastVibe);
    }
}

// Helper to escape HTML
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}