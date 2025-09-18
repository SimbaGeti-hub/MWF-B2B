const salesTableBody = document.getElementById("salesTable")?.querySelector("tbody");

function renderSales(){
  if(!salesTableBody) return;
  salesTableBody.innerHTML = "";
  salesData.forEach((sale,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sale.customerName}</td>
      <td>${sale.productName}</td>
      <td>${sale.quantity}</td>
      <td>${sale.totalPrice.toFixed(2)}</td>
      <td>${sale.paymentType}</td>
      <td>${sale.salesAgent}</td>
      <td>${new Date(sale.date).toLocaleDateString()}</td>
      <td>${sale.transport ? "Yes" : "No"}</td>
      <td>
        <button onclick="editSale(${index})">Edit</button>
        <button onclick="deleteSale(${index})">Delete</button>
      </td>
    `;
    salesTableBody.appendChild(tr);
  });
}

function editSale(index){
  const sale = salesData[index];
  const newCustomer = prompt("Customer Name:", sale.customerName) || sale.customerName;
  const newQuantity = parseInt(prompt("Quantity:", sale.quantity)) || sale.quantity;
  const newPayment = prompt("Payment Type (cash/cheque/bankOverdraft):", sale.paymentType) || sale.paymentType;
  const newTransport = confirm("Transport required?") || sale.transport;

  const product = stockData.find(p=>p.name===sale.productName);
  if(product && newQuantity !== sale.quantity){
    const difference = newQuantity - sale.quantity;
    if(difference > product.quantity){
      alert("Not enough stock to increase quantity!");
      return;
    }
    product.quantity -= difference;
  }

  const totalPrice = product.productPrice * newQuantity * (newTransport ? 1.05 : 1);

  salesData[index] = {...sale, customerName:newCustomer, quantity:newQuantity, paymentType:newPayment, transport:newTransport, totalPrice};
  saveSalesData();
  saveStockData();
  renderSales();
  window.updateDashboard();
}

function deleteSale(index){
  if(confirm("Delete this sale?")){
    const sale = salesData[index];
    const product = stockData.find(p=>p.name===sale.productName);
    if(product) product.quantity += sale.quantity;
    salesData.splice(index,1);
    saveSalesData();
    saveStockData();
    renderSales();
    window.updateDashboard();
  }
}

// Initial render
renderSales();
