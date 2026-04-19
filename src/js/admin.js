// admin.js - Admin Panel Logic
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('routeForm');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateJson();
        });
    }
});

function generateJson() {
    const id = document.getElementById('r_id').value;
    const title = document.getElementById('r_title').value;
    const vibes = document.getElementById('r_vibes').value.split(',').map(s => s.trim());
    const g1 = document.getElementById('r_g1').value;
    const g2 = document.getElementById('r_g2').value;
    const duration = document.getElementById('r_dur').value;
    const budget = document.getElementById('r_bud').value;
    const season = document.getElementById('r_season').value;
    const description = document.getElementById('r_desc').value;
    const fullDescription = document.getElementById('r_fullDesc').value;
    
    // Build complete route object
    const newRoute = {
        id: parseInt(id) || Date.now(),
        title: title,
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
            { src: "assets/images/placeholders/route" + id + ".jpg", alt: title }
        ]
    };

    const output = document.getElementById('jsonOutput');
    output.value = JSON.stringify(newRoute, null, 2);
}

function copyJson() {
    const copyText = document.getElementById("jsonOutput");
    copyText.select();
    document.execCommand("copy");
    alert("JSON скопирован! Добавьте его в routes.json вручную.");
}