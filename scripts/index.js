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

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

function displayCourses(courseSelection) {
    courseList.innerHTML = "";

    courseSelection.forEach((course) => {
        const courseCard = document.createElement("article");
        courseCard.classList.add("course-card");
        if (course.completed) {
            courseCard.classList.add("completed");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p>${course.title}</p>
            <span>${course.credits} credits${course.completed ? " - Completed" : ""}</span>
        `;

        courseList.appendChild(courseCard);
    });

    const credits = courseSelection.reduce((total, course) => total + course.credits, 0);
    totalCredits.textContent = `The total number of credits for the courses shown is ${credits}.`;
}

function setActiveFilter(selectedButton) {
    filterButtons.forEach((button) => button.classList.remove("active"));
    selectedButton.classList.add("active");
}

menuButton.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    menuButton.textContent = isOpen ? "\u00d7" : "\u2630";
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
