// LocalStorage keys
let stockData = JSON.parse(localStorage.getItem('stockData')) || [];
let salesData = JSON.parse(localStorage.getItem('salesData')) || [];
let deliveryData = JSON.parse(localStorage.getItem('deliveryData')) || [];
let todoData = JSON.parse(localStorage.getItem('todoData')) || [];
let rawMaterialsData = JSON.parse(localStorage.getItem('rawMaterialsData')) || [];
let suppliersData = JSON.parse(localStorage.getItem('suppliersData')) || [];
let employeesData = JSON.parse(localStorage.getItem('employeesData')) || [];

// Save functions
function saveStockData(){ localStorage.setItem('stockData', JSON.stringify(stockData)); }
function saveSalesData(){ localStorage.setItem('salesData', JSON.stringify(salesData)); }
function saveDeliveryData(){ localStorage.setItem('deliveryData', JSON.stringify(deliveryData)); }
function saveTodoData(){ localStorage.setItem('todoData', JSON.stringify(todoData)); }
function saveRawMaterialsData(){ localStorage.setItem('rawMaterialsData', JSON.stringify(rawMaterialsData)); }
function saveSuppliersData(){ localStorage.setItem('suppliersData', JSON.stringify(suppliersData)); }
function saveEmployeesData(){ localStorage.setItem('employeesData', JSON.stringify(employeesData)); }

// Optional: dashboard live update callback
window.updateDashboard = function(){}
