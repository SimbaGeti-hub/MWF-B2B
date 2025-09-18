const fromDateInput = document.getElementById("fromDate");
const toDateInput = document.getElementById("toDate");
const filterBtn = document.getElementById("filterBtn");
const salesTableBody = document.getElementById("salesReportTable")?.querySelector("tbody");
const stockTableBody = document.getElementById("stockReportTable")?.querySelector("tbody");
const salesTotal = document.getElementById("salesTotal");

// Load data from storage
const sales = salesData || [];
const stock = stockData || [];

// Render stock report
function renderStockReport(){
  if(!stockTableBody) return;
  stockTableBody.innerHTML = "";
  stock.forEach(p=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${p.name}</td>
      <td>${p.type}</td>
      <td>${p.quantity}</td>
      <td>${p.costPrice.toFixed(2)}</td>
      <td>${p.supplierName || "-"}</td>
    `;
    stockTableBody.appendChild(tr);
  });
}

// Render sales report with optional date filter
function renderSalesReport(from=null, to=null){
  if(!salesTableBody) return;
  salesTableBody.innerHTML = "";
  let total = 0;
  sales.forEach(sale=>{
    const saleDate = new Date(sale.date);
    if(from && saleDate < from) return;
    if(to && saleDate > to) return;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${sale.customerName}</td>
      <td>${sale.productName}</td>
      <td>${sale.quantity}</td>
      <td>${sale.totalPrice.toFixed(2)}</td>
      <td>${saleDate.toLocaleDateString()}</td>
    `;
    salesTableBody.appendChild(tr);
    total += sale.totalPrice;
  });
  salesTotal.textContent = `Total Sales: $${total.toFixed(2)}`;
}

// Filter button
filterBtn.addEventListener("click", ()=>{
  const from = fromDateInput.value ? new Date(fromDateInput.value) : null;
  const to = toDateInput.value ? new Date(toDateInput.value) : null;
  renderSalesReport(from,to);
});

renderStockReport();
renderSalesReport();
