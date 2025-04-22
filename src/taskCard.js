class TaskView {
    constructor(task, db) {
        this.task = task;
        this.db = db;
    }
    // I THINK THAT THERE SHOULD BE ONLY ONE CLASS, 'VIEW' WHICH HAS METHODS FOR CREATING
    // CARD AND PROJECT VIEWS. THIS 'VIEW' HAS NO ACCESS TO MODEL, IT ONLY DISPLAYS STUFF
    // ALL THE EVENT LISTENERS SHOULD BE ADDED AFTER THE VIEW IS IN PLACE
    // SO THE PLAN IS: COMBINE VIEWPROJECTS() AND VIEWTASK() INTO SINGLE CLASS
    // THEN CREATE A CONTROLLER. CONTROLLER HAS ACCESS TO PROJECT LIST AND THUS
    // IT WILL SIMPLY SELECT ALL ICONS ON THE SCREEN AND ADD LISTENERS TO MANIPULATE IT
    // icons: document.querySelectorAll(".side-icons") & document.querySelectorAll(".card-icons");
    // projects: document.querySelectorAll(".project-name");
    // tasks: document.querySelectorAll("li[class^='task']");
}



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
            addToStorage(storage, projects);
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
        addToStorage(storage, projects);
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