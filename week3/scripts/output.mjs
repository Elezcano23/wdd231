export function setTitle(course) {
    document.querySelector("#courseName").textContent = course.name;
    document.querySelector("#courseCode").textContent = course.code;
}

export function renderSections(sections) {
    const sectionOutput = document.querySelector("#sections");
    sectionOutput.innerHTML = "";

    sections.forEach((section) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${section.sectionNum}</td>
            <td>${section.roomNum}</td>
            <td>${section.enrolled}</td>
            <td>${section.days}</td>
            <td>${section.instructor}</td>
        `;

        sectionOutput.appendChild(row);
    });
}
