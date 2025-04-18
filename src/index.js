import "./reset.css";
import "./styles.css";
import cross from "./img/close.svg";
import pencil from "./img/pencil.svg";
import trash from "./img/delete.svg";
import { Task, Project } from "./model.js";
import { clearElement } from "./utils.js";


let projectInFocus;
const projects = [];
const btn = document.querySelector(".btn-new-project");
const sideContent = document.querySelector("#sidebar-content");
const mainContent = document.querySelector("#main-content");

function viewTask(project, taskIdx) {
    clearElement(mainContent);
    const task = project.selectTask(taskIdx);
    const card = document.createElement("div");
    card.classList.add("task-card");
    const iconsBox = document.createElement("div");
    iconsBox.classList.add("card-icons");

    const trashIcon = document.createElement("img");
    trashIcon.src = trash;
    trashIcon.alt = "Trash icon";
    trashIcon.title = "Delete task";
    trashIcon.classList.add("icon", "icon-card");
    trashIcon.addEventListener("click", () => {
        if(confirm(`WARNING: this operation is irreversible!\n\nDelete task: "${task.title || "NewTask"}"?`)) {
            clearElement(mainContent);
            project.removeTask(taskIdx);
            viewProjects();
        }
    });

    const crossIcon = document.createElement("img");
    crossIcon.src = cross;
    crossIcon.alt = "Close icon";
    crossIcon.classList.add("icon", "icon-card");
    crossIcon.addEventListener("click", () => {
        task.title = document.querySelector(".task-title").textContent;
        task.description = document.querySelector(".task-desc").textContent;
        task.dueDate = document.querySelector("#dueDate").value;
        task.priority = document.querySelector("#priority").value;
        task.completed = document.querySelector("input[name='completionStatus']:checked").value;
        //to preserve rich-text formatting, the notes element should be some kind of WYSIWYG editor... but it requires external code. So preserving formatting is postponed for now!
        task.notes = document.querySelector(".task-notes").innerText;
        clearElement(mainContent);
        viewProjects();
    });

    iconsBox.append(trashIcon, crossIcon);
    card.appendChild(iconsBox);

    const template = `
        <h1 class="task-title" contenteditable="plaintext-only">${task.title}</h1>
        <h3 class="task-desc" contenteditable="plaintext-only">${task.description}</h3>
        <div class="card-controls">
            <div class="controls-top">
                <div class="card-date">
                    <label for="dueDate">DueDate: 
                        <input type="date" name="dueDate" id="dueDate" value="${task.dueDate}" min="1950-01-01" max="2050-01-01"/>
                    </label>
                </div>
                <div class="card-priority">
                    <label for="priority">Priority: </label>
                    <select name="task-priority" id="priority">
                        <option value="low" ${task.priority === "low" ? "selected" : ""}>Low</option>
                        <option value="normal" ${task.priority === "normal" ? "selected" : ""}>Normal</option>
                        <option value="high" ${task.priority === "high" ? "selected" : ""}>High</option>
                    </select>
                </div>
            </div>
            <fieldset>
                <legend>Completion status</legend>
                <ul>
                    <li>
                        <label for="incomplete">
                            <input type="radio" id="incomplete" name="completionStatus" value="false" ${task.completed === "false" ? "checked" : ""}>
                            Not finished
                        </label>
                    </li>
                    <li>
                        <label for="complete">
                            <input type="radio" id="complete" name="completionStatus" value="true" ${task.completed === "true" ? "checked" : ""}>
                            Already done
                        </label>
                    </li>
                </ul>
            </fieldset>
        </div>
        <p><strong>Task notes:</strong>
            <span class="task-notes" role="textbox" contenteditable>${task.notes}</span>
        </p>
    `;
    card.insertAdjacentHTML("beforeend", template);
    mainContent.appendChild(card);
    //prevent user from entering newlines in task title and description
    const title = document.querySelector(".task-title");
    const desc = document.querySelector(".task-desc");
    title.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
    });
    desc.addEventListener("keydown", (e) => {
        if (e.key === "Enter") e.preventDefault();
    });
}

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
            }
            viewProjects();
        });
        iconsBox.append(editIcon, deleteIcon);

        summary.appendChild(projectName);
        projectName.addEventListener("click", () => {
            projectData.opened = !projectData.opened;
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
            viewProjects();
        });
        details.appendChild(taskList);

        sideContent.appendChild(details);
    }
}

btn.addEventListener("click", () => {
    const newProject = new Project();
    projects.push({opened: false, project: newProject});
    viewProjects();
});