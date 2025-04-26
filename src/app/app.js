import { Task, Project } from "./model.js";
import { TaskView, ProjectView } from "./views.js";
import { clearElement, storageAvailable } from "./utils.js";


export class ToDoApp {
    constructor() {
        this.containerSide = document.querySelector("#sidebar-content");
        this.containerMain = document.querySelector("#main-content");
        this.buttonMain = document.querySelector(".btn-new-project");
        this.storage = (storageAvailable("localStorage") ? localStorage : {});
        this.cache = new Set();
        this.projects = [];
        this.projectInFocus = null;
        this.taskInFocus = null;

        this.buttonMain.addEventListener("click", () => {
            const newProject = new Project();
            this.projects.push(newProject);
            this.writeStorage();
            this.viewAll();
        });
    }

    readStorage() {
        return this.storage["projects"];
    }

    writeStorage() {
        this.storage["projects"] = JSON.stringify(this.projects);
    }

    buildProjectList(json) {
        if (json) {
            json = JSON.parse(json);
            for (const project of json) {
                const newProject = new Project(project["_name"]);
                for (const task of project["_tasks"]) {
                    newProject.addTask(new Task({
                        title: task["_title"],
                        description: task["_description"],
                        dueDate: task["_dueDate"],
                        priority: task["_priority"],
                        completed: task["_completed"],
                        notes: task["_notes"]
                    }));
                }
                this.projects.push(newProject);
            }
        }
    }

    viewSideContent() {
        clearElement(this.containerSide);
        for (const [i, project] of this.projects.entries()) {
            const projectView = new ProjectView(project);
            projectView.draw(this.containerSide, this.taskInFocus);
            const lastElement = this.containerSide.querySelector("details:last-child");
            if (this.cache.has(i)) lastElement.setAttribute("open", "");
            if (this.projectInFocus === project) lastElement.classList.add("in-focus");
        }
    }

    viewMainContent() {
        clearElement(this.containerMain);
        if (this.taskInFocus) {
            const taskView = new TaskView(this.taskInFocus);
            taskView.draw(this.containerMain);
        }
    }

    viewAll() {
        this.viewSideContent();
        this.addSideListeners();
        this.viewMainContent();
        if (this.taskInFocus) this.addMainListeners();
    }

    addSideListeners() {
        const details = this.containerSide.querySelectorAll("details");
        const iconBoxes = this.containerSide.querySelectorAll(".side-icons");
        const uls = this.containerSide.querySelectorAll("ul");

        for (const [i, detail] of [...details].entries()) {
            detail.addEventListener("toggle", (e) => {
                e.newState === "open" ?
                    this.cache.add(i) : this.cache.delete(i);
            })
        }

        for (const [projectIdx, project] of this.projects.entries()) {
            //project view: tasks
            const L = project.tasks.length;
            const listItems = [...uls[projectIdx].children];
            for (const [i, item] of listItems.entries()) {
                item.addEventListener("click", () => {
                    this.projectInFocus = project;
                    if (i !== L) this.taskInFocus = project.selectTask(i);
                    else {
                        project.addTask(new Task());
                        this.writeStorage();
                        this.taskInFocus = project.selectTask(i);
                    }
                    this.viewAll();
                });
            }
            //project view: icons
            const [edit, del] = [...iconBoxes[projectIdx].children];
            edit.addEventListener("click", (e) => {
                e.preventDefault();
                const newName = prompt(
                    `Enter new name for the project: "${project.name}"`
                ) ?? project.name;

                project.name = newName.trim() || project.name;
                this.writeStorage();
                this.viewAll();
            });
            del.addEventListener("click", (e) => {
                e.preventDefault();
                if (confirm(
                    "WARNING: This operation is irreversible!\n\n" +
                    `Delete project: "${project.name}"?`
                )) {
                    if (project.hasTask(this.taskInFocus)) {
                        this.taskInFocus = null;
                    }
                    this.projects.splice(projectIdx, 1);
                    this.cache.delete(projectIdx);
                    this.writeStorage();
                    this.viewAll();
                }
            });
        }
    }

    addMainListeners() {
        const icons = this.containerMain.querySelectorAll(".icon-card");
        const title = this.containerMain.querySelector(".task-title");
        const desc = this.containerMain.querySelector(".task-desc");
        const date = this.containerMain.querySelector("#dueDate");
        const priority = this.containerMain.querySelector("#priority");
        const notes = this.containerMain.querySelector(".task-notes");
        const task = this.taskInFocus;
        //trash icon
        icons[0].addEventListener("click", () => {
            if (confirm(
                "WARNING: This operation is irreversible!\n\n" +
                `Delete task: "${task.title || "NewTask"}"?`
            )) {
                for (const project of this.projects) {
                    if (project.hasTask(task)) {
                        project.removeTask(task);
                        break;
                    }
                }
                this.taskInFocus = null;
                this.writeStorage();
                this.viewAll();
            }
        });
        //save-and-close icon
        icons[1].addEventListener("click", () => {
            task.title = title.textContent;
            task.description = desc.textContent;
            task.dueDate = date.value;
            task.priority = priority.value;
            task.completed = this.containerMain.querySelector(
                "input[name='completionStatus']:checked"
            ).value;
            task.notes = notes.textContent;

            this.taskInFocus = null;
            this.writeStorage();
            this.viewAll();
        });
        //prevent users from entering newlines in title and description
        for (const ele of [title, desc]) {
            ele.addEventListener("keydown", (e) => {
                if (e.key === "Enter") e.preventDefault();
            });
        }
    }

    run() {
        this.buildProjectList(this.readStorage("projects"));
        this.viewAll();
    }
}