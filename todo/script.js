const input = document.querySelector("#todoInput");
const ul = document.querySelector("#taskList");
const addBtn = document.querySelector("#addBtn");

addBtn.addEventListener("click", addTask);

ul.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-btn")) {
    event.target.closest("li").remove();
    return;
  }

  const li = event.target.closest("li");
  if (li) {
    li.querySelector(".task-text").classList.toggle("completed");
  }
});

function addTask() {
  if (!input.value.trim()) {
    return;
  }

  const li = document.createElement("li");
  li.className = "task";

  const span = document.createElement("span");
  span.textContent = input.value;
  span.className = "task-text";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Удалить";
  deleteBtn.className = "delete-btn";

  li.appendChild(span);
  li.appendChild(deleteBtn);
  ul.appendChild(li);

  input.value = "";
}
