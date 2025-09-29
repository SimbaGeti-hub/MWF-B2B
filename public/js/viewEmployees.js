document.addEventListener("DOMContentLoaded", () => {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  const deleteModal = document.getElementById("deleteModal");
  const confirmDeleteBtn = document.getElementById("confirmDelete");
  const cancelDeleteBtn = document.getElementById("cancelDelete");

  let employeeIdToDelete = null;

  // Show modal only when Delete is clicked
  deleteButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default link action
      employeeIdToDelete = btn.dataset.id; // Capture employee id
      deleteModal.style.display = "block"; // Show modal
    });
  });

  // Cancel button closes the modal
  cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.style.display = "none";
    employeeIdToDelete = null;
  });

  // Confirm button deletes the employee
  confirmDeleteBtn.addEventListener("click", async () => {
    if (!employeeIdToDelete) return;

    try {
      const response = await fetch(`/employees/delete/${employeeIdToDelete}`, {
        method: "DELETE"
      });

      if (response.ok) {
        // Remove employee row from table without reloading
        const row = document.querySelector(`.delete-btn[data-id="${employeeIdToDelete}"]`).closest("tr");
        row.remove();
        deleteModal.style.display = "none";
        employeeIdToDelete = null;
      } else {
        alert("Error deleting employee");
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting employee");
    }
  });

  // Optional: Close modal if clicking outside modal content
  window.addEventListener("click", (e) => {
    if (e.target === deleteModal) {
      deleteModal.style.display = "none";
      employeeIdToDelete = null;
    }
  });
});
