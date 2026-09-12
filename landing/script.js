const openModalBtn = document.querySelector("#openModalBtn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const modalOverlay = document.querySelector("#modalOverlay");
const form = document.querySelector("#signupForm");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");

openModalBtn.addEventListener("click", (e) => {
  showModal(modalOverlay);
});

closeModalBtn.addEventListener("click", (e) => {
  closeModal(modalOverlay);
});

modalOverlay.addEventListener("click", (event) => {
  const modal = event.target.closest(".modal");
  if (modal) {
    return;
  }
  closeModal(modalOverlay);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal(modalOverlay);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const name = formData.get("name");
  const email = formData.get("email");

  if (!isValidName(name)) {
    nameError.textContent = "Введите имя";
  } else {
    nameError.textContent = "";
  }

  if (!isValidEmail(email)) {
    emailError.textContent = "Введите почту";
  } else {
    emailError.textContent = "";
  }

  if (isValidName(name) && isValidEmail(email)) {
    alert("Заявка отправлена!");
    form.reset();
    closeModal(modalOverlay);
  }
});

function showModal(modal) {
  modal.classList.remove("hidden");
}
function closeModal(modal) {
  modal.classList.add("hidden");
}

function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

function isValidName(name) {
  return name.trim().length > 0;
}
