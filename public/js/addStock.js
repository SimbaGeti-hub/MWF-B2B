// addStock.js

// Form elements
const addStockForm = document.getElementById("addStockForm");
const successMessage = document.getElementById("successMessage");
const mainError = document.getElementById("mainError");

// Required inputs
const productNameInput = document.getElementById("productName");
const productTypeSelect = document.getElementById("productType");
const costPriceInput = document.getElementById("costPrice");
const quantityInput = document.getElementById("quantity");   
const productPriceInput = document.getElementById("productPrice");
const supplierNameInput = document.getElementById("supplierName");
const dateInput = document.getElementById("date");
const qualitySelect = document.getElementById("quality");

// Optional inputs
const colorInput = document.getElementById("color");
const measurementsInput = document.getElementById("measurements");

// Computed fields
const totalValueInput = document.getElementById("totalValue");
const profitValueInput = document.getElementById("profitValue");
const costTotalInput = document.getElementById("costTotal");

// Error fields
const errorFields = {
  productName: document.getElementById("errorProductName"),
  productType: document.getElementById("errorProductType"),
  costPrice: document.getElementById("errorCostPrice"),
  quantity: document.getElementById("errorQuantity"),
  productPrice: document.getElementById("errorProductPrice"),
  supplierName: document.getElementById("errorSupplierName"),
  date: document.getElementById("errorDate"),
  quality: document.getElementById("errorQuality"),
};

// Calculate totals
function calculateTotals() {
  let quantity = parseFloat(quantityInput.value) || 0;
  let costPrice = parseFloat(costPriceInput.value) || 0;
  let productPrice = parseFloat(productPriceInput.value) || 0;

  if (quantity < 0) quantity = 0;
  if (costPrice < 0) costPrice = 0;
  if (productPrice < 0) productPrice = 0;

  const totalValue = quantity * productPrice;
  const expectedProfit = (productPrice - costPrice) * quantity;
  const costTotal = quantity * costPrice;

  totalValueInput.value = totalValue.toFixed(2);
  profitValueInput.value = expectedProfit.toFixed(2);
  costTotalInput.value = costTotal.toFixed(2);
}

// Reset errors
function resetErrors() {
  mainError.style.display = "none";
  Object.values(errorFields).forEach(e => e.textContent = "");
  const inputs = addStockForm.querySelectorAll("input, select");
  inputs.forEach(input => input.classList.remove("invalid"));
}

// Validate form
function validateForm() {
  resetErrors();
  let isValid = true;

  if (!productNameInput.value.trim()) {
    errorFields.productName.textContent = "Product name is required.";
    productNameInput.classList.add("invalid");
    isValid = false;
  }
  if (!productTypeSelect.value) {
    errorFields.productType.textContent = "Select a product type.";
    productTypeSelect.classList.add("invalid");
    isValid = false;
  }
  if (!costPriceInput.value || parseFloat(costPriceInput.value) <= 0) {
    errorFields.costPrice.textContent = "Cost price must be greater than 0.";
    costPriceInput.classList.add("invalid");
    isValid = false;
  }
  if (!quantityInput.value || parseFloat(quantityInput.value) <= 0) {
    errorFields.quantity.textContent = "Quantity must be greater than 0.";
    quantityInput.classList.add("invalid");
    isValid = false;
  }
  if (!productPriceInput.value || parseFloat(productPriceInput.value) <= 0) {
    errorFields.productPrice.textContent = "Product price must be greater than 0.";
    productPriceInput.classList.add("invalid");
    isValid = false;
  }
  if (!supplierNameInput.value.trim()) {
    errorFields.supplierName.textContent = "Supplier name is required.";
    supplierNameInput.classList.add("invalid");
    isValid = false;
  }
  if (!dateInput.value) {
    errorFields.date.textContent = "Date is required.";
    dateInput.classList.add("invalid");
    isValid = false;
  }
  if (!qualitySelect.value) {
    errorFields.quality.textContent = "Select quality.";
    qualitySelect.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    mainError.style.display = "block";
    mainError.textContent = "Please fill in the form correctly.";
  }

  return isValid;
}

// Form submission
addStockForm.addEventListener("submit", function(e) {
  if (!validateForm()) {
    e.preventDefault(); // ❌ stop only if invalid
    return;
  }

  // ✅ If valid, form will submit normally to Express route
  successMessage.style.display = "block";
  successMessage.textContent = "Submitting stock...";

  // Hide after 3s
  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
});

// Realtime calculations
quantityInput.addEventListener("input", calculateTotals);
costPriceInput.addEventListener("input", calculateTotals);
productPriceInput.addEventListener("input", calculateTotals);

// Default date
dateInput.valueAsDate = new Date();
calculateTotals();
