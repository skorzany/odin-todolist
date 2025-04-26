import { capitalize } from "./utils.js";


class Task {
    constructor({title="", description="", dueDate="1900-01-01",
        priority="normal", completed="false", notes=""}={}) {
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._completed = completed;
        this._notes = notes;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get dueDate() {
        return this._dueDate;
    }

    get priority() {
        return this._priority;
    }

    get completed() {
        return this._completed;
    }

    get notes() {
        return this._notes;
    }

    set title(value) {
        this._title = capitalize(value);
    }

    set description(value) {
        this._description = capitalize(value);
    }

    set dueDate(value) {
        this._dueDate = value;
    }

    set priority(value) {
        this._priority = value;
    }

    set completed(value) {
        this._completed = value;
    }

    set notes(value) {
        this._notes = value;
    }
}

class Project {
    constructor(name="New project") {
        this._name = name;
        this._tasks = [];
    }

    get name() {
        return this._name;
    }

    get tasks() {
        return this._tasks;
    }

    set name(value) {
        this._name = capitalize(value);
    }

    set tasks(arr) {
        this._tasks = arr;
    }

    hasTask(task) {
        return Boolean(this.tasks.some((ele) => ele === task));
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter((val) => val !== task);
    }

    selectTask(taskIdx) {
        return this.tasks[taskIdx];
    }
}


export { Task, Project };