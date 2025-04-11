class Task {
    #title;
    #description;
    #dueDate;
    #priority;
    #completed;
    #notes;

    #fallbackTitle = "Default task title";
    #fallbackDescription = 
        "This is your task's description. keep it short, without much detail";
    #fallbackDate = "1900-01-01";
    #fallbackPriority = "normal";
    #fallbackStatus = "false";
    #fallbackNotes = 
        "This is the place, where you can add notes to your task. " +
        "Notes can be as long as you want and formatted as you want. " +
        "The only limitation is that they gotta be text."

    constructor({title, description, dueDate, priority, completed, notes}={}) {
        this.#title = title || this.#fallbackTitle;
        this.#description = description || this.#fallbackDescription;
        this.#dueDate = dueDate || this.#fallbackDate;
        this.#priority = priority || this.#fallbackPriority;
        this.#completed = completed || this.#fallbackStatus;
        this.#notes = notes || this.#fallbackNotes;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    get completed() {
        return this.#completed;
    }

    get notes() {
        return this.#notes;
    }

    set title(value) {
        this.#title = value;
    }

    set description(value) {
        this.#description = value;
    }

    set dueDate(value) {
        if (new Date(value).getDate() !== NaN) this.#dueDate = value;  
    }

    set priority(value) {
        const testValue = value.toString.toLowerCase();
        if (['low', 'normal', 'high'].includes(testValue)) {
            this.#priority = testValue;
        }
    }

    set completed(value) {
        const testValue = value.toString.toLowerCase();
        if (['false', 'true'].includes(testValue)) this.#completed = testValue;
    }

    set notes(value) {
        this.#notes = value;
    }
}

class Project {
    #name;
    #tasks;

    constructor({name}={}) {
        this.#name = name;
        this.#tasks = [];
    }

    get name() {
        return this.#name;
    }

    get tasks() {
        return this.#tasks;
    }

    set name(value) {
        this.#name = value;
    }

    addTask(task) {
        this.#tasks.push(task);
    }

    removeTask(taskIdx) {
        this.#tasks.splice(taskIdx, 1);
    }

    selectTask(taskIdx) {
        return this.#tasks[taskIdx];
    }
}