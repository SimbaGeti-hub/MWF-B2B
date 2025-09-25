const stockTableBody = document.getElementById("stockTable")?.querySelector("tbody");

function renderStock(){
  if(!stockTableBody) return;
  stockTableBody.innerHTML = "";
  stockData.forEach((item,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.type}</td>
      <td>${item.costPrice.toFixed(2)}</td>
      <td>${item.productPrice.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>${item.supplier}</td>
      <td>
        <button onclick="editStock(${index})">Edit</button>
        <button onclick="deleteStock(${index})">Delete</button>
      </td>
    `;
    stockTableBody.appendChild(tr);
  });
}

function editStock(index){
  const item = stockData[index];
  const newName = prompt("Product Name:", item.name) || item.name;
  const newType = prompt("Product Type:", item.type) || item.type;
  const newCost = parseFloat(prompt("Cost Price:", item.costPrice)) || item.costPrice;
  const newPrice = parseFloat(prompt("Sale Price:", item.productPrice)) || item.productPrice;
  const newQty = parseInt(prompt("Quantity:", item.quantity)) || item.quantity;

  stockData[index] = {...item, name:newName, type:newType, costPrice:newCost, productPrice:newPrice, quantity:newQty};
  saveStockData();
  renderStock();
  window.updateDashboard();
}

function deleteStock(index){
  if(confirm("Are you sure you want to delete this stock item?")){
    stockData.splice(index,1);
    saveStockData();
    renderStock();
    window.updateDashboard();
  }
}

// Initial render
renderStock();
