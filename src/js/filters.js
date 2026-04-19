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
        routesContainer.innerHTML = '<p style="text-align:center; padding: 2rem;">Ошибка загрузки данных.</p>';
    }

    setupFilterListeners();
    setupSortListener();
    
    // Restore vibe from URL or LocalStorage
    restoreVibeSelection();
});

function setupFilterListeners() {
    const checkboxes = document.querySelectorAll('.filter-option input[type="checkbox"]');
    checkboxes.forEach(cb => {
        cb.addEventListener('change', (e) => {
            const label = e.target.closest('.checkbox-label');
            if(e.target.checked) label.classList.add('selected');
            else label.classList.remove('selected');
            applyFilters();
        });
    });

    // Select filters
    const selects = document.querySelectorAll('.filter-option:not(input[type="checkbox"])');
    selects.forEach(sel => {
        sel.addEventListener('change', applyFilters);
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
    const selectedSeason = document.querySelector('select[name="season"]')?.value;
    const sortBy = document.getElementById('sortSelect')?.value || 'default';

    // Filter Logic (AND)
    let filtered = allRoutes.filter(route => {
        // Vibe Check (Route must have ALL selected vibes)
        const hasVibes = selectedVibes.every(v => route.vibes.includes(v));
        
        // Duration Check
        let hasDuration = true;
        if(selectedDuration) {
            const days = parseInt(route.duration) || 0;
            if(selectedDuration === 'short') hasDuration = days <= 2;
            if(selectedDuration === 'medium') hasDuration = days >= 3 && days <= 4;
            if(selectedDuration === 'long') hasDuration = days >= 5;
        }

        // Season Check
        let hasSeason = true;
        if(selectedSeason) {
            hasSeason = route.season.toLowerCase().includes(selectedSeason.toLowerCase()) || 
                        route.season === 'круглый год';
        }

        return hasVibes && hasDuration && hasSeason;
    });

    // Sorting
    if (sortBy === 'duration_asc') {
        filtered.sort((a, b) => (parseInt(a.duration) || 0) - (parseInt(b.duration) || 0));
    } else if (sortBy === 'budget_asc') {
        const getBudget = s => parseInt(s.replace(/[^0-9]/g, '')) || 0;
        filtered.sort((a, b) => getBudget(a.budget) - getBudget(b.budget));
    }

    renderRoutes(filtered);
}

function renderRoutes(routes) {
    const container = document.getElementById('routesContainer');
    
    if (routes.length === 0) {
        container.innerHTML = `
            <div class="favorites-empty" style="grid-column: 1/-1;">
                <h2>Маршруты не найдены</h2>
                <p>Попробуйте изменить фильтры</p>
                <button class="btn-pdf" onclick="resetFilters()">Сбросить фильтры</button>
            </div>
        `;
        return;
    }

    container.innerHTML = routes.map(route => {
        const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
        const isFav = getFavorites().includes(route.id);
        const imgSrc = route.images && route.images[0] ? route.images[0].src : 'assets/images/baikal.jpg';
        
        return `
            <div class="route-card fade-in">
                <div class="card-img" style="background: ${gradient}">
                    <img src="${imgSrc}" alt="${route.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${route.title}</h3>
                    <div class="card-tags">
                        ${route.vibes.slice(0, 4).map(v => `<span class="tag">${v}</span>`).join('')}
                    </div>
                    <div class="card-meta">
                        <span>⏱ ${route.duration}</span>
                        <span>💰 ${route.budget}</span>
                        <button class="btn-fav ${isFav ? 'active' : ''}" data-id="${route.id}">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <a href="route.html?id=${route.id}" class="btn-pdf" style="margin-top: 1rem; padding: 0.6rem 1.5rem; font-size: 0.9rem;">Подробнее</a>
                </div>
            </div>
        `;
    }).join('');

    // Re-init favorites after render
    initFavorites();
    
    // Trigger animation
    setTimeout(() => {
        document.querySelectorAll('.route-card').forEach(card => {
            card.classList.add('visible');
        });
    }, 100);
}

function resetFilters() {
    document.querySelectorAll('input[name="vibe"]').forEach(cb => {
        cb.checked = false;
        cb.closest('.checkbox-label').classList.remove('selected');
    });
    document.querySelectorAll('.filter-option').forEach(sel => {
        if(sel.tagName === 'SELECT') sel.value = '';
    });
    document.getElementById('sortSelect').value = 'default';
    localStorage.removeItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
    applyFilters();
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
        const imgSrc = route.images && route.images[0] ? route.images[0].src : 'assets/images/baikal.jpg';
        
        const tagsHtml = route.vibes.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('');
        
        const card = document.createElement('div');
        card.className = 'route-card fade-in visible';
        card.innerHTML = `
            <div class="card-img" style="background: ${gradient}">
                <img src="${imgSrc}" alt="${route.title}" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
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