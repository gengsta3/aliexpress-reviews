(function() {
  // Function to extract reviews
  function extractReviews() {
    let reviews = [];
    
    // Check the DOM structure, may need adjustment based on AliExpress changes
    document.querySelectorAll('.feedback-item').forEach(item => {
      let rating = item.querySelector('.star-view span') ? item.querySelector('.star-view span').textContent.trim() : 'N/A';
      let author = item.querySelector('.user-name') ? item.querySelector('.user-name').textContent.trim() : 'Anonymous';
      let content = item.querySelector('.feedback-text') ? item.querySelector('.feedback-text').textContent.trim() : 'No review';
      reviews.push({rating: rating, author: author, content: content});
    });

    if (reviews.length === 0) {
      alert('No reviews found. Please make sure you are on a product review page.');
      return;
    }

    // Convert the reviews to a worksheet and download as Excel
    let ws = XLSX.utils.json_to_sheet(reviews);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reviews');
    XLSX.writeFile(wb, 'aliexpress_reviews.xlsx');
  }

  // Dynamically load the xlsx library and run the extract function
  var script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js";
  script.onload = function() {
    setTimeout(extractReviews, 3000); // Wait for 3 seconds to ensure reviews are loaded
  };
  document.head.appendChild(script);
})();
