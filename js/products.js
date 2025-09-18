const productsTableBody = document.getElementById("productsTable")?.querySelector("tbody");

function renderProducts(){
  if(!productsTableBody) return;
  productsTableBody.innerHTML = "";
  stockData.forEach((p, index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.type}</td>
      <td>${p.costPrice.toFixed(2)}</td>
      <td>${p.productPrice.toFixed(2)}</td>
      <td>${p.quantity}</td>
      <td>${p.supplier}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct(${index})">Delete</button>
      </td>
    `;
    productsTableBody.appendChild(tr);
  });
}

function editProduct(index){
  const p = stockData[index];
  const newName = prompt("Product Name:", p.name) || p.name;
  const newType = prompt("Product Type:", p.type) || p.type;
  const newCost = parseFloat(prompt("Cost Price:", p.costPrice)) || p.costPrice;
  const newPrice = parseFloat(prompt("Sale Price:", p.productPrice)) || p.productPrice;
  const newQty = parseInt(prompt("Quantity:", p.quantity)) || p.quantity;
  stockData[index] = {...p, name:newName, type:newType, costPrice:newCost, productPrice:newPrice, quantity:newQty};
  saveStockData();
  renderProducts();
  window.updateDashboard();
}

function deleteProduct(index){
  if(confirm("Delete this product?")){
    stockData.splice(index,1);
    saveStockData();
    renderProducts();
    window.updateDashboard();
  }
}

// Initial render
renderProducts();
