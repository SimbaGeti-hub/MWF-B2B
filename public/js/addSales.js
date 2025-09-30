
// // Grab DOM elements
// const addSalesForm = document.getElementById("addSalesForm");
// const successMessage = document.getElementById("successMessage");
// const mainError = document.getElementById("mainError");

// const productTypeSelect = document.getElementById("productType");
// const productNameSelect = document.getElementById("productName");
// const quantityInput = document.getElementById("quantity");
// const unitPriceInput = document.getElementById("unitPrice");
// const transportCheckbox = document.getElementById("transportProvided");
// const totalPriceInput = document.getElementById("totalPrice");
// const transportChargeInput = document.getElementById("transportCharge");
// const overallTotalInput = document.getElementById("overallTotal");
// const saleDateInput = document.getElementById("saleDate");

// // Error fields
// const errorFields = {
//   customerName: document.getElementById("errorCustomerName"),
//   productType: document.getElementById("errorProductType"),
//   productName: document.getElementById("errorProductName"),
//   quantity: document.getElementById("errorQuantity"),
//   saleDate: document.getElementById("errorSaleDate"),
//   paymentType: document.getElementById("errorPaymentType"),
//   salesAgent: document.getElementById("errorSalesAgent"),
//   unitPrice: document.getElementById("errorUnitPrice")
// };

// // Product type mapping
// const productsByType = {
//   Timber: ["Pine", "Oak", "Mahogany"],
//   Poles: ["Electric Pole", "Fence Pole"],
//   Hardwood: ["Teak", "Mahogany"],
//   Softwood: ["Pine Softwood"],
//   Furniture: ["Bed", "Sofa", "Dining Table", "Cupboard", "Drawer"]
// };

// // Populate product names based on type
// function populateProductNames() {
//   const type = productTypeSelect.value;

//   // Clear previous options
//   productNameSelect.innerHTML = "";

//   // Add default placeholder
//   const defaultOption = document.createElement("option");
//   defaultOption.value = "";
//   defaultOption.textContent = "Select product name";
//   defaultOption.disabled = true;
//   defaultOption.selected = true;
//   productNameSelect.appendChild(defaultOption);

//   // Add products for the selected type
//   if (productsByType[type]) {
//     productsByType[type].forEach(product => {
//       const option = document.createElement("option");
//       option.value = product;
//       option.textContent = product;
//       productNameSelect.appendChild(option);
//     });
//   }
// }

// // Calculate totals
// function calculateTotals() {
//   const quantity = parseFloat(quantityInput.value) || 0;
//   const unitPrice = parseFloat(unitPriceInput.value) || 0;

//   const totalPrice = quantity * unitPrice;
//   const transportCharge = transportCheckbox.checked ? totalPrice * 0.05 : 0;
//   const overallTotal = totalPrice + transportCharge;

//   totalPriceInput.value = totalPrice.toFixed(2);
//   transportChargeInput.value = transportCharge.toFixed(2);
//   overallTotalInput.value = overallTotal.toFixed(2);
// }

// // Reset errors
// function resetErrors() {
//   mainError.style.display = "none";
//   Object.values(errorFields).forEach(e => (e.textContent = ""));
//   addSalesForm.querySelectorAll("input, select").forEach(input => input.classList.remove("invalid"));
// }

// // Validate form on submit
// function validateForm() {
//   resetErrors();
//   let isValid = true;

//   if (!addSalesForm.customerName.value.trim()) {
//     errorFields.customerName.textContent = "Customer Name is required.";
//     addSalesForm.customerName.classList.add("invalid");
//     isValid = false;
//   }

//   if (!productTypeSelect.value) {
//     errorFields.productType.textContent = "Select a product type.";
//     productTypeSelect.classList.add("invalid");
//     isValid = false;
//   }

//   if (!productNameSelect.value) {
//     errorFields.productName.textContent = "Select a product name.";
//     productNameSelect.classList.add("invalid");
//     isValid = false;
//   }

//   if (!quantityInput.value || parseFloat(quantityInput.value) <= 0) {
//     errorFields.quantity.textContent = "Quantity must be greater than 0.";
//     quantityInput.classList.add("invalid");
//     isValid = false;
//   }

//   if (!saleDateInput.value) {
//     errorFields.saleDate.textContent = "Sale date is required.";
//     saleDateInput.classList.add("invalid");
//     isValid = false;
//   }

