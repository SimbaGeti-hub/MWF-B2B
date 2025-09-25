// DOM elements
const filterBtn = document.getElementById("filterBtn");
const reportType = document.getElementById("reportType");
const salesReportSection = document.getElementById("salesReportSection");
const stockReportSection = document.getElementById("stockReportSection");
const exportOptions = document.getElementById("exportOptions");
const salesTableBody = document.querySelector("#salesReportTable tbody");
const stockTableBody = document.querySelector("#stockReportTable tbody");
const salesTotal = document.getElementById("salesTotal");

// Helper function to fetch sales from backend
async function fetchSales(fromDate, toDate) {
  try {
    const response = await fetch(`/api/sales?from=${fromDate}&to=${toDate}`);
    if (!response.ok) throw new Error("Failed to fetch sales data.");
    return await response.json(); // expecting array of sales objects
  } catch (error) {
    console.error(error);
    alert("Error fetching sales data.");
    return [];
  }
}

// Helper function to fetch stock from backend
async function fetchStock() {
  try {
    const response = await fetch(`/api/stock`);
    if (!response.ok) throw new Error("Failed to fetch stock data.");
    return await response.json(); // expecting array of stock objects
  } catch (error) {
    console.error(error);
    alert("Error fetching stock data.");
    return [];
  }
}

// Filter and generate reports
filterBtn.addEventListener("click", async () => {
  const fromDateValue = document.getElementById("fromDate").value;
  const toDateValue = document.getElementById("toDate").value;
  const type = reportType.value;

  // Validate inputs
  if (!type) {
    alert("Please select a report type.");
    return;
  }
  if (!fromDateValue || !toDateValue) {
    alert("Please select both From and To dates.");
    return;
  }

  const fromDate = new Date(fromDateValue);
  const toDate = new Date(toDateValue);
  if (fromDate > toDate) {
    alert("'From' date cannot be after 'To' date.");
    return;
  }

  // Clear previous results
  salesTableBody.innerHTML = "";
  stockTableBody.innerHTML = "";
  salesTotal.textContent = "";
  salesReportSection.style.display = "none";
  stockReportSection.style.display = "none";
  exportOptions.style.display = "none";

  let hasData = false;

  if (type === "sales") {
    const salesData = await fetchSales(fromDateValue, toDateValue);

    let totalSales = 0;
    salesData.forEach(sale => {
      const row = `<tr>
        <td>${sale.customer}</td>
        <td>${sale.product}</td>
        <td>${sale.quantity}</td>
        <td>${sale.totalPrice}</td>
        <td>${sale.date}</td>
      </tr>`;
      salesTableBody.innerHTML += row;
      totalSales += Number(sale.totalPrice);
      hasData = true;
    });

    if (hasData) {
      salesTotal.textContent = `Total Sales: ${totalSales}`;
      salesReportSection.style.display = "block";
      exportOptions.style.display = "flex";
    } else {
      alert("No sales data found for the selected range.");
    }

  } else if (type === "stock") {
    const stockData = await fetchStock();

    stockData.forEach(stock => {
      const row = `<tr>
        <td>${stock.product}</td>
        <td>${stock.type}</td>
        <td>${stock.quantity}</td>
        <td>${stock.costPrice}</td>
        <td>${stock.supplier}</td>
      </tr>`;
      stockTableBody.innerHTML += row;
      hasData = true;
    });

    if (hasData) {
      stockReportSection.style.display = "block";
      exportOptions.style.display = "flex";
    } else {
      alert("No stock data found.");
    }
  }
});

// Export functions
function printReport() {
  window.print();
}

function exportPDF() {
  alert("PDF export coming soon (use jsPDF library)");
}

function exportWord() {
  alert("Word export coming soon (use docx library)");
}

function exportExcel() {
  alert("Excel export coming soon (use SheetJS / xlsx library)");
}
