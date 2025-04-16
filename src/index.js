import "./reset.css";
import "./styles.css";
import cross from "./img/close.svg";
import pencil from "./img/pencil.svg";
import trash from "./img/delete.svg";
import { Task, Project } from "./model.js";
import { clearElement } from "./utils.js";


const projects = [];
const btn = document.querySelector(".btn-new-project");
const sideContent = document.querySelector("#sidebar-content");
const mainContent = document.querySelector("#main-content");

function viewProjects() {
    clearElement(sideContent);
    for(const [idx, projectData] of projects.entries()) {
        const project = projectData.project;
        const details = document.createElement("details");
        details.classList.add("project");
        if (projectData.focused) details.setAttribute("open", "");

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
        editIcon.title = "Change project's name";
        editIcon.classList.add("icon", "icon-side");
        editIcon.addEventListener("click", (e) => {
            e.preventDefault();
            const newName = prompt("Enter new name for the project:") ?? project.name;
            project.name =  newName.trim() || project.name;
            viewProjects();
        });
        iconsBox.appendChild(editIcon);

        const deleteIcon = document.createElement("img");
        deleteIcon.src = trash;
        deleteIcon.title = "Delete project";
        deleteIcon.classList.add("icon", "icon-side");
        deleteIcon.addEventListener("click", (e) => {
            e.preventDefault();
            if (window.confirm(`WARNING: this operation is irreversible!\n\nDelete project: "${project.name || "NewProject"}"?`))
                projects.splice(idx, 1);
            viewProjects();
        });
        iconsBox.appendChild(deleteIcon);
        summary.appendChild(projectName);
        projectName.addEventListener("click", () => {
            projectData.focused = !projectData.focused;
        });
        summary.appendChild(iconsBox);
        details.appendChild(summary);

        const taskList = document.createElement("ul");
        for (const task of project.tasks) {
            const taskClass = (
                task.completed === "true" ? "task-completed" : "task"
            );
            const li = document.createElement("li");
            li.classList.add(taskClass);
            li.textContent = task.title || "NewTask";
            taskList.appendChild(li);
            li.addEventListener("click", () => {
                //work in progress...
                console.log("viewing task");
            });
        }
        const newTask = document.createElement("li");
        newTask.classList.add("task-new");
        newTask.textContent = "Add new task";
        taskList.appendChild(newTask);
        newTask.addEventListener("click", () => {
            project.addTask(new Task());
            viewProjects();
        });
        details.appendChild(taskList);

        sideContent.appendChild(details);
    }
}

btn.addEventListener("click", () => {
    const newProject = new Project();
    projects.push({focused: false, project: newProject});
    viewProjects();
});