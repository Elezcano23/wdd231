const url = "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";
const cards = document.querySelector("#cards");

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement("section");
        const fullName = document.createElement("h2");
        const details = document.createElement("p");
        const portrait = document.createElement("img");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        details.innerHTML = `Date of birth: ${prophet.birthdate}<br>Place of birth: ${prophet.birthplace}`;

        portrait.setAttribute("src", prophet.imageurl);
        portrait.setAttribute("alt", `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "340");
        portrait.setAttribute("height", "440");

        card.appendChild(fullName);
        card.appendChild(details);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
};

async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Unable to load prophet data: ${response.status}`);
        }

        const data = await response.json();
        displayProphets(data.prophets);
    } catch (error) {
        cards.innerHTML = "<p>Unable to load the prophet data. Please try again later.</p>";
        console.error(error);
    }
}

getProphetData();
