// employees.js

// Elements
const addEmployeeForm = document.getElementById("addEmployeeForm");
const successMessage = document.getElementById("successMessage");
const mainError = document.getElementById("mainError");

// Input fields
const nameInput = document.getElementById("employeeName");
const ageInput = document.getElementById("employeeAge");
const positionInput = document.getElementById("employeePosition");
const contactInput = document.getElementById("employeeContact");
const emailInput = document.getElementById("employeeEmail");
const roleInput = document.getElementById("employeeRole");

// Error fields
const errorFields = {
  name: document.getElementById("errorEmployeeName"),
  age: document.getElementById("errorEmployeeAge"),
  position: document.getElementById("errorEmployeePosition"),
  contact: document.getElementById("errorEmployeeContact"),
  email: document.getElementById("errorEmployeeEmail"),
  role: document.getElementById("errorEmployeeRole"),
};

// Reset errors
function resetErrors() {
  mainError.style.display = "none";
  mainError.textContent = "";
  Object.values(errorFields).forEach(e => (e.textContent = ""));
  const inputs = addEmployeeForm.querySelectorAll("input");
  inputs.forEach(input => input.classList.remove("invalid"));
}

// Validate form
function validateForm() {
  resetErrors();
  let isValid = true;

  if (!nameInput.value.trim()) {
    errorFields.name.textContent = "Employee name is required.";
    nameInput.classList.add("invalid");
    isValid = false;
  }
  if (!ageInput.value || parseInt(ageInput.value) < 18) {
    errorFields.age.textContent = "Employee must be 18 or older.";
    ageInput.classList.add("invalid");
    isValid = false;
  }
  if (!positionInput.value.trim()) {
    errorFields.position.textContent = "Position is required.";
    positionInput.classList.add("invalid");
    isValid = false;
  }
  if (!contactInput.value.trim()) {
    errorFields.contact.textContent = "Contact is required.";
    contactInput.classList.add("invalid");
    isValid = false;
  }
  if (!emailInput.value.trim() || !emailInput.value.includes("@")) {
    errorFields.email.textContent = "Valid email is required.";
    emailInput.classList.add("invalid");
    isValid = false;
  }
  if (!roleInput.value.trim()) {
    errorFields.role.textContent = "Role is required.";
    roleInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    mainError.style.display = "block";
    mainError.textContent = "Please correct the highlighted fields.";
  }

  return isValid;
}

// Form submit
addEmployeeForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateForm()) return;

  const newEmployee = {
    name: nameInput.value.trim(),
    age: parseInt(ageInput.value),
    position: positionInput.value.trim(),
    contact: contactInput.value.trim(),
    email: emailInput.value.trim(),
    role: roleInput.value.trim(),
  };

  // Add employee to storage
  employeesData.push(newEmployee);
  saveEmployeesData();

  successMessage.textContent = `Success! Employee ${newEmployee.name} added.`;
  successMessage.style.display = "block";

  addEmployeeForm.reset();

  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
});

// Live error removal while typing
[nameInput, ageInput, positionInput, contactInput, emailInput, roleInput].forEach(input => {
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      input.classList.remove("invalid");
      const key = input.id.replace("employee", "").toLowerCase();
      if (errorFields[key]) errorFields[key].textContent = "";
    }
  });
});
