


document.addEventListener('DOMContentLoaded', () => {
  const filterBtn = document.getElementById('filterBtn');
  const reportType = document.getElementById('reportType');
  const fromDate = document.getElementById('fromDate');
  const toDate = document.getElementById('toDate');

  filterBtn.addEventListener('click', async () => {
    const type = reportType.value;
    const from = fromDate.value;
    const to = toDate.value;

    if (!from || !to) {
      alert('Please select both dates.');
      return;
    }

    try {
      const response = await fetch(`/reports/${type}?from=${from}&to=${to}`);
      const data = await response.json();

      if (type === 'sales') {
        displaySalesReport(data);
      } else if (type === 'stock') {
        displayStockReport(data);
      }

      document.getElementById('exportOptions').style.display = 'block';
    } catch (err) {
      console.error(err);
      alert('Error fetching report');
    }
  });

  function displaySalesReport(sales) {
    const section = document.getElementById('salesReportSection');
    const tbody = document.querySelector('#salesReportTable tbody');
    tbody.innerHTML = '';

    let total = 0;

    sales.forEach(sale => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${sale.customerName}</td>
        <td>${sale.productName}</td>
        <td>${sale.quantity}</td>
        <td>UGX ${sale.overallTotal.toFixed(2)}</td>
        <td>${new Date(sale.saleDate).toLocaleDateString()}</td>
      `;
      tbody.appendChild(tr);
      total += sale.overallTotal;
    });

    document.getElementById('salesTotal').textContent = `Total Sales: UGX ${total.toFixed(2)}`;
    section.style.display = 'block';
    document.getElementById('stockReportSection').style.display = 'none';
  }

  function displayStockReport(stocks) {
    const section = document.getElementById('stockReportSection');
    const tbody = document.querySelector('#stockReportTable tbody');
    tbody.innerHTML = '';

    stocks.forEach(stock => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${stock.productName}</td>
        <td>${stock.productType}</td>
        <td>${stock.quantity}</td>
        <td>UGX ${stock.costPrice.toFixed(2)}</td>
        <td>${stock.supplierName}</td>
      `;
      tbody.appendChild(tr);
    });

    section.style.display = 'block';
    document.getElementById('salesReportSection').style.display = 'none';
  }

  // ===== Export Functions =====
  window.printReport = () => {
    const visibleSection = document.querySelector('#salesReportSection[style*="block"], #stockReportSection[style*="block"]');
    if (!visibleSection) return alert('No report to print');
    const printContent = visibleSection.innerHTML;
    const newWin = window.open('', '', 'width=900,height=700');
    newWin.document.write(`<html><head><title>Print Report</title></head><body>${printContent}</body></html>`);
    newWin.document.close();
    newWin.print();
  };

  window.exportPDF = () => {
    if (!window.jspdf || !window.jspdf.jsPDF) return alert('jsPDF library not loaded');
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const visibleTable = document.querySelector('#salesReportSection[style*="block"] table, #stockReportSection[style*="block"] table');
    if (!visibleTable) return alert('No report to export');
    doc.text('Report', 10, 10);
    doc.autoTable({ html: visibleTable, startY: 20 });
    doc.save('report.pdf');
  };

  window.exportExcel = () => {
    if (!window.XLSX) return alert('SheetJS library not loaded');
    const visibleTable = document.querySelector('#salesReportSection[style*="block"] table, #stockReportSection[style*="block"] table');
    if (!visibleTable) return alert('No report to export');
    const wb = XLSX.utils.table_to_book(visibleTable, { sheet: 'Report' });
    XLSX.writeFile(wb, 'report.xlsx');
  };

  window.exportWord = () => {
    const visibleSection = document.querySelector('#salesReportSection[style*="block"], #stockReportSection[style*="block"]');
    if (!visibleSection) return alert('No report to export');
    const htmlContent = visibleSection.innerHTML;
    const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'report.doc';
    a.click();
    URL.revokeObjectURL(url);
  };
});
