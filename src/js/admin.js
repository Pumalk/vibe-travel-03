// admin.js - Admin Panel Logic
document.addEventListener('DOMContentLoaded', () => {
    // Security Check
    const pass = prompt("Введите пароль администратора:");
    if (pass !== 'admin2026') {
        alert("Неверный пароль!");
        window.location.href = 'index.html';
        return;
    }

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
    
    // Basic object construction
    const newRoute = {
        id: parseInt(id) || Date.now(),
        title: title,
        vibes: vibes,
        gradient: [g1, g2],
        duration: duration,
        budget: budget,
        season: "лето", // Default
        description: "Новый крутой маршрут",
        fullDescription: "Подробное описание...",
        schedule: [{ day: 1, title: "Старт", description: "..." }],
        logistics: { howToGet: "...", budgetDetails: "...", seasonality: "..." },
        points: [],
        images: []
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