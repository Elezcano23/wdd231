export const select = (selector) => document.querySelector(selector);

export function shell() {
    const button = select("#menu");
    const navigation = select("#nav");
    button?.addEventListener("click", () => navigation.classList.toggle("open"));
    const year = select("#year");
    if (year) year.textContent = new Date().getFullYear();
}

export async function get(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.status);
    return response.json();
}
