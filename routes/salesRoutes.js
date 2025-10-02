

const express = require('express');
const router = express.Router();
const Sale = require('../models/salesModel');

// Render Add Sales page
router.get('/sales', (req, res) => {
  res.render('addSales');
});

// Handle form submission
router.post('/sales', async (req, res) => {
  try {
    if (!req.body) {
      console.log('Form data received: undefined');
      return res.status(400).json({ error: 'No form data received' });
    }

    console.log('Form data received:', req.body);

    const {
      customerName,
      productType,
      productName,
      quantity,
      unitPrice,
      totalPrice,
      transportCharge,
      overallTotal,
      paymentType,
      salesAgent,
      saleDate,
      transportProvided
    } = req.body;

    const newSale = new Sale({
      customerName: customerName.trim(),
      productType: productType.trim(),
      productName: productName.trim(),
      quantity: parseFloat(quantity),
      unitPrice: parseFloat(unitPrice),
      totalPrice: parseFloat(totalPrice),
      transportCharge: parseFloat(transportCharge) || 0,
      overallTotal: parseFloat(overallTotal),
      paymentType: paymentType.trim(),
      salesAgent: salesAgent.trim(),
      saleDate: saleDate ? new Date(saleDate) : new Date(),
      transportProvided: transportProvided === 'on' || transportProvided === true
    });

    await newSale.save();
    console.log('Sale saved:', newSale);

    // Respond with JSON so frontend JS can display success
    res.status(201).json({
      message: 'Sale recorded successfully',
      sale: newSale
    });

  } catch (err) {
    console.error('Error saving sale:', err);
    res.status(500).json({ error: 'Failed to record sale' });
  }
});


// GET all sales for view
router.get("/viewsales", async (req, res) => {
  try {
    const sales = await Sale.find().sort({ saleDate: -1 }); // latest first
    res.render("viewSales", { sales }); // pass sales to pug
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// --- Render Edit Sale Page ---
router.get('/sales/edit/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).send('Sale not found');
    }
    res.render('editSale', { sale }); // render pug with sale data
  } catch (err) {
    console.error('Error fetching sale for edit:', err);
    res.status(500).send('Server error');
  }
});

// --- Handle Update Submission ---
router.post('/sales/edit/:id', async (req, res) => {
  try {
    const updatedSale = await Sale.findByIdAndUpdate(
      req.params.id,
      {
        customerName: req.body.customerName.trim(),
        productType: req.body.productType.trim(),
        productName: req.body.productName.trim(),
        quantity: parseFloat(req.body.quantity),
        unitPrice: parseFloat(req.body.unitPrice),
        totalPrice: parseFloat(req.body.totalPrice),
        transportCharge: parseFloat(req.body.transportCharge) || 0,
        overallTotal: parseFloat(req.body.overallTotal),
        paymentType: req.body.paymentType.trim(),
        salesAgent: req.body.salesAgent.trim(),
        saleDate: req.body.saleDate ? new Date(req.body.saleDate) : new Date(),
        transportProvided: req.body.transportProvided === 'on'
      },
      { new: true }
    );

    console.log('Sale updated:', updatedSale);
    res.redirect('/viewsales'); // go back to sales table
  } catch (err) {
    console.error('Error updating sale:', err);
    res.status(500).send('Failed to update sale');
  }
});



// Print Receipt page
router.get('/sales/receipt/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) return res.status(404).send('Sale not found');
    res.render('receipt', { sale });
  } catch (err) {
    console.error('Error fetching sale receipt:', err);
    res.status(500).send('Server error');
  }
});


router.delete("/sales/delete/:id", async (req, res) => {
  try {
    const deleted = await Sale.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Sale not found." });
    res.json({ message: "Sale deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error, couldn't delete sale" });
  }
});

// GENERATING REPORT
router.get('/reports/sales', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ error: 'Missing dates' });

  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59);

    const sales = await Sale.find({
      saleDate: { $gte: fromDate, $lte: toDate }
    }).lean(); // lean() gives plain JS objects
    res.json(sales);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching sales' });
  }
});











module.exports = router;