//   if (!addSalesForm.paymentType.value) {
//     errorFields.paymentType.textContent = "Select a payment type.";
//     addSalesForm.paymentType.classList.add("invalid");
//     isValid = false;
//   }

//   if (!addSalesForm.salesAgent.value.trim()) {
//     errorFields.salesAgent.textContent = "Sales agent name is required.";
//     addSalesForm.salesAgent.classList.add("invalid");
//     isValid = false;
//   }

//   if (!unitPriceInput.value || parseFloat(unitPriceInput.value) <= 0) {
//     errorFields.unitPrice.textContent = "Unit price must be greater than 0.";
//     unitPriceInput.classList.add("invalid");
//     isValid = false;
//   }

//   if (!isValid) {
//     mainError.style.display = "block";
//     mainError.textContent = "Please fill in the form correctly.";
//   }

//   return isValid;
// }

// // --- Clear individual errors on input/change ---
// const clearErrorOnInput = [
//   quantityInput,
//   unitPriceInput,
//   addSalesForm.customerName,
//   addSalesForm.salesAgent,
//   productTypeSelect,
//   productNameSelect,
//   saleDateInput,
//   addSalesForm.paymentType
// ];

// clearErrorOnInput.forEach(input => {
//   input.addEventListener("input", () => {
//     if (errorFields[input.name]) {
//       errorFields[input.name].textContent = "";
//       input.classList.remove("invalid");
//     }
//     if (input === quantityInput || input === unitPriceInput) calculateTotals();
//   });
// });

// transportCheckbox.addEventListener("change", calculateTotals);

// // --- Populate product names dynamically on type change ---
// productTypeSelect.addEventListener("change", populateProductNames);

// // --- Handle form submission ---
// addSalesForm.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   const saleData = {
//     customerName: addSalesForm.customerName.value.trim(),
//     productType: productTypeSelect.value,
//     productName: productNameSelect.value,
//     quantity: parseFloat(quantityInput.value),
//     unitPrice: parseFloat(unitPriceInput.value),
//     totalPrice: parseFloat(totalPriceInput.value),
//     transportCharge: parseFloat(transportChargeInput.value),
//     overallTotal: parseFloat(overallTotalInput.value),
//     paymentType: addSalesForm.paymentType.value,
//     salesAgent: addSalesForm.salesAgent.value.trim(),
//     saleDate: saleDateInput.value,
//     // --- FIXED transport field ---
//     transportProvided: transportCheckbox.checked ? "on" : ""
//   };

//   try {
//     const res = await fetch("/sales", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams(saleData)
//     });

//     const result = await res.json();

//     if (res.ok) {
//       successMessage.style.display = "block";
//       successMessage.textContent = `Success! Sale recorded for ${result.sale.customerName}. Overall Total: UGX ${result.sale.overallTotal.toFixed(2)}`;
//       addSalesForm.reset();
//       productNameSelect.innerHTML = '<option value="" disabled selected>Select product name</option>';
//       saleDateInput.valueAsDate = new Date();
//       calculateTotals();
//       setTimeout(() => (successMessage.style.display = "none"), 3000);
//     } else {
//       mainError.style.display = "block";
//       mainError.textContent = result.error || "Failed to record sale.";
//     }
//   } catch (err) {
//     console.error("Error submitting sale:", err);
//     mainError.style.display = "block";
//     mainError.textContent = "Server error: Could not record sale.";
//   }
// });

// // --- Initial setup ---
// populateProductNames();
// calculateTotals();
// saleDateInput.valueAsDate = new Date();









// // Grab DOM elements
// const addSalesForm = document.getElementById("addSalesForm");
// const successMessage = document.getElementById("successMessage");
// const mainError = document.getElementById("mainError");

// const productTypeSelect = document.getElementById("productType");
// const productNameSelect = document.getElementById("productName");
// const quantityInput = document.getElementById("quantity");
// const unitPriceInput = document.getElementById("unitPrice");
// const transportCheckbox = document.getElementById("transportProvided");
// const totalPriceInput = document.getElementById("totalPrice");
// const transportChargeInput = document.getElementById("transportCharge");
// const overallTotalInput = document.getElementById("overallTotal");
// const saleDateInput = document.getElementById("saleDate");

