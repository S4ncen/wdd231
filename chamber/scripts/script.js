// Array to hold business card data
const businesses = [
  {
    name: "Idaho Websites",
    logo: "https://idahowebsites.com/wp-content/uploads/2023/01/IDWeb.png",
    address: "2115 S Vista Avenue\nBoise ID 83705",
    phone: "(208) 342-9388",
    website: "https://idahowebsites.com/",
  },
  {
    name: "Surge Web Design",
    logo: "https://res2.yourwebsite.life/res/64f0432be8a018001782f724/651b4a3a29bc310016db6043_optimized_217.webp",
    address: "4072 E Arch Drive\nMeridian ID 83646",
    phone: "(208) 631-0640",
    website: "https://www.surgewebdesign.com/",
  },
  {
    name: "Graphic Zen",
    logo: "https://graphiczen.com/wp-content/uploads/2020/08/graphiczen-logo-white-600x160-1.svg",
    address: "1788 E Summerplace\nCourt Meridian ID\n83648",
    phone: "(208) 631-4984",
    website: "https://graphiczen.com/",
  },
  {
    name: "Peppershock Media",
    logo: "https://peppershock.com/wp-content/uploads/2023/05/PPSK-Logo-2017-HorizontalWhite-1-1.png",
    address: "1215 3rd Street\nNampa ID 83651",
    phone: "(208) 461-5070",
    website: "https://www.peppershock.com/",
  },
  {
    name: "Flash Tech Services",
    logo: "images/placeholder.png",
    address: "Star Idaho 83669",
    phone: "(208) 488-5810",
    website: "https://flashtechservices.com/",
  },
  {
    name: "Metro Express Car\nWash LLC",
    logo: "images/placeholder.png",
    address: "1725 E Overland\nRoad Meridian ID\n83642",
    phone: "(208) 888-4073",
    website: "https://www.metroexpresscleanwash.com/",
  },
];

const businessCardsContainer = document.getElementById(
  "business-cards-container"
);
const gridViewButton = document.getElementById("grid-view-btn");
const listViewButton = document.getElementById("list-view-btn");
const themeToggleButton = document.getElementById("theme-toggle-btn");

// Weather API Elements
const currentTempValue = document.getElementById("current-temp-value");
const weatherIconDisplay = document.getElementById("weather-icon-display");
const weatherDescDisplay = document.getElementById("weather-desc-display");
const currentHigh = document.getElementById("current-high");
const currentLow = document.getElementById("current-low");
const currentHumidity = document.getElementById("current-humidity");
const currentSunrise = document.getElementById("current-sunrise");
const currentSunset = document.getElementById("current-sunset");

const forecastTodayTemp = document.getElementById("forecast-today-temp");
const forecastWednesdayTemp = document.getElementById(
  "forecast-wednesday-temp"
);
const forecastThursdayTemp = document.getElementById("forecast-thursday-temp");

// OpenWeatherMap API Key and Coordinates
const apiKey = "3eb228bdf96b668982db76b9c3e62f4b";
const lat = 20.51817692007139;
const lon = -99.88749177274703;
const units = "imperial";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
// Using version 3.0 of onecall API. Exclude minutely, hourly, alerts for daily forecast.
const oneCallApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`;

// Function to fetch current weather data
async function fetchCurrentWeatherData() {
  try {
    const response = await fetch(currentWeatherUrl);
    if (response.ok) {
      const data = await response.json();
      console.log("Current Weather Data:", data); // Debug log
      displayCurrentWeather(data);
    } else {
      const errorText = await response.text();
      console.error(
        `Error fetching current weather data: ${response.status} - ${errorText}`
      ); // Debug log
      throw new Error(
        `Failed to fetch current weather: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Network or API error fetching current weather:", error); // Debug log
    currentTempValue.textContent = "N/A";
    weatherDescDisplay.textContent = "Failed to load weather";
    currentHigh.textContent = "N/A";
    currentLow.textContent = "N/A";
    currentHumidity.textContent = "N/A";
    currentSunrise.textContent = "N/A";
    currentSunset.textContent = "N/A";
  }
}

