import { Project, Task } from "./model.js";


function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
}

function clearElement(element) {
    element.replaceChildren();
}

function addToStorage(storage, item) {
    storage.setItem("projects", JSON.stringify(item));
}

function getFromStorage(storage, itemName) {
    return JSON.parse(storage.getItem(itemName));
}

function buildProjectList(json) {
    const projects = [];
    if (json) {
        for (const projectData of json) {
            const open = projectData["opened"];
            const project = projectData["project"];
            const newProject = new Project(project["_name"]);
            for (const task of project["_tasks"]) {
                const newTask = new Task({
                    title: task["_title"],
                    description: task["_description"],
                    dueDate: task["_dueDate"],
                    priority: task["_priority"],
                    completed: task["_completed"],
                    notes: task["_notes"]
                });
                newProject.addTask(newTask);
            }
            projects.push({opened: open, project: newProject});
        }
    }
    console.log(projects);
    return projects;
}

export { capitalize, clearElement, addToStorage, getFromStorage, buildProjectList };