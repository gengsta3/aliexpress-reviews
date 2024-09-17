(function() {
  // Function to extract reviews
  function extractReviews() {
    let reviews = [];

    // Select all review elements
    document.querySelectorAll('.list--itemBox--zF4Z5NT').forEach(item => {
      // Count the number of stars by the presence of .comet-icon-starreviewfilled elements
      let rating = item.querySelectorAll('.comet-icon-starreviewfilled').length;

      // Extract review text
      let content = item.querySelector('.list--itemReview--hBFPNly') ? item.querySelector('.list--itemReview--hBFPNly').textContent.trim() : 'No review';

      // Extract author and date
      let authorDate = item.querySelector('.list--itemInfo--fb1A_M1') ? item.querySelector('.list--itemInfo--fb1A_M1').textContent.trim() : 'Anonymous';

      // Extract product variant (e.g., color/size)
      let variant = item.querySelector('.list--itemSku--o3EjCHG') ? item.querySelector('.list--itemSku--o3EjCHG').textContent.trim() : 'No variant information';

      // Push review data to the reviews array
      reviews.push({rating: rating, content: content, authorDate: authorDate, variant: variant});
    });

    // If no reviews were extracted
    if (reviews.length === 0) {
      alert('No reviews found.');
      return;
    }

    // Convert the reviews to a worksheet and download as Excel
    let ws = XLSX.utils.json_to_sheet(reviews);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Reviews');
    XLSX.writeFile(wb, 'aliexpress_reviews.xlsx');
  }

  // Load the XLSX library dynamically
  var script = document.createElement('script');
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js";
  script.onload = function() {
    // Wait for 3 seconds to ensure all reviews are loaded, then extract
    setTimeout(extractReviews, 3000);
  };
  document.head.appendChild(script);
})();
