/**
 * Ленивая загрузка pdf-export.js — только когда пользователь нажимает «Скачать PDF».
 */
let pdfExportReady = false;
let pendingPdfArgs = null;

function loadPdfExportScript() {
    if (pdfExportReady) return Promise.resolve();
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'src/js/pdf-export.js';
        script.onload = () => {
            pdfExportReady = true;
            resolve();
        };
        script.onerror = () => reject(new Error('Не удалось загрузить pdf-export.js'));
        document.head.appendChild(script);
    });
}

// Заглушка downloadPDF — загружает скрипт, затем вызывает настоящую
window.downloadPDF = (...args) => {
    loadPdfExportScript().then(() => {
        window.downloadPDF(...args);
    });
};