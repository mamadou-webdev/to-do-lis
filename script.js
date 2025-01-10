let taskToEdit = null;

document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const taskName = document.getElementById("task-name").value;
    const taskDate = document.getElementById("task-date").value;
    const taskCategory = document.getElementById("task-category").value;
    const taskPriority = document.getElementById("task-priority").value;

    if (taskToEdit) {
        // Si une tâche est en mode édition
        taskToEdit.name = taskName;
        taskToEdit.date = taskDate;
        taskToEdit.category = taskCategory;
        taskToEdit.priority = taskPriority;

        updateTaskInList(taskToEdit);
        taskToEdit = null; // Réinitialiser après la modification
        document.getElementById("submit-button").textContent = "Ajouter la tâche";
    } else {
        // Si c'est une nouvelle tâche
        const task = {
            name: taskName,
            date: taskDate,
            category: taskCategory,
            priority: taskPriority,
            completed: false,
        };
        addTaskToList(task);
    }

    event.target.reset();
});

function addTaskToList(task) {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    taskElement.innerHTML = `
        <h3>${task.name}</h3>
        <p><strong>Date limite:</strong> ${task.date}</p>
        <p><strong>Catégorie:</strong> ${task.category}</p>
        <p><strong>Priorité:</strong> ${task.priority}</p>
        <button onclick="toggleTaskStatus(event)">Marquer comme complétée</button>
        <button onclick="removeTask(event)">Supprimer</button>
        <button class="modify" onclick="editTask(event)">Modifier</button>
    `;

    document.getElementById("tasks-container").appendChild(taskElement);
}

function toggleTaskStatus(event) {
    const taskElement = event.target.closest(".task");
    taskElement.classList.toggle("task-completed");
    taskElement.querySelector("button").textContent = taskElement.classList.contains("task-completed") ? "Marquer comme en cours" : "Marquer comme complétée";
}

function removeTask(event) {
    const taskElement = event.target.closest(".task");
    taskElement.remove();
}

function editTask(event) {
    const taskElement = event.target.closest(".task");

    const taskName = taskElement.querySelector("h3").textContent;
    const taskDate = taskElement.querySelector("p:nth-child(2)").textContent.split(": ")[1];
    const taskCategory = taskElement.querySelector("p:nth-child(3)").textContent.split(": ")[1];
    const taskPriority = taskElement.querySelector("p:nth-child(4)").textContent.split(": ")[1];

    document.getElementById("task-name").value = taskName;
    document.getElementById("task-date").value = taskDate;
    document.getElementById("task-category").value = taskCategory;
    document.getElementById("task-priority").value = taskPriority;

    taskToEdit = {
        name: taskName,
        date: taskDate,
        category: taskCategory,
        priority: taskPriority,
        element: taskElement
    };

    document.getElementById("submit-button").textContent = "Modifier la tâche";
}

function updateTaskInList(task) {
    task.element.querySelector("h3").textContent = task.name;
    task.element.querySelector("p:nth-child(2)").textContent = `Date limite: ${task.date}`;
    task.element.querySelector("p:nth-child(3)").textContent = `Catégorie: ${task.category}`;
    task.element.querySelector("p:nth-child(4)").textContent = `Priorité: ${task.priority}`;
}


  