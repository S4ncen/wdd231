document.addEventListener("DOMContentLoaded", function () {
  // Set the timestamp for the hidden input field on form load
    const timestampField = document.getElementById("timestamp");
    if (timestampField) {
    timestampField.value = new Date().toISOString();
    }

  // Dynamic content for "Learn More" buttons.
    const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
    learnMoreButtons.forEach((button) => {
    button.addEventListener("click", () => {
        alert("More details about this membership level coming soon!");
    });
    });

});
