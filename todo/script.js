const input = document.querySelector("#todoInput");
const ul = document.querySelector("#taskList");
const addBtn = document.querySelector("#addBtn");

let tasks = loadTasks();
renderTasks();

addBtn.addEventListener("click", addTask);

ul.addEventListener("click", function (event) {
  const id = Number(event.target.closest("li").dataset.id);

  if (event.target.classList.contains("delete-btn")) {
    deleteTasks(id);
    return;
  }

  toggleTasks(id);
});

function addTask() {
  const value = input.value.trim();
  if (!value) {
    return;
  }

  tasks.push({ id: Date.now(), text: value, complited: false });
  input.value = "";
  saveTasks();
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteTasks(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  renderTasks();
}

function toggleTasks(id) {
  console.log(id);
  const task = tasks.find((task) => task.id === id);
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function renderTasks() {
  ul.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task";
    li.dataset.id = task.id;

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";

    if (task.completed) {
      span.classList.add("completed");
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Удалить";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(deleteBtn);
    ul.appendChild(li);
  });
}

function loadTasks() {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
}
