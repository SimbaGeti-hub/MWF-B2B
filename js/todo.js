// Form selector
const formSelector = document.getElementById("formSelector");
const deliveryForm = document.getElementById("deliveryForm");
const taskForm = document.getElementById("taskForm");

formSelector.addEventListener("change", () => {
  deliveryForm.style.display = formSelector.value === "deliveryForm" ? "block" : "none";
  taskForm.style.display = formSelector.value === "taskForm" ? "block" : "none";
});

// Elements - Delivery
const addDeliveryForm = document.getElementById("addDeliveryForm");
const deliverySuccessMessage = document.getElementById("deliverySuccessMessage");
const deliveryInputs = {
  customerName: document.getElementById("deliveryCustomerName"),
  product: document.getElementById("deliveryProduct"),
  location: document.getElementById("deliveryLocation"),
  date: document.getElementById("deliveryDate"),
  time: document.getElementById("deliveryTime"),
  assignedPerson: document.getElementById("deliveryAssignedPerson"),
  customerNumber: document.getElementById("deliveryCustomerNumber"),
  numberOfItems: document.getElementById("deliveryNumberOfItems")
};
const deliveryErrorFields = {
  customerName: document.getElementById("errorDeliveryCustomerName"),
  product: document.getElementById("errorDeliveryProduct"),
  location: document.getElementById("errorDeliveryLocation"),
  date: document.getElementById("errorDeliveryDate"),
  time: document.getElementById("errorDeliveryTime"),
  assignedPerson: document.getElementById("errorDeliveryAssignedPerson"),
  customerNumber: document.getElementById("errorDeliveryCustomerNumber"),
  numberOfItems: document.getElementById("errorDeliveryNumberOfItems")
};
const deliveryMainError = document.getElementById("deliveryMainError");

// Elements - Task
const addTaskForm = document.getElementById("addTaskForm");
const taskSuccessMessage = document.getElementById("taskSuccessMessage");
const taskInputs = {
  taskName: document.getElementById("taskName"),
  date: document.getElementById("taskDate"),
  time: document.getElementById("taskTime"),
  location: document.getElementById("taskLocation"),
  assignedPerson: document.getElementById("taskAssignedPerson")
};
const taskErrorFields = {
  taskName: document.getElementById("errorTaskName"),
  date: document.getElementById("errorTaskDate"),
  time: document.getElementById("errorTaskTime"),
  location: document.getElementById("errorTaskLocation"),
  assignedPerson: document.getElementById("errorTaskAssignedPerson")
};
const taskMainError = document.getElementById("taskMainError");

// Reset function
function resetErrors(inputs, errorFields, mainError) {
  mainError.style.display = "none";
  Object.values(errorFields).forEach(e => e.textContent = "");
  Object.values(inputs).forEach(input => input.classList.remove("invalid"));
}

// Delivery validation
function validateDelivery() {
  resetErrors(deliveryInputs, deliveryErrorFields, deliveryMainError);
  let isValid = true;

  if (!deliveryInputs.customerName.value.trim()) {
    deliveryErrorFields.customerName.textContent = "Customer name is required.";
    deliveryInputs.customerName.classList.add("invalid");
    isValid = false;
  }
  if (!deliveryInputs.product.value.trim()) {
    deliveryErrorFields.product.textContent = "Product is required.";
    deliveryInputs.product.classList.add("invalid");
    isValid = false;
  }
  if (!deliveryInputs.location.value.trim()) {
    deliveryErrorFields.location.textContent = "Location is required.";
    deliveryInputs.location.classList.add("invalid");
    isValid = false;
  }
  if (!deliveryInputs.date.value) {
    deliveryErrorFields.date.textContent = "Date is required.";
    deliveryInputs.date.classList.add("invalid");
    isValid = false;
  }
  if (!deliveryInputs.time.value) {
    deliveryErrorFields.time.textContent = "Time is required.";
    deliveryInputs.time.classList.add("invalid");
    isValid = false;
  }
  if (!deliveryInputs.assignedPerson.value.trim()) {
    deliveryErrorFields.assignedPerson.textContent = "Assigned person is required.";
    deliveryInputs.assignedPerson.classList.add("invalid");
    isValid = false;
  }
  if (!deliveryInputs.customerNumber.value.trim()) {
    deliveryErrorFields.customerNumber.textContent = "Customer number is required.";
    deliveryInputs.customerNumber.classList.add("invalid");
    isValid = false;
  }
  if (!deliveryInputs.numberOfItems.value || deliveryInputs.numberOfItems.value <= 0) {
    deliveryErrorFields.numberOfItems.textContent = "Number of items must be > 0.";
    deliveryInputs.numberOfItems.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    deliveryMainError.style.display = "block";
    deliveryMainError.textContent = "Please fix errors before submitting.";
  }

  return isValid;
}

// Task validation
function validateTask() {
  resetErrors(taskInputs, taskErrorFields, taskMainError);
  let isValid = true;

  if (!taskInputs.taskName.value.trim()) {
    taskErrorFields.taskName.textContent = "Task name is required.";
    taskInputs.taskName.classList.add("invalid");
    isValid = false;
  }
  if (!taskInputs.date.value) {
    taskErrorFields.date.textContent = "Date is required.";
    taskInputs.date.classList.add("invalid");
    isValid = false;
  }
  if (!taskInputs.time.value) {
    taskErrorFields.time.textContent = "Time is required.";
    taskInputs.time.classList.add("invalid");
    isValid = false;
  }
  if (!taskInputs.location.value.trim()) {
    taskErrorFields.location.textContent = "Location is required.";
    taskInputs.location.classList.add("invalid");
    isValid = false;
  }
  if (!taskInputs.assignedPerson.value.trim()) {
    taskErrorFields.assignedPerson.textContent = "Assigned person is required.";
    taskInputs.assignedPerson.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    taskMainError.style.display = "block";
    taskMainError.textContent = "Please fix errors before submitting.";
  }

  return isValid;
}

// Delivery submit
addDeliveryForm.addEventListener("submit", function(e){
  e.preventDefault();
  if (!validateDelivery()) return;

  const newDelivery = {
    customerName: deliveryInputs.customerName.value.trim(),
    product: deliveryInputs.product.value.trim(),
    location: deliveryInputs.location.value.trim(),
    date: deliveryInputs.date.value,
    time: deliveryInputs.time.value,
    assignedPerson: deliveryInputs.assignedPerson.value.trim(),
    customerNumber: deliveryInputs.customerNumber.value.trim(),
    numberOfItems: Number(deliveryInputs.numberOfItems.value)
  };

  deliveryData.push(newDelivery);
  saveDeliveryData();

  deliverySuccessMessage.textContent = `Success! Delivery for ${newDelivery.customerName} added.`;
  deliverySuccessMessage.style.display = "block";
  addDeliveryForm.reset();
  setTimeout(() => deliverySuccessMessage.style.display = "none", 3000);
});

// Task submit
addTaskForm.addEventListener("submit", function(e){
  e.preventDefault();
  if (!validateTask()) return;

  const newTask = {
    taskName: taskInputs.taskName.value.trim(),
    date: taskInputs.date.value,
    time: taskInputs.time.value,
    location: taskInputs.location.value.trim(),
    assignedPerson: taskInputs.assignedPerson.value.trim()
  };

  todoData.push(newTask);
  saveTodoData();

  taskSuccessMessage.textContent = `Success! Task "${newTask.taskName}" added.`;
  taskSuccessMessage.style.display = "block";
  addTaskForm.reset();
  setTimeout(() => taskSuccessMessage.style.display = "none", 3000);
});

// Live error removal for all inputs
[...Object.values(deliveryInputs), ...Object.values(taskInputs)].forEach(input => {
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      input.classList.remove("invalid");
      const id = input.id.replace(/([A-Z])/g, "_$1").toLowerCase(); // not used
      const fieldKey = Object.keys(deliveryInputs).find(key => deliveryInputs[key] === input)
                      || Object.keys(taskInputs).find(key => taskInputs[key] === input);
      if (fieldKey) {
        if (deliveryErrorFields[fieldKey]) deliveryErrorFields[fieldKey].textContent = "";
        if (taskErrorFields[fieldKey]) taskErrorFields[fieldKey].textContent = "";
      }
    }
  });
});
