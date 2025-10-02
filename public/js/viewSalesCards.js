


// document.addEventListener("DOMContentLoaded", () => {
//   const cardsContainer = document.querySelector(".cards-container");
//   const salesTable = document.querySelector("#salesTable");
//   const searchInput = document.querySelector("#searchInput");

//   function updateSalesCards() {
//     const today = new Date().toLocaleDateString();
//     const salesRows = salesTable.querySelectorAll("tbody tr"); // live rows

//     let totalAmountToday = 0;
//     let totalItemsToday = 0;
//     let transactionsToday = 0;
//     let totalItemsOverall = 0; // total quantity from whole table
//     let totalAmountOverall = 0; // sum of all "Overall Total" from whole table
//     const productCount = {};
//     const paymentCount = {};

//     salesRows.forEach(row => {
//       if (row.style.display === "none") return; // skip hidden rows
//       const saleDate = row.children[6].innerText; // 7th column = date
//       const quantity = parseInt(row.children[2].innerText, 10);
//       const amount = parseFloat(row.children[3].innerText.replace('UGX','').replace(/,/g,''));

//       // Total amount overall for the whole table
//       totalAmountOverall += amount;

//       // Total items overall
//       totalItemsOverall += quantity;

//       // Only today’s calculations
//       if (saleDate === today) {
//         transactionsToday++;
//         totalAmountToday += amount;
//         totalItemsToday += quantity;

//         const productName = row.children[1].innerText;
//         productCount[productName] = (productCount[productName] || 0) + quantity;
//       }

//       // Payment methods summary counts all rows
//       const paymentType = row.children[4].innerText;
//       paymentCount[paymentType] = (paymentCount[paymentType] || 0) + 1;
//     });

//     // Products summary (today only)
//     let topProduct = "N/A", leastProduct = "N/A";
//     let maxQuantity = -1, minQuantity = Infinity;
//     for (const [product, qty] of Object.entries(productCount)) {
//       if (qty > maxQuantity) { maxQuantity = qty; topProduct = product; }
//       if (qty < minQuantity) { minQuantity = qty; leastProduct = product; }
//     }

//     // Payment methods summary (all live rows)
//     let mostPayment = "N/A", leastPayment = "N/A";
//     let maxPayCount = -1, minPayCount = Infinity;
//     for (const [pay, count] of Object.entries(paymentCount)) {
//       if (count > maxPayCount) { maxPayCount = count; mostPayment = pay; }
//       if (count < minPayCount) { minPayCount = count; leastPayment = pay; }
//     }

//     // Clear existing cards
//     cardsContainer.innerHTML = "";

//     // Standard cards (remove redundant Total Revenue)
//     const standardCards = [
//       { title: "Total Amount Today", value: `UGX ${totalAmountToday.toLocaleString()}` },
//       { title: "Total Items Sold Today", value: `${totalItemsToday} items` },
//       { title: "Number of Transactions Today", value: transactionsToday },
//       { title: "Total Items Overall", value: `${totalItemsOverall} items` },
//       { title: "Total Amount Overall", value: `UGX ${totalAmountOverall.toLocaleString()}` } // overall total
//     ];

//     standardCards.forEach(card => {
//       const cardDiv = document.createElement("div");
//       cardDiv.classList.add("sales-card");
//       cardDiv.innerHTML = `<h4>${card.title}</h4><p>${card.value}</p>`;
//       cardsContainer.appendChild(cardDiv);
//     });

//     // Products alert card (today only)
//     const productsCard = document.createElement("div");
//     productsCard.classList.add("sales-card", "alert-card");
//     productsCard.innerHTML = `
//       <h4>Products Summary</h4>
//       <p><span style="color:green;">Top Selling: ${topProduct}</span></p>
//       <p><span style="color:red;">Least Selling: ${leastProduct}</span></p>
//     `;
//     cardsContainer.appendChild(productsCard);

//     // Payment methods alert card (live from table)
//     const paymentCard = document.createElement("div");
//     paymentCard.classList.add("sales-card", "alert-card");
//     paymentCard.innerHTML = `
//       <h4>Payment Methods Summary</h4>
//       <p><span style="color:green;">Most Used: ${mostPayment}</span></p>
//       <p><span style="color:red;">Least Used: ${leastPayment}</span></p>
//     `;
//     cardsContainer.appendChild(paymentCard);
//   }

//   updateSalesCards();

//   // Observe table changes to update cards dynamically
//   const observer = new MutationObserver(updateSalesCards);
//   observer.observe(salesTable.querySelector("tbody"), { childList: true, subtree: true });

//   // Search/filter functionality
//   searchInput.addEventListener("input", () => {
//     const filter = searchInput.value.toLowerCase();
//     const salesRows = salesTable.querySelectorAll("tbody tr"); // live
//     salesRows.forEach(row => {
//       const rowText = Array.from(row.children).slice(0,6).map(td => td.innerText.toLowerCase()).join(" ");
//       row.style.display = rowText.includes(filter) ? "" : "none";
//     });
//     updateSalesCards();
//   });
// });



