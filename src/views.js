import pencil from "./img/pencil.svg";
import trash from "./img/delete.svg";
import cross from "./img/close.svg";


class ProjectView {
    constructor(project) {
        this.name = project.name;
        this.tasks = project.tasks;
    }

    draw(targetContainer, specialTask=null) {
        const details = document.createElement("details");
        details.classList.add("project");
          const summary = document.createElement("summary");
            const projectName = document.createElement("span");
            projectName.classList.add("project-name");
            projectName.textContent = this.name;

            const iconsBox = document.createElement("span");
            iconsBox.classList.add("side-icons");
              const editIcon = document.createElement("img");
              editIcon.src = pencil;
              editIcon.alt = "Pencil icon";
              editIcon.title = "Change project's name";
              editIcon.classList.add("icon", "icon-side");

              const deleteIcon = document.createElement("img");
              deleteIcon.src = trash;
              deleteIcon.alt = "Trash icon";
              deleteIcon.title = "Delete project";
              deleteIcon.classList.add("icon", "icon-side");
            iconsBox.append(editIcon, deleteIcon);
          summary.append(projectName, iconsBox);

          const taskList = document.createElement("ul");
            for (const task of this.tasks) {
              const taskClass = (
                  task.completed === "true" ? "task-completed" : "task"
              );
              const li = document.createElement("li");
              li.classList.add(taskClass);
              if (task === specialTask) li.classList.add("special");
              li.textContent = task.title || "NewTask";
              taskList.appendChild(li);
            }
            const newTask = document.createElement("li");
            newTask.classList.add("task-new");
            newTask.textContent = "Add new task";
          taskList.appendChild(newTask);
        details.append(summary, taskList);
        targetContainer.appendChild(details);
    }
}

class TaskView {
    constructor(task) {
        this.task = task;
    }

    draw(targetContainer) {
        const card = document.createElement("div");
        card.classList.add("task-card");
          const iconsBox = document.createElement("div");
          iconsBox.classList.add("card-icons");
            const trashIcon = document.createElement("img");
            trashIcon.src = trash;
            trashIcon.alt = "Trash icon";
            trashIcon.title = "Delete task";
            trashIcon.classList.add("icon", "icon-card");

            const crossIcon = document.createElement("img");
            crossIcon.src = cross;
            crossIcon.alt = "Close icon";
            crossIcon.title = "Save and close";
            crossIcon.classList.add("icon", "icon-card");
          iconsBox.append(trashIcon, crossIcon);

          const template = `
            <h1 class="task-title" contenteditable="plaintext-only">${this.task.title}</h1>
            <h3 class="task-desc" contenteditable="plaintext-only">${this.task.description}</h3>
            <div class="card-controls">
                <div class="controls-top">
                    <div class="card-date">
                        <label for="dueDate">DueDate: 
                            <input type="date" name="dueDate" id="dueDate" value="${this.task.dueDate}" min="1950-01-01" max="2050-01-01"/>
                        </label>
                    </div>
                    <div class="card-priority">
                        <label for="priority">Priority: </label>
                        <select name="task-priority" id="priority">
                            <option value="low" ${this.task.priority === "low" ? "selected" : ""}>Low</option>
                            <option value="normal" ${this.task.priority === "normal" ? "selected" : ""}>Normal</option>
                            <option value="high" ${this.task.priority === "high" ? "selected" : ""}>High</option>
                        </select>
                    </div>
                </div>
                <fieldset>
                    <legend>Completion status</legend>
                    <ul>
                        <li>
                            <label for="incomplete">
                                <input type="radio" id="incomplete" name="completionStatus" value="false" ${this.task.completed === "false" ? "checked" : ""}>
                                Not finished
                            </label>
                        </li>
                        <li>
                            <label for="complete">
                                <input type="radio" id="complete" name="completionStatus" value="true" ${this.task.completed === "true" ? "checked" : ""}>
                                Already done
                            </label>
                        </li>
                    </ul>
                </fieldset>
            </div>
            <p><strong>Task notes: </strong>
                <span class="task-notes" role="textbox" contenteditable>${this.task.notes}</span>
            </p>
          `;

        card.appendChild(iconsBox);
        card.insertAdjacentHTML("beforeend", template);
        targetContainer.appendChild(card);
    }
}


export { ProjectView, TaskView };