// // Error fields
// const errorFields = {
//   customerName: document.getElementById("errorCustomerName"),
//   productType: document.getElementById("errorProductType"),
//   productName: document.getElementById("errorProductName"),
//   quantity: document.getElementById("errorQuantity"),
//   saleDate: document.getElementById("errorSaleDate"),
//   paymentType: document.getElementById("errorPaymentType"),
//   salesAgent: document.getElementById("errorSalesAgent"),
//   unitPrice: document.getElementById("errorUnitPrice")
// };

// // Product type mapping
// const productsByType = {
//   Timber: ["Pine", "Oak", "Mahogany"],
//   Poles: ["Electric Pole", "Fence Pole"],
//   Hardwood: ["Teak", "Mahogany"],
//   Softwood: ["Pine Softwood"],
//   Furniture: ["Bed", "Sofa", "Dining Table", "Cupboard", "Drawer"]
// };

// // Populate product names based on type
// function populateProductNames() {
//   const type = productTypeSelect.value;

//   // Clear previous options
//   productNameSelect.innerHTML = "";

//   // Add default placeholder
//   const defaultOption = document.createElement("option");
//   defaultOption.value = "";
//   defaultOption.textContent = "Select product name";
//   defaultOption.disabled = true;
//   defaultOption.selected = true;
//   productNameSelect.appendChild(defaultOption);

//   // Add products for the selected type
//   if (productsByType[type]) {
//     productsByType[type].forEach(product => {
//       const option = document.createElement("option");
//       option.value = product;
//       option.textContent = product;
//       productNameSelect.appendChild(option);
//     });
//   }
// }

// // Calculate totals
// function calculateTotals() {
//   const quantity = parseFloat(quantityInput.value) || 0;
//   const unitPrice = parseFloat(unitPriceInput.value) || 0;

//   const totalPrice = quantity * unitPrice;
//   const transportCharge = transportCheckbox.checked ? totalPrice * 0.05 : 0;
//   const overallTotal = totalPrice + transportCharge;

//   totalPriceInput.value = totalPrice.toFixed(2);
//   transportChargeInput.value = transportCharge.toFixed(2);
//   overallTotalInput.value = overallTotal.toFixed(2);
// }

// // Reset errors
// function resetErrors() {
//   mainError.style.display = "none";
//   Object.values(errorFields).forEach(e => (e.textContent = ""));
//   addSalesForm
//     .querySelectorAll("input, select")
//     .forEach(input => input.classList.remove("invalid"));
// }

// // Validate form on submit
// function validateForm() {
//   resetErrors();
//   let isValid = true;

//   if (!addSalesForm.customerName.value.trim()) {
//     errorFields.customerName.textContent = "Customer Name is required.";
//     addSalesForm.customerName.classList.add("invalid");
//     isValid = false;
//   }

//   if (!productTypeSelect.value) {
//     errorFields.productType.textContent = "Select a product type.";
//     productTypeSelect.classList.add("invalid");
//     isValid = false;
//   }

//   if (!productNameSelect.value) {
//     errorFields.productName.textContent = "Select a product name.";
//     productNameSelect.classList.add("invalid");
//     isValid = false;
//   }

//   if (!quantityInput.value || parseFloat(quantityInput.value) <= 0) {
//     errorFields.quantity.textContent = "Quantity must be greater than 0.";
//     quantityInput.classList.add("invalid");
//     isValid = false;
//   }

//   if (!saleDateInput.value) {
//     errorFields.saleDate.textContent = "Sale date is required.";
//     saleDateInput.classList.add("invalid");
//     isValid = false;
//   }

//   if (!addSalesForm.paymentType.value) {
//     errorFields.paymentType.textContent = "Select a payment type.";
//     addSalesForm.paymentType.classList.add("invalid");
//     isValid = false;
//   }

//   if (!addSalesForm.salesAgent.value.trim()) {
//     errorFields.salesAgent.textContent = "Sales agent name is required.";
//     addSalesForm.salesAgent.classList.add("invalid");
//     isValid = false;
//   }

//   if (!unitPriceInput.value || parseFloat(unitPriceInput.value) <= 0) {
//     errorFields.unitPrice.textContent = "Unit price must be greater than 0.";
//     unitPriceInput.classList.add("invalid");
//     isValid = false;
//   }

//   if (!isValid) {
//     mainError.style.display = "block";
//     mainError.textContent = "Please fill in the form correctly.";
//   }

//   return isValid;
// }

// // --- Clear individual errors on input/change ---
// const clearErrorOnInput = [
//   quantityInput,
//   unitPriceInput,
//   addSalesForm.customerName,
//   addSalesForm.salesAgent,
//   productTypeSelect,
//   productNameSelect,
//   saleDateInput,
//   addSalesForm.paymentType
// ];