document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.querySelector(".cards-container");
  const salesTable = document.querySelector("#salesTable");
  const searchInput = document.querySelector("#searchInput");

  function updateSalesCards() {
    const today = new Date().toLocaleDateString();
    const salesRows = salesTable.querySelectorAll("tbody tr"); // live rows

    let totalAmountToday = 0;
    let totalItemsToday = 0;
    let transactionsToday = 0;
    let totalItemsOverall = 0; // total quantity from whole table
    let totalAmountOverall = 0; // sum of all "Overall Total" from whole table
    let totalTransactionsOverall = 0; // total transactions overall
    const productCount = {};
    const paymentCount = {};

    salesRows.forEach(row => {
      if (row.style.display === "none") return; // skip hidden rows
      const saleDate = row.children[6].innerText; // 7th column = date
      const quantity = parseInt(row.children[2].innerText, 10);
      const amount = parseFloat(row.children[3].innerText.replace('UGX','').replace(/,/g,''));

      // Total amount overall for the whole table
      totalAmountOverall += amount;

      // Total items overall
      totalItemsOverall += quantity;

      // Total transactions overall
      totalTransactionsOverall++;

      // Only today’s calculations
      if (saleDate === today) {
        transactionsToday++;
        totalAmountToday += amount;
        totalItemsToday += quantity;

        const productName = row.children[1].innerText;
        productCount[productName] = (productCount[productName] || 0) + quantity;
      }

      // Payment methods summary counts all rows
      const paymentType = row.children[4].innerText;
      paymentCount[paymentType] = (paymentCount[paymentType] || 0) + 1;
    });

    // Products summary (today only)
    let topProduct = "N/A", leastProduct = "N/A";
    let maxQuantity = -1, minQuantity = Infinity;
    for (const [product, qty] of Object.entries(productCount)) {
      if (qty > maxQuantity) { maxQuantity = qty; topProduct = product; }
      if (qty < minQuantity) { minQuantity = qty; leastProduct = product; }
    }

    // Payment methods summary (all live rows)
    let mostPayment = "N/A", leastPayment = "N/A";
    let maxPayCount = -1, minPayCount = Infinity;
    for (const [pay, count] of Object.entries(paymentCount)) {
      if (count > maxPayCount) { maxPayCount = count; mostPayment = pay; }
      if (count < minPayCount) { minPayCount = count; leastPayment = pay; }
    }

    // Clear existing cards
    cardsContainer.innerHTML = "";

    // Standard cards
    const standardCards = [
      { title: "Total Amount Today", value: `UGX ${totalAmountToday.toLocaleString()}` },
      { title: "Total Items Sold Today", value: `${totalItemsToday} items` },
      { title: "Number of Transactions Today", value: transactionsToday },
      { title: "Total Items Overall", value: `${totalItemsOverall} items` },
      { title: "Total Amount Overall", value: `UGX ${totalAmountOverall.toLocaleString()}` },
      { title: "Total Transactions Overall", value: totalTransactionsOverall } // NEW CARD
    ];

    standardCards.forEach(card => {
      const cardDiv = document.createElement("div");
      cardDiv.classList.add("sales-card");
      cardDiv.innerHTML = `<h4>${card.title}</h4><p>${card.value}</p>`;
      cardsContainer.appendChild(cardDiv);
    });

    // Products alert card (today only)
    const productsCard = document.createElement("div");
    productsCard.classList.add("sales-card", "alert-card");
    productsCard.innerHTML = `
      <h4>Products Summary</h4>
      <p><span style="color:green;">Top Selling: ${topProduct}</span></p>
      <p><span style="color:red;">Least Selling: ${leastProduct}</span></p>
    `;
    cardsContainer.appendChild(productsCard);

    // Payment methods alert card (live from table)
    const paymentCard = document.createElement("div");
    paymentCard.classList.add("sales-card", "alert-card");
    paymentCard.innerHTML = `
      <h4>Payment Methods Summary</h4>
      <p><span style="color:green;">Most Used: ${mostPayment}</span></p>
      <p><span style="color:red;">Least Used: ${leastPayment}</span></p>
    `;
    cardsContainer.appendChild(paymentCard);
  }

  updateSalesCards();

  // Observe table changes to update cards dynamically
  const observer = new MutationObserver(updateSalesCards);
  observer.observe(salesTable.querySelector("tbody"), { childList: true, subtree: true });

  // Search/filter functionality
  searchInput.addEventListener("input", () => {
    const filter = searchInput.value.toLowerCase();
    const salesRows = salesTable.querySelectorAll("tbody tr"); // live
    salesRows.forEach(row => {
      const rowText = Array.from(row.children).slice(0,6).map(td => td.innerText.toLowerCase()).join(" ");
      row.style.display = rowText.includes(filter) ? "" : "none";
    });
    updateSalesCards();
  });
});



