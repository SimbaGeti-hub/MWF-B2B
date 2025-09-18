const addStockForm = document.getElementById("addStockForm");
const successMessage = document.getElementById("successMessage");

addStockForm.addEventListener("submit", function(e){
  e.preventDefault();

  const newStock = {
    name: document.getElementById("productName").value.trim(),
    type: document.getElementById("productType").value.trim(),
    costPrice: parseFloat(document.getElementById("costPrice").value),
    productPrice: parseFloat(document.getElementById("productPrice").value),
    quantity: parseInt(document.getElementById("quantity").value),
    supplier: document.getElementById("supplier").value.trim(),
    date: new Date().toISOString()
  };

  stockData.push(newStock);
  saveStockData();
  successMessage.textContent = "Stock added successfully!";
  addStockForm.reset();
  window.updateDashboard();

  setTimeout(()=>{ successMessage.textContent = ""; }, 3000);
});
