const totalStockEl = document.getElementById("totalStock");
const totalSalesEl = document.getElementById("totalSales");
const pendingDeliveryEl = document.getElementById("pendingDelivery");
const pendingTodoEl = document.getElementById("pendingTodo");
const recentSalesTableBody = document.getElementById("recentSalesTable")?.querySelector("tbody");

function renderDashboard(){
  totalStockEl.textContent = stockData.reduce((acc,s)=>acc+s.quantity,0);
  totalSalesEl.textContent = salesData.reduce((acc,s)=>acc+s.totalPrice,0).toFixed(2);
  pendingDeliveryEl.textContent = deliveryData.filter(d=>!d.completed).length;
  pendingTodoEl.textContent = todoData.filter(t=>!t.completed).length;

  if(recentSalesTableBody){
    recentSalesTableBody.innerHTML = "";
    const lastFive = salesData.slice(-5).reverse();
    lastFive.forEach(s=>{
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${s.customerName}</td>
        <td>${s.productName}</td>
        <td>${s.quantity}</td>
        <td>${s.totalPrice.toFixed(2)}</td>
        <td>${new Date(s.date).toLocaleDateString()}</td>
      `;
      recentSalesTableBody.appendChild(tr);
    });
  }
}

// Initial render
renderDashboard();

// Update dashboard live when storage changes
window.updateDashboard = renderDashboard;
