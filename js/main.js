const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const deleteAllBtn = document.getElementById("delete-all-btn");
const tableBody = document.getElementById("task-table-body");
const filterText = document.getElementById("filter-text");
const filterDate = document.getElementById("filter-date");
const clearFilterBtn = document.getElementById("clear-filter");

let tasks = [];

function renderTasks() {
  const text = filterText.value.toLowerCase();
  const date = filterDate.value;

  const filteredTasks = tasks.filter(task => {
    const matchText = task.name.toLowerCase().includes(text);
    const matchDate = date ? task.date === date : true;
    return matchText && matchDate;
  });

  tableBody.innerHTML = "";

  if (filteredTasks.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="4" style="text-align:center">No task found</td></tr>`;
    return;
  }

  filteredTasks.forEach((task, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${task.name}</td>
      <td>${task.date}</td>
      <td class="${task.done ? 'status-done' : ''}">${task.done ? 'Done' : 'Pending'}</td>
      <td>
        <button onclick="toggleStatus(${index})">✓</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}


function addTask() {
  const name = taskInput.value.trim();
  const date = dateInput.value;

  if (!name || !date) {
    alert("Please fill out both fields");
    return;
  }

  tasks.push({ name, date, done: false });
  taskInput.value = "";
  dateInput.value = "";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleStatus(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks();
}

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    tasks = [];
    renderTasks();
  }
}

addBtn.addEventListener("click", addTask);
deleteAllBtn.addEventListener("click", deleteAllTasks);
filterText.addEventListener("input", renderTasks);
filterDate.addEventListener("input", renderTasks);
clearFilterBtn.addEventListener("click", () => {
  filterText.value = "";
  filterDate.value = "";
  renderTasks();
});

// Initial render
renderTasks();
