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
    constructor({name=""}={}) {
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

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(taskIdx) {
        this.tasks.splice(taskIdx, 1);
    }

    selectTask(taskIdx) {
        return this.tasks[taskIdx];
    }
}

export { Task, Project };
// ===== TESTS =====
// const myProject = new Project({name: "default name"});
// console.log(myProject.name);    // should be "default name"
// myProject.name = "breakfast";
// console.log(myProject.name)     // should be "Breakfast"

// const myTask = new Task({
    // title: "Gather ingredients", description: "Gather all the necessary ingredients",
    // dueDate: "2025-04-15", completed: "true", notes:"Ingredients list:\nEggs,\nMilk,\nButter,\nSalt,\nPepper."
// });
// console.log(myTask.title)        //should be "Prepare ingredients"
// console.log(myTask.dueDate)     //should be "2025-04-15"
// myProject.addTask(myTask);

// const anotherTask = new Task({
    // title: "Prepare ingredients", description:"Wash the eggs and follow the instructions in the notes.",
    // dueDate: "2025-04-15", notes: "1. Beat the eggs\n\tPlace them in a medium bowl and whisk until the yolk and whites are thoroughly combined. Add the milk and whisk again.\n2. Gently preheat the pan\n\tMelt a little butter inside it. Warm the skillet over medium heat.\n3. Cook\n\tPour in the egg mixture, and cook it over medium-low heat, folding and stirring the eggs every few seconds."
// });
// myProject.addTask(anotherTask);

// const finalTask = new Task({
    // title: "Wash the dishes", description: "Clean up the kitchen after you're done eating.",
    // dueDate: "2025-04-15", priority: "high",
// });
// myProject.addTask(finalTask);

// console.log(JSON.stringify(myProject));

// const trashTask = new Task();
// myProject.addTask(trashTask);
// console.log(myProject.tasks);   //should be [Task {}x4]

// console.log(myProject.selectTask(3));   //should be task with default values
// myProject.removeTask(3);
// console.log(myProject.tasks);   //should be [Task {}x3] without the default task that was previously removed