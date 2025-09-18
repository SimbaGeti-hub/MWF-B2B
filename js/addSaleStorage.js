// LocalStorage key for addSales form only
let addSalesData = JSON.parse(localStorage.getItem('addSalesData')) || [];

// Save function for this form
function saveAddSalesData() {
  localStorage.setItem('addSalesData', JSON.stringify(addSalesData));
}

// Optional: function to get all sales for this form
function getAddSalesData() {
  return addSalesData;
}

// Add a new sale
function addNewSale(sale) {
  addSalesData.push(sale);
  saveAddSalesData();
}

// Clear all sales (optional)
function clearAddSalesData() {
  addSalesData = [];
  saveAddSalesData();
}
