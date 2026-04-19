// pdfGenerator.js - PDF Generation using jsPDF
async function generatePDF(routeId) {
    // Find route data
    let route;
    try {
        const res = await fetch('data/routes.json');
        const data = await res.json();
        route = data.find(r => r.id == routeId);
    } catch (e) {
        alert('Ошибка загрузки данных для PDF');
        return;
    }

    if (!route) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Cover
    doc.setFillColor(0, 119, 190); // Baikal blue
    doc.rect(0, 0, 210, 297, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.text("VIBE TRAVEL 03", 105, 40, null, null, "center");
    
    doc.setFontSize(16);
    doc.text("Гид по маршруту:", 105, 60, null, null, "center");
    
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    // Split text if too long
    const titleLines = doc.splitTextToSize(route.title, 180);
    doc.text(titleLines, 105, 80, null, null, "center");

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Место для вашего лучшего фото", 105, 120, null, null, "center");
    doc.rect(55, 130, 100, 60); // Placeholder box

    // Content
    doc.addPage();
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text(route.title, 20, 20);
    
    doc.setFontSize(12);
    let y = 35;
    
    doc.setFont("helvetica", "bold");
    doc.text("Описание:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(route.fullDescription, 170);
    doc.text(descLines, 20, y);
    y += (descLines.length * 7) + 10;

    doc.setFont("helvetica", "bold");
    doc.text("Программа:", 20, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    
    route.schedule.forEach(item => {
        doc.setFont("helvetica", "bold");
        doc.text(`День ${item.day}: ${item.title}`, 20, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        const schLines = doc.splitTextToSize(item.description, 170);
        doc.text(schLines, 25, y);
        y += (schLines.length * 7) + 5;
        
        if (y > 270) { doc.addPage(); y = 20; }
    });

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Логистика:", 20, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Как добраться: ${route.logistics.howToGet}`, 20, y);
    y += 7;
    doc.text(`Бюджет: ${route.logistics.budgetDetails}`, 20, y);
    y += 7;
    doc.text(`Сезон: ${route.logistics.seasonality}`, 20, y);

    doc.save(`VIBE_${route.id}.pdf`);
}