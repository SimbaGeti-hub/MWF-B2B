document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addTaskForm");
  const mainError = document.getElementById("mainError");
  const taskSuccess = document.getElementById("taskSuccess");
  const tableBody = document.querySelector("#taskTable tbody");

  // Input fields
  const inputs = {
    taskName: document.getElementById("taskName"),
    location: document.getElementById("taskLocation"),
    date: document.getElementById("taskDate"),
    time: document.getElementById("taskTime"),
    assignedPerson: document.getElementById("taskAssignedPerson"),
    description: document.getElementById("taskDescription")
  };

  // Error elements
  const errors = {
    taskName: document.getElementById("errorTaskName"),
    location: document.getElementById("errorTaskLocation"),
    date: document.getElementById("errorTaskDate"),
    time: document.getElementById("errorTaskTime"),
    assignedPerson: document.getElementById("errorTaskAssignedPerson"),
    description: document.getElementById("errorTaskDescription")
  };

  // Helper to clear errors
  function clearErrors() {
    Object.values(errors).forEach(err => err.textContent = "");
    mainError.textContent = "";
  }

  // Helper to clear form
  function clearForm() {
    Object.values(inputs).forEach(input => input.value = "");
  }

  // Handle form submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearErrors();
    taskSuccess.textContent = "";

    let hasError = false;

    // Validate required fields
    Object.keys(inputs).forEach(key => {
      if (!inputs[key].value.trim()) {
        errors[key].textContent = `Please fill in ${key}`;
        hasError = true;
      }
    });

    if (hasError) {
      mainError.textContent = "Please fix the highlighted errors.";
      return;
    }

    // Prepare data
    const data = {
      taskName: inputs.taskName.value.trim(),
      location: inputs.location.value.trim(),
      date: inputs.date.value,
      time: inputs.time.value,
      assignedPerson: inputs.assignedPerson.value.trim(),
      description: inputs.description.value.trim()
    };

    try {
      const res = await fetch("/toDo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      const result = await res.json();

      if (!result.success) {
        mainError.textContent = result.error || "Something went wrong.";
        return;
      }

      // Success
      taskSuccess.textContent = "Task added successfully!";
      clearForm();

      // Add new row to table
      const task = result.todo;
      const newRow = document.createElement("tr");
      newRow.setAttribute("data-id", task._id);
      newRow.innerHTML = `
        <td>${task.taskName}</td>
        <td>${task.location}</td>
        <td>${new Date(task.date).toLocaleDateString()}</td>
        <td>${task.time}</td>
        <td>${task.assignedPerson}</td>
        <td>${task.description}</td>
        <td>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </td>
      `;
      tableBody.prepend(newRow);

    } catch (err) {
      console.error(err);
      mainError.textContent = "Server error. Please try again.";
    }
  });

  // Handle table actions (edit/delete)
  tableBody.addEventListener("click", async (e) => {
    const row = e.target.closest("tr");
    if (!row) return;
    const id = row.getAttribute("data-id");

    // Delete action
    if (e.target.classList.contains("delete-btn")) {
      if (confirm("Are you sure you want to delete this task?")) {
        try {
          const res = await fetch(`/toDo/${id}`, { method: "DELETE" });
          const result = await res.json();
          if (result.success) {
            row.remove();
          } else {
            alert("Failed to delete task.");
          }
        } catch (err) {
          console.error(err);
          alert("Server error while deleting.");
        }
      }
    }

    // Edit action (basic: populate form for editing)
    if (e.target.classList.contains("edit-btn")) {
      inputs.taskName.value = row.children[0].textContent;
      inputs.location.value = row.children[1].textContent;
      inputs.date.value = new Date(row.children[2].textContent).toISOString().split("T")[0];
      inputs.time.value = row.children[3].textContent;
      inputs.assignedPerson.value = row.children[4].textContent;
      inputs.description.value = row.children[5].textContent;

      // Remove the old row once editing starts
      row.remove();
    }
  });
});
