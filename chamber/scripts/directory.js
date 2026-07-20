const directory = document.querySelector("#member-directory");
const gridButton = document.querySelector("#grid-button");
const listButton = document.querySelector("#list-button");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");

const membershipNames = { 1: "Member", 2: "Silver member", 3: "Gold member" };

async function loadMembers() {
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) throw new Error(`Unable to load members: ${response.status}`);
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        directory.innerHTML = "<p>We could not load the member directory. Please try again later.</p>";
        console.error(error);
    }
}

function displayMembers(members) {
    directory.innerHTML = "";
    members.forEach((member) => {
        const card = document.createElement("article");
        card.className = "member-card";
        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name} logo" width="120" height="120" loading="lazy">
            <h2>${member.name}</h2>
            <p><span class="level">${membershipNames[member.membership]}</span><span>${member.address}</span><a href="tel:${member.phone.replace(/[^+\d]/g, "")}">${member.phone}</a><a href="${member.website}" target="_blank" rel="noopener">Visit website</a></p>`;
        directory.appendChild(card);
    });
}

function setView(view) {
    const isGrid = view === "grid";
    directory.className = view;
    gridButton.classList.toggle("active", isGrid);
    listButton.classList.toggle("active", !isGrid);
    gridButton.setAttribute("aria-pressed", isGrid);
    listButton.setAttribute("aria-pressed", !isGrid);
}

gridButton.addEventListener("click", () => setView("grid"));
listButton.addEventListener("click", () => setView("list"));
menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "×" : "☰";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
loadMembers();
