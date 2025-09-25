// Grab DOM elements
const addSalesForm = document.getElementById("addSalesForm");
const successMessage = document.getElementById("successMessage");
const mainError = document.getElementById("mainError");

const productTypeSelect = document.getElementById("productType");
const productNameSelect = document.getElementById("productName");
const quantityInput = document.getElementById("quantity");
const unitPriceInput = document.getElementById("unitPrice");
const transportCheckbox = document.getElementById("transportProvided");
const totalPriceInput = document.getElementById("totalPrice");
const transportChargeInput = document.getElementById("transportCharge");
const overallTotalInput = document.getElementById("overallTotal");
const saleDateInput = document.getElementById("saleDate");

// Error fields
const errorFields = {
  customerName: document.getElementById("errorCustomerName"),
  productType: document.getElementById("errorProductType"),
  productName: document.getElementById("errorProductName"),
  quantity: document.getElementById("errorQuantity"),
  saleDate: document.getElementById("errorSaleDate"),
  paymentType: document.getElementById("errorPaymentType"),
  salesAgent: document.getElementById("errorSalesAgent"),
  unitPrice: document.getElementById("errorUnitPrice"),
};

// Product type mapping
const productsByType = {
  Timber: ['Pine', 'Oak', 'Mahogany'],
  Poles: ['Electric Pole', 'Fence Pole'],
  Hardwood: ['Teak', 'Mahogany'],
  Softwood: ['Pine Softwood'],
  Furniture: ['Bed', 'Sofa', 'Dining Table', 'Cupboard', 'Drawer']
};

// Populate product names based on type
function populateProductNames() {
  const type = productTypeSelect.value;
  productNameSelect.innerHTML = '<option value="" disabled selected>Select product name</option>';
  if (productsByType[type]) {
    productsByType[type].forEach(product => {
      const option = document.createElement('option');
      option.value = product;
      option.textContent = product;
      productNameSelect.appendChild(option);
    });
  }
  calculateTotals();
}

// Calculate totals and overall total
function calculateTotals() {
  let quantity = parseFloat(quantityInput.value) || 0;
  let unitPrice = parseFloat(unitPriceInput.value) || 0;

  if (quantity < 0) quantity = 0;
  if (unitPrice < 0) unitPrice = 0;

  const totalPrice = quantity * unitPrice;
  const transportCharge = transportCheckbox.checked ? totalPrice * 0.05 : 0;
  const overallTotal = totalPrice + transportCharge;

  totalPriceInput.value = totalPrice.toFixed(2);
  transportChargeInput.value = transportCharge.toFixed(2);
  overallTotalInput.value = overallTotal.toFixed(2);
}

// Set sale date to today
saleDateInput.valueAsDate = new Date();

// Reset all error messages and red borders
function resetErrors() {
  mainError.style.display = "none";
  Object.values(errorFields).forEach(e => e.textContent = "");
  const inputs = addSalesForm.querySelectorAll("input, select");
  inputs.forEach(input => input.classList.remove("invalid"));
}

// Validate form before submitting
function validateForm() {
  resetErrors();
  let isValid = true;

  if (!addSalesForm.customerName.value.trim()) {
    errorFields.customerName.textContent = "Customer Name is required.";
    addSalesForm.customerName.classList.add("invalid");
    isValid = false;
  }

  if (!addSalesForm.productType.value) {
    errorFields.productType.textContent = "Select a product type.";
    productTypeSelect.classList.add("invalid");
    isValid = false;
  }

  if (!addSalesForm.productName.value) {
    errorFields.productName.textContent = "Select a product name.";
    productNameSelect.classList.add("invalid");
    isValid = false;
  }

  if (!addSalesForm.quantity.value || parseFloat(addSalesForm.quantity.value) <= 0) {
    errorFields.quantity.textContent = "Quantity must be greater than 0.";
    quantityInput.classList.add("invalid");
    isValid = false;
  }

  if (!addSalesForm.saleDate.value) {
    errorFields.saleDate.textContent = "Sale date is required.";
    saleDateInput.classList.add("invalid");
    isValid = false;
  }

  if (!addSalesForm.paymentType.value) {
    errorFields.paymentType.textContent = "Select a payment type.";
    addSalesForm.paymentType.classList.add("invalid");
    isValid = false;
  }

  if (!addSalesForm.salesAgent.value.trim()) {
    errorFields.salesAgent.textContent = "Sales agent name is required.";
    addSalesForm.salesAgent.classList.add("invalid");
    isValid = false;
  }

  if (!addSalesForm.unitPrice.value || parseFloat(addSalesForm.unitPrice.value) <= 0) {
    errorFields.unitPrice.textContent = "Unit price must be greater than 0.";
    unitPriceInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    mainError.style.display = "block";
    mainError.textContent = "Please fill in the form correctly to submit.";
  }

  return isValid;
}

// Real-time validation
function attachRealtimeValidation(input, errorField, validatorFn) {
  input.addEventListener('input', () => {
    if (validatorFn()) {
      errorField.textContent = "";
      input.classList.remove("invalid");
    }
    calculateTotals();
  });
}

// Attach real-time validations
attachRealtimeValidation(addSalesForm.customerName, errorFields.customerName, () => addSalesForm.customerName.value.trim() !== "");
attachRealtimeValidation(addSalesForm.salesAgent, errorFields.salesAgent, () => addSalesForm.salesAgent.value.trim() !== "");
attachRealtimeValidation(quantityInput, errorFields.quantity, () => parseFloat(quantityInput.value) > 0);
attachRealtimeValidation(unitPriceInput, errorFields.unitPrice, () => parseFloat(unitPriceInput.value) > 0);

productTypeSelect.addEventListener('change', () => {
  populateProductNames();
  if (productTypeSelect.value) {
    errorFields.productType.textContent = "";
    productTypeSelect.classList.remove("invalid");
  }
});

productNameSelect.addEventListener('change', () => {
  if (productNameSelect.value) {
    errorFields.productName.textContent = "";
    productNameSelect.classList.remove("invalid");
  }
});

addSalesForm.paymentType.addEventListener('change', () => {
  if (addSalesForm.paymentType.value) {
    errorFields.paymentType.textContent = "";
    addSalesForm.paymentType.classList.remove("invalid");
  }
});

transportCheckbox.addEventListener('change', calculateTotals);

// Handle form submission
addSalesForm.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const newSale = {
    customerName: this.customerName.value.trim(),
    productType: this.productType.value,
    productName: this.productName.value,
    quantity: parseFloat(this.quantity.value),
    unitPrice: parseFloat(this.unitPrice.value),
    totalPrice: parseFloat(this.totalPrice.value),
    transportCharge: parseFloat(this.transportCharge.value),
    overallTotal: parseFloat(this.overallTotal.value),
    paymentType: this.paymentType.value,
    salesAgent: this.salesAgent.value.trim(),
    saleDate: this.saleDate.value,
    transportProvided: this.transportProvided.checked
  };

  // Save sale to storage
  addNewSale(newSale);

  // Show success message
  successMessage.style.display = 'block';
  successMessage.textContent = `Success! Sale recorded for ${newSale.customerName}. Overall Total: UGX ${newSale.overallTotal.toFixed(2)}`;

  // Reset form
  addSalesForm.reset();
  productNameSelect.innerHTML = '<option value="" disabled selected>Select product name</option>';
  saleDateInput.valueAsDate = new Date();
  calculateTotals();

  // Hide success message after 3 seconds
  setTimeout(() => { successMessage.style.display = 'none'; }, 3000);
});

// Initial setup
populateProductNames();
calculateTotals();
