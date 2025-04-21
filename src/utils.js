import { Project, Task } from "./model.js";


function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.toLowerCase().slice(1);
}

function clearElement(element) {
    element.replaceChildren();
}

function storageAvailable(type) {
    let storage;
    try {
      storage = window[type];
      const x = "__storage_test__";
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return (
        e instanceof DOMException &&
        e.name === "QuotaExceededError" &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage &&
        storage.length !== 0
      );
    }
  }

function addToStorage(storage, item) {
    storage["projects"] = JSON.stringify(item);
}

function getFromStorage(storage, itemName) {
    return JSON.parse(storage[itemName]);
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

export { capitalize, clearElement, storageAvailable, addToStorage, getFromStorage, buildProjectList };