// clearErrorOnInput.forEach(input => {
//   input.addEventListener("input", () => {
//     if (errorFields[input.name]) {
//       errorFields[input.name].textContent = "";
//       input.classList.remove("invalid");
//     }
//     if (input === quantityInput || input === unitPriceInput) calculateTotals();
//   });
// });

// // --- EXTRA: also recalc on "change" for edit forms ---
// quantityInput.addEventListener("change", calculateTotals);
// unitPriceInput.addEventListener("change", calculateTotals);

// transportCheckbox.addEventListener("change", calculateTotals);

// // --- Populate product names dynamically on type change ---
// productTypeSelect.addEventListener("change", populateProductNames);

// // --- Handle form submission ---
// addSalesForm.addEventListener("submit", async e => {
//   e.preventDefault();
//   if (!validateForm()) return;

//   const saleData = {
//     customerName: addSalesForm.customerName.value.trim(),
//     productType: productTypeSelect.value,
//     productName: productNameSelect.value,
//     quantity: parseFloat(quantityInput.value),
//     unitPrice: parseFloat(unitPriceInput.value),
//     totalPrice: parseFloat(totalPriceInput.value),
//     transportCharge: parseFloat(transportChargeInput.value),
//     overallTotal: parseFloat(overallTotalInput.value),
//     paymentType: addSalesForm.paymentType.value,
//     salesAgent: addSalesForm.salesAgent.value.trim(),
//     saleDate: saleDateInput.value,
//     // --- FIXED transport field ---
//     transportProvided: transportCheckbox.checked ? "on" : ""
//   };

//   try {
//     const res = await fetch("/sales", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: new URLSearchParams(saleData)
//     });

//     const result = await res.json();

//     if (res.ok) {
//       successMessage.style.display = "block";
//       successMessage.textContent = `Success! Sale recorded for ${result.sale.customerName}. Overall Total: UGX ${result.sale.overallTotal.toFixed(
//         2
//       )}`;
//       addSalesForm.reset();
//       productNameSelect.innerHTML =
//         '<option value="" disabled selected>Select product name</option>';
//       saleDateInput.valueAsDate = new Date();
//       calculateTotals();
//       setTimeout(() => (successMessage.style.display = "none"), 3000);
//     } else {
//       mainError.style.display = "block";
//       mainError.textContent = result.error || "Failed to record sale.";
//     }
//   } catch (err) {
//     console.error("Error submitting sale:", err);
//     mainError.style.display = "block";
//     mainError.textContent = "Server error: Could not record sale.";
//   }
// });

// // --- Initial setup ---
// populateProductNames();
// calculateTotals(); // ensures prefilled values update totals (for edit mode)
// if (!saleDateInput.value) {
//   saleDateInput.valueAsDate = new Date();
// }












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
  unitPrice: document.getElementById("errorUnitPrice")
};

// Product type mapping
const productsByType = {
  Timber: ["Pine", "Oak", "Mahogany"],
  Poles: ["Electric Pole", "Fence Pole"],
  Hardwood: ["Teak", "Mahogany"],
  Softwood: ["Pine Softwood"],
  Furniture: ["Bed", "Sofa", "Dining Table", "Cupboard", "Drawer"]
};

// Populate product names based on type
function populateProductNames() {
  const type = productTypeSelect.value;

  productNameSelect.innerHTML = "";

  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select product name";
  defaultOption.disabled = true;
  defaultOption.selected = true;
  productNameSelect.appendChild(defaultOption);

  if (productsByType[type]) {
    productsByType[type].forEach(product => {
      const option = document.createElement("option");
      option.value = product;
      option.textContent = product;
      productNameSelect.appendChild(option);
    });
  }
}

// Calculate totals (live for both add & edit)
function calculateTotals() {
  const quantity = parseFloat(quantityInput.value) || 0;
  const unitPrice = parseFloat(unitPriceInput.value) || 0;

  const totalPrice = quantity * unitPrice;
  const transportCharge = transportCheckbox.checked ? totalPrice * 0.05 : 0;
  const overallTotal = totalPrice + transportCharge;

  totalPriceInput.value = totalPrice.toFixed(2);
  transportChargeInput.value = transportCharge.toFixed(2);
  overallTotalInput.value = overallTotal.toFixed(2);
}

