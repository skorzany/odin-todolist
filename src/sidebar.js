class ProjectView {
    constructor(storage, targetContainer, helper, projectList, projectInFocus) {
        this.storage = storage;
        this.targetContainer = targetContainer;
        this.helper = helper;
        this.projectList = projectList;
        this.projectInFocus = projectInFocus;
    }

    clear() {
        this.targetContainer.replaceChildren();
    }

    view() {
        this.clear();
        const content = this.build();
        this.targetContainer.appendChild(content);
    }

    build() {
        for (const [projectIdx, projectData] of this.projectList.entries()) {
            const project = projectData.project;
            const opened = projectData.opened;

            const details = document.createElement("details");
            details.classList.add("project");
            if (project === this.projectInFocus) details.classList.add("in-focus");
            if (opened) details.setAttribute("open", "");

              const summary = document.createElement("summary");
                const projectName = document.createElement("span");
                projectName.classList.add("project-name");
                projectName.textContent = project.name;
                projectName.addEventListener("click", () => {
                    projectData.opened = !projectData.opened;
                    updateStorage(this.storage, this.projectList);
                });

                const iconsBox = document.createElement("span");
                iconsBox.classList.add("side-icons");
                  const editIcon = document.createElement("img");
                  editIcon.src = pencil;
                  editIcon.alt = "Edit icon";
                  editIcon.title = "Change project's name";
                  editIcon.classList.add("icon", "icon-side");
                  editIcon.addEventListener("click", (e) => {
                    e.preventDefault();
                    const newName = prompt(
                        "Enter new name for the project " +
                        `"${project.name}": `
                    ) ?? project.name;
                    project.name = newName.trim() || project.name;
                    updateStorage(this.storage, this.projectList);
                    this.show();
                  });

                  const deleteIcon = document.createElement("img");
                  deleteIcon.src = trash;
                  deleteIcon.alt = "Delete icon";
                  deleteIcon.title = "Delete project";
                  deleteIcon.classList.add("icon", "icon-side");
                  deleteIcon.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (window.confirm(
                        "WARNING: This operation is irreversible!\n\n" +
                        `Delete project: "${project.name}"?`
                    )) {
                        this.projectList.splice(projectIdx, 1);
                        if (this.projectInFocus === project) this.helper.clear();
                        updateStorage(this.storage, this.projectList);
                        this.show();
                    }
                  });
                iconsBox.append(editIcon, deleteIcon);
              summary.append(projectName, iconsBox);

              const taskList = document.createElement("ul");
              for (const [taskIdx, task] of project.tasks.entries()) {
                const taskClass = (task.completed === "true" ? "task-completed" : "task");
                const item = document.createElement("li");
                item.taskList.add(taskClass);
                item.textContent = task.title || "NewTask";
                item.addEventListener("click", () => {
                    this.projectInFocus = project;

                });
              }
        }
    }
}



//===========================================================
function viewProjects() {
    clearElement(sideContent);
    for(const [idx, projectData] of projects.entries()) {
        const project = projectData.project;

        const details = document.createElement("details");
        details.classList.add("project");
        if (projectInFocus === project) details.classList.add("in-focus");
        if (projectData.opened) details.setAttribute("open", "");

        const summary = document.createElement("summary");
        const projectName = document.createElement("span");
        projectName.classList.add("project-name");
        projectName.textContent = (
            project.name === "" ? "NewProject" : project.name
        );

        const iconsBox = document.createElement("span");
        iconsBox.classList.add("side-icons");

        const editIcon = document.createElement ("img");
        editIcon.src = pencil;
        editIcon.alt = "Pencil icon";
        editIcon.title = "Change project's name";
        editIcon.classList.add("icon", "icon-side");
        editIcon.addEventListener("click", (e) => {
            e.preventDefault();
            const newName = prompt("Enter new name for the project:") ?? project.name;
            project.name =  newName.trim() || project.name;
            addToStorage(storage, projects);
            viewProjects();
        });

        const deleteIcon = document.createElement("img");
        deleteIcon.src = trash;
        deleteIcon.alt = "Trash icon";
        deleteIcon.title = "Delete project";
        deleteIcon.classList.add("icon", "icon-side");
        deleteIcon.addEventListener("click", (e) => {
            e.preventDefault();
            if (window.confirm(`WARNING: this operation is irreversible!\n\nDelete project: "${project.name || "NewProject"}"?`)) {
                projects.splice(idx, 1);
                if(projectInFocus === project) clearElement(mainContent);
                addToStorage(storage, projects);
            }
            viewProjects();
        });
        iconsBox.append(editIcon, deleteIcon);

        summary.appendChild(projectName);
        projectName.addEventListener("click", () => {
            projectData.opened = !projectData.opened;
            addToStorage(storage, projects);
        });
        summary.appendChild(iconsBox);
        details.appendChild(summary);

        const taskList = document.createElement("ul");
        for (const [idx, task] of project.tasks.entries()) {
            const taskClass = (
                task.completed === "true" ? "task-completed" : "task"
            );
            const li = document.createElement("li");
            li.classList.add(taskClass);
            li.textContent = task.title || "NewTask";
            taskList.appendChild(li);
            li.addEventListener("click", () => {
                viewTask(project, idx);
                projectInFocus = project;
                viewProjects();
            });
        }
        const newTask = document.createElement("li");
        newTask.classList.add("task-new");
        newTask.textContent = "Add new task";
        taskList.appendChild(newTask);
        newTask.addEventListener("click", () => {
            project.addTask(new Task());
            addToStorage(storage, projects);
            viewProjects();
        });
        details.appendChild(taskList);

        sideContent.appendChild(details);
    }
}