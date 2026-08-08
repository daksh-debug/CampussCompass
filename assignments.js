// ---------------- ASSIGNMENTS ----------------

const assignmentContainer =
document.getElementById("assignmentContainer");

let assignments = JSON.parse(
    localStorage.getItem("assignments")
) || [];

function saveAssignments(){

    localStorage.setItem(

        "assignments",

        JSON.stringify(assignments)

    );

}

function displayAssignments(){

    if(!assignmentContainer) return;

    assignmentContainer.innerHTML = "";

    assignments.sort((a,b)=>{

    if(a.completed!==b.completed){

        return a.completed-b.completed;

    }

    return new Date(a.dueDate)-new Date(b.dueDate);

    });
    
    assignments.forEach((assignment,index)=>{

     assignmentContainer.innerHTML += `

<section class="dashboard-card">

    <h2>${assignment.title}</h2>

    <p><strong>Subject:</strong> ${assignment.subject}</p>

    <p><strong>Due:</strong> ${assignment.dueDate}</p>

    <p><strong>Priority:</strong> ${assignment.priority}</p>

    <p>

        ${
            assignment.completed
            ? "🟢 Completed"
            : "🟡 Pending"
        }

    </p>

    <button onclick="toggleAssignment(${index})">

        ${
            assignment.completed
            ? "↩ Mark Pending"
            : "✔ Complete"
        }

    </button>

    <button onclick="editAssignment(${index})">

        ✏️ Edit

    </button>

    <button onclick="deleteAssignment(${index})">

        🗑 Delete

    </button>

</section>

`;

    });

}

function toggleAssignment(index){

    assignments[index].completed =

    !assignments[index].completed;

    saveAssignments();

    displayAssignments();

}

if(assignmentContainer){

    displayAssignments();

}

const addAssignmentBtn =
document.getElementById("addAssignmentBtn");

if(addAssignmentBtn){

    addAssignmentBtn.addEventListener(

        "click",

        addAssignment

    );

}

function addAssignment(){

    const subject = prompt("Subject");

    if(!subject) return;

    const title = prompt("Assignment Title");

    if(!title) return;

    const dueDate = prompt(

        "Due Date (YYYY-MM-DD)"

    );

    if(!dueDate) return;

    const priority = prompt(

        "Priority (High/Medium/Low)"

    );

    if(!priority) return;

    assignments.push({

        subject,

        title,

        dueDate,

        priority,

        completed:false

    });

    saveAssignments();

    displayAssignments();

}

function editAssignment(index){

    const assignment = assignments[index];

    const subject = prompt(

        "Subject",

        assignment.subject

    );

    if(!subject) return;

    const title = prompt(

        "Title",

        assignment.title

    );

    if(!title) return;

    const dueDate = prompt(

        "Due Date",

        assignment.dueDate

    );

    if(!dueDate) return;

    const priority = prompt(

        "Priority",

        assignment.priority

    );

    if(!priority) return;

    assignment.subject = subject;

    assignment.title = title;

    assignment.dueDate = dueDate;

    assignment.priority = priority;

    saveAssignments();

    displayAssignments();

}

function deleteAssignment(index){

    if(!confirm("Delete this assignment?")){

        return;

    }

    assignments.splice(index,1);

    saveAssignments();

    displayAssignments();

}