// Function to display current weather results
function displayCurrentWeather(data) {
  if (
    !data ||
    !data.main ||
    !data.weather ||
    data.weather.length === 0 ||
    !data.sys
  ) {
    console.warn("Invalid current weather data structure:", data);
    return;
  }

  currentTempValue.textContent = Math.round(data.main.temp);
  // Capitalize each word in description
  const desc = data.weather[0].description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  weatherDescDisplay.textContent = desc;
  weatherIconDisplay.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );
  weatherIconDisplay.setAttribute("alt", desc);

  currentHigh.textContent = Math.round(data.main.temp_max);
  currentLow.textContent = Math.round(data.main.temp_min);
  currentHumidity.textContent = data.main.humidity;

  // Convert Unix timestamps to human-readable time (e.g., 7:30 AM)
  const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
    "en-US",
    { hour: "numeric", minute: "2-digit" }
  );
  const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString(
    "en-US",
    { hour: "numeric", minute: "2-digit" }
  );
  currentSunrise.textContent = sunriseTime;
  currentSunset.textContent = sunsetTime;
}

// Function to fetch weather forecast data (using One Call API for daily forecast)
async function fetchWeatherForecastData() {
  try {
    const response = await fetch(oneCallApiUrl);
    if (response.ok) {
      const data = await response.json();
      console.log("Forecast Data received:", data); // Debug log: log entire data object
      displayWeatherForecast(data);
    } else {
      const errorText = await response.text();
      console.error(
        `Error fetching weather forecast data: ${response.status} - ${errorText}`
      ); // Debug log
      throw new Error(
        `Failed to fetch forecast: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Network or API error fetching weather forecast:", error); // Debug log
    forecastTodayTemp.textContent = "--°F";
    forecastWednesdayTemp.textContent = "--°F";
    forecastThursdayTemp.textContent = "--°F";
  }
}

// Function to display weather forecast results
function displayWeatherForecast(data) {
  const dailyForecast = data.daily; // Array of daily forecasts

  console.log("Daily Forecast array:", dailyForecast); // Debug log: log the daily array

  if (!dailyForecast || dailyForecast.length === 0) {
    console.warn(
      "No daily forecast data available or array is empty. Cannot display forecast."
    );
    forecastTodayTemp.textContent = "--°F";
    forecastWednesdayTemp.textContent = "--°F";
    forecastThursdayTemp.textContent = "--°F";
    return;
  }

  // "Today" will be dailyForecast[0]
  if (
    dailyForecast[0] &&
    dailyForecast[0].temp &&
    dailyForecast[0].temp.max !== undefined
  ) {
    forecastTodayTemp.textContent = `${Math.round(
      dailyForecast[0].temp.max
    )}°F`;
    console.log(`Today's forecast set: ${forecastTodayTemp.textContent}`); // Debug log
  } else {
    forecastTodayTemp.textContent = "--°F";
    console.warn("Could not find today's max temperature in dailyForecast[0].");
  }

  // Map day numbers (0-6) to day names for robust checking
  // 0: Sunday, 1: Monday, 2: Tuesday, 3: Wednesday, 4: Thursday, 5: Friday, 6: Saturday

  let wednesdayFound = false;
  let thursdayFound = false;

  // Start from index 1 as dailyForecast[0] is 'Today'
  // Iterate up to 3 more days (or as many as available beyond today) to find Wed and Thu
  for (let i = 1; i < dailyForecast.length && i < 4; i++) {
    const forecastDay = dailyForecast[i];
    if (
      !forecastDay ||
      !forecastDay.dt ||
      !forecastDay.temp ||
      forecastDay.temp.max === undefined
    ) {
      console.warn(
        `Skipping invalid forecast entry at index ${i}:`,
        forecastDay
      );
      continue;
    }

    const forecastDate = new Date(forecastDay.dt * 1000);
    const dayNumber = forecastDate.getDay();

    console.log(
      `Checking forecast for index ${i}: Date: ${forecastDate.toDateString()}, Day Num: ${dayNumber}, Max Temp: ${
        forecastDay.temp.max
      }`
    ); // Debugging each forecast day

    // Check for Wednesday (day 3)
    if (dayNumber === 3 && !wednesdayFound) {
      forecastWednesdayTemp.textContent = `${Math.round(
        forecastDay.temp.max
      )}°F`;
      wednesdayFound = true;
      console.log(`Found Wednesday: ${forecastWednesdayTemp.textContent}`);
    }
    // Check for Thursday (day 4) I dont know why it doent work yet
    else if (dayNumber === 4 && !thursdayFound) {
      forecastThursdayTemp.textContent = `${Math.round(
        forecastDay.temp.max
      )}°F`;
      thursdayFound = true;
      console.log(`Found Thursday: ${forecastThursdayTemp.textContent}`);
    }

    // Stop if both target days are found
    if (wednesdayFound && thursdayFound) {
      break;
    }
  }

  // If a day was not found in the available forecast, ensure its textContent is "--°F"
  if (!wednesdayFound) {
    forecastWednesdayTemp.textContent = "--°F";
  }
  if (!thursdayFound) {
    forecastThursdayTemp.textContent = "--°F";
  }
}

// Function to display business cards
function renderBusinessCards() {
  businessCardsContainer.innerHTML = ""; // Clear existing cards

  businesses.forEach((business) => {
    const businessItemElement = document.createElement("div");
    businessItemElement.classList.add("business-item");

    // Check if current view is list view to adjust content
    if (businessCardsContainer.classList.contains("list-view-active")) {
      businessItemElement.innerHTML = `
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
      businessItemElement.innerHTML = `
              <img src="${business.logo}" alt="${business.name} Logo">
              <h3>${business.name}</h3>
              <p>${business.address.replace(/\n/g, "<br>")}</p>
              <p>${business.phone}</p>
              <a href="${business.website}" target="_blank">Visit Website</a>
          `;
    }
    businessCardsContainer.appendChild(businessItemElement);
  });
}

// Event Listeners for View Toggles
gridViewButton.addEventListener("click", () => {
  businessCardsContainer.classList.remove("list-view-active");
  gridViewButton.classList.add("active");
  listViewButton.classList.remove("active");
  renderBusinessCards();
});

listViewButton.addEventListener("click", () => {
  businessCardsContainer.classList.add("list-view-active");
  listViewButton.classList.add("active");
  gridViewButton.classList.remove("active");
  renderBusinessCards();
});

// Dark/Light Mode Toggle
themeToggleButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeToggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun for light mode toggle
  } else {
    themeToggleButton.innerHTML = '<i class="fas fa-adjust"></i>'; // Change icon to adjust for dark mode toggle
  }
});

// Function to show current year and last modification date/time
document.addEventListener("DOMContentLoaded", () => {
  // Set default view to grid and display cards (for directory page)
  // Add null checks as these elements might only exist on directory.html
  if (gridViewButton) gridViewButton.classList.add("active");
  // Ensure renderBusinessCards is called only if businessCardsContainer exists
  if (businessCardsContainer) {
    renderBusinessCards();
  }

  // Get current year for footer
  const currentYear = new Date().getFullYear();
  const currentYearFooterSpan = document.getElementById("current-year-footer"); // Target the new ID
  if (currentYearFooterSpan) {
    currentYearFooterSpan.textContent = currentYear;
  }

  // Get date of last modification of document for footer
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
  const lastModifiedDateFooterSpan = document.getElementById(
    "last-modified-date-footer"
  );
  if (lastModifiedDateFooterSpan) {
    lastModifiedDateFooterSpan.textContent = formattedLastModified;
  }


  if (document.querySelector(".weather-card")) {

    fetchCurrentWeatherData();
    fetchWeatherForecastData();
  }
});
