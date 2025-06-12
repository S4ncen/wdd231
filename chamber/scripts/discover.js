document.addEventListener("DOMContentLoaded", () => {
    // --- Logic for Visit Message using localStorage ---
    const visitMessageEl = document.getElementById("visit-message");
    const lastVisitKey = "last-visit-date-discover"; // Unique key for this page
    const now = Date.now(); // Current time in milliseconds

    const lastVisit = localStorage.getItem(lastVisitKey);

    if (!lastVisit) {
      // First visit by the user
        visitMessageEl.textContent =
        "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit, 10);
        const diffTime = now - lastVisitDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
      // Less than one day since last visit
        visitMessageEl.textContent = "Back so soon! Awesome!";
    } else {
        // More than one day
        const dayWord = diffDays === 1 ? "day" : "days"; // Handle singular/plural
        visitMessageEl.textContent = `You last visited ${diffDays} ${dayWord} ago.`;
        }
    }

    // Save the current visit date for next time
    localStorage.setItem(lastVisitKey, now.toString());

    // --- Logic for Loading Tourist Places from JSON ---
    const placesContainer = document.getElementById("places-container");
    // ✅ CORRECTION: This is the correct path to the JSON file
    const placesURL = "./data/places.json";

    async function getPlacesData() {
        try {
        const response = await fetch(placesURL);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayPlaces(data);
    } catch (error) {
        console.error("Error loading places data:", error);
        placesContainer.innerHTML =
        "<p>Sorry, we couldn't load the tourist attractions at this moment.</p>";
        }
    }

    function displayPlaces(places) {
      placesContainer.innerHTML = ""; // Clear the container
        places.forEach((place) => {
        const placeCard = document.createElement("div");
        placeCard.className = "place-card";

        // Use innerHTML to create the internal structure of the card
        // Include loading="lazy" to optimize image loading
        placeCard.innerHTML = `
            <img src="${place.image}" alt="${place.alt}" loading="lazy" width="400" height="220">
            <div class="place-card-content">
                <h3>${place.name}</h3>
                <p>${place.description}</p>
            </div>
            `;

            placesContainer.appendChild(placeCard);
        });
    }

    getPlacesData();
});
