document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards-container");
  const salesTable = document.querySelector("#salesTable");
  const salesRows = salesTable.querySelectorAll("tbody tr");
  const searchInput = document.querySelector("#searchInput");

  function updateSalesCards() {
    const today = new Date().toLocaleDateString();
    let totalAmount = 0;
    let totalSales = 0;

    salesRows.forEach(row => {
      if (row.style.display === "none") return; // ignore filtered rows
      const saleDate = row.children[6].innerText; // 7th column = date
      if (saleDate === today) {
        const quantity = parseInt(row.children[2].innerText, 10);
        const amount = parseFloat(row.children[3].innerText.replace('UGX','').replace(/,/g,''));
        totalAmount += amount;
        totalSales += quantity;
      }
    });

    cardsContainer.innerHTML = "";

    // Total Amount Card
    const amountCard = document.createElement("div");
    amountCard.classList.add("sales-card");
    amountCard.innerHTML = `<h4>Total Amount Today</h4><p>UGX ${totalAmount.toLocaleString()}</p>`;
    cardsContainer.appendChild(amountCard);

    // Total Sales Card
    const countCard = document.createElement("div");
    countCard.classList.add("sales-card");
    countCard.innerHTML = `<h4>Total Sales Today</h4><p>${totalSales} items</p>`;
    cardsContainer.appendChild(countCard);
  }

  updateSalesCards();

  // Update cards if table changes (row added/deleted)
  const observer = new MutationObserver(updateSalesCards);
  observer.observe(salesTable.querySelector("tbody"), { childList: true });

  // Search/filter functionality
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    salesRows.forEach(row => {
      const rowText = Array.from(row.children).slice(0,6).map(td => td.innerText.toLowerCase()).join(" ");
      row.style.display = rowText.includes(filter) ? "" : "none";
    });
    updateSalesCards();
  });
});
