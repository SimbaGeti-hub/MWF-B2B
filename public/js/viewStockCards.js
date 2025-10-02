
document.addEventListener("DOMContentLoaded", () => {
  // Cards container and stock rows
  const cardsContainer = document.querySelector(".cards-container");
  const stockTable = document.querySelector("#stockTable");
  const stockRows = stockTable ? stockTable.querySelectorAll("tbody tr") : [];

  // Group and display cards
  if (cardsContainer && stockRows.length) {
    const groupedStocks = {};
    stockRows.forEach(row => {
      if (row.children.length < 2) return;
      const productName = row.children[0].innerText;
      const productType = row.children[1].innerText;
      const quantity = parseInt(row.children[4].innerText, 10) || 0;

      if (!groupedStocks[productName]) {
        groupedStocks[productName] = { totalQty: 0, type: productType };
      }
      groupedStocks[productName].totalQty += quantity;
    });

    cardsContainer.innerHTML = "";
    Object.keys(groupedStocks).forEach(productName => {
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
        alertClass = "alert-yellow";
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
  }

  // Adjust cards width function (defined once)
  function adjustCards() {
    const sidebar = document.querySelector(".sidebar");
    const mainContent = document.querySelector("main.main-content");
    const cardsContainer = document.querySelector(".cards-container");
    if (!sidebar || !cardsContainer || !mainContent) return;

    const sidebarWidth = sidebar.offsetWidth;
    const availableWidth = mainContent.offsetWidth;
    const gap = 20;
    const cards = Array.from(cardsContainer.children);
    const cardCount = cards.length;

    let cardWidth = Math.min(
      300,
      Math.max(200, (availableWidth - gap * (cardCount - 1)) / Math.min(cardCount, Math.floor(availableWidth / 220)))
    );

    cards.forEach(card => {
      card.style.width = `${cardWidth}px`;
    });
  }

  // Setup event listeners for adjusting cards
  window.addEventListener("load", adjustCards);
  window.addEventListener("resize", adjustCards);

  const sidebar = document.querySelector(".sidebar");
  if (sidebar) {
    const observer = new MutationObserver(adjustCards);
    observer.observe(sidebar, { attributes: true, attributeFilter: ["class"] });
  }

  // Search filter setup
  const searchInput = document.querySelector("#searchInput");
  if (searchInput && stockRows.length) {
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();

      stockRows.forEach(row => {
        if (row.children.length < 2) return;

        const name = row.children[0].textContent.toLowerCase();
        const type = row.children[1].textContent.toLowerCase();

        if (name.includes(filter) || type.includes(filter)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  }
});




