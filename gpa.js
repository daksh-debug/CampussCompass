// ==============================
// CAMPUS COMPASS GPA CALCULATOR
// ==============================

// Get HTML elements
const gpaCourses = document.getElementById("gpaCourses");
const addCourseBtn = document.getElementById("addCourseBtn");
const calculateBtn = document.getElementById("calculateBtn");
const gpaResult = document.getElementById("gpaResult");

// Load saved courses
let courses = JSON.parse(localStorage.getItem("courses")) || [];

// Grade Points
const gradePoints = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "F": 0
};

// ==============================
// Save Courses
// ==============================

function saveCourses() {

    localStorage.setItem(
        "courses",
        JSON.stringify(courses)
    );

}

// ==============================
// Calculate GPA
// ==============================

function calculateGPA() {

    let totalCredits = 0;
    let totalPoints = 0;

    courses.forEach(course => {

        const point = gradePoints[course.grade] || 0;

        totalCredits += course.credits;

        totalPoints += point * course.credits;

    });

    let gpa = 0;

    if (totalCredits > 0) {

        gpa = totalPoints / totalCredits;

    }

    gpaResult.textContent = gpa.toFixed(2);

}

// ==============================
// Display Courses
// ==============================

function displayCourses() {

    gpaCourses.innerHTML = "";

    courses.forEach((course, index) => {

        gpaCourses.innerHTML += `

        <section class="dashboard-card">

            <h2>${course.name}</h2>

            <p><strong>Credits:</strong> ${course.credits}</p>

            <p><strong>Grade:</strong> ${course.grade}</p>

            <button onclick="deleteCourse(${index})">
                🗑 Delete
            </button>

        </section>

        `;

    });

    calculateGPA();

}

// ==============================
// Add Course
// ==============================

if (addCourseBtn) {

    addCourseBtn.addEventListener("click", function () {

        const name = prompt("Course Name");

        if (!name) return;

        const credits = Number(prompt("Credits"));

        if (!credits || credits <= 0) {

            alert("Please enter valid credits.");

            return;

        }

        let grade = prompt(
            "Grade (O, A+, A, B+, B, C, F)"
        );

        if (!grade) return;

        grade = grade.toUpperCase();

        if (!(grade in gradePoints)) {

            alert("Invalid Grade!");

            return;

        }

        courses.push({

            name: name,
            credits: credits,
            grade: grade

        });

        saveCourses();

        displayCourses();

    });

}

// ==============================
// Delete Course
// ==============================

function deleteCourse(index) {

    const confirmDelete = confirm(
        "Delete this course?"
    );

    if (!confirmDelete) return;

    courses.splice(index, 1);

    saveCourses();

    displayCourses();

}

// ==============================
// Calculate Button
// ==============================

if (calculateBtn) {

    calculateBtn.addEventListener(
        "click",
        calculateGPA
    );

}

// ==============================
// Start App
// ==============================

displayCourses();