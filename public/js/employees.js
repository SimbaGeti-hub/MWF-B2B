// Elements
const addEmployeeForm = document.getElementById("addEmployeeForm");
const successMessage = document.getElementById("successMessage");
const mainError = document.getElementById("mainError");

// Input fields
const nameInput = document.getElementById("employeeName");
const dobInput = document.getElementById("employeeDob");
const ninInput = document.getElementById("employeeNIN");
const positionInput = document.getElementById("employeePosition");
const contactInput = document.getElementById("employeeContact");
const emailInput = document.getElementById("employeeEmail");
const roleInput = document.getElementById("employeeRole");
const nokNameInput = document.getElementById("nokName");
const nokContactInput = document.getElementById("nokContact");
const nokRelationInput = document.getElementById("nokRelation");

// Error fields
const errorFields = {
  name: document.getElementById("errorEmployeeName"),
  dob: document.getElementById("errorEmployeeDob"),
  nin: document.getElementById("errorEmployeeNIN"),
  position: document.getElementById("errorEmployeePosition"),
  contact: document.getElementById("errorEmployeeContact"),
  email: document.getElementById("errorEmployeeEmail"),
  role: document.getElementById("errorEmployeeRole"),
  nokName: document.getElementById("errorNokName"),
  nokContact: document.getElementById("errorNokContact"),
  nokRelation: document.getElementById("errorNokRelation"),
};

// Reset errors
function resetErrors() {
  mainError.style.display = "none";
  mainError.textContent = "";
  Object.values(errorFields).forEach(e => (e.textContent = ""));
  const inputs = addEmployeeForm.querySelectorAll("input");
  inputs.forEach(input => input.classList.remove("invalid"));
}

// Calculate age from DOB
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
  return age;
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

  if (!dobInput.value || calculateAge(dobInput.value) < 18) {
    errorFields.dob.textContent = "Employee must be 18 or older.";
    dobInput.classList.add("invalid");
    isValid = false;
  }

  if (!ninInput.value.trim()) {
    errorFields.nin.textContent = "NIN is required.";
    ninInput.classList.add("invalid");
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

  if (!nokNameInput.value.trim()) {
    errorFields.nokName.textContent = "Next of kin name is required.";
    nokNameInput.classList.add("invalid");
    isValid = false;
  }
  if (!nokContactInput.value.trim()) {
    errorFields.nokContact.textContent = "Next of kin contact is required.";
    nokContactInput.classList.add("invalid");
    isValid = false;
  }
  if (!nokRelationInput.value.trim()) {
    errorFields.nokRelation.textContent = "Relationship is required.";
    nokRelationInput.classList.add("invalid");
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
    dob: dobInput.value,
    nin: ninInput.value.trim(),
    position: positionInput.value.trim(),
    contact: contactInput.value.trim(),
    email: emailInput.value.trim(),
    role: roleInput.value.trim(),
    nextOfKin: {
      name: nokNameInput.value.trim(),
      contact: nokContactInput.value.trim(),
      relation: nokRelationInput.value.trim(),
    }
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
[
  nameInput, dobInput, ninInput, positionInput, contactInput, emailInput, roleInput,
  nokNameInput, nokContactInput, nokRelationInput
].forEach(input => {
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      input.classList.remove("invalid");
      const keyMap = {
        employeeName: "name",
        employeeDob: "dob",
        employeeNIN: "nin",
        employeePosition: "position",
        employeeContact: "contact",
        employeeEmail: "email",
        employeeRole: "role",
        nokName: "nokName",
        nokContact: "nokContact",
        nokRelation: "nokRelation"
      };
      const key = keyMap[input.id];
      if (key && errorFields[key]) errorFields[key].textContent = "";
    }
  });
});
