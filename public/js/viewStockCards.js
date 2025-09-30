// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButtons = document.querySelectorAll(".delete-btn");
//   const modal = document.getElementById("deleteModal");
//   const confirmBtn = document.getElementById("confirmDeleteBtn");
//   const cancelBtn = document.getElementById("cancelDeleteBtn");
//   let stockIdToDelete = null;

//   // Handle delete button click
//   deleteButtons.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       stockIdToDelete = btn.getAttribute("data-id");
//       modal.style.display = "flex";
//     });
//   });

//   // Confirm delete
//   confirmBtn.addEventListener("click", async () => {
//     if (!stockIdToDelete) return;

//     try {
//       const res = await fetch(`/stock/delete/${stockIdToDelete}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" }
//       });

//       const data = await res.json();
//       console.log("Delete Response:", data); // log to terminal
//       alert(data.message || "Stock deleted successfully!");

//       // Refresh page after deletion
//       if (data.success) {
//         window.location.reload();
//       }
//     } catch (err) {
//       console.error("Error deleting stock:", err);
//       alert("Failed to delete stock. Try again.");
//     } finally {
//       modal.style.display = "none";
//       stockIdToDelete = null;
//     }
//   });

//   // Cancel delete
//   cancelBtn.addEventListener("click", () => {
//     modal.style.display = "none";
//     stockIdToDelete = null;
//   });
// });



// document.addEventListener("DOMContentLoaded", () => {
//   const deleteButtons = document.querySelectorAll(".delete-btn");
//   const modal = document.getElementById("deleteModal");
//   const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
//   const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
//   let deleteId = null;

//   // Delete button event
//   deleteButtons.forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       e.preventDefault();
//       deleteId = btn.getAttribute("data-id");
//       modal.style.display = "block";
//     });
//   });

//   // Confirm delete
//   confirmDeleteBtn.addEventListener("click", () => {
//     if (deleteId) {
//       fetch(`/stock/delete/${deleteId}`, { method: "DELETE" })
//         .then((res) => res.json())
//         .then((data) => {
//           console.log("Delete response:", data);
//           if (data.success) {
//             location.reload();
//           }
//         })
//         .catch((err) => console.error("Error deleting:", err));
//     }
//   });

//   // Cancel delete
//   cancelDeleteBtn.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // ==== Stock Cards Logic ====
//   const stockRows = document.querySelectorAll("#stockTable tbody tr");
//   const cardsContainer = document.querySelector(".cards-container");

//   if (stockRows.length > 0 && cardsContainer) {
//     stockRows.forEach((row) => {
//       const name = row.children[0].innerText;
//       const type = row.children[1].innerText;
//       const cost = row.children[2].innerText;
//       const price = row.children[3].innerText;
//       const qty = parseInt(row.children[4].innerText, 10);
//       const supplier = row.children[5].innerText;

//       // Determine stock status
//       let status = "";
//       if (qty >= 20) {
//         status = "Plenty in stock";
//       } else if (qty > 10 && qty < 20) {
//         status = "Restock soon";
//       } else if (qty <= 5) {
//         status = "Restock urgently";
//       } else {
//         status = "Moderate stock";
//       }

//       // Create card
//       const card = document.createElement("div");
//       card.classList.add("stock-card");
//       card.innerHTML = `
//         <h4>${name} (${type})</h4>
//         <p><strong>Cost:</strong> ${cost}</p>
//         <p><strong>Price:</strong> ${price}</p>
//         <p><strong>Quantity:</strong> ${qty}</p>
//         <p><strong>Supplier:</strong> ${supplier}</p>
//         <p class="status">${status}</p>
//       `;
//       cardsContainer.appendChild(card);
//     });
//   }
// });




// document.addEventListener("DOMContentLoaded", () => {
//   const cardsContainer = document.querySelector(".cards-container");
//   if (!cardsContainer) return;

//   // Get all stocks from table
//   const stockRows = document.querySelectorAll("#stockTable tbody tr");

//   // Group by productName
//   const groupedStocks = {};
//   stockRows.forEach((row) => {
//     const productName = row.children[0].innerText;
//     const productType = row.children[1].innerText;
//     const costPrice = row.children[2].innerText;
//     const productPrice = row.children[3].innerText;
//     const quantity = parseInt(row.children[4].innerText, 10);
//     const supplierName = row.children[5].innerText;

//     if (!groupedStocks[productName]) {
//       groupedStocks[productName] = {
//         totalQty: 0,
//         type: productType,
//         costPrice,
//         productPrice,
//         supplierName,
//       };
//     }

//     groupedStocks[productName].totalQty += quantity;
//   });

//   // Clear container first
//   cardsContainer.innerHTML = "";

//   // Generate one card per product
//   Object.keys(groupedStocks).forEach((productName) => {
//     const stock = groupedStocks[productName];
//     let status = "";
//     if (stock.totalQty >= 20) status = "Plenty in stock";
//     else if (stock.totalQty > 10) status = "Restock soon";
//     else if (stock.totalQty <= 5) status = "Restock urgently";
//     else status = "Moderate stock";

