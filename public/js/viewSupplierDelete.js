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
