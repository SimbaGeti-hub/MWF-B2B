// Load existing products or empty arrays
let rawMaterials = loadProducts("rawMaterials") || [];
let readyProducts = loadProducts("readyProducts") || [];

const rawGrid = document.getElementById("rawMaterialsGrid");
const readyGrid = document.getElementById("readyProductsGrid");
const modal = document.getElementById("productModal");
const productForm = document.getElementById("productForm");

// Render all products in grids
function renderProducts() {
  rawGrid.innerHTML = "";
  readyGrid.innerHTML = "";

  rawMaterials.forEach(item => rawGrid.appendChild(createCardElement(item, "raw")));
  readyProducts.forEach(item => readyGrid.appendChild(createCardElement(item, "ready")));
}

// Create a single product card element
function createCardElement(item, type) {
  const card = document.createElement("div");
  card.className = "product-card";

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;

  const h4 = document.createElement("h4");
  h4.textContent = item.name;

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = () => openModal(type, item.id);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteProduct(item.id, type);

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  card.appendChild(img);
  card.appendChild(h4);
  card.appendChild(actions);

  return card;
}

// Open modal for add/edit
function openModal(type, id = null) {
  document.getElementById("productId").value = id || "";
  document.getElementById("productType").value = type;

  if (id) {
    const arr = type === "raw" ? rawMaterials : readyProducts;
    const item = arr.find(p => p.id === id);
    document.getElementById("modalTitle").textContent = "Edit Product";
    document.getElementById("productName").value = item.name;
  } else {
    document.getElementById("modalTitle").textContent = "Add Product";
    productForm.reset();
  }

  modal.style.display = "flex";
}

// Close modal
function closeModal() {
  modal.style.display = "none";
}

// Handle form submission
productForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = document.getElementById("productId").value;
  const type = document.getElementById("productType").value;
  const name = document.getElementById("productName").value.trim();
  const fileInput = document.getElementById("productImage");

  if (!name) return;

  let arr = type === "raw" ? rawMaterials : readyProducts;

  if (fileInput.files && fileInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      saveOrUpdateProduct(id, type, name, evt.target.result, arr);
    };
    reader.readAsDataURL(fileInput.files[0]);
  } else {
    // keep old image if editing and no new file chosen
    let existingImage = "";
    if (id) {
      const product = arr.find(p => p.id == id);
      existingImage = product.image;
    }
    saveOrUpdateProduct(id, type, name, existingImage, arr);
  }
});

// Save new or update existing product
function saveOrUpdateProduct(id, type, name, image, arr) {
  if (id) {
    const product = arr.find(p => p.id == id);
    product.name = name;
    if (image) product.image = image;
  } else {
    arr.push({ id: Date.now(), name, image });
  }

  if (type === "raw") {
    rawMaterials = arr;
    saveProducts("rawMaterials", rawMaterials);
  } else {
    readyProducts = arr;
    saveProducts("readyProducts", readyProducts);
  }

  renderProducts(); // Append all cards safely
  closeModal();
}

// Delete product
function deleteProduct(id, type) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  if (type === "raw") {
    rawMaterials = rawMaterials.filter(p => p.id !== id);
    saveProducts("rawMaterials", rawMaterials);
  } else {
    readyProducts = readyProducts.filter(p => p.id !== id);
    saveProducts("readyProducts", readyProducts);
  }
  renderProducts();
}

// Render on page load
window.onload = renderProducts;
