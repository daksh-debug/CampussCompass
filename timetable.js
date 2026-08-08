

// ---------------- TIMETABLE ----------------

const timetableContainer = document.getElementById("timetableContainer");

let timetable = JSON.parse(localStorage.getItem("timetable")) || [

    {
        day: "Monday",
        classes: []
    },

    {
        day: "Tuesday",
        classes: []
    },

    {
        day: "Wednesday",
        classes: []
    },

    {
        day: "Thursday",
        classes: []
    },

    {
        day: "Friday",
        classes: []
    }

];

function saveTimetable(){

    localStorage.setItem(
        "timetable",
        JSON.stringify(timetable)
    );

}


function displayTimetable(){

    timetableContainer.innerHTML = "";

    timetable.forEach(day=>{

        let html = `

        <section class="day-card">

            <h2>${day.day}</h2>

        `;

        day.classes.forEach(cls=>{

            html += `

            <div class="class-card">

                <h3>${cls.subject}</h3>

                <p>🕒 ${cls.time}</p>

                <p>📍 ${cls.room}</p>

                <button onclick="editClass('${day.day}', ${day.classes.indexOf(cls)})">
                    ✏️ Edit
                </button>

                <button onclick="deleteClass('${day.day}', ${day.classes.indexOf(cls)})">
                    🗑 Delete
                </button>

            </div>

            `;

        });

        html += "</section>";

        timetableContainer.innerHTML += html;

    });

}

if(timetableContainer){

    displayTimetable();

}


const addClassBtn = document.getElementById("addClassBtn");

if(addClassBtn){

    addClassBtn.addEventListener("click", addClass);

}

function addClass(){

const day = prompt(
`Select Day

1 - Monday
2 - Tuesday
3 - Wednesday
4 - Thursday
5 - Friday`
);

if(!day) return;

const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];

const selectedDayName = days[Number(day) - 1];

if(!selectedDayName){

    alert("Please enter a number from 1 to 5.");

    return;

}

    const subject = prompt("Enter Subject");

    if(!subject) return;

    const time = prompt("Enter Time (Example: 9:00 AM)");

    if(!time) return;

    const room = prompt("Enter Room Number");

    if(!room) return;

    const selectedDay = timetable.find(d =>

    d.day === selectedDayName

);
    if(!selectedDay){

        alert("Day not found!");

        return;

    }

    selectedDay.classes.push({

        subject: subject,

        time: time,

        room: room

    });

    saveTimetable();

    displayTimetable();

}

function editClass(dayName, classIndex){

    const day = timetable.find(d => d.day === dayName);

    const cls = day.classes[classIndex];

    const subject = prompt(
        "Subject",
        cls.subject
    );

    if(!subject) return;

    const time = prompt(
        "Time",
        cls.time
    );

    if(!time) return;

    const room = prompt(
        "Room",
        cls.room
    );

    if(!room) return;

    cls.subject = subject;

    cls.time = time;

    cls.room = room;

    saveTimetable();

    displayTimetable();

}

function deleteClass(dayName, classIndex){

    if(!confirm("Delete this class?")){

        return;

    }

    const day = timetable.find(d => d.day === dayName);

    day.classes.splice(classIndex,1);

    
    saveTimetable();
    displayTimetable();

}