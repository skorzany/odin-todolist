import { Task, Project } from "./model.js";
import { TaskView, ProjectView } from "./views.js";
import { clearElement, storageAvailable } from "./utils.js";


class ToDoApp {
    constructor() {
        this.containerSide = document.querySelector("#sidebar-content");
        this.containerMain = document.querySelector("#main-content");
        this.buttonMain = document.querySelector(".btn-new-project");
        this.storage = (storageAvailable("localStorage") ? localStorage : {});
        this.projects = [];
        this.projectInFocus = null;
        this.taskInFocus = null;

        this.buttonMain.addEventListener("click", () => {
            const newProject = new Project();
            this.projects.push(newProject);
            this.writeStorage();
            this.viewSideContent();
            this.addSideListeners();
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
                for (const task of project.tasks) {
                    newProject.addTask(new Task({
                        title: task["_title"],
                        description: task["_description"],
                        dueDate: task["_dueDate"],
                        priority: task["_priority"],
                        completed: task["_completed"],
                        notes: task["_notes"]
                    }));
                }
                this.projects.push(project);
            }
        }
    }

    viewSideContent() {
        clearElement(this.containerSide);
        for (const project of this.projects) {
            const projectView = new ProjectView(project, this.containerSide);
            projectView.draw();
        }
    }

    viewMainContent() {
        clearElement(this.containerMain);
        if (this.taskInFocus) {
            const taskView = new TaskView(this.taskInFocus, this.containerMain);
            taskView.draw();
        }
    }

    viewAll() {
        this.viewSideContent();
        this.viewMainContent();
    }

    addSideListeners() {
        //TODO
    }

    addMainListeners() {
        const icons = document.querySelectorAll(".icon-card");
        const title = document.querySelector(".task-title");
        const desc = document.querySelector(".task-desc");
        const date = document.querySelector("#dueDate");
        const priority = document.querySelector("#priority");
        const completed = document.querySelector("input[name='completionStatus']:checked");
        const notes = document.querySelector(".task-notes");
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
                this.addSideListeners();
            }
        });
        //save-and-close icon
        icons[1].addEventListener("click", () => {
            task.title = title.textContent;
            task.description = desc.textContent;
            task.dueDate = date.value;
            task.priority = priority.value;
            task.completed = completed.value;
            task.notes = notes.textContent;

            this.taskInFocus = null;
            this.writeStorage();
            this.viewAll();
            this.addSideListeners();
        });
        //prevent users from entering newlines in title and description
        for (ele of [title, desc]) {
            ele.addEventListener("keydown", (e) => {
                if (e.key === "Enter") e.preventDefault();
            });
        }
    }

    run() {
        this.buildProjectList(this.readStorage());
        this.viewAll();
        this.addSideListeners();
    }
}