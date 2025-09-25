// viewEmployees.js

const employeesTableBody = document.querySelector("#employeesTable tbody");
const suppliersTableBody = document.querySelector("#suppliersTable tbody");

// Render Employees
function renderEmployees() {
  employeesTableBody.innerHTML = "";

  if (employeesData.length === 0) {
    employeesTableBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No employees found</td></tr>`;
    return;
  }

  employeesData.forEach((emp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${emp.name}</td>
      <td>${emp.age}</td>
      <td>${emp.position}</td>
      <td>${emp.contact}</td>
      <td>${emp.email}</td>
      <td>${emp.role}</td>
      <td>
        <button class="edit-btn" data-type="employee" data-index="${index}">Edit</button>
        <button class="delete-btn" data-type="employee" data-index="${index}">Delete</button>
      </td>
    `;
    employeesTableBody.appendChild(row);
  });
}

// Render Suppliers
function renderSuppliers() {
  suppliersTableBody.innerHTML = "";

  if (suppliersData.length === 0) {
    suppliersTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No suppliers found</td></tr>`;
    return;
  }

  suppliersData.forEach((sup, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sup.name}</td>
      <td>${sup.product}</td>
      <td>${sup.location}</td>
      <td>${sup.contact}</td>
      <td>${sup.email}</td>
      <td>
        <button class="edit-btn" data-type="supplier" data-index="${index}">Edit</button>
        <button class="delete-btn" data-type="supplier" data-index="${index}">Delete</button>
      </td>
    `;
    suppliersTableBody.appendChild(row);
  });
}

// Handle Delete/Edit
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const type = e.target.dataset.type;
    const index = e.target.dataset.index;

    if (type === "employee") {
      employeesData.splice(index, 1);
      saveEmployeesData();
      renderEmployees();
    } else if (type === "supplier") {
      suppliersData.splice(index, 1);
      saveSuppliersData();
      renderSuppliers();
    }
  }

  if (e.target.classList.contains("edit-btn")) {
    const type = e.target.dataset.type;
    const index = e.target.dataset.index;

    if (type === "employee") {
      const emp = employeesData[index];
      const newName = prompt("Edit Employee Name:", emp.name);
      if (newName && newName.trim()) employeesData[index].name = newName.trim();
      saveEmployeesData();
      renderEmployees();
    } else if (type === "supplier") {
      const sup = suppliersData[index];
      const newName = prompt("Edit Supplier Name:", sup.name);
      if (newName && newName.trim()) suppliersData[index].name = newName.trim();
      saveSuppliersData();
      renderSuppliers();
    }
  }
});

// Initial load
renderEmployees();
renderSuppliers();
