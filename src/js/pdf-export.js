/**
 * PDF-гид: библиотеки подгружаются только при первом экспорте.
 */

let pdfLibsPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Не удалось загрузить ${src}`));
    document.head.appendChild(s);
  });
}

function ensurePdfLibs() {
  if (typeof html2canvas !== 'undefined' && window.jspdf) {
    return Promise.resolve();
  }
  if (pdfLibsPromise) return pdfLibsPromise;
  pdfLibsPromise = (async () => {
    if (typeof html2canvas === 'undefined') {
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
      );
    }
    if (!window.jspdf) {
      await loadScript(
        'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
      );
    }
  })().catch((err) => {
    pdfLibsPromise = null;
    throw err;
  });
  return pdfLibsPromise;
}

/**
 * @param {Object} route
 */
async function downloadPDF(route) {
  await ensurePdfLibs();

  const pdfDiv = document.createElement('div');
  pdfDiv.style.position = 'absolute';
  pdfDiv.style.left = '-9999px';
  pdfDiv.style.top = '0';
  pdfDiv.style.width = '800px';
  pdfDiv.style.padding = '30px';
  pdfDiv.style.backgroundColor = '#141B33';
  pdfDiv.style.fontFamily = 'Inter, "Playfair Display", sans-serif';
  pdfDiv.style.color = '#EDF2F4';

  pdfDiv.innerHTML = `
    <div style="background:#0A1128; padding:22px 24px; margin:-30px -30px 24px -30px; border-bottom:2px solid #E07A5F;">
      <span style="color:#EDF2F4; font-family:'Playfair Display', Georgia, serif; font-size:24px; font-weight:900; letter-spacing:0.04em;">VIBE TRAVEL 03</span>
    </div>
    <h1 style="font-family:'Playfair Display', Georgia, serif; font-weight:900; font-size:28px; margin-top:0; color:#EDF2F4;">${route.title}</h1>
    <p style="color:#8D99AE; font-size:14px;">
      ${route.tags.map((t) => tagLabels[t] || t).join(', ')} · ${route.duration} · ${route.budget} · Сезон: ${route.season.join(', ')}
    </p>
    <p style="font-size:16px; color:#EDF2F4;">${route.description}</p>
    <h3 style="font-family:'Playfair Display', Georgia, serif; font-weight:700; color:#C4A57B;">📍 Транспорт</h3>
    <p style="color:#EDF2F4;">${route.transport}</p>
    <h3 style="font-family:'Playfair Display', Georgia, serif; font-weight:700; color:#C4A57B;">💡 Советы</h3>
    <p style="color:#EDF2F4;">${route.tips}</p>
    <h3 style="font-family:'Playfair Display', Georgia, serif; font-weight:700; color:#C4A57B;">📍 Точки и координаты</h3>
    <ul style="list-style:none; padding-left:0;">
      ${route.points
        .map(
          (p, i) => `
        <li style="margin-bottom:10px; font-size:14px; color:#EDF2F4;">
          <strong>${i + 1}. ${p.name} (${p.type})</strong><br>
          ${p.description}<br>
          <span style="color:#8D99AE;">Координаты: ${p.coords.join(', ')}</span>
        </li>
      `
        )
        .join('')}
    </ul>
    <hr style="margin-top:30px; border:none; border-top:1px solid #8D99AE; opacity:0.35;">
    <p style="text-align:center; color:#8D99AE; font-size:12px;">Этот гид создан VIBE TRAVEL 03 · Сохрани и путешествуй!</p>
  `;

  document.body.appendChild(pdfDiv);

  const canvas = await html2canvas(pdfDiv, { scale: 1.5 });
  document.body.removeChild(pdfDiv);

  const imgData = canvas.toDataURL('image/png');
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const imgWidth = pageWidth - margin * 2;
  const totalCanvasHeight = canvas.height;
  const scaleRatio = canvas.width / imgWidth;
  const totalHeightMm = totalCanvasHeight / scaleRatio;
  const maxContentHeight = pageHeight - margin * 2;

  let sourceY = 0;
  let remainingHeight = totalHeightMm;

  if (remainingHeight <= maxContentHeight + 1) {
    doc.addImage(imgData, 'PNG', margin, margin, imgWidth, totalHeightMm);
  } else {
    while (remainingHeight > 1) {
      const sliceHeightMm = Math.min(remainingHeight, maxContentHeight);
      const sliceHeightPx = sliceHeightMm * scaleRatio;

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.ceil(sliceHeightPx);
      const ctx = sliceCanvas.getContext('2d');
      ctx.drawImage(
        canvas,
        0,
        sourceY,
        canvas.width,
        sliceCanvas.height,
        0,
        0,
        canvas.width,
        sliceCanvas.height
      );

      const sliceData = sliceCanvas.toDataURL('image/png');
      if (sourceY > 0) doc.addPage();
      doc.addImage(sliceData, 'PNG', margin, margin, imgWidth, sliceHeightMm);

      sourceY += sliceCanvas.height;
      remainingHeight -= sliceCanvas.height / scaleRatio;
    }
  }

  doc.save(`${route.title.replace(/[^a-zа-яё0-9]/gi, '_')}.pdf`);
}
