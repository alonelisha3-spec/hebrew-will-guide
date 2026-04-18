import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

/**
 * Generate a Hebrew-friendly PDF from the will draft text.
 * Uses html2canvas to render RTL Hebrew correctly, then embeds in jsPDF.
 */
export async function generateWillPdf(
  draftText: string,
  leadName: string
): Promise<void> {
  // Create a hidden container with proper Hebrew styling
  const container = document.createElement("div");
  container.style.cssText = `
    position: fixed;
    top: -9999px;
    left: 0;
    width: 595px;
    padding: 50px 55px;
    background: white;
    font-family: 'Heebo', 'David', 'Arial', sans-serif;
    font-size: 13px;
    line-height: 2;
    direction: rtl;
    text-align: right;
    color: #1a1a1a;
    box-sizing: border-box;
  `;

  // Format the draft text with proper structure
  const lines = draftText.split("\n");
  let html = "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      html += '<div style="height: 10px;"></div>';
    } else if (
      trimmed.startsWith("צוואה") ||
      trimmed.startsWith("צוואת") ||
      trimmed.startsWith("הערה מקדימה")
    ) {
      html += `<div style="font-size: 20px; font-weight: 700; text-align: center; margin: 16px 0 10px; color: #0d1b2e;">${trimmed}</div>`;
    } else if (/^(סעיף|פרק|חלק)\s/.test(trimmed) || /^\d+\./.test(trimmed)) {
      html += `<div style="font-weight: 700; margin-top: 12px; color: #0d1b2e;">${trimmed}</div>`;
    } else if (trimmed.startsWith("---") || trimmed.startsWith("===")) {
      html += '<hr style="border: none; border-top: 1px solid #ddd; margin: 14px 0;" />';
    } else {
      html += `<div>${trimmed}</div>`;
    }
  }

  // Add footer
  html += `
    <div style="margin-top: 30px; padding-top: 14px; border-top: 1px solid #ccc; font-size: 10px; color: #888; text-align: center; line-height: 1.6;">
      טיוטה ראשונית בלבד — אינה מהווה צוואה תקפה ואינה מחליפה ייעוץ משפטי<br/>
      משרד עורכי דין אלון אלישע · 054-9260698
    </div>
  `;

  container.innerHTML = html;
  document.body.appendChild(container);

  try {
    // Render to canvas with high quality
    const canvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      logging: false,
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF("p", "mm", "a4");
    const imgData = canvas.toDataURL("image/jpeg", 0.95);

    // Handle multi-page
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position = -(imgHeight - heightLeft);
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const fileName = `טיוטת_צוואה_${leadName.replace(/\s/g, "_")}.pdf`;

    // On mobile: try share, fallback to open
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      const blob = pdf.output("blob");
      const file = new File([blob], fileName, { type: "application/pdf" });
      const canShare = navigator.canShare?.({ files: [file] });
      if (canShare) {
        try {
          await navigator.share({ files: [file], title: fileName });
          return;
        } catch {
          // fallback below
        }
      }
    }

    pdf.save(fileName);
  } finally {
    document.body.removeChild(container);
  }
}
