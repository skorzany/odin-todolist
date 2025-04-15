import "./reset.css";
import "./styles.css";
import cross from "./img/close.svg";
import pencil from "./img/pencil.svg";
import trash from "./img/delete.svg";
import { Task, Project } from "./model.js";


const projects = [];
const btn = document.querySelector(".btn-new-project");
const sideContent = document.querySelector("#sidebar-content");
const mainContent = document.querySelector("#main-content");

function clearSidebar() {
    sideContent.replaceChildren();
}

function addSidebarIcons(parent) {
    const editIcon = document.createElement("img");
    editIcon.src = pencil;
    editIcon.title = "Change project's name";
    editIcon.classList.add("icon", "icon-side");
    parent.appendChild(editIcon);

    const deleteIcon = document.createElement("img");
    deleteIcon.src = trash;
    deleteIcon.title = "Delete project";
    deleteIcon.classList.add("icon", "icon-side");
    parent.appendChild(deleteIcon);
}

function viewProjects() {
    const content = [];
    for(const project of projects) {
        let template = `
            <details class="project">
                <summary>
                    <span class="project-name">${project.name === "" ? "NewProject" : project.name}</span>
                    <span class="side-icons">
                    </span>
                </summary>
                <ul>
        `;
        for (const task of project.tasks) {
            const taskClass = task.completed === "true" ? "task-completed" : "task";
            const listItem = `<li class=${taskClass}>${task.title === "" ? "TaskTitle" : task.title}</li>`
            template += listItem;
        }
        template += "<li class='task-new'>Add new task</li></ul></details>";
        content.push(template);
    }
    sideContent.innerHTML = content.join("");

    const parents = document.querySelectorAll(".side-icons");
    for (parent of parents) addSidebarIcons(parent);
}

btn.addEventListener("click", () => {
    const newProject = new Project();
    projects.push(newProject);
    clearSidebar();
    viewProjects();
});