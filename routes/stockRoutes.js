
const express = require("express");
const router = express.Router();
const Stock = require("../models/stockModel"); // Import model

// --- GET: Add Stock Page ---
router.get("/stock", (req, res) => {
  res.render("addStock");
});





router.post("/stock", async (req, res) => {
  try {
    const {
      productName,
      productType,
      costPrice,
      quantity,
      productPrice,
      supplierName,
      date,
      quality,
      color,
      measurements
    } = req.body;

    // Convert numbers
    const cost = parseFloat(costPrice) || 0;
    const qty = parseInt(quantity) || 0;
    const price = parseFloat(productPrice) || 0;

    // Calculate totals
    const costTotal = cost * qty;
    const totalValue = price * qty;
    const expectedProfit = totalValue - costTotal;

    const stockData = {
      productName,
      productType,
      costPrice: cost,
      quantity: qty,
      productPrice: price,
      supplierName,
      date: new Date(date),
      quality,
      color,
      measurements,
      costTotal,
      totalValue,
      expectedProfit
    };

    console.log("💾 Stock data to save:", stockData);

    const newStock = new Stock(stockData);
    const savedStock = await newStock.save();

    console.log("✅ Stock saved to DB:", savedStock);
    res.redirect("/viewstock");
  } catch (error) {
    console.error("❌ Error saving stock:", error);
    res.status(500).send("Error saving stock");
  }
});

// --- GET: View All Stock ---
router.get("/viewstock", async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.render("viewStock", { stocks });
  } catch (error) {
    console.error("❌ Error fetching stock:", error);
    res.status(500).send("Error fetching stock");
  }
});

// --- GET: Edit Stock Page ---
router.get("/stock/edit/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).send("Stock item not found");
    res.render("editStock", { stock }); // send stock data to edit page
  } catch (error) {
    console.error("❌ Error fetching stock for edit:", error);
    res.status(500).send("Error fetching stock");
  }
});

// --- POST: Update Stock ---
router.post("/stock/edit/:id", async (req, res) => {
  try {
    const {
      productName,
      productType,
      costPrice,
      quantity,
      productPrice,
      supplierName,
      date,
      quality,
      color,
      measurements
    } = req.body;

    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).send("Stock item not found");

    // Convert numbers
    const cost = parseFloat(costPrice) || 0;
    const qty = parseInt(quantity) || 0;
    const price = parseFloat(productPrice) || 0;

    // Calculate totals
    const costTotal = cost * qty;
    const totalValue = price * qty;
    const expectedProfit = totalValue - costTotal;

    // Update fields
    stock.productName = productName;
    stock.productType = productType;
    stock.costPrice = cost;
    stock.quantity = qty;
    stock.productPrice = price;
    stock.supplierName = supplierName;
    stock.date = new Date(date);
    stock.quality = quality;
    stock.color = color;
    stock.measurements = measurements;
    stock.costTotal = costTotal;
    stock.totalValue = totalValue;
    stock.expectedProfit = expectedProfit;

    await stock.save();
    console.log("✅ Stock updated:", stock);

    res.redirect("/viewstock"); // go back to stock list
  } catch (error) {
    console.error("❌ Error updating stock:", error);
    res.status(500).send("Error updating stock");
  }
});



// DELETE stock
router.delete("/stock/delete/:id", async (req, res) => {
  try {
    const deleted = await Stock.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).send("Stock item not found");
    res.sendStatus(200); // success
  } catch (err) {
    console.error("❌ Error deleting stock:", err);
    res.status(500).send("Error deleting stock");
  }
});




router.get('/reports/stock', async (req, res) => {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).json({ error: 'Missing dates' });

  try {
    const fromDate = new Date(from);
    const toDate = new Date(to);
    toDate.setHours(23, 59, 59);

    const stocks = await Stock.find({
      createdAt: { $gte: fromDate, $lte: toDate } // replace with the date field you use
    }).lean();
    res.json(stocks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error fetching stock' });
  }
});



// GETTING THE STOCK FOR SALE VALIDATION
// API endpoint for Add Sales live stock
router.get('/api/stock', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stock data' });
  }
});











module.exports = router;







