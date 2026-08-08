import { select, shell, get } from "./app.js";
import { WEATHER_API_KEY, PARANA_COORDINATES } from "./weather-config.js";

shell();

const race = new Date("2026-08-22T09:00:00-03:00");
const units = [86400000, 3600000, 60000, 1000];

setInterval(() => {
    let remaining = Math.max(0, race - Date.now());
    select("#countdown").innerHTML = units.map((unit) => {
        const value = Math.floor(remaining / unit);
        remaining %= unit;
        return `<div>${String(value).padStart(2, "0")}</div>`;
    }).join("");
}, 1000);

try {
    const weather = await get(`https://api.openweathermap.org/data/2.5/weather?lat=${PARANA_COORDINATES.latitude}&lon=${PARANA_COORDINATES.longitude}&units=metric&appid=${WEATHER_API_KEY}`);
    select("#weather").innerHTML = `<span class="weather-icon">☀</span><div><strong>Parana race weekend</strong><p>${Math.round(weather.main.temp)}°C · ${weather.weather[0].description}</p></div>`;
} catch (error) {
    select("#weather").textContent = "Weather data is temporarily unavailable.";
}

try {
    const news = await get("data/news.json");
    select("#news").innerHTML = news.slice(0, 3).map((item) => `<article class="card"><h3>${item.title}</h3><p>${item.date}</p><a href="${item.url}" target="_blank">Read at ACTC</a></article>`).join("");
} catch (error) {
    select("#news").textContent = "News unavailable.";
}

try {
    const drivers = await get("data/drivers.json");
    select("#featured-drivers").innerHTML = drivers.slice(0, 3).map((driver) => `<article class="card driver-mini"><img src="images/${driver.image}" alt="${driver.name}" loading="lazy"><div><img class="brand-logo" src="images/${driver.brandLogo}" alt="${driver.brand} logo"><h3>#${driver.number} ${driver.name}</h3><p>${driver.position}º · ${driver.points} pts</p></div></article>`).join("");
} catch (error) {
    select("#featured-drivers").textContent = "Driver data unavailable.";
}
