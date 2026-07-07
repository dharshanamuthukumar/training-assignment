import { TaskManager, groupBy } from "./tasks.js";

const manager = new TaskManager();

const form = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");

const taskName = document.querySelector("#task-name");
const priority = document.querySelector("#priority");
const dueDate = document.querySelector("#due-date");

const allBtn = document.querySelector("#all-btn");
const pendingBtn = document.querySelector("#pending-btn");
const doneBtn = document.querySelector("#done-btn");

const sortSelect = document.querySelector("#sort");
const clearAllBtn = document.querySelector("#clear-all");

const counter = document.querySelector("#counter");
const summaryBody = document.querySelector("#task-table-body");

let currentFilter = "all";
let currentSort = "";

// ----------------------
// Render Tasks
// ----------------------

function renderTasks() {
  let tasks = manager.filter(currentFilter);

  if (currentSort === "priority") {
    tasks = [...tasks].sort((a, b) => {
      const order = {
        High: 1,
        Medium: 2,
        Low: 3,
      };

      return order[a.priority] - order[b.priority];
    });
  }

  if (currentSort === "date") {
    tasks = [...tasks].sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
    );
  }

  taskList.innerHTML = "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  tasks.forEach((task) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <strong>${task.name}</strong> |
            ${task.priority} |
            ${task.dueDate}
        `;

    if (task.done) {
      li.classList.add("done");
    }

    const taskDate = new Date(task.dueDate);
    taskDate.setHours(0, 0, 0, 0);

    if (taskDate <= today) {
      li.style.color = "red";
    }

    const doneButton = document.createElement("button");
    doneButton.textContent = "Done";

    doneButton.addEventListener("click", () => {
      manager.toggle(task.id);
      renderTasks();
    });

    li.appendChild(doneButton);

    taskList.appendChild(li);
  });

  counter.textContent = `Showing ${tasks.length} of ${manager.getAll().length} tasks`;

  renderSummary();
}

// ----------------------
// Summary Table
// ----------------------

function renderSummary() {
  const grouped = groupBy(manager.getAll(), "priority");

  summaryBody.innerHTML = "";

  ["High", "Medium", "Low"].forEach((level) => {
    const group = grouped[level] || [];

    summaryBody.innerHTML += `
            <tr>
                <td>${group.length}</td>
                <td>${level}</td>
                <td>-</td>
                <td>-</td>
            </tr>
        `;
  });
}

// ----------------------
// Add Task
// ----------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();

  manager.add({
    name: taskName.value,
    priority: priority.value,
    dueDate: dueDate.value,
  });

  form.reset();

  renderTasks();
});

// ----------------------
// Filter Buttons
// ----------------------

allBtn.addEventListener("click", () => {
  currentFilter = "all";

  renderTasks();
});

pendingBtn.addEventListener("click", () => {
  currentFilter = "pending";

  renderTasks();
});

doneBtn.addEventListener("click", () => {
  currentFilter = "done";

  renderTasks();
});

// ----------------------
// Sorting
// ----------------------

sortSelect.addEventListener("change", () => {
  currentSort = sortSelect.value;

  renderTasks();
});

// ----------------------
// Clear All
// ----------------------

clearAllBtn.addEventListener("click", () => {
  localStorage.removeItem("tasks");

  location.reload();
});

// ----------------------
// Initial Load
// ----------------------

renderTasks();
