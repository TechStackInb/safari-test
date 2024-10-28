document.getElementById('downloadButton').addEventListener('click', async function () {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  try {
    // Ensure all images are loaded before converting to PDF
    await ensureImageLoaded('signImg');

    const element = document.getElementById('registrationForm-outer');

    // Directly convert the HTML content to PDF using html2pdf
    html2pdf()
      .set({
        margin: [0.5, 0.5, 0.5, 0.5], // Top, left, bottom, right margins
        filename: 'converted-page.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 1.5, // Adjust scale for better performance
          useCORS: true, // Enable CORS for cross-origin images
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }, // Ensure proper page breaks
      })
      .from(element)
      .save();
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    loader.style.display = 'none';
  }
});

// Helper function to ensure the image is loaded before PDF generation
function ensureImageLoaded(imageId) {
  const img = document.getElementById(imageId);
  return new Promise((resolve, reject) => {
    if (img.complete && img.naturalHeight !== 0) {
      resolve();
    } else {
      img.onload = resolve;
      img.onerror = () => reject(new Error('Image failed to load'));
    }
  });
}
