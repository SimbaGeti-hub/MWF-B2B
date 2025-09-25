const addDeliveryForm = document.getElementById("addDeliveryForm");
const deliveryTableBody = document.getElementById("deliveryTable")?.querySelector("tbody");
const successMessage = document.getElementById("successMessage");

// Initialize deliveryData from storage
if(!window.deliveryData) window.deliveryData = JSON.parse(localStorage.getItem("deliveryData") || "[]");

addDeliveryForm.addEventListener("submit", function(e){
  e.preventDefault();
  const newDelivery = {
    customerName: document.getElementById("customerName").value.trim(),
    productName: document.getElementById("productName").value.trim(),
    quantity: parseInt(document.getElementById("quantity").value),
    deliveryTime: document.getElementById("deliveryTime").value,
    status: "Pending"
  };

  window.deliveryData.push(newDelivery);
  localStorage.setItem("deliveryData", JSON.stringify(window.deliveryData));
  successMessage.textContent = "Delivery scheduled successfully!";
  addDeliveryForm.reset();
  renderDeliveries();
  checkDeliveryNotifications();
  setTimeout(()=>{ successMessage.textContent = ""; },3000);
});

function renderDeliveries(){
  if(!deliveryTableBody) return;
  deliveryTableBody.innerHTML = "";
  window.deliveryData.forEach((d,index)=>{
    const deliveryDate = new Date(d.deliveryTime);
    const now = new Date();
    const status = deliveryDate < now ? "Completed" : "Pending";
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.customerName}</td>
      <td>${d.productName}</td>
      <td>${d.quantity}</td>
      <td>${deliveryDate.toLocaleString()}</td>
      <td>${status}</td>
      <td>
        <button class="action-btn" onclick="deleteDelivery(${index})">Delete</button>
      </td>
    `;
    deliveryTableBody.appendChild(tr);
  });
}

// Delete delivery
function deleteDelivery(index){
  if(confirm("Delete this delivery?")){
    window.deliveryData.splice(index,1);
    localStorage.setItem("deliveryData", JSON.stringify(window.deliveryData));
    renderDeliveries();
  }
}

// Check notifications (deliveries within next 30 minutes)
function checkDeliveryNotifications(){
  const now = new Date();
  const notifications = window.deliveryData.filter(d=>{
    const deliveryTime = new Date(d.deliveryTime);
    const diff = (deliveryTime - now)/60000; // minutes
    return diff <= 30 && diff > 0;
  });
  if(notifications.length > 0){
    alert(`You have ${notifications.length} delivery(s) within the next 30 minutes!`);
  }
}

// Auto-check every 1 minute
setInterval(checkDeliveryNotifications,60000);

// Initial render
renderDeliveries();
checkDeliveryNotifications();
