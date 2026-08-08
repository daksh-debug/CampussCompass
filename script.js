const dashboardAssignments =
document.getElementById("dashboardAssignments");

if(dashboardAssignments){

    const assignments = JSON.parse(
        localStorage.getItem("assignments")
    ) || [];

    const pending = assignments.filter(a => !a.completed);


    if(pending.length === 0){

        dashboardAssignments.innerHTML = `
            <div>
                <h3>🎉 No assignments yet</h3>
                <p>Add your first assignment to get started.</p>
            </div>
        `;

    }
    else{

        dashboardAssignments.innerHTML = "";

        pending.slice(0,3).forEach(a=>{

            dashboardAssignments.innerHTML += `

            <p>📌 ${a.title}</p>
            <small>${a.subject}</small><br><br>

            `;

        });

    }

}

const overallPercentage =
document.getElementById("overallPercentage");

const overallProgress =
document.getElementById("overallProgress");

if(overallPercentage){

    const subjects = JSON.parse(
        localStorage.getItem("subjects")
    ) || [];

    let attended = 0;

    let total = 0;

    subjects.forEach(subject=>{

        attended += subject.attended;

        total += subject.total;

    });

    let percentage = total === 0

        ? 0

        : ((attended/total)*100).toFixed(1);

    overallPercentage.textContent =
        percentage + "%";

    overallProgress.style.width =
        percentage + "%";

}

const todaySummary =
document.getElementById("todaySummary");

if(todaySummary){

    const subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];

    const assignments =
    JSON.parse(
        localStorage.getItem("assignments")
    ) || [];

    let lowest = null;

    let lowestPercentage = 101;

    subjects.forEach(subject=>{

        const percentage =
        subject.total === 0

        ? 100

        : (subject.attended/subject.total)*100;

        if(percentage < lowestPercentage){

            lowestPercentage = percentage;

            lowest = subject;

        }

    });

    const pending =
    assignments.filter(a=>!a.completed);

    let message = "";

    if (pending.length === 0) {

        message = "🎉 You're all caught up!";

    }
    else if (pending.length === 1) {

        message = "📌 You have 1 pending assignment.";

    }
    else {

        message = `📌 You have ${pending.length} pending assignments.`;

    }

    todaySummary.innerHTML = `

    <h3>Today's Summary</h3>

    <p>${message}</p>

    <hr>

    <p>🎯 <strong>Focus Subject:</strong> ${lowest ? lowest.name : "None"}</p>

    <p>📊 <strong>Current Attendance:</strong> ${lowest ? lowestPercentage.toFixed(1) : 0}%</p>

    `;
}

const analytics =
document.getElementById("analytics");

if(analytics){

    const subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];

    const assignments =
    JSON.parse(
        localStorage.getItem("assignments")
    ) || [];

    const courses =
    JSON.parse(
        localStorage.getItem("courses")
    ) || [];

    const pending =
    assignments.filter(a=>!a.completed);

    let totalPresent = 0;
    let totalClasses = 0;

    subjects.forEach(subject=>{

         totalPresent += subject.attended;
         totalClasses += subject.total;

    });

const attendance =
totalClasses === 0

? 0

: ((totalPresent/totalClasses)*100).toFixed(1);


const subjectCount =
document.getElementById("subjectCount");

const pendingAssignments =
document.getElementById("pendingAssignments");

const dashboardAttendance =
document.getElementById("dashboardAttendance");

if(subjectCount){

    subjectCount.textContent =
    subjects.length;

    pendingAssignments.textContent =
    pending.length;

    dashboardAttendance.textContent =
    attendance + "%";

}

    analytics.innerHTML=`

    <div class="analytics-grid">

        <div class="analytics-box">

            <h1>${subjects.length}</h1>

            <p>Subjects</p>

        </div>

        <div class="analytics-box">

            <h1>${pending.length}</h1>

            <p>Pending</p>

        </div>

        <div class="analytics-box">

            <h1>${courses.length}</h1>

            <p>Courses</p>

        </div>

    </div>

    `;

}

const searchInput = document.getElementById("globalSearch");
const searchResults = document.getElementById("searchResults");

