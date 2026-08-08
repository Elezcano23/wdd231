import { attractions } from "../data/discover.mjs";

const cards = document.querySelector("#discover-cards");
const visitMessage = document.querySelector("#visit-message");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

function displayAttractions(items) {
    items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "discover-card";

        const title = document.createElement("h2");
        title.textContent = item.name;

        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = `images/${item.image}`;
        image.alt = item.alt;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";
        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = item.address;

        const description = document.createElement("p");
        description.textContent = item.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn more";
        button.setAttribute("aria-label", `Learn more about ${item.name}`);

        card.append(title, figure, address, description, button);
        cards.appendChild(card);
    });
}

function showVisitMessage() {
    const lastVisit = Number(localStorage.getItem("discoverLastVisit"));
    const currentVisit = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const daysBetweenVisits = Math.floor((currentVisit - lastVisit) / 86400000);
        if (daysBetweenVisits < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            const dayLabel = daysBetweenVisits === 1 ? "day" : "days";
            visitMessage.textContent = `You last visited ${daysBetweenVisits} ${dayLabel} ago.`;
        }
    }

    localStorage.setItem("discoverLastVisit", currentVisit);
}

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
displayAttractions(attractions);
showVisitMessage();
