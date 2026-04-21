async function generatePDF(routeId) {
    let route;
    try {
        const res = await fetch("data/routes.json");
        const data = await res.json();
        route = data.find((r) => r.id == routeId);
    } catch (e) {
        alert("Ошибка загрузки данных для PDF");
        return;
    }

    if (!route) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const t = (value) => transliterateRu(String(value ?? ""));

    doc.setFillColor(0, 119, 190);
    doc.rect(0, 0, 210, 297, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("VIBE TRAVEL 03", 105, 40, null, null, "center");
    doc.setFontSize(14);
    doc.text("OFFLINE GUIDE", 105, 52, null, null, "center");
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(t(route.title), 180);
    doc.text(titleLines, 105, 80, null, null, "center");
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Photo placeholder", 105, 112, null, null, "center");
    doc.rect(45, 118, 120, 70);
    doc.setFontSize(10);
    doc.text(`Duration: ${t(route.duration)}  |  Budget: ${t(route.budget)}`, 105, 202, null, null, "center");
    doc.text(`Season: ${t(route.season)}`, 105, 209, null, null, "center");
    doc.text("Open this guide offline during your trip.", 105, 223, null, null, "center");

    doc.addPage();
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(t(route.title), 20, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    let y = 35;
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(t(route.fullDescription), 170);
    doc.text(descLines, 20, y);
    y += (descLines.length * 7) + 10;

    doc.setFont("helvetica", "bold");
    doc.text("Route steps:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    route.schedule.forEach((item) => {
        doc.setFont("helvetica", "bold");
        doc.text(`Day ${t(item.day)}: ${t(item.title)}`, 20, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        const schLines = doc.splitTextToSize(t(item.description), 170);
        doc.text(schLines, 25, y);
        y += (schLines.length * 7) + 5;

        if (y > 270) { doc.addPage(); y = 20; }
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Logistics:", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`How to get there: ${t(route.logistics.howToGet)}`, 20, y);
    y += 7;
    doc.text(`Budget details: ${t(route.logistics.budgetDetails)}`, 20, y);
    y += 7;
    doc.text(`Seasonality: ${t(route.logistics.seasonality)}`, 20, y);
    y += 14;

    doc.setFont("helvetica", "bold");
    doc.text("Trip checklist:", 20, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    ["Documents and tickets", "Charged powerbank", "Warm jacket or raincoat", "Water and snacks", "First aid and sun protection"].forEach((item) => {
        doc.text(`[] ${item}`, 24, y);
        y += 7;
    });

    doc.save(`VIBE_${route.id}.pdf`);
}

function transliterateRu(input) {
    const map = {
        а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "yo", ж: "zh", з: "z", и: "i", й: "y",
        к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f",
        х: "kh", ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e", ю: "yu", я: "ya"
    };
    return input.replace(/[А-Яа-яЁё]/g, (char) => {
        const lower = char.toLowerCase();
        const tr = map[lower] ?? lower;
        return char === lower ? tr : tr.charAt(0).toUpperCase() + tr.slice(1);
    });
}