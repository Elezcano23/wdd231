import { $, shell, get } from "./app.js";

shell();
const modal = $("#driver-modal");

try {
    const drivers = await get("data/drivers.json");
    $("#drivers").innerHTML = drivers.map((driver) => `
        <article class="card">
            <img src="images/${driver.image}" alt="${driver.name}" loading="lazy">
            <h2>#${driver.number} ${driver.name}</h2>
            <p><img class="brand-logo" src="images/${driver.brandLogo}" alt="${driver.brand} logo"> ${driver.team}<br>${driver.brand} · ${driver.points} pts<br>Position: ${driver.position}</p>
            <button data-id="${driver.number}">View profile</button>
        </article>`).join("");

    $("#drivers").addEventListener("click", (event) => {
        const driver = drivers.find((item) => item.number === Number(event.target.dataset.id));
        if (!driver) return;
        $("#modal-content").innerHTML = `<h2>${driver.name}</h2><p><strong>Team:</strong> ${driver.team}<br><strong>Car:</strong> ${driver.brand}<br><strong>Number:</strong> ${driver.number}<br><strong>Standing:</strong> ${driver.position} · ${driver.points} points</p>`;
        modal.showModal();
        localStorage.setItem("favoriteDriver", driver.name);
    });
} catch (error) {
    $("#drivers").textContent = "Driver data unavailable.";
}

$("#close-modal").onclick = () => modal.close();
