// filters.js - Filtering and Sorting Logic
let allRoutes = [];

document.addEventListener('DOMContentLoaded', async () => {
    const routesContainer = document.getElementById('routesContainer');
    if (!routesContainer) return;

    try {
        const response = await fetch('data/routes.json');
        allRoutes = await response.json();
        applyFilters();
    } catch (error) {
        console.error('Error loading routes:', error);
        routesContainer.innerHTML = '<p>Ошибка загрузки данных.</p>';
    }

    setupFilterListeners();
    setupSortListener();
    
    // Restore vibe from URL or LocalStorage
    restoreVibeSelection();
});

function setupFilterListeners() {
    const checkboxes = document.querySelectorAll('.filter-option input');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const label = e.target.closest('.checkbox-label');
            if(e.target.checked) label.classList.add('selected');
            else label.classList.remove('selected');
            applyFilters();
        });
    });
}

function setupSortListener() {
    const sortSelect = document.getElementById('sortSelect');
    if(sortSelect) {
        sortSelect.addEventListener('change', applyFilters);
    }
}

function restoreVibeSelection() {
    const params = new URLSearchParams(window.location.search);
    const vibeParam = params.get('vibe');
    
    if (vibeParam) {
        const checkbox = document.querySelector(`input[value="${vibeParam}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.closest('.checkbox-label').classList.add('selected');
            localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_VIBE, vibeParam);
        }
    } else {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
        if(saved) {
            const checkbox = document.querySelector(`input[value="${saved}"]`);
            if(checkbox) {
                checkbox.checked = true;
                checkbox.closest('.checkbox-label').classList.add('selected');
            }
        }
    }
}

function applyFilters() {
    // Get selected values
    const selectedVibes = Array.from(document.querySelectorAll('input[name="vibe"]:checked')).map(el => el.value);
    const selectedDuration = document.querySelector('select[name="duration"]')?.value;
    const selectedBudget = document.querySelector('select[name="budget"]')?.value; // Simplified
    const sortBy = document.getElementById('sortSelect')?.value || 'default';

    // Filter Logic (AND)
    let filtered = allRoutes.filter(route => {
        // Vibe Check (Route must have ALL selected vibes)
        const hasVibes = selectedVibes.every(v => route.vibes.includes(v));
        
        // Duration Check (Simple string match or logic)
        let hasDuration = true;
        if(selectedDuration) {
            if(selectedDuration === 'short') hasDuration = route.duration.includes('1') || route.duration.includes('2');
            if(selectedDuration === 'medium') hasDuration = route.duration.includes('3') || route.duration.includes('4');
            if(selectedDuration === 'long') hasDuration = parseInt(route.duration) >= 5;
        }

        return hasVibes && hasDuration;
    });

    // Sorting
    if (sortBy === 'duration_asc') {
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    } else if (sortBy === 'budget_asc') {
        // Crude parsing of "от XXXX ₽"
        const getBudget = s => parseInt(s.replace(/[^0-9]/g, '')) || 0;
        filtered.sort((a, b) => getBudget(a.budget) - getBudget(b.budget));
    }

    renderRoutes(filtered);
}

function renderRoutes(routes) {
    const container = document.getElementById('routesContainer');
    container.innerHTML = '';
    
    const favs = getFavorites();

    if (routes.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">Ничего не найдено :( Попробуйте снять фильтры.</div>';
        return;
    }

    routes.forEach(route => {
        const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
        const isFav = favs.includes(route.id) ? 'active' : '';
        
        const tagsHtml = route.vibes.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('');
        
        const card = document.createElement('div');
        card.className = 'route-card fade-in visible';
        card.innerHTML = `
            <div class="card-img" style="background: ${gradient}">
                Вставьте 1 фото
            </div>
            <div class="card-body">
                <h3 class="card-title">${escapeHTML(route.title)}</h3>
                <div class="card-tags">${tagsHtml}</div>
                <div class="card-meta">
                    <span>⏱ ${route.duration}</span>
                    <span>💰 ${route.budget}</span>
                </div>
                <div style="margin-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
                    <a href="route.html?id=${route.id}" style="color: var(--color-baikal); font-weight: 600;">Подробнее →</a>
                    <button class="btn-fav ${isFav}" data-id="${route.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                    </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Re-init favorites listeners for new elements
    initFavorites(); 
}

// Mobile Filter Toggle
const filterToggle = document.querySelector('.filter-toggle');
const filtersPanel = document.querySelector('.filters-panel');
const overlay = document.querySelector('.overlay');

if(filterToggle) {
    filterToggle.addEventListener('click', () => {
        filtersPanel.classList.add('open');
        overlay.classList.add('active');
    });
}

if(overlay) {
    overlay.addEventListener('click', () => {
        filtersPanel.classList.remove('open');
        overlay.classList.remove('active');
    });
}