// Reset errors
function resetErrors() {
  mainError.style.display = "none";
  Object.values(errorFields).forEach(e => (e.textContent = ""));
  addSalesForm
    .querySelectorAll("input, select")
    .forEach(input => input.classList.remove("invalid"));
}

// Validate form on submit
function validateForm() {
  resetErrors();
  let isValid = true;

  if (!addSalesForm.customerName.value.trim()) {
    errorFields.customerName.textContent = "Customer Name is required.";
    addSalesForm.customerName.classList.add("invalid");
    isValid = false;
  }

  if (!productTypeSelect.value) {
    errorFields.productType.textContent = "Select a product type.";
    productTypeSelect.classList.add("invalid");
    isValid = false;
  }

  if (!productNameSelect.value) {
    errorFields.productName.textContent = "Select a product name.";
    productNameSelect.classList.add("invalid");
    isValid = false;
  }

  if (!quantityInput.value || parseFloat(quantityInput.value) <= 0) {
    errorFields.quantity.textContent = "Quantity must be greater than 0.";
    quantityInput.classList.add("invalid");
    isValid = false;
  }

  if (!saleDateInput.value) {
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

  if (!unitPriceInput.value || parseFloat(unitPriceInput.value) <= 0) {
    errorFields.unitPrice.textContent = "Unit price must be greater than 0.";
    unitPriceInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    mainError.style.display = "block";
    mainError.textContent = "Please fill in the form correctly.";
  }

  return isValid;
}

// --- Clear individual errors on input/change ---
const clearErrorOnInput = [
  quantityInput,
  unitPriceInput,
  addSalesForm.customerName,
  addSalesForm.salesAgent,
  productTypeSelect,
  productNameSelect,
  saleDateInput,
  addSalesForm.paymentType
];

clearErrorOnInput.forEach(input => {
  input.addEventListener("input", () => {
    if (errorFields[input.name]) {
      errorFields[input.name].textContent = "";
      input.classList.remove("invalid");
    }
    if (input === quantityInput || input === unitPriceInput) calculateTotals();
  });
});

// --- EXTRA: ensure totals recalc properly on all change/input events ---
["input", "change"].forEach(evt => {
  quantityInput.addEventListener(evt, calculateTotals);
  unitPriceInput.addEventListener(evt, calculateTotals);
  transportCheckbox.addEventListener(evt, calculateTotals);
});

// --- Populate product names dynamically on type change ---
productTypeSelect.addEventListener("change", populateProductNames);

// --- Handle form submission ---
addSalesForm.addEventListener("submit", async e => {
  e.preventDefault();
  if (!validateForm()) return;

  const saleData = {
    customerName: addSalesForm.customerName.value.trim(),
    productType: productTypeSelect.value,
    productName: productNameSelect.value,
    quantity: parseFloat(quantityInput.value),
    unitPrice: parseFloat(unitPriceInput.value),
    totalPrice: parseFloat(totalPriceInput.value),
    transportCharge: parseFloat(transportChargeInput.value),
    overallTotal: parseFloat(overallTotalInput.value),
    paymentType: addSalesForm.paymentType.value,
    salesAgent: addSalesForm.salesAgent.value.trim(),
    saleDate: saleDateInput.value,
    transportProvided: transportCheckbox.checked ? "on" : ""
  };

  try {
    const res = await fetch("/sales", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(saleData)
    });

    const result = await res.json();

    if (res.ok) {
      successMessage.style.display = "block";
      successMessage.textContent = `Success! Sale recorded for ${result.sale.customerName}. Overall Total: UGX ${result.sale.overallTotal.toFixed(
        2
      )}`;
      addSalesForm.reset();
      productNameSelect.innerHTML =
        '<option value="" disabled selected>Select product name</option>';
      saleDateInput.valueAsDate = new Date();
      calculateTotals();
      setTimeout(() => (successMessage.style.display = "none"), 3000);
    } else {
      mainError.style.display = "block";
      mainError.textContent = result.error || "Failed to record sale.";
    }
  } catch (err) {
    console.error("Error submitting sale:", err);
    mainError.style.display = "block";
    mainError.textContent = "Server error: Could not record sale.";
  }
});

// --- Initial setup ---
populateProductNames();
calculateTotals(); // ensures prefilled values update totals (for edit mode)
if (!saleDateInput.value) {
  saleDateInput.valueAsDate = new Date();
}

