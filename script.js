let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
  const input = document.getElementById("taskInput");
  const date = document.getElementById("taskDate");

  if (input.value.trim() === "") {
    alert("Enter a task!");
    return;
  }

  tasks.push({
    text: input.value,
    date: date.value,
    completed: false
  });

  input.value = "";
  date.value = "";

  saveTasks();
  displayTasks();
}

function displayTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task" + (task.completed ? " completed" : "");

    div.innerHTML = `
      <div class="task-top">
        <span onclick="toggleComplete(${index})">${task.text}</span>
        <div class="actions">
          <button class="complete" onclick="toggleComplete(${index})">✔</button>
          <button class="edit" onclick="editTask(${index})">Edit</button>
          <button class="delete" onclick="deleteTask(${index})">Delete</button>
        </div>
      </div>
      ${task.date ? `<div class="task-date">${formatDate(task.date)}</div>` : ""}
    `;

    taskList.appendChild(div);
  });
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    saveTasks();
    displayTasks();
  }
}

function formatDate(date) {
  const d = new Date(date);
  return d.toLocaleString();
}

displayTasks();