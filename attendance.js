// Campus Compass Attendance Manager


const subjectsContainer = document.getElementById("subjectsContainer");

const overallAttendanceCard =
document.getElementById("overallAttendanceCard");

const statsContainer =
document.getElementById("statsContainer");

const searchSubject =
document.getElementById("searchSubject");

// Default subjects

let subjects = JSON.parse(localStorage.getItem("subjects")) || [];


// Save Subjects

function saveSubjects(){

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

}


// Default subjects
function displaySubjects(){

    subjectsContainer.innerHTML = "";
    statsContainer.innerHTML = "";

    if(subjects.length === 0){

       subjectsContainer.innerHTML = `

       <section class="dashboard-card">

          <h2>📚 No Subjects Yet</h2>

          <p>Click <strong>Add Subject</strong> to get started.</p>

       </section>

       `;
    }

    const filteredSubjects = subjects.filter(subject => {

        if(!searchSubject) return true;

        return subject.name
            .toLowerCase()
            .includes(searchSubject.value.trim().toLowerCase());

    });

    let above75 = 0;
    let below75 = 0;
    let totalPresent = 0;
    let totalClasses = 0;

    let bestSubject = subjects.length ? subjects[0] : null;
    let weakestSubject = subjects.length ? subjects[0] : null;

    subjects.forEach(subject => {

        totalPresent += subject.attended;
        totalClasses += subject.total;

        const p = subject.total === 0
            ? 0
            : (subject.attended / subject.total) * 100;

        if(p >= 75){
            above75++;
        }else{
            below75++;
        }

        if(bestSubject){

            const best =
                bestSubject.total === 0
                ? 0
                : (bestSubject.attended / bestSubject.total) * 100;

            if(p > best){
                bestSubject = subject;
            }

            const weakest =
                weakestSubject.total === 0
                ? 100
                : (weakestSubject.attended / weakestSubject.total) * 100;

            if(p < weakest){
                weakestSubject = subject;
            }

        }

    });

    statsContainer.innerHTML = `

    <div class="stat-card">
        <h3>📚 Subjects</h3>
        <h1>${subjects.length}</h1>
    </div>

    <div class="stat-card">
        <h3>✅ Above 75%</h3>
        <h1>${above75}</h1>
    </div>

    <div class="stat-card">
        <h3>🔴 Below 75%</h3>
        <h1>${below75}</h1>
    </div>

    <div class="stat-card">
        <h3>🏆 Best Subject</h3>
        <h1>${bestSubject ? bestSubject.name : "-"}</h1>
    </div>

    <div class="stat-card">
        <h3>⚠️ Needs Attention</h3>
        <h1>${weakestSubject ? weakestSubject.name : "-"}</h1>
    </div>

    `;

    const overallPercentage = totalClasses === 0
        ? 0
        : ((totalPresent / totalClasses) * 100).toFixed(1);

    overallAttendanceCard.innerHTML = `

    <h2>📊 Overall Attendance</h2>

    <p><strong>${overallPercentage}%</strong></p>

    <div class="progress-bar">
        <div
            class="progress-fill"
            style="width:${overallPercentage}%">
        </div>
    </div>

    <p>Present Classes: ${totalPresent}</p>

    <p>Total Classes: ${totalClasses}</p>

    `;

    filteredSubjects.forEach(subject => {

        const index = subjects.indexOf(subject);

        const percentage = subject.total === 0
            ? 0
            : ((subject.attended / subject.total) * 100).toFixed(1);

        let progressColor = "#22C55E";

        if(percentage < 75){
            progressColor = "#EF4444";
        }
        else if(percentage < 90){
            progressColor = "#F59E0B";
        }

        let advice = "";

        if(subject.total === 0){

            advice = "📚 No attendance recorded yet.";

        }
        else if(percentage >= 75){

            let skips = 0;

            while(
                (subject.attended / (subject.total + skips + 1)) * 100 >= 75
            ){
                skips++;
            }

            advice = `✅ You can skip ${skips} class(es).`;

        }
        else{

            let need = 0;

            while(
                ((subject.attended + need) / (subject.total + need)) * 100 < 75
            ){
                need++;
            }

            advice = `⚠️ Attend the next ${need} class(es) to reach 75%.`;

        }

        let badge = "";

        if(bestSubject && subject.name === bestSubject.name){
            badge = "🏆";
        }

        subjectsContainer.innerHTML += `

        <section class="dashboard-card">

            <h2>${badge} ${subject.name}</h2>

            <p><strong>Attendance:</strong> ${percentage}%</p>

            <div class="progress-bar">

                <div
                    class="progress-fill"
                    style="width:${percentage}%; background:${progressColor};">
                </div>

            </div>

            <p>Present Classes: ${subject.attended}</p>

            <p>Total Classes: ${subject.total}</p>

            <p class="attendance-advice">${advice}</p>

            <button onclick="markPresent(${index})">✅ Present</button>

            <button onclick="markAbsent(${index})">❌ Absent</button>

            <button onclick="editSubject(${index})">✏️ Edit</button>

            <button onclick="deleteSubject(${index})">🗑 Delete</button>

        </section>

        `;

    });

}



// Present button

function markPresent(index){


    subjects[index].attended++;

    subjects[index].total++;


    saveSubjects();

    displaySubjects();


}



// Absent button

function markAbsent(index){


    subjects[index].total++;


    saveSubjects();

    displaySubjects();


}



// Start app

if(searchSubject){

    searchSubject.addEventListener(

        "input",

        displaySubjects

    );

}

function editSubject(index){

    const newName = prompt(
        "Subject Name",
        subjects[index].name
    );

    if(!newName) return;

    const attended = Number(
        prompt(
            "Present Classes",
            subjects[index].attended
        )
    );

    if(isNaN(attended) || attended < 0){
        alert("Invalid Present Classes");
        return;
    }

    const total = Number(
        prompt(
            "Classes Held So Far",
            subjects[index].total
        )
    );

    if(isNaN(total) || total < attended){
        alert("Classes Conducted must be greater than or equal to Present Classes.");
        return;
    }

    subjects[index].name = newName.trim();
    subjects[index].attended = attended;
    subjects[index].total = total;

    saveSubjects();
    displaySubjects();

}


function deleteSubject(index){

    const confirmDelete = confirm(
        "Delete this subject?"
    );

    if(!confirmDelete) return;

    subjects.splice(index,1);

    saveSubjects();

    displaySubjects();

}

// Add Subject

const addSubjectBtn = document.getElementById("addSubjectBtn");

if(addSubjectBtn){

    addSubjectBtn.addEventListener("click", function(){

        const name = prompt("Enter Subject Name");
        if(!name) return;

        const attended = Number(prompt("Present Classes", "0"));
        if(isNaN(attended) || attended < 0){
            alert("Invalid Present Classes");
            return;
        }

        const total = Number(prompt("Classes Conducted So Far", "0"));
        if(isNaN(total) || total < attended){
            alert("Classes Conducted must be greater than or equal to Present Classes.");
            return;
        }

        subjects.push({

            name: name,

            attended: attended,

            total: total

        });

        saveSubjects();
        displaySubjects();


    });

}

// Start Attendance Manager

displaySubjects();