if (searchInput) {

    searchInput.addEventListener("keydown", function (e) {

        if (e.key !== "Enter") return;

        const query = searchInput.value.trim().toLowerCase();

        const subjects = JSON.parse(
            localStorage.getItem("subjects")
        ) || [];

        const subject = subjects.find(s =>
            s.name.toLowerCase() === query
        );

        if (!subject) {

            searchResults.innerHTML = `
                <div class="dashboard-card">
                    <h3>❌ Subject Not Found</h3>
                    <p>No subject named "<strong>${query}</strong>" exists.</p>
                </div>
            `;

            return;
        }

        const percentage =
            subject.total === 0
            ? 0
            : ((subject.attended / subject.total) * 100).toFixed(1);

        let advice = "";

        if (percentage >= 75) {

            let skips = 0;

            while (
                (subject.attended / (subject.total + skips + 1)) * 100 >= 75
            ) {
                skips++;
            }

            advice = `✅ You can skip ${skips} class(es).`;

        } else {

            let need = 0;

            while (
                ((subject.attended + need) / (subject.total + need)) * 100 < 75
            ) {
                need++;
            }

            advice = `⚠️ Attend the next ${need} class(es).`;

        }

        searchResults.innerHTML = `

        <section class="dashboard-card">

            <h2>📘 ${subject.name}</h2>

            <p><strong>Attendance:</strong> ${percentage}%</p>

            <p><strong>Present:</strong> ${subject.attended}</p>

            <p><strong>Total:</strong> ${subject.total}</p>

            <p>${advice}</p>

        </section>

        `;

    });

}


// ==========================
// Dynamic Welcome Message
// ==========================

const welcomeTitle =
document.getElementById("welcomeTitle");

const welcomeMessage =
document.getElementById("welcomeMessage");

if(welcomeTitle){

    const hour = new Date().getHours();

    let greeting = "Good Evening";

    if(hour < 12){

        greeting = "Good Morning";

    }
    else if(hour < 17){

        greeting = "Good Afternoon";

    }

    const subjects =
    JSON.parse(localStorage.getItem("subjects")) || [];

    const assignments =
    JSON.parse(localStorage.getItem("assignments")) || [];

    const pending =
    assignments.filter(a => !a.completed).length;

    let present = 0;
    let total = 0;

    subjects.forEach(subject => {

        present += subject.attended;
        total += subject.total;

    });

    const attendance =
    total === 0
    ? 0
    : ((present / total) * 100).toFixed(1);

   welcomeTitle.textContent =
   `${greeting}, Daksh! 👋`;


   if(subjects.length === 0){

     welcomeMessage.textContent =
     "Welcome to Campus Compass! Add your first subject to begin.";

   }
   else{

    welcomeMessage.textContent =
    "Let's have a productive day at NSUT.";

   }

}

// ==========================
// Attendance Subject System
// ==========================

const addSubjectBtn =
document.getElementById("addSubjectBtn");

const subjectsContainer =
document.getElementById("subjectsContainer");


if(addSubjectBtn){

    addSubjectBtn.addEventListener("click",()=>{


        const name = prompt("Enter Subject Name");


        if(!name){
            return;
        }


        const subjects =
        JSON.parse(
            localStorage.getItem("subjects")
        ) || [];


        subjects.push({

            name:name,
            attended:0,
            total:0

        });


        localStorage.setItem(
            "subjects",
            JSON.stringify(subjects)
        );


        loadSubjects();


    });

}



function loadSubjects(){


    if(!subjectsContainer){
        return;
    }


    const subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    ) || [];



    if(subjects.length === 0){


        subjectsContainer.innerHTML = `

        <section class="dashboard-card">

            <h2>📚 No Subjects Added</h2>

            <p>Add your first subject to start tracking attendance.</p>

        </section>

        `;


        return;

    }



    subjectsContainer.innerHTML="";



    subjects.forEach((subject,index)=>{


        let percentage =
        subject.total === 0

        ? 0

        : ((subject.attended/subject.total)*100).toFixed(1);



        subjectsContainer.innerHTML += `

        <section class="dashboard-card">

            <h2>${subject.name}</h2>

            <p>
            Attendance: ${percentage}%
            </p>

            <p>
            Present: ${subject.attended}
            </p>

            <p>
            Total Classes: ${subject.total}
            </p>


            <button onclick="markPresent(${index})">
            ✅ Present
            </button>


            <button onclick="markAbsent(${index})">
            ❌ Absent
            </button>


        </section>


        `;


    });


}



function markPresent(index){


    let subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    );


    subjects[index].attended++;
    subjects[index].total++;


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    loadSubjects();


}



function markAbsent(index){


    let subjects =
    JSON.parse(
        localStorage.getItem("subjects")
    );


    subjects[index].total++;


    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );


    loadSubjects();


}



loadSubjects();