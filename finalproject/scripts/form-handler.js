document.addEventListener("DOMContentLoaded", () => {
  const submissionDetails = document.getElementById("submission-details");

  if (submissionDetails) {
    // Create a URLSearchParams object to get data from the URL
    const params = new URLSearchParams(window.location.search);

    // Get each piece of data
    const name = params.get("name");
    const email = params.get("email");
    const company = params.get("company");
    const message = params.get("message");

    // Display the data using template literals
    submissionDetails.innerHTML = `
            <div class="submission-item"><strong>Full Name:</strong> <p>${
              name || "Not provided"
            }</p></div>
            <div class="submission-item"><strong>Company Email:</strong> <p>${
              email || "Not provided"
            }</p></div>
            <div class="submission-item"><strong>Company Name:</strong> <p>${
              company || "Not provided"
            }</p></div>
            <div class="submission-item"><strong>Message:</strong> <p>${
              message || "Not provided"
            }</p></div>
        `;
  }
});
