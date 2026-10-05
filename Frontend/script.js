
const API_URL = "http://localhost:8080/api/projects";

let allProjects = [];


// Load all projects

function loadProjects() {

    fetch(API_URL)

        .then(response => {

            if (!response.ok) {
                throw new Error("Backend error");
            }

            return response.json();
        })

        .then(projects => {

            allProjects = projects;

            displayProjects(projects);

            updateDashboard(projects);
        })

        .catch(error => {

            console.error(error);

            document.getElementById("projectList").innerHTML =
                "<p>Unable to connect to backend.</p>";
        });
}


// Display projects

function displayProjects(projects) {

    const projectList =
        document.getElementById("projectList");

    projectList.innerHTML = "";


    if (projects.length === 0) {

        projectList.innerHTML =
            "<p>No projects found.</p>";

        return;
    }


    projects.forEach(project => {

        let statusClass = "";

        if (project.status === "Planning") {

            statusClass = "status-planning";

        } else if (project.status === "In Progress") {

            statusClass = "status-progress";

        } else {

            statusClass = "status-completed";
        }


        let priorityClass = "";

        if (project.priority === "High") {

            priorityClass = "priority-high";

        } else if (project.priority === "Medium") {

            priorityClass = "priority-medium";

        } else {

            priorityClass = "priority-low";
        }


        projectList.innerHTML += `

            <div class="project-card">

                <span class="status ${statusClass}">
                    ${project.status}
                </span>

                <span class="priority ${priorityClass}">
                    ${project.priority}
                </span>

                <h3>
                    ${project.name}
                </h3>

                <p class="project-description">
                    ${project.description}
                </p>


                <div class="project-dates">

                    📅 Start:
                    ${project.startDate}

                    <br>

                    📅 End:
                    ${project.endDate}

                </div>


                <div class="project-actions">

                    <button
                        class="edit-btn"
                        onclick="openEditModal(
                            ${project.id}
                        )">

                        Edit

                    </button>


                    <button
                        class="delete-btn"
                        onclick="deleteProject(
                            ${project.id}
                        )">

                        Delete

                    </button>

                </div>

            </div>
        `;
    });
}


// Add project

function addProject() {

    const name =
        document.getElementById("name").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const status =
        document.getElementById("status").value;

    const priority =
        document.getElementById("priority").value;

    const startDate =
        document.getElementById("startDate").value;

    const endDate =
        document.getElementById("endDate").value;


    if (
        !name ||
        !description ||
        !startDate ||
        !endDate
    ) {

        alert("Please fill all fields.");

        return;
    }


    const project = {

        name: name,

        description: description,

        status: status,

        priority: priority,

        startDate: startDate,

        endDate: endDate
    };


    fetch(API_URL, {

        method: "POST",

        headers: {

            "Content-Type":
                "application/json"
        },

        body: JSON.stringify(project)

    })

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Unable to add project"
                );
            }

            return response.json();
        })

        .then(() => {

            alert(
                "Project added successfully!"
            );


            document.getElementById(
                "name"
            ).value = "";

            document.getElementById(
                "description"
            ).value = "";

            document.getElementById(
                "startDate"
            ).value = "";

            document.getElementById(
                "endDate"
            ).value = "";


            loadProjects();
        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to add project."
            );
        });
}


// Search projects

function searchProjects() {

    const searchText =
        document.getElementById("search")
            .value
            .toLowerCase();


    const filteredProjects =
        allProjects.filter(project =>

            project.name
                .toLowerCase()
                .includes(searchText)

            ||

            project.description
                .toLowerCase()
                .includes(searchText)

            ||

            project.status
                .toLowerCase()
                .includes(searchText)

            ||

            project.priority
                .toLowerCase()
                .includes(searchText)
        );


    displayProjects(
        filteredProjects
    );
}


// Open edit modal

function openEditModal(id) {

    const project =
        allProjects.find(
            p => p.id === id
        );


    if (!project) {
        return;
    }


    document.getElementById(
        "editId"
    ).value = project.id;


    document.getElementById(
        "editName"
    ).value = project.name;


    document.getElementById(
        "editDescription"
    ).value =
        project.description;


    document.getElementById(
        "editStatus"
    ).value = project.status;


    document.getElementById(
        "editPriority"
    ).value = project.priority;


    document.getElementById(
        "editStartDate"
    ).value = project.startDate;


    document.getElementById(
        "editEndDate"
    ).value = project.endDate;


    document.getElementById(
        "editModal"
    ).style.display = "flex";
}


// Close modal

function closeModal() {

    document.getElementById(
        "editModal"
    ).style.display = "none";
}


// Update project

function updateProject() {

    const id =
        document.getElementById(
            "editId"
        ).value;


    const project = {

        name:
            document.getElementById(
                "editName"
            ).value.trim(),

        description:
            document.getElementById(
                "editDescription"
            ).value.trim(),

        status:
            document.getElementById(
                "editStatus"
            ).value,

        priority:
            document.getElementById(
                "editPriority"
            ).value,

        startDate:
            document.getElementById(
                "editStartDate"
            ).value,

        endDate:
            document.getElementById(
                "editEndDate"
            ).value
    };


    if (
        !project.name ||
        !project.description ||
        !project.startDate ||
        !project.endDate
    ) {

        alert(
            "Please fill all fields."
        );

        return;
    }


    fetch(
        `${API_URL}/${id}`,

        {

            method: "PUT",

            headers: {

                "Content-Type":
                    "application/json"
            },

            body:
                JSON.stringify(project)
        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Update failed"
                );
            }

            return response.json();
        })

        .then(() => {

            alert(
                "Project updated successfully!"
            );

            closeModal();

            loadProjects();
        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to update project."
            );
        });
}


// Delete project

function deleteProject(id) {

    if (
        !confirm(
            "Are you sure you want to delete this project?"
        )
    ) {

        return;
    }


    fetch(
        `${API_URL}/${id}`,

        {

            method: "DELETE"
        }
    )

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Delete failed"
                );
            }

            return response.text();
        })

        .then(() => {

            alert(
                "Project deleted successfully!"
            );

            loadProjects();
        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to delete project."
            );
        });
}


// Dashboard statistics

function updateDashboard(projects) {

    document.getElementById(
        "totalProjects"
    ).textContent =
        projects.length;


    const inProgress =
        projects.filter(
            project =>
                project.status ===
                "In Progress"
        ).length;


    document.getElementById(
        "inProgress"
    ).textContent =
        inProgress;


    const completed =
        projects.filter(
            project =>
                project.status ===
                "Completed"
        ).length;


    document.getElementById(
        "completed"
    ).textContent =
        completed;
}


// Start application

loadProjects();

