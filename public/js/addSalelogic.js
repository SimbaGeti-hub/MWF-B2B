document.addEventListener("DOMContentLoaded", async () => {
  const productTypeSelect = document.getElementById("productType");
  const productNameSelect = document.getElementById("productName");
  const quantityInput = document.getElementById("quantity");
  const mainError = document.getElementById("mainError");

  let stockData = [];

  // Fetch stock data from server
  try {
    const res = await fetch('/api/stock');
    stockData = await res.json();
  } catch (err) {
    console.error("Error fetching stock:", err);
  }

  // Populate Product Name based on Product Type
  productTypeSelect.addEventListener("change", () => {
    const type = productTypeSelect.value;
    const filtered = stockData.filter(s => s.productType === type && s.quantity > 0);

    productNameSelect.innerHTML = '<option value="" disabled selected>Select product name</option>';
    filtered.forEach(item => {
      const option = document.createElement("option");
      option.value = item.productName;
      option.textContent = `${item.productName} (Available: ${item.quantity})`;
      productNameSelect.appendChild(option);
    });
  });

  // Validate Quantity input
  quantityInput.addEventListener("input", () => {
    const selectedName = productNameSelect.value;
    const stockItem = stockData.find(s => s.productName === selectedName);

    if (!stockItem) return;

    const qty = parseInt(quantityInput.value, 10);
    if (qty > stockItem.quantity) {
      mainError.style.display = "block";
      mainError.textContent = `Only ${stockItem.quantity} units of ${stockItem.productName} available.`;
    } else {
      mainError.style.display = "none";
      mainError.textContent = "";
    }
  });

  // Optional: Prevent form submission if quantity exceeds stock
  const form = document.getElementById("addSalesForm");
  form.addEventListener("submit", e => {
    const selectedName = productNameSelect.value;
    const stockItem = stockData.find(s => s.productName === selectedName);
    const qty = parseInt(quantityInput.value, 10);

    if (!stockItem || qty > stockItem.quantity) {
      e.preventDefault();
      alert("Cannot submit. Quantity exceeds available stock.");
    }
  });
});
