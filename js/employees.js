const addEmployeeForm = document.getElementById("addEmployeeForm");
const employeesTableBody = document.getElementById("employeesTable")?.querySelector("tbody");
const successMessage = document.getElementById("successMessage");

// Initialize employeesData from storage
if(!window.employeesData) window.employeesData = JSON.parse(localStorage.getItem("employeesData") || "[]");

addEmployeeForm.addEventListener("submit", function(e){
  e.preventDefault();
  const newEmployee = {
    name: document.getElementById("employeeName").value.trim(),
    position: document.getElementById("employeePosition").value.trim(),
    contact: document.getElementById("employeeContact").value.trim(),
    email: document.getElementById("employeeEmail").value.trim(),
    role: document.getElementById("employeeRole").value.trim(),
    dateAdded: new Date().toISOString()
  };

  window.employeesData.push(newEmployee);
  localStorage.setItem("employeesData", JSON.stringify(window.employeesData));
  successMessage.textContent = "Employee added successfully!";
  addEmployeeForm.reset();
  renderEmployees();
  window.updateDashboard();
  setTimeout(()=>{ successMessage.textContent = ""; },3000);
});

function renderEmployees(){
  if(!employeesTableBody) return;
  employeesTableBody.innerHTML = "";
  window.employeesData.forEach((emp,index)=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.position}</td>
      <td>${emp.contact}</td>
      <td>${emp.email}</td>
      <td>${emp.role}</td>
      <td>
        <button class="action-btn" onclick="editEmployee(${index})">Edit</button>
        <button class="action-btn" onclick="deleteEmployee(${index})">Delete</button>
      </td>
    `;
    employeesTableBody.appendChild(tr);
  });
}

function editEmployee(index){
  const emp = window.employeesData[index];
  const newName = prompt("Employee Name:", emp.name) || emp.name;
  const newPosition = prompt("Position:", emp.position) || emp.position;
  const newContact = prompt("Contact:", emp.contact) || emp.contact;
  const newEmail = prompt("Email:", emp.email) || emp.email;
  const newRole = prompt("Role:", emp.role) || emp.role;

  window.employeesData[index] = {...emp,name:newName,position:newPosition,contact:newContact,email:newEmail,role:newRole};
  localStorage.setItem("employeesData", JSON.stringify(window.employeesData));
  renderEmployees();
  window.updateDashboard();
}

function deleteEmployee(index){
  if(confirm("Delete this employee?")){
    window.employeesData.splice(index,1);
    localStorage.setItem("employeesData", JSON.stringify(window.employeesData));
    renderEmployees();
    window.updateDashboard();
  }
}

// Initial render
renderEmployees();
