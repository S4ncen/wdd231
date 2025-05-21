// select HTML elements
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

//API key
const apiKey = "3eb228bdf96b668982db76b9c3e62f4b";

// URL for Germany location
const url = `https://api.openweathermap.org/data/2.5/weather?lat=49.750269170211844&lon=6.643465181175822&units=metric&appid=${apiKey}`;

async function apiFetch() {
    try {
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
      console.log(data); // For testing
        displayResults(data);
    } else {
        throw Error(await response.text());
    }
    } catch (error) {
    console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    const iconCode = data.weather[0].icon;
    const iconsrc = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    const desc = data.weather[0].description;

    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    captionDesc.textContent = desc;
}

apiFetch();
