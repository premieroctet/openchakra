import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
var moment = require('moment')

async function loadImage(url) {
  const timeStampedURL = url+`?timestamp=new ${Date()}`
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image at ${url}`));
    img.src = timeStampedURL;
  });
}

async function generatePDF(targetId, fileName){
  if (targetId=='root'){targetId='__next'}
  const input = document.getElementById(targetId);
  const imgs= input.querySelectorAll('img')
  await Promise.all(Array.from(imgs).map(async (img) => {
    try {
      const loadedImage = await loadImage(img.src);
      img.src = loadedImage.src; // Replace the original src with the loaded image src
      console.log(`Image loaded and replaced for ${img.src}`);
    } catch (error) {
      console.error(`Error loading image ${img.src}: ${error}`);
      console.log("Some images failed to load and will not appear in the PDF.");
    }
  }));
  
  return html2canvas(input, { scale: 2, useCORS: true, logging: true, scrollY: -window.scrollY }).then(canvas => {
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
    fileName=fileName +'_'+moment().format("DD-MM-YYYY"); 
    return pdf.save(`${fileName}.pdf`);
    
  });

};

export {generatePDF};