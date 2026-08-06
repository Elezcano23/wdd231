const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const summary = document.querySelector("#application-summary");

const params = new URLSearchParams(window.location.search);
const requiredFields = [
    ["First Name", "firstName"],
    ["Last Name", "lastName"],
    ["Email Address", "email"],
    ["Mobile Phone Number", "phone"],
    ["Business or Organization Name", "organization"],
    ["Submitted On", "timestamp"]
];

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "\u00d7" : "\u2630";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;

requiredFields.forEach(([label, key]) => {
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    let value = params.get(key) || "Not provided";

    if (key === "timestamp" && params.get(key)) {
        value = new Date(params.get(key)).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    }

    term.textContent = label;
    detail.textContent = value;
    summary.appendChild(term);
    summary.appendChild(detail);
});
