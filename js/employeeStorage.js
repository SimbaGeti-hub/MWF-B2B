const EMPLOYEE_KEY = "employees";

// Get employees from localStorage
function getEmployees() {
  const employees = localStorage.getItem(EMPLOYEE_KEY);
  return employees ? JSON.parse(employees) : [];
}

// Save employees to localStorage
function saveEmployees(employees) {
  localStorage.setItem(EMPLOYEE_KEY, JSON.stringify(employees));
}

// Add employee
function addEmployee(employee) {
  const employees = getEmployees();
  employees.push(employee);
  saveEmployees(employees);
}

// Delete employee by email (or another unique key)
function deleteEmployee(email) {
  let employees = getEmployees();
  employees = employees.filter(emp => emp.email !== email);
  saveEmployees(employees);
}
