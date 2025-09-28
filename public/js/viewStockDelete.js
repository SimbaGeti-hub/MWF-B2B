// // viewStockDelete.js

// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButtons = document.querySelectorAll(".delete-btn");
//   const deleteModal = document.getElementById("deleteModal");
//   const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
//   const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

//   let stockIdToDelete = null;

//   // Show modal on click
//   deleteButtons.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       stockIdToDelete = btn.getAttribute("data-id");
//       deleteModal.style.display = "block";
//     });
//   });

//   // Cancel delete
//   cancelDeleteBtn.addEventListener("click", () => {
//     stockIdToDelete = null;
//     deleteModal.style.display = "none";
//   });

//   // Confirm delete
//   confirmDeleteBtn.addEventListener("click", async () => {
//     if (!stockIdToDelete) return;

//     try {
//       const res = await fetch(`/stock/delete/${stockIdToDelete}`, {
//         method: "DELETE"
//       });

//       if (res.ok) {
//         // Remove row from table
//         const row = document.querySelector(`.delete-btn[data-id="${stockIdToDelete}"]`).closest("tr");
//         if (row) row.remove();

//         console.log(`✅ Stock ${stockIdToDelete} deleted`);
//       } else {
//         console.error("❌ Failed to delete stock");
//       }
//     } catch (err) {
//       console.error("❌ Error deleting stock:", err);
//     } finally {
//       stockIdToDelete = null;
//       deleteModal.style.display = "none";
//     }
//   });

//   // Close modal if clicked outside content
//   window.addEventListener("click", (e) => {
//     if (e.target === deleteModal) {
//       stockIdToDelete = null;
//       deleteModal.style.display = "none";
//     }
//   });
// });



// Select modal and buttons
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

let stockIdToDelete = null;

// Open modal when a delete button is clicked
document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    stockIdToDelete = btn.dataset.id;
    deleteModal.style.display = "block";
  });
});

// Cancel delete
cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.style.display = "none";
  stockIdToDelete = null;
});

// Confirm delete
confirmDeleteBtn.addEventListener("click", async () => {
  if (!stockIdToDelete) return;

  try {
    const response = await fetch(`/stock/delete/${stockIdToDelete}`, {
      method: "DELETE"
    });

    if (response.ok) {
      location.reload(); // refresh page after deletion
    } else {
      alert("Error deleting stock item");
    }
  } catch (err) {
    console.error(err);
    alert("Error deleting stock item");
  }
});

