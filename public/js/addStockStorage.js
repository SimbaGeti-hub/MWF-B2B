// addStockStorage.js

// LocalStorage key for Add Stock form only
let addStockData = JSON.parse(localStorage.getItem('addStockData')) || [];

// Save function for Add Stock
function saveAddStockData() {
  localStorage.setItem('addStockData', JSON.stringify(addStockData));
}

// Optional: function to get all stock entries
function getAddStockData() {
  return addStockData;
}

// Add a new stock entry
function addNewStock(stock) {
  addStockData.push(stock);
  saveAddStockData();
}

// Clear all stock entries (optional)
function clearAddStockData() {
  addStockData = [];
  saveAddStockData();
}
