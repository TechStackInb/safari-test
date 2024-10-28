document.getElementById('downloadButton').addEventListener('click', async function () {
  console.log('CLICKED');

  try {
    const element = document.getElementById('formONE');

    html2pdf()
      .set({
        margin: [0.5, 0.5, 0.5, 0.5],
        filename: 'converted-page.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 1.5,
          useCORS: true,
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
      })
      .from(element)
      .save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    console.log('DONE');
  }
});

// // Helper function to ensure the image is loaded before PDF generation
// function ensureImageLoaded(imageId) {
//   const img = document.getElementById(imageId);
//   return new Promise((resolve, reject) => {
//     if (img.complete && img.naturalHeight !== 0) {
//       resolve();
//     } else {
//       img.onload = resolve;
//       img.onerror = () => reject(new Error('Image failed to load'));
//     }
//   });
// }
