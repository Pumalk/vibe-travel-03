let allRoutes = [];

document.addEventListener("DOMContentLoaded", async () => {
    const routesContainer = document.getElementById("routesContainer");
    if (!routesContainer) return;
    try {
        const response = await fetch("data/routes.json");
        allRoutes = await response.json();
        restoreVibeSelection();
        applyFilters();
    } catch (error) {
        console.error("Error loading routes:", error);
        routesContainer.innerHTML = "<p style='text-align:center;padding:2rem;'>Не удалось загрузить маршруты.</p>";
    }
    setupFilterListeners();
    setupSortListener();
});

function setupFilterListeners() {
    const checkboxes = document.querySelectorAll("input.filter-option[type='checkbox']");
    checkboxes.forEach((cb) => {
        cb.addEventListener("change", (e) => {
            const label = e.target.closest(".checkbox-label");
            if (e.target.checked) label.classList.add("selected");
            else label.classList.remove("selected");
            applyFilters();
        });
    });

    document.querySelectorAll("select.filter-option").forEach((sel) => {
        sel.addEventListener("change", applyFilters);
    });
}

function setupSortListener() {
    const sortSelect = document.getElementById("sortSelect");
    if (sortSelect) {
        sortSelect.addEventListener("change", applyFilters);
    }
}

function restoreVibeSelection() {
    const params = new URLSearchParams(window.location.search);
    const vibeParam = params.get("vibe");

    if (vibeParam) {
        const checkbox = document.querySelector(`input[value="${vibeParam}"]`);
        if (checkbox) {
            checkbox.checked = true;
            checkbox.closest(".checkbox-label").classList.add("selected");
            localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_VIBE, vibeParam);
        }
    } else {
        const saved = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
        if (saved) {
            const checkbox = document.querySelector(`input[value="${saved}"]`);
            if (checkbox) {
                checkbox.checked = true;
                checkbox.closest(".checkbox-label").classList.add("selected");
            }
        }
    }
}

function applyFilters() {
    const selectedVibes = Array.from(document.querySelectorAll("input[name='vibe']:checked")).map((el) => el.value);
    const selectedDuration = document.querySelector("select[name='duration']")?.value;
    const selectedBudget = document.querySelector("select[name='budget']")?.value;
    const selectedSeason = document.querySelector("select[name='season']")?.value;
    const sortBy = document.getElementById("sortSelect")?.value || "default";

    let filtered = allRoutes.filter((route) => {
        const hasVibes = selectedVibes.every((v) => route.vibes.includes(v));

        const days = parseInt(route.duration, 10) || 0;
        let hasDuration = true;
        if (selectedDuration) {
            if (selectedDuration === "short") hasDuration = days <= 2;
            if (selectedDuration === "medium") hasDuration = days >= 3 && days <= 4;
            if (selectedDuration === "long") hasDuration = days >= 5;
        }

        const budget = parseInt((route.budget || "").replace(/[^0-9]/g, ""), 10) || 0;
        let hasBudget = true;
        if (selectedBudget === "low") hasBudget = budget <= 4000;
        if (selectedBudget === "mid") hasBudget = budget > 4000 && budget <= 9000;
        if (selectedBudget === "high") hasBudget = budget > 9000;

        let hasSeason = true;
        if (selectedSeason) {
            hasSeason = route.season.toLowerCase().includes(selectedSeason.toLowerCase()) || route.season === "круглый год";
        }

        return hasVibes && hasDuration && hasBudget && hasSeason;
    });

    if (sortBy === "duration_asc") {
        filtered.sort((a, b) => (parseInt(a.duration, 10) || 0) - (parseInt(b.duration, 10) || 0));
    } else if (sortBy === "budget_asc") {
        const getBudget = (s) => parseInt(String(s).replace(/[^0-9]/g, ""), 10) || 0;
        filtered.sort((a, b) => getBudget(a.budget) - getBudget(b.budget));
    }

    renderRoutes(filtered);
}

function renderRoutes(routes) {
    const container = document.getElementById("routesContainer");
    const favs = getFavorites();

    if (routes.length === 0) {
        container.innerHTML = `
            <div class="favorites-empty" style="grid-column: 1/-1;">
                <h2>Пусто по фильтрам</h2>
                <p>Ослабь условия и поймай новый вайб.</p>
                <button class="btn-pdf" onclick="resetFilters()">Сбросить</button>
            </div>
        `;
        return;
    }

    container.innerHTML = routes.map((route) => {
        const gradient = `linear-gradient(135deg, ${route.gradient[0]}, ${route.gradient[1]})`;
        const isFav = favs.includes(route.id);
        const imgSrc = route.images && route.images[0] ? route.images[0].src : "assets/images/baikal.jpg";
        return `
            <div class="route-card fade-in">
                <div class="card-img" style="background: ${gradient}">
                    <img src="${imgSrc}" alt="${escapeHTML(route.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;position:absolute;top:0;left:0;">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${escapeHTML(route.title)}</h3>
                    <div class="card-tags">
                        ${route.vibes.slice(0, 4).map((v) => `<span class="tag">${escapeHTML(v)}</span>`).join("")}
                    </div>
                    <div class="card-meta">
                        <span>⏱ ${route.duration}</span>
                        <span>💰 ${route.budget}</span>
                        <button class="btn-fav ${isFav ? 'active' : ''}" data-id="${route.id}">
                            ${isFav ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <a href="route.html?id=${route.id}" class="btn-pdf" style="margin-top: 1rem; padding: 0.6rem 1.5rem; font-size: 0.9rem;">Хочу в этот трип</a>
                </div>
            </div>
        `;
    }).join("");

    initFavorites();
    setTimeout(() => {
        document.querySelectorAll(".route-card").forEach((card) => {
            card.classList.add("visible");
        });
    }, 100);
}

function resetFilters() {
    document.querySelectorAll("input[name='vibe']").forEach((cb) => {
        cb.checked = false;
        cb.closest(".checkbox-label").classList.remove("selected");
    });
    document.querySelectorAll(".filter-option").forEach((el) => {
        if (el.tagName === "SELECT") el.value = "";
    });
    document.getElementById("sortSelect").value = "default";
    localStorage.removeItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
    applyFilters();
}