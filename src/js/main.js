// main.js - Core functionality
document.addEventListener("DOMContentLoaded", () => {
    initPageTransitions();
    initFavorites();
    initAnimations();
    initEasterEggs();
    loadLastVibe();
    initHeaderScroll();
    initImageFallbacks();
    initVibeQuickPicker();
});

function initHeaderScroll() {
    const header = document.querySelector(".header");
    if (!header) return;
    window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 50);
    });
}

function initFavorites() {
    updateFavCounter();
    document.querySelectorAll(".btn-fav").forEach((btn) => {
        if (btn.dataset.bound === "1") return;
        btn.dataset.bound = "1";
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const id = parseInt(btn.dataset.id, 10);
            toggleFavorite(id);
            btn.classList.toggle("active");
            if (!btn.querySelector("svg")) {
                btn.textContent = btn.classList.contains("active") ? "❤️" : "🤍";
            }
            updateFavCounter();
        });
    });

    document.querySelectorAll(".btn-fav-detail").forEach((btn) => {
        if (btn.dataset.bound === "1") return;
        btn.dataset.bound = "1";
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id, 10);
            toggleFavorite(id);
            const isFav = getFavorites().includes(id);
            btn.classList.toggle("active", isFav);
            btn.textContent = isFav ? "❤️ Уже в избранном" : "🤍 Сохранить в избранное";
            updateFavCounter();
        });
    });
}

function getFavorites() {
    return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS.FAVORITES) || "[]");
}

function toggleFavorite(id) {
    let favs = getFavorites();
    if (favs.includes(id)) favs = favs.filter((fid) => fid !== id);
    else favs.push(id);
    localStorage.setItem(CONFIG.STORAGE_KEYS.FAVORITES, JSON.stringify(favs));
}

function updateFavCounter() {
    const badge = document.querySelector(".fav-count");
    if (!badge) return;
    const count = getFavorites().length;
    badge.textContent = count;
    badge.style.display = count > 0 ? "flex" : "none";
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("visible");
        });
    }, { threshold: 0.1 });
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

function initEasterEggs() {
    let cedarButton = document.querySelector(".cedar-icon");
    if (!cedarButton) {
        cedarButton = document.createElement("button");
        cedarButton.type = "button";
        cedarButton.className = "cedar-icon";
        cedarButton.setAttribute("aria-label", "Открыть секретный вайб");
        cedarButton.textContent = "🌲";
        document.body.appendChild(cedarButton);
    }
    cedarButton.title = "Секретный вайб";
    if (cedarButton.dataset.bound !== "1") {
        cedarButton.dataset.bound = "1";
        cedarButton.addEventListener("click", revealSecretVibe);
    }

    const footerOrnament = document.querySelector(".footer-ornament");
    if (!footerOrnament) return;

    let clickStreak = 0;
    let clickTimer;
    footerOrnament.title = "Тройной клик";

    footerOrnament.addEventListener("click", () => {
        clickStreak += 1;
        clearTimeout(clickTimer);
        clickTimer = setTimeout(() => { clickStreak = 0; }, 1500);
        if (clickStreak >= 3) {
            clickStreak = 0;
            revealSecretVibe();
        }
    });
}

function revealSecretVibe() {
    const prev = document.getElementById("secretVibeToast");
    if (prev) prev.remove();
    const toast = document.createElement("div");
    toast.id = "secretVibeToast";
    toast.className = "secret-vibe-toast";
    toast.innerHTML = `<strong>Секретный вайб:</strong> #ночь_у_байкала <a href="routes.html?vibe=${encodeURIComponent("#в_дикую")}&secret=night">Открыть</a>`;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("visible"));
    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 250);
    }, 5000);
}

function initPageTransitions() {
    document.body.classList.add("page-loaded");
    const links = Array.from(document.querySelectorAll("a[href]")).filter((link) => {
        const href = link.getAttribute("href");
        return href && !href.startsWith("#") && !href.startsWith("mailto:") && !href.startsWith("tel:") && !link.target;
    });
    links.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("http")) return;
            event.preventDefault();
            document.body.classList.add("page-leaving");
            setTimeout(() => { window.location.href = href; }, 240);
        });
    });
}

function initImageFallbacks() {
    document.querySelectorAll("img").forEach((img) => {
        img.addEventListener("error", () => {
            if (img.dataset.fallbackApplied) return;
            img.dataset.fallbackApplied = "1";
            img.src = "assets/images/baikal.jpg";
        });
    });
}

function loadLastVibe() {
    const lastVibe = localStorage.getItem(CONFIG.STORAGE_KEYS.LAST_VIBE);
    if (lastVibe && window.location.pathname.includes("routes.html")) {
        console.log("Restoring vibe:", lastVibe);
    }
}

function escapeHTML(str) {
    if (typeof str !== "string") return "";
    return str.replace(/[&<>'"]/g, (tag) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        "\"": "&quot;"
    }[tag]));
}

function initVibeQuickPicker() {
    const buttons = document.querySelectorAll(".vibe-btn[data-vibe]");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            localStorage.setItem(CONFIG.STORAGE_KEYS.LAST_VIBE, button.dataset.vibe);
        });
    });
}