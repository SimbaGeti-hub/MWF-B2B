const addSupplierForm = document.getElementById("addSupplierForm");
const suppliersTableBody = document.getElementById("suppliersTable")?.querySelector("tbody");
const successMessage = document.getElementById("successMessage");

// Initialize suppliersData from storage
if(!window.suppliersData) window.suppliersData = JSON.parse(localStorage.getItem("suppliersData") || "[]");

addSupplierForm.addEventListener("submit", function(e){
  e.preventDefault();
  const newSupplier = {
    name: document.getElementById("supplierName").value.trim(),
    contact: document.getElementById("supplierContact").value.trim(),
    email: document.getElementById("supplierEmail").value.trim(),
    address: document.getElementById("supplierAddress").value.trim(),
    dateAdded: new Date().toISOString()
  };

  window.suppliersData.push(newSupplier);
  localStorage.setItem("suppliersData", JSON.stringify(window.suppliersData));
  successMessage.textContent = "Supplier added successfully!";
  addSupplierForm.reset();
  renderSuppliers();
  window.updateDashboard();
  setTimeout(()=>{ successMessage.textContent = ""; },3000);
});

function renderSuppliers(){
  if(!suppliersTableBody) return;
  suppliersTableBody.innerHTML = "";
  window.suppliersData.forEach((sup,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sup.name}</td>
      <td>${sup.contact}</td>
      <td>${sup.email}</td>
      <td>${sup.address}</td>
      <td>
        <button class="action-btn" onclick="editSupplier(${index})">Edit</button>
        <button class="action-btn" onclick="deleteSupplier(${index})">Delete</button>
      </td>
    `;
    suppliersTableBody.appendChild(tr);
  });
}

function editSupplier(index){
  const sup = window.suppliersData[index];
  const newName = prompt("Supplier Name:", sup.name) || sup.name;
  const newContact = prompt("Contact:", sup.contact) || sup.contact;
  const newEmail = prompt("Email:", sup.email) || sup.email;
  const newAddress = prompt("Address:", sup.address) || sup.address;

  window.suppliersData[index] = {...sup,name:newName,contact:newContact,email:newEmail,address:newAddress};
  localStorage.setItem("suppliersData", JSON.stringify(window.suppliersData));
  renderSuppliers();
  window.updateDashboard();
}

function deleteSupplier(index){
  if(confirm("Delete this supplier?")){
    window.suppliersData.splice(index,1);
    localStorage.setItem("suppliersData", JSON.stringify(window.suppliersData));
    renderSuppliers();
    window.updateDashboard();
  }
}

// Initial render
renderSuppliers();
