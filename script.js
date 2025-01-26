// Retrieve a todo from local storage or initialize an empty array

let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoinput");
const todoList = document.getElementById("todolist");
const addButton = document.querySelector(".add-btn");
const deleteButton = document.getElementById("delete-button");
const dateElement = document.getElementById("current-date");

// Initialize
window.addEventListener("DOMContentLoaded", () => {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
  displayDate();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({
      text: newTask,
      completed: false,
    });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
    showAlert("Task added successfully!", "success");
  } else {
    showAlert("Please enter a task!", "error");
  }
}

function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${item.completed ? "checked" : ""}>
        <p id="todo-${index}" class="${item.completed ? "completed" : ""}">${item.text}</p>
        <button class="delete-task" onclick="deleteTask(${index})"><i class="fas fa-times"></i></button>
      </div>
    `;
    taskItem.querySelector(".todo-checkbox").addEventListener("change", () => toggleTask(index));
    todoList.appendChild(taskItem);
  });
  updateTaskCount();
}

function toggleTask(index) {
  todo[index].completed = !todo[index].completed;
  saveToLocalStorage();
  displayTasks();
}

function deleteTask(index) {
  todo.splice(index, 1);
  saveToLocalStorage();
  displayTasks();
  showAlert("Task deleted successfully!", "success");
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    todo = [];
    saveToLocalStorage();
    displayTasks();
    showAlert("All tasks deleted!", "success");
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function updateTaskCount() {
  const counter = document.querySelector(".counter-container span");
  counter.textContent = todo.length;
}

function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.remove();
  }, 3000);
}

function displayDate() {
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  const today = new Date();
  dateElement.textContent = today.toLocaleDateString("en-US", options);
}
