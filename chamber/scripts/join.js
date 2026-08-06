const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#primary-navigation");
const timestamp = document.querySelector("#timestamp");
const modalButtons = document.querySelectorAll("[data-modal]");
const dialogs = document.querySelectorAll("dialog");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "\u00d7" : "\u2630";
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
document.querySelector("#last-modified").textContent = document.lastModified;
timestamp.value = new Date().toISOString();

modalButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        const dialog = document.querySelector(`#${button.dataset.modal}`);
        dialog.showModal();
    });
});

dialogs.forEach((dialog) => {
    dialog.querySelector(".close-modal").addEventListener("click", () => {
        dialog.close();
    });

    dialog.addEventListener("click", (event) => {
        const dialogDimensions = dialog.getBoundingClientRect();
        const clickedOutside =
            event.clientX < dialogDimensions.left ||
            event.clientX > dialogDimensions.right ||
            event.clientY < dialogDimensions.top ||
            event.clientY > dialogDimensions.bottom;

        if (clickedOutside) {
            dialog.close();
        }
    });
});
