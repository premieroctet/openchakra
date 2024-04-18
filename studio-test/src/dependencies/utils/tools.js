import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const generatePDF = (targetId, fileName) => {
  const input = document.getElementById(targetId);

  html2canvas(input, { scale: 2, useCORS: true, logging: true, scrollY: -window.scrollY }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    const imgWidth = 210;  // A4 width in mm
    const pageHeight = 297;  // A4 height in mm
    const imgHeight = canvas.height * imgWidth / canvas.width;
    let heightLeft = imgHeight;

    let position = 0; // Top position of the image in mm

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft > 0) {
      position -= pageHeight;  // Move position by page height
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${fileName}.pdf`);
  });
};

export {generatePDF};