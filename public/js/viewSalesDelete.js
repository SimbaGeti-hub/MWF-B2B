// // viewSales.js

// document.addEventListener("DOMContentLoaded", () => {
//   const deleteModal = document.getElementById("deleteModal");
//   const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
//   const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

//   let saleIdToDelete = null;

//   // Open modal when delete button is clicked
//   document.querySelectorAll(".delete-btn").forEach(btn => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       saleIdToDelete = btn.getAttribute("data-id");
//       deleteModal.style.display = "block";
//     });
//   });

//   // Cancel delete
//   cancelDeleteBtn.addEventListener("click", () => {
//     saleIdToDelete = null;
//     deleteModal.style.display = "none";
//   });

//   // Confirm delete
//   confirmDeleteBtn.addEventListener("click", async () => {
//     if (!saleIdToDelete) return;

//     try {
//       const res = await fetch(`/sales/delete/${saleIdToDelete}`, {
//         method: "DELETE"
//       });

//       if (res.ok) {
//         // Remove the row from the table
//         const row = document.querySelector(`.delete-btn[data-id='${saleIdToDelete}']`).closest("tr");
//         row.remove();
//         saleIdToDelete = null;
//         deleteModal.style.display = "none";
//       } else {
//         const data = await res.json();
//         alert(data.error || "Failed to delete sale.");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Server error: Could not delete sale.");
//     }
//   });

//   // Close modal if clicked outside the modal content
//   window.addEventListener("click", (e) => {
//     if (e.target === deleteModal) {
//       deleteModal.style.display = "none";
//       saleIdToDelete = null;
//     }
//   });
// });






// document.addEventListener("DOMContentLoaded", () => {
//   const deleteModal = document.getElementById("deleteModal");
//   const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
//   const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

//   let saleIdToDelete = null;

//   // Open modal when delete button is clicked
//   document.querySelectorAll(".delete-btn").forEach(btn => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       saleIdToDelete = btn.getAttribute("data-id");
//       // Optional: validate saleIdToDelete format here as well
//       deleteModal.style.display = "block";
//     });
//   });

//   // Cancel delete
//   cancelDeleteBtn.addEventListener("click", () => {
//     saleIdToDelete = null;
//     deleteModal.style.display = "none";
//   });

//   // Confirm delete
//   confirmDeleteBtn.addEventListener("click", async () => {
//     if (!saleIdToDelete) return;

//     try {
//       const res = await fetch(`/sales/delete/${saleIdToDelete}`, {
//         method: "DELETE"
//       });

//       if (res.ok) {
//         // Remove the row from the table
//         const row = document.querySelector(`.delete-btn[data-id='${saleIdToDelete}']`).closest("tr");
//         if (row) {
//           row.remove();
//         }
//         saleIdToDelete = null;
//         deleteModal.style.display = "none";
//       } else {
//         const data = await res.json();
//         alert(data.error || "Failed to delete sale.");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Server error: Could not delete sale.");
//     }
//   });

//   // Close modal if clicked outside modal content
//   window.addEventListener("click", (e) => {
//     if (e.target === deleteModal) {
//       deleteModal.style.display = "none";
//       saleIdToDelete = null;
//     }
//   });
// });



// Grab modal elements
const deleteModal = document.getElementById("deleteModal");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

let saleIdToDelete = null;

// Handle delete button click
document.querySelectorAll(".delete-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    saleIdToDelete = btn.getAttribute("data-id");
    deleteModal.style.display = "flex"; // show modal (use flex for centering)
  });
});

// Cancel button closes modal
cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.style.display = "none";
  saleIdToDelete = null;
});

// Confirm delete sends DELETE request
confirmDeleteBtn.addEventListener("click", async () => {
  if (!saleIdToDelete) return;

  try {
    const res = await fetch(`/sales/delete/${saleIdToDelete}`, {
      method: "DELETE"
    });

    const result = await res.json();

    if (res.ok) {
      // Remove the row from the table
      const row = document.querySelector(`.delete-btn[data-id="${saleIdToDelete}"]`).closest("tr");
      row.remove();
      deleteModal.style.display = "none";
      saleIdToDelete = null;
    } else {
      alert(result.error || "Could not delete sale.");
    }
  } catch (err) {
    console.error("Delete error:", err);
    alert("Server error: Could not delete sale.");
  }
});
