const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector("#weather-description");
const forecast = document.querySelector("#forecast");
const spotlights = document.querySelector("#spotlights");

const membershipNames = { 1: "Member", 2: "Silver member", 3: "Gold member" };
const weatherKey = "ccf1776dcd376664ba3718a77fbae861";
const latitude = -39.29;
const longitude = -65.66;
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherKey}`;

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "\u00d7" : "\u2630";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

async function loadWeather() {
    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentWeatherUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok) throw new Error(`Unable to load current weather: ${currentResponse.status}`);
        if (!forecastResponse.ok) throw new Error(`Unable to load forecast: ${forecastResponse.status}`);

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        displayCurrentWeather(currentData);
        displayForecast(forecastData.list);
    } catch (error) {
        currentTemp.textContent = "Weather unavailable";
        weatherDescription.textContent = "Please try again later.";
        forecast.innerHTML = "<p>Forecast unavailable.</p>";
        console.error(error);
    }
}

function displayCurrentWeather(data) {
    const description = data.weather[0].description;
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;C`;
    weatherIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.weather[0].icon}.png`);
    weatherIcon.setAttribute("alt", description);
    weatherDescription.textContent = titleCase(description);
}

function displayForecast(entries) {
    const dailyForecasts = entries
        .filter((entry) => entry.dt_txt.includes("12:00:00"))
        .slice(0, 3);

    forecast.innerHTML = "";
    dailyForecasts.forEach((entry) => {
        const card = document.createElement("p");
        const day = new Date(entry.dt_txt).toLocaleDateString("en-US", { weekday: "short" });
        card.innerHTML = `<strong>${day}</strong>: ${Math.round(entry.main.temp)}&deg;C`;
        forecast.appendChild(card);
    });
}

async function loadSpotlights() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`Unable to load members: ${response.status}`);

        const members = await response.json();
        const premiumMembers = members.filter((member) => member.membership === 2 || member.membership === 3);
        const randomSpotlights = shuffle(premiumMembers).slice(0, 3);
        displaySpotlights(randomSpotlights);
    } catch (error) {
        spotlights.innerHTML = "<p>Member spotlights are unavailable. Please try again later.</p>";
        console.error(error);
    }
}

function displaySpotlights(members) {
    spotlights.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "spotlight-card";
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="96" height="96" loading="lazy">
            <h3>${member.name}</h3>
            <p class="level">${membershipNames[member.membership]}</p>
            <p>${member.address}</p>
            <p><a href="tel:${member.phone.replace(/[^+\d]/g, "")}">${member.phone}</a></p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit website</a></p>
        `;
        spotlights.appendChild(card);
    });
}

function shuffle(items) {
    return [...items].sort(() => Math.random() - 0.5);
}

function titleCase(value) {
    return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

loadWeather();
loadSpotlights();
