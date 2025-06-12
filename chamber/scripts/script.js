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

// Elementos del pronóstico
const forecastDay1 = document.getElementById("forecast-day-1");
const forecastDay2 = document.getElementById("forecast-day-2");
const forecastDay3 = document.getElementById("forecast-day-3");

const apiKey = "3eb228bdf96b668982db76b9c3e62f4b";
const lat = 20.51817692007139;
const lon = -99.88749177274703;
const units = "imperial";

const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
const oneCallApiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${apiKey}`;

async function fetchCurrentWeatherData() {
  try {
    const response = await fetch(currentWeatherUrl);
    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      const errorText = await response.text();
      console.error(
        `Error fetching current weather data: ${response.status} - ${errorText}`
      );
    }
  } catch (error) {
    console.error("Network or API error fetching current weather:", error);
  }
}

function displayCurrentWeather(data) {
  if (!data || !data.main || !data.weather || data.weather.length === 0) {
    return;
  }
  if (currentTempValue)
    currentTempValue.textContent = Math.round(data.main.temp);
  const desc = data.weather[0].description
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  if (weatherDescDisplay) weatherDescDisplay.textContent = desc;

  if (weatherIconDisplay) {
    const iconCode = data.weather[0].icon;
    weatherIconDisplay.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    );
    weatherIconDisplay.setAttribute("alt", desc);
  }

  if (currentHigh) currentHigh.textContent = Math.round(data.main.temp_max);
  if (currentLow) currentLow.textContent = Math.round(data.main.temp_min);
  if (currentHumidity) currentHumidity.textContent = data.main.humidity;

  if (data.sys) {
    const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "2-digit" }
    );
    const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString(
      "en-US",
      { hour: "numeric", minute: "2-digit" }
    );
    if (currentSunrise) currentSunrise.textContent = sunriseTime;
    if (currentSunset) currentSunset.textContent = sunsetTime;
  }
}

async function fetchWeatherForecastData() {
  try {
    const response = await fetch(oneCallApiUrl);
    if (response.ok) {
      const data = await response.json();
      displayWeatherForecast(data);
    } else {
      const errorText = await response.text();
      console.error(
        `Error fetching weather forecast data: ${response.status} - ${errorText}`
      );
    }
  } catch (error) {
    console.error("Network or API error fetching weather forecast:", error);
  }
}

function displayWeatherForecast(data) {
  if (!data.daily || data.daily.length < 3) {
    return;
  }
  const options = { weekday: "long" };

  // Día 1 (Hoy)
  if (forecastDay1) {
    const day1Date = new Date(data.daily[0].dt * 1000);
    const day1Name = day1Date.toLocaleDateString("en-US", options);
    const day1Temp = Math.round(data.daily[0].temp.max);
    forecastDay1.innerHTML = `${day1Name}: <strong>${day1Temp}°F</strong>`;
  }

  // Día 2 (Mañana)
  if (forecastDay2) {
    const day2Date = new Date(data.daily[1].dt * 1000);
    const day2Name = day2Date.toLocaleDateString("en-US", options);
    const day2Temp = Math.round(data.daily[1].temp.max);
    forecastDay2.innerHTML = `${day2Name}: <strong>${day2Temp}°F</strong>`;
  }

  // Día 3 (Pasado mañana)
  if (forecastDay3) {
    const day3Date = new Date(data.daily[2].dt * 1000);
    const day3Name = day3Date.toLocaleDateString("en-US", options);
    const day3Temp = Math.round(data.daily[2].temp.max);
    forecastDay3.innerHTML = `${day3Name}: <strong>${day3Temp}°F</strong>`;
  }
}

function renderBusinessCards() {
  if (!businessCardsContainer) return;
  businessCardsContainer.innerHTML = "";

  businesses.forEach((business) => {
    const businessItemElement = document.createElement("div");
    businessItemElement.classList.add("business-item");

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

if (gridViewButton && listViewButton) {
  gridViewButton.addEventListener("click", () => {
    if (!businessCardsContainer) return;
    businessCardsContainer.classList.remove("list-view-active");
    gridViewButton.classList.add("active");
    listViewButton.classList.remove("active");
    renderBusinessCards();
  });

  listViewButton.addEventListener("click", () => {
    if (!businessCardsContainer) return;
    businessCardsContainer.classList.add("list-view-active");
    listViewButton.classList.add("active");
    gridViewButton.classList.remove("active");
    renderBusinessCards();
  });
}

if (themeToggleButton) {
  const updateThemeIcon = () => {
    const iconSpan = document.getElementById("theme-icon-animated");
    if (iconSpan) {
      if (document.body.classList.contains("dark-mode")) {
        iconSpan.textContent = "☀️";
      } else {
        iconSpan.textContent = "🌙";
      }
    }
  };

  updateThemeIcon();

  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    updateThemeIcon();
  });
}

function createFallingLeaves() {
  const container = document.querySelector(".falling-leaves-container");
  if (!container) return;

  const leafEmojis = ["🍂", "🍃", "🍂"];
  const leafColors = ["#2ecc71", "#e67e22", "#f1c40f", "#c0392b", "#8e44ad"];

  for (let i = 0; i < 25; i++) {
    const leaf = document.createElement("div");
    leaf.classList.add("leaf");

    leaf.textContent =
      leafEmojis[Math.floor(Math.random() * leafEmojis.length)];
    leaf.style.color =
      leafColors[Math.floor(Math.random() * leafColors.length)];
    leaf.style.fontSize = `${Math.random() * 15 + 10}px`;

    leaf.style.left = `${Math.random() * 100}vw`;

    const duration = Math.random() * 5 + 8;
    leaf.style.animationDuration = `${duration}s`;
    leaf.style.animationDelay = `${Math.random() * 5}s`;

    container.appendChild(leaf);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (gridViewButton) gridViewButton.classList.add("active");
  if (businessCardsContainer) {
    renderBusinessCards();
  }

  const currentYear = new Date().getFullYear();
  const currentYearFooterSpan = document.getElementById("current-year-footer");
  if (currentYearFooterSpan) {
    currentYearFooterSpan.textContent = currentYear;
  }

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

  if (document.querySelector(".hero-image-container")) {
    createFallingLeaves();
  }
});
