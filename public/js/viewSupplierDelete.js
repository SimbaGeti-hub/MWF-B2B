// ---------- EMPLOYEE DELETE ----------
const employeeDeleteBtns = document.querySelectorAll('.employees-section .delete-btn');
const deleteEmployeeModal = document.getElementById('deleteEmployeeModal');
const confirmDeleteEmployee = document.getElementById('confirmDeleteEmployee');
const cancelDeleteEmployee = document.getElementById('cancelDeleteEmployee');

let employeeIdToDelete = null;

employeeDeleteBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    employeeIdToDelete = btn.dataset.id;
    deleteEmployeeModal.style.display = 'block';
  });
});

cancelDeleteEmployee.addEventListener('click', () => {
  deleteEmployeeModal.style.display = 'none';
  employeeIdToDelete = null;
});

confirmDeleteEmployee.addEventListener('click', async () => {
  try {
    const res = await fetch(`/employees/delete/${employeeIdToDelete}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    } else {
      alert('Failed to delete employee');
    }
  } catch (err) {
    console.error(err);
    alert('Error deleting employee');
  }
});

// ---------- SUPPLIER DELETE ----------
const supplierDeleteBtns = document.querySelectorAll('.suppliers-section .delete-btn');
const deleteSupplierModal = document.getElementById('deleteSupplierModal');
const confirmDeleteSupplier = document.getElementById('confirmDeleteSupplier');
const cancelDeleteSupplier = document.getElementById('cancelDeleteSupplier');

let supplierIdToDelete = null;

supplierDeleteBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    supplierIdToDelete = btn.dataset.id;
    deleteSupplierModal.style.display = 'block';
  });
});

cancelDeleteSupplier.addEventListener('click', () => {
  deleteSupplierModal.style.display = 'none';
  supplierIdToDelete = null;
});

confirmDeleteSupplier.addEventListener('click', async () => {
  try {
    const res = await fetch(`/suppliers/delete/${supplierIdToDelete}`, { method: 'DELETE' });
    if (res.ok) {
      window.location.reload();
    } else {
      alert('Failed to delete supplier');
    }
  } catch (err) {
    console.error(err);
    alert('Error deleting supplier');
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const employeesTable = document.querySelector("#employeesTable");
  const suppliersTable = document.querySelector("#suppliersTable");
  const cardsContainer = document.querySelector(".cards-container");

  function updateCards() {
    // Clear old cards
    cardsContainer.innerHTML = "";

    // --- EMPLOYEES ---
    const employeeRows = employeesTable.querySelectorAll("tbody tr");
    let employees = [];

    employeeRows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length > 1) { // skip "No employees found."
        const role = cells[5].innerText.trim();
        employees.push({ role });
      }
    });

    // Total employees
    const totalEmployees = employees.length;
    const totalEmployeesCard = createCard("Total Employees", totalEmployees);
    cardsContainer.appendChild(totalEmployeesCard);

    // Employees by role
    const roleCounts = {};
    employees.forEach(e => {
      roleCounts[e.role] = (roleCounts[e.role] || 0) + 1;
    });
    Object.entries(roleCounts).forEach(([role, count]) => {
      const roleCard = createCard(`${role}`, count);
      cardsContainer.appendChild(roleCard);
    });

    // --- SUPPLIERS ---
    const supplierRows = suppliersTable.querySelectorAll("tbody tr");
    let supplierCount = 0;

    supplierRows.forEach(row => {
      const cells = row.querySelectorAll("td");
      if (cells.length > 1) { // skip "No suppliers found."
        supplierCount++;
      }
    });

    const suppliersCard = createCard("Total Suppliers", supplierCount);
    cardsContainer.appendChild(suppliersCard);
  }

  function createCard(title, value) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h4>${title}</h4>
      <p>${value}</p>
    `;
    return card;
  }

  // Initial load
  updateCards();
});


















