const addMaterialForm = document.getElementById("addMaterialForm");
const materialsTableBody = document.getElementById("materialsTable")?.querySelector("tbody");
const successMessage = document.getElementById("successMessage");

// Initialize rawMaterialsData from storage
if(!window.rawMaterialsData) window.rawMaterialsData = [];

addMaterialForm.addEventListener("submit", function(e){
  e.preventDefault();
  const newMaterial = {
    name: document.getElementById("materialName").value.trim(),
    type: document.getElementById("materialType").value,
    quantity: parseInt(document.getElementById("quantity").value),
    costPrice: parseFloat(document.getElementById("costPrice").value),
    supplier: document.getElementById("supplier").value.trim(),
    date: new Date().toISOString()
  };

  window.rawMaterialsData.push(newMaterial);
  localStorage.setItem("rawMaterialsData", JSON.stringify(window.rawMaterialsData));
  successMessage.textContent = "Material added successfully!";
  addMaterialForm.reset();
  renderMaterials();
  window.updateDashboard();
  setTimeout(()=>{ successMessage.textContent = ""; },3000);
});

function renderMaterials(){
  if(!materialsTableBody) return;
  materialsTableBody.innerHTML = "";
  window.rawMaterialsData.forEach((mat,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${mat.name}</td>
      <td>${mat.type}</td>
      <td>${mat.quantity}</td>
      <td>${mat.costPrice.toFixed(2)}</td>
      <td>${mat.supplier}</td>
      <td>
        <button class="action-btn" onclick="editMaterial(${index})">Edit</button>
        <button class="action-btn" onclick="deleteMaterial(${index})">Delete</button>
      </td>
    `;
    materialsTableBody.appendChild(tr);
  });
}

function editMaterial(index){
  const mat = window.rawMaterialsData[index];
  const newName = prompt("Material Name:", mat.name) || mat.name;
  const newType = prompt("Material Type:", mat.type) || mat.type;
  const newQty = parseInt(prompt("Quantity:", mat.quantity)) || mat.quantity;
  const newCost = parseFloat(prompt("Cost Price:", mat.costPrice)) || mat.costPrice;
  const newSupplier = prompt("Supplier Name:", mat.supplier) || mat.supplier;

  window.rawMaterialsData[index] = {...mat, name:newName,type:newType,quantity:newQty,costPrice:newCost,supplier:newSupplier};
  localStorage.setItem("rawMaterialsData", JSON.stringify(window.rawMaterialsData));
  renderMaterials();
  window.updateDashboard();
}

function deleteMaterial(index){
  if(confirm("Delete this material?")){
    window.rawMaterialsData.splice(index,1);
    localStorage.setItem("rawMaterialsData", JSON.stringify(window.rawMaterialsData));
    renderMaterials();
    window.updateDashboard();
  }
}

// Load from localStorage on start
if(localStorage.getItem("rawMaterialsData")){
  window.rawMaterialsData = JSON.parse(localStorage.getItem("rawMaterialsData"));
}
renderMaterials();