//     const card = document.createElement("div");
//     card.classList.add("stock-card");
//     card.innerHTML = `
//       <h4>${productName} (${stock.type})</h4>
//       <p><strong>Total Quantity:</strong> ${stock.totalQty}</p>
//       <p class="status">${status}</p>
//       <button class="delete-card-btn" data-product="${productName}">Delete Card</button>
//     `;

//     cardsContainer.appendChild(card);
//   });
// });


// let statusClass = "";
// if (status === "Plenty in stock") statusClass = "Plenty";
// else if (status === "Restock soon") statusClass = "RestockSoon";
// else if (status === "Restock urgently") statusClass = "RestockUrgent";
// else statusClass = "Moderate";

// card.innerHTML = `
//   <h4>${productName} (${stock.type})</h4>
//   <p><strong>Total Quantity:</strong> ${stock.totalQty}</p>
//   <p class="status ${statusClass}">${status}</p>
//   <button class="delete-card-btn" data-product="${productName}">Delete Card</button>
// `;



document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards-container");
  if (!cardsContainer) return;

  const stockRows = document.querySelectorAll("#stockTable tbody tr");

  // Group by productName
  const groupedStocks = {};
  stockRows.forEach((row) => {
    const productName = row.children[0].innerText;
    const productType = row.children[1].innerText;
    const quantity = parseInt(row.children[4].innerText, 10);

    if (!groupedStocks[productName]) {
      groupedStocks[productName] = { totalQty: 0, type: productType };
    }

    groupedStocks[productName].totalQty += quantity;
  });

  // Clear container first
  cardsContainer.innerHTML = "";

  Object.keys(groupedStocks).forEach((productName) => {
    const stock = groupedStocks[productName];
    let status = "";
    let alertClass = "";

    if (stock.totalQty > 20) {
      status = "Plenty in stock";
      alertClass = "alert-green";
    } else if (stock.totalQty > 10) {
      status = "Restock soon";
      alertClass = "alert-yellow";
    } else if (stock.totalQty <= 5) {
      status = "Restock urgently";
      alertClass = "alert-red";
    } else {
      status = "Moderate stock";
      alertClass = "alert-yellow"; // you can pick a color for moderate stock
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h4>${productName} (${stock.type})</h4>
      <p><strong>Total Quantity:</strong> ${stock.totalQty}</p>
      <span class="${alertClass}">${status}</span>
      <button class="delete-card-btn" data-product="${productName}">Delete Card</button>
    `;

    cardsContainer.appendChild(card);
  });
});


// function adjustCardWidth() {
//   const sidebar = document.querySelector(".sidebar");
//   const mainContent = document.querySelector("main.main-content");
//   const cardsContainer = document.querySelector(".cards-container");
//   if (!sidebar || !cardsContainer || !mainContent) return;

//   const sidebarWidth = sidebar.offsetWidth;             // current sidebar width
//   const availableWidth = mainContent.offsetWidth;       // main content width
//   const cardCount = cardsContainer.children.length;
//   const gap = 20;                                      // same as CSS gap

//   // calculate width per card (min 200px, max 300px)
//   const cardWidth = Math.min(300, Math.max(200, (availableWidth - gap * (cardCount - 1)) / cardCount));

//   Array.from(cardsContainer.children).forEach(card => {
//     card.style.width = `${cardWidth}px`;
//   });
// }

// // adjust on load, resize, and sidebar change
// window.addEventListener("load", adjustCardWidth);
// window.addEventListener("resize", adjustCardWidth);

// const sidebar = document.querySelector(".sidebar");
// const observer = new MutationObserver(adjustCardWidth);
// observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });


function adjustCards() {
  const sidebar = document.querySelector(".sidebar");
  const mainContent = document.querySelector("main.main-content");
  const cardsContainer = document.querySelector(".cards-container");
  if (!sidebar || !cardsContainer || !mainContent) return;

  const sidebarWidth = sidebar.offsetWidth;          // sidebar current width
  const availableWidth = mainContent.offsetWidth;    // main content width
  const gap = 20;                                    // gap between cards
  const cards = Array.from(cardsContainer.children);
  const cardCount = cards.length;

  // calculate flexible card width (min 200px, max 300px)
  let cardWidth = Math.min(300, Math.max(200, (availableWidth - gap * (cardCount - 1)) / Math.min(cardCount, Math.floor(availableWidth / 220))));

  cards.forEach(card => {
    card.style.width = `${cardWidth}px`;
  });
}

// Adjust on load and resize
window.addEventListener("load", adjustCards);
window.addEventListener("resize", adjustCards);

// Observe sidebar expand/collapse
const sidebar = document.querySelector(".sidebar");
const observer = new MutationObserver(adjustCards);
observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });











