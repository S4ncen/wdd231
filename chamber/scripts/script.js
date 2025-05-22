// Array to hold business card data
const businesses = [
    {
    name: "Idaho Websites",
    logo: "#",
    address: "2115 S Vista Avenue\nBoise ID 83705",
    phone: "(208) 342-9388",
    website: "https://idahowebsites.com/",
    },
    {
    name: "Surge Web Design",
    logo: "#",
    address: "4072 E Arch Drive\nMeridian ID 83646",
    phone: "(208) 631-0640",
    website: "https://www.surgewebdesign.com/",
    },
    {
    name: "Graphic Zen",
    logo: "#",
    address: "1788 E Summerplace\nCourt Meridian ID\n83648",
    phone: "(208) 631-4984",
    website: "https://graphiczen.com/",
    },
    {
    name: "Peppershock Media",
    logo: "#",
    address: "1215 3rd Street\nNampa ID 83651",
    phone: "(208) 461-5070",
    website: "https://www.peppershock.com/",
    },
    {
    name: "Flash Tech Services",
    logo: "#",
    address: "Star Idaho 83669",
    phone: "(208) 488-5810",
    website: "https://flashtechservices.com/",
    },
    {
    name: "Metro Express Car\nWash LLC",
    logo: "#",
    address: "1725 E Overland\nRoad Meridian ID\n83642",
    phone: "(208) 888-4073",
    website: "https://www.metroexpresscleanwash.com/",
    },
];

const businessCardGrid = document.getElementById("businessCardGrid");
const gridViewBtn = document.getElementById("gridViewBtn");
const listViewBtn = document.getElementById("listViewBtn");
const modeToggle = document.getElementById("modeToggle");

// Function to display business cards
function displayBusinessCards() {
  businessCardGrid.innerHTML = ""; // Clear existing cards

    businesses.forEach((business) => {
    const card = document.createElement("div");
    card.classList.add("business-card");

    // Check if current view is list view to adjust content
    if (businessCardGrid.classList.contains("list-view-active")) {
        card.innerHTML = `
                <h3>${business.name}</h3>
                <p>${business.address.replace(/\n/g, "<br>")}</p>
                <p>${business.phone}</p>
                <a href="${
                    business.website
                }" target="_blank">${business.website.replace(
        /(^\w+:|^)\/\//,
        ""
        )}</a>
            `;
    } else {
      // Default Grid View content
        card.innerHTML = `
                <img src="${business.logo}" alt="${business.name} Logo">
                <h3>${business.name}</h3>
                <p>${business.address.replace(/\n/g, "<br>")}</p>
                <p>${business.phone}</p>
                <a href="${business.website}" target="_blank">Visit Website</a>
            `;
    }
    businessCardGrid.appendChild(card);
    });
}

// Event Listeners for View Toggles
gridViewBtn.addEventListener("click", () => {
    businessCardGrid.classList.remove("list-view-active");
    gridViewBtn.classList.add("active");
    listViewBtn.classList.remove("active");
  displayBusinessCards(); // Re-render to ensure grid specific content (like logo) is back
});

listViewBtn.addEventListener("click", () => {
    businessCardGrid.classList.add("list-view-active");
    listViewBtn.classList.add("active");
    gridViewBtn.classList.remove("active");
  displayBusinessCards(); // Re-render for list specific content
});

// Dark/Light Mode Toggle
modeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
    modeToggle.textContent = "Toggle Light Mode";
    } else {
    modeToggle.textContent = "Toggle Dark Mode";
    }
});

// Function to show current year and last modification date/time
document.addEventListener("DOMContentLoaded", () => {
  // Set default view to grid and display cards
  gridViewBtn.classList.add("active"); // Set grid button as active by default
    displayBusinessCards();

  // Get current year
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;

  // Get date of last modification of document
    const lastModified = new Date(document.lastModified);
    const formattedLastModified = lastModified.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    });
    document.getElementById("date-and-time").textContent = formattedLastModified;
});
