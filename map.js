alert("Map JS Loaded");

const locationInfo =
document.getElementById("locationInfo");

const locations = {

    gate:{

        title:"🚪 Main Gate",

        description:`
        <p>Main entrance of NSUT.</p>

        <p><strong>Nearest Metro:</strong>
        Dwarka Mor</p>

        <p><strong>Parking:</strong>
        Available</p>
        `
    },

    ab1:{

        title:"🏛 Academic Block 1",

        description:`
        <p>Engineering classrooms.</p>

        <p>Lecture Halls</p>

        <p>Faculty Offices</p>
        `
    },

    ab2:{

        title:"🏛 Academic Block 2",

        description:`
        <p>Department classrooms.</p>

        <p>Computer Labs</p>

        <p>Seminar Rooms</p>
        `
    },

    ab3:{

        title:"🏛 Academic Block 3",

        description:`
        <p>Teaching Block.</p>

        <p>Lecture Rooms</p>

        <p>Faculty Cabins</p>
        `
    },

    bt:{

        title:"🧪 Biotechnology Department",

        description:`
        <p>B.Tech Biotechnology</p>

        <p>Research Labs</p>

        <p>Wet Labs</p>
        `
    },

    library:{

        title:"📚 Library",

        description:`
        <p>Open: 9 AM - 8 PM</p>

        <p>WiFi</p>

        <p>Reading Hall</p>

        <p>Printing Facility</p>
        `
    },

    canteen:{

        title:"🍴 Canteen",

        description:`
        <p>Breakfast</p>

        <p>Lunch</p>

        <p>Snacks</p>
        `
    },

    sports:{

        title:"⚽ Sports Complex",

        description:`
        <p>Basketball</p>

        <p>Football</p>

        <p>Gym</p>
        `
    },

    lawn:{

        title:"🌳 Central Lawn",

        description:`
        <p>Relaxation Area</p>

        <p>Student Events</p>
        `
    }

};


Object.keys(locations).forEach(id=>{

    const building = document.getElementById(id);

    if(building){

        building.addEventListener("click",function(){

            document
            .querySelectorAll(".building")
            .forEach(card=>{

                card.classList.remove("active");

            });

            building.classList.add("active");

            locationInfo.innerHTML = `

                <h2>${locations[id].title}</h2>

                ${locations[id].description}

            `;

        });

    }

});