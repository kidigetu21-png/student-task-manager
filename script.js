
const taskForm = document.getElementById("task-form");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");
const taskDate = document.getElementById("task-date");
const taskPriority = document.getElementById("task-priority");
const taskList = document.getElementById("task-list");
const taskFilter = document.getElementById("task-filter");
let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];
function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}
taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = taskTitle.value.trim();
    const description = taskDescription.value.trim();
    const date = taskDate.value;
    const priority = taskPriority.value;

    if (title === "") {
        alert("Please enter a task title.");
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        description: description,
        date: date,
        priority: priority,
        completed: false
    };

    tasks.push(task);

    saveTasks();
    displayTasks();
    updateSummary();

    taskForm.reset();
});
function displayTasks() {
    taskList.replaceChildren();

    const filterValue = taskFilter.value;

    const filteredTasks = tasks.filter(function (task) {
        if (filterValue === "pending") {
            return !task.completed;
        }

        if (filterValue === "completed") {
            return task.completed;
        }

        return true;
    });

    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement("li");

        if (filterValue === "pending") {
            emptyMessage.textContent = "No pending tasks.";
        } else if (filterValue === "completed") {
            emptyMessage.textContent = "No completed tasks.";
        } else {
            emptyMessage.textContent = "No tasks yet. Add your first task!";
        }

        taskList.appendChild(emptyMessage);
        return;
    }

    filteredTasks.forEach(function (task) {
        const listItem = document.createElement("li");

        const titleElement = document.createElement("h3");
        titleElement.textContent = task.title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent =
            task.description || "No description provided";

        const dateElement = document.createElement("p");
        dateElement.textContent = "Due date: " + task.date;
const priorityElement = document.createElement("p");

priorityElement.textContent = "Priority: " + task.priority;

priorityElement.classList.add(
    "priority",
    "priority-" + task.priority.toLowerCase()
);
        const statusElement = document.createElement("p");
        statusElement.textContent = task.completed
            ? "Status: Completed"
            : "Status: Pending";

        // Complete or reopen a task
        const completeButton = document.createElement("button");
        completeButton.type = "button";
        completeButton.textContent = task.completed
            ? "Mark Pending"
            : "Complete";

        completeButton.addEventListener("click", function () {
            task.completed = !task.completed;

            saveTasks();
            displayTasks();
            updateSummary();
        });
        
const editButton = document.createElement("button");
editButton.textContent = "Edit";
editButton.type = "button";

editButton.addEventListener("click", function () {
    const newTitle = prompt("Enter the new task title:", task.title);

    if (newTitle === null) {
        return;
    }

    if (newTitle.trim() === "") {
        alert("Task title cannot be empty.");
        return;
    }

    const newDescription = prompt(
        "Enter the new description:",
        task.description
    );

    if (newDescription === null) {
        return;
    }

    const newDate = prompt(
        "Enter the new due date (YYYY-MM-DD):",
        task.date
    );

    if (newDate === null) {
        return;
    }

    const newPriority = prompt(
        "Enter priority: Low, Medium, or High",
        task.priority
    );

    if (newPriority === null) {
        return;
    }

    const validPriority = ["Low", "Medium", "High"];

    if (!validPriority.includes(newPriority.trim().toLowerCase().replace(/^./, c => c.toUpperCase()))) {
        alert("Priority must be Low, Medium, or High.");
        return;
    }

    task.title = newTitle.trim();
    task.description = newDescription.trim();
    task.date = newDate;
    task.priority = newPriority.trim().toLowerCase().replace(/^./, c => c.toUpperCase());

    saveTasks();
    displayTasks();
    updateSummary();
});

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            const confirmDelete = confirm(
                "Are you sure you want to delete this task?"
            );

            if (!confirmDelete) {
                return;
            }

            tasks = tasks.filter(function (item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
            updateSummary();
        });

        listItem.append(
            titleElement,
            descriptionElement,
            dateElement,
            priorityElement,
            statusElement,
            completeButton,
            deleteButton
        );

        taskList.appendChild(listItem);
    });
}
function updateSummary() {
    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(function (task) {
        return task.completed;
    }).length;

    const pendingTasks = totalTasks - completedTasks;

    document.getElementById("total-tasks").textContent = totalTasks;
    document.getElementById("pending-tasks").textContent = pendingTasks;
    document.getElementById("completed-tasks").textContent = completedTasks;
}
taskFilter.addEventListener("change", function () {
    displayTasks();
});
displayTasks();
updateSummary();
function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
} 
taskFilter.addEventListener("change", function () {
    displayTasks();
});