document.addEventListener("DOMContentLoaded", () => {
  // Form toggles
  const formSelector = document.getElementById("formSelector");
  const deliveryForm = document.getElementById("deliveryForm");
  const taskForm = document.getElementById("taskForm");

  formSelector.addEventListener("change", () => {
    deliveryForm.style.display = formSelector.value === "deliveryForm" ? "block" : "none";
    taskForm.style.display = formSelector.value === "taskForm" ? "block" : "none";
  });

  // Elements
  const addDeliveryForm = document.getElementById("addDeliveryForm");
  const addTaskForm = document.getElementById("addTaskForm");

  const deliverySuccess = document.getElementById("deliverySuccess");
  const deliveryError = document.getElementById("deliveryError");
  const taskSuccess = document.getElementById("taskSuccess");
  const taskError = document.getElementById("taskError");

  // Helper to clear messages
  function clearDeliveryMessages() {
    deliverySuccess.textContent = "";
    deliveryError.textContent = "";
    addDeliveryForm.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  }

  function clearTaskMessages() {
    taskSuccess.textContent = "";
    taskError.textContent = "";
    addTaskForm.querySelectorAll(".error-message").forEach(e => e.textContent = "");
  }

  // --------------------
  // Submit Delivery
  // --------------------
  addDeliveryForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearDeliveryMessages();

    const deliveryData = {
      deliveryCustomerName: document.getElementById("deliveryCustomerName").value.trim(),
      deliveryProduct: document.getElementById("deliveryProduct").value.trim(),
      deliveryLocation: document.getElementById("deliveryLocation").value.trim(),
      deliveryDate: document.getElementById("deliveryDate").value,
      deliveryTime: document.getElementById("deliveryTime").value,
      deliveryAssignedPerson: document.getElementById("deliveryAssignedPerson").value.trim(),
      deliveryCustomerNumber: document.getElementById("deliveryCustomerNumber").value,
      deliveryNumberOfItems: document.getElementById("deliveryNumberOfItems").value
    };

    try {
      const res = await fetch("/delivery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deliveryData)
      });
      const result = await res.json();

      if (result.success) {
        deliverySuccess.textContent = "Delivery added successfully!";
        addDeliveryForm.reset();
      } else if (result.errors) {
        // Show inline errors
        for (const key in result.errors) {
          const el = document.getElementById(`error${key.charAt(0).toUpperCase() + key.slice(1)}`);
          if (el) el.textContent = result.errors[key];
        }
        deliveryError.textContent = "Please fix the errors above.";
      } else {
        deliveryError.textContent = result.error || "Error adding delivery.";
      }
    } catch (err) {
      console.error(err);
      deliveryError.textContent = "Server error. Try again later.";
    }
  });

  // --------------------
  // Submit Task
  // --------------------
  addTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearTaskMessages();

    const taskData = {
      taskName: document.getElementById("taskName").value.trim(),
      taskDate: document.getElementById("taskDate").value,
      taskTime: document.getElementById("taskTime").value,
      taskLocation: document.getElementById("taskLocation").value.trim(),
      taskAssignedPerson: document.getElementById("taskAssignedPerson").value.trim()
    };

    try {
      const res = await fetch("/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData)
      });
      const result = await res.json();

      if (result.success) {
        taskSuccess.textContent = "Task added successfully!";
        addTaskForm.reset();
      } else if (result.errors) {
        // Show inline errors
        for (const key in result.errors) {
          const el = document.getElementById(`error${key.charAt(0).toUpperCase() + key.slice(1)}`);
          if (el) el.textContent = result.errors[key];
        }
        taskError.textContent = "Please fix the errors above.";
      } else {
        taskError.textContent = result.error || "Error adding task.";
      }
    } catch (err) {
      console.error(err);
      taskError.textContent = "Server error. Try again later.";
    }
  });
});
