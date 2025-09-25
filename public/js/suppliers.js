// suppliers.js

// Elements
const addSupplierForm = document.getElementById("addSupplierForm");
const successMessage = document.getElementById("successMessage");

// Input fields
const supplierNameInput = document.getElementById("supplierName");
const supplierLocationInput = document.getElementById("supplierLocation");
const supplierPhoneInput = document.getElementById("supplierPhone");
const supplierEmailInput = document.getElementById("supplierEmail");
const supplierProductInput = document.getElementById("supplierProduct");

// Error fields
const errorFields = {
  name: document.getElementById("errorSupplierName"),
  location: document.getElementById("errorSupplierLocation"),
  phone: document.getElementById("errorSupplierPhone"),
  email: document.getElementById("errorSupplierEmail"),
  product: document.getElementById("errorSupplierProduct"),
};
const mainError = document.getElementById("mainError");

// Reset errors
function resetErrors() {
  mainError.style.display = "none";
  Object.values(errorFields).forEach(e => (e.textContent = ""));
  const inputs = addSupplierForm.querySelectorAll("input");
  inputs.forEach(input => input.classList.remove("invalid"));
}

// Validate form
function validateForm() {
  resetErrors();
  let isValid = true;

  if (!supplierNameInput.value.trim()) {
    errorFields.name.textContent = "Supplier name is required.";
    supplierNameInput.classList.add("invalid");
    isValid = false;
  }
  if (!supplierLocationInput.value.trim()) {
    errorFields.location.textContent = "Location is required.";
    supplierLocationInput.classList.add("invalid");
    isValid = false;
  }
  if (!supplierPhoneInput.value.trim()) {
    errorFields.phone.textContent = "Phone number is required.";
    supplierPhoneInput.classList.add("invalid");
    isValid = false;
  }
  if (!supplierEmailInput.value.trim() || !supplierEmailInput.value.includes("@")) {
    errorFields.email.textContent = "Valid email is required.";
    supplierEmailInput.classList.add("invalid");
    isValid = false;
  }
  if (!supplierProductInput.value.trim()) {
    errorFields.product.textContent = "Product of supply is required.";
    supplierProductInput.classList.add("invalid");
    isValid = false;
  }

  if (!isValid) {
    mainError.style.display = "block";
    mainError.textContent = "Please fix the errors before submitting.";
  }

  return isValid;
}

// Form submit
addSupplierForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (!validateForm()) return;

  const newSupplier = {
    name: supplierNameInput.value.trim(),
    location: supplierLocationInput.value.trim(),
    phone: supplierPhoneInput.value.trim(),
    email: supplierEmailInput.value.trim(),
    product: supplierProductInput.value.trim(),
  };

  suppliersData.push(newSupplier);   // ✅ uses storage.js
  saveSuppliersData();               // ✅ uses storage.js

  successMessage.textContent = `Success! Supplier ${newSupplier.name} added.`;
  successMessage.style.display = "block";

  addSupplierForm.reset();

  setTimeout(() => {
    successMessage.style.display = "none";
  }, 3000);
});

// Live error removal
[supplierNameInput, supplierLocationInput, supplierPhoneInput, supplierEmailInput, supplierProductInput].forEach(input => {
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      input.classList.remove("invalid");
      const field = input.id.replace("supplier", "").toLowerCase();
      if (errorFields[field]) errorFields[field].textContent = "";
    }
  });
});
