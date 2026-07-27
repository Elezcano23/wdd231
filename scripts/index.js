const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course will introduce students to programming. It will introduce the building blocks of programming languages and show how to use them to write simple programs.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to the World Wide Web and to careers in web site design and development.",
        technology: ["HTML", "CSS"],
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to programming with functions.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces the notion of classes and objects.",
        technology: ["C#"],
        completed: false
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course builds on prior experience in web fundamentals and programming.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course focuses on planning, designing, and developing responsive web pages.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menuButton");
const primaryNav = document.querySelector("#primaryNav");
const courseList = document.querySelector("#courseList");
const totalCredits = document.querySelector("#totalCredits");
const filterButtons = document.querySelectorAll(".course-filters button");
const courseDetails = document.querySelector("#course-details");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

function displayCourses(courseSelection) {
    courseList.innerHTML = "";

    courseSelection.forEach((course) => {
        const courseCard = document.createElement("article");
        courseCard.classList.add("course-card");
        courseCard.setAttribute("tabindex", "0");
        courseCard.setAttribute("role", "button");
        courseCard.setAttribute("aria-label", `View details for ${course.subject} ${course.number}`);
        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <span>${course.credits} credits${course.completed ? " - Completed" : ""}</span>
        `;

        courseCard.addEventListener("click", () => displayCourseDetails(course));
        courseCard.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                displayCourseDetails(course);
            }
        });

        courseList.appendChild(courseCard);
    });

    const credits = courseSelection.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = `The total number of credits for the courses shown is ${credits}.`;
}

function setActiveFilter(selectedButton) {
    filterButtons.forEach((button) => button.classList.remove("active"));
    selectedButton.classList.add("active");
}

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
        <button id="closeModal" type="button" aria-label="Close course details">\u00d7</button>
        <h2>${course.subject} ${course.number}</h2>
        <h3>${course.title}</h3>
        <p><strong>Credits</strong>: ${course.credits}</p>
        <p><strong>Certificate</strong>: ${course.certificate}</p>
        <p>${course.description}</p>
        <p><strong>Technologies</strong>: ${course.technology.join(", ")}</p>
    `;

    courseDetails.showModal();

    document.querySelector("#closeModal").addEventListener("click", () => {
        courseDetails.close();
    });
}

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "\u00d7" : "\u2630";
});

courseDetails.addEventListener("click", (event) => {
    const dialogDimensions = courseDetails.getBoundingClientRect();
    const clickedOutside =
        event.clientX < dialogDimensions.left ||
        event.clientX > dialogDimensions.right ||
        event.clientY < dialogDimensions.top ||
        event.clientY > dialogDimensions.bottom;

    if (clickedOutside) {
        courseDetails.close();
    }
});

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const subject = button.id.toUpperCase();
        const filteredCourses = subject === "ALL"
            ? courses
            : courses.filter((course) => course.subject === subject);

        setActiveFilter(button);
        displayCourses(filteredCourses);
    });
});

displayCourses(courses);
