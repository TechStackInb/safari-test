document.getElementById('download').addEventListener('click', async function () {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  try {
    // Ensure the image is fully loaded before converting
    await ensureImageLoaded('exampleImage');

    const element = document.getElementById('content');

    // Directly convert the HTML content to PDF using html2pdf
    html2pdf()
      .set({
        margin: 1,
        filename: 'converted-page.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2, // High scale for better quality
          useCORS: true, // Enable CORS to load cross-origin images
        },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
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
