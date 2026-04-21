// admin.js - Admin Panel Logic
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("routeForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            generateJson();
        });
    }
});

function generateJson() {
    const id = document.getElementById("r_id").value;
    const title = document.getElementById("r_title").value;
    const vibes = document.getElementById("r_vibes").value.split(",").map((s) => s.trim()).filter(Boolean);
    const g1 = document.getElementById("r_g1").value;
    const g2 = document.getElementById("r_g2").value;
    const duration = document.getElementById("r_dur").value;
    const budget = document.getElementById("r_bud").value;
    const season = document.getElementById("r_season").value;
    const description = document.getElementById("r_desc").value;
    const fullDescription = document.getElementById("r_fullDesc").value;
    const imagePath = document.getElementById("r_image").value.trim();

    const newRoute = {
        id: parseInt(id) || Date.now(),
        title: title || "Новый маршрут",
        vibes: vibes,
        gradient: [g1, g2],
        duration: duration || "1 день",
        budget: budget || "от 0 ₽",
        season: season,
        description: description || "Описание маршрута",
        fullDescription: fullDescription || description || "Подробное описание маршрута",
        schedule: [
            { day: 1, title: "День 1", description: "Описание первого дня" }
        ],
        logistics: {
            howToGet: "Указать способ добраться",
            budgetDetails: budget || "Указать бюджет",
            seasonality: season === "круглый год" ? "Круглый год" : (season === "лето" ? "Июнь-Сентябрь" : "Декабрь-Март")
        },
        points: [
            { name: "Точка 1", coordinates: [51.8, 107.6] }
        ],
        images: [
            { src: imagePath || ("assets/images/placeholders/route" + id + ".jpg"), alt: title || "Новый маршрут" }
        ]
    };

    const output = document.getElementById("jsonOutput");
    output.value = JSON.stringify(newRoute, null, 2);
}

async function copyJson() {
    const text = document.getElementById("jsonOutput").value;
    if (!text.trim()) {
        alert("Сначала сгенерируйте JSON.");
        return;
    }
    try {
        const res = await fetch("data/routes.json");
        const routes = await res.json();
        const newRoute = JSON.parse(text);
        const idx = routes.findIndex((item) => item.id === newRoute.id);
        if (idx >= 0) routes[idx] = newRoute;
        else routes.push(newRoute);
        await navigator.clipboard.writeText(JSON.stringify(routes, null, 2));
        alert("Скопирован полный массив маршрутов с добавлением/обновлением объекта.");
    } catch (error) {
        console.error(error);
        alert("Не удалось собрать массив. Проверьте JSON и попробуйте снова.");
    }
}