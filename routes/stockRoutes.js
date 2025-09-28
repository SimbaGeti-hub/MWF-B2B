// const express = require('express');
// const router = express.Router();
// const multer = require("multer")

// router.get("/stock", (req, res) =>{
//     res.render("addStock");
// })

// router.post("/stock", (req, res) =>{
//     console.log(req.body);
// });



// router.get("/viewstock", (req, res) =>{
//     res.render("viewStock");
// })










// const express = require("express");
// const router = express.Router();
// const Stock = require("../models/stockModel"); // <-- import model

// // Add stock form
// router.get("/stock", (req, res) => {
//   res.render("addStock");
// });

// // Save stock (POST)
// router.post("/stock", async (req, res) => {
//   try {
//     const newStock = new Stock({
//       productName: req.body.productName,
//       productType: req.body.productType,
//       costPrice: req.body.costPrice,
//       quantity: req.body.quantity,
//       productPrice: req.body.productPrice,
//       supplierName: req.body.supplierName,
//       date: req.body.date,
//       quality: req.body.quality,
//       color: req.body.color,
//       measurements: req.body.measurements,
//       totalValue: req.body.totalValue,
//       expectedProfit: req.body.expectedProfit,
//       costTotal: req.body.costTotal
//     });

//     await newStock.save();
//     console.log("✅ Stock saved:", newStock);

//     res.redirect("/viewstock"); // redirect after saving
//   } catch (error) {
//     console.error("❌ Error saving stock:", error);
//     res.status(500).send("Error saving stock");
//   }
// });

// // View all stock
// router.get("/viewstock", async (req, res) => {
//   try {
//     const stocks = await Stock.find().sort({ createdAt: -1 });
//     res.render("viewStock", { stocks });
//   } catch (error) {
//     console.error("❌ Error fetching stock:", error);
//     res.status(500).send("Error fetching stock");
//   }
// });

// module.exports = router;


// const express = require("express");
// const router = express.Router();
// const Stock = require("../models/stockModel"); // Import model

// // Render Add Stock form
// router.get("/stock", (req, res) => {
//   res.render("addStock");
// });

// // POST new stock
// router.post("/stock", async (req, res) => {
//   try {
//     // Extract values from req.body
//     const {
//       productName,
//       productType,
//       costPrice,
//       quantity,
//       productPrice,
//       supplierName,
//       date,
//       quality,
//       color,
//       measurements,
//       totalValue,
//       expectedProfit,
//       costTotal
//     } = req.body;

//     // Convert numeric fields
//     const stockData = {
//       productName,
//       productType,
//       costPrice: parseFloat(costPrice),
//       quantity: parseInt(quantity),
//       productPrice: parseFloat(productPrice),
//       supplierName,
//       date: new Date(date),
//       quality,
//       color,
//       measurements,
//       totalValue: totalValue ? parseFloat(totalValue) : undefined,
//       expectedProfit: expectedProfit ? parseFloat(expectedProfit) : undefined,
//       costTotal: costTotal ? parseFloat(costTotal) : undefined
//     };

//     // Log to terminal
//     console.log("💾 Stock data received:", stockData);

//     // Save to database
//     const newStock = new Stock(stockData);
//     const savedStock = await newStock.save();

//     console.log("✅ Stock saved to DB:", savedStock);

//     res.redirect("/stock"); // Redirect after saving
//   } catch (error) {
//     console.error("❌ Error saving stock:", error);
//     res.status(500).send("Error saving stock");
//   }
// });

// // View all stock
// router.get("/viewstock", async (req, res) => {
//   try {
//     const stocks = await Stock.find().sort({ createdAt: -1 });
//     res.render("viewStock", { stocks });
//   } catch (error) {
//     console.error("❌ Error fetching stock:", error);
//     res.status(500).send("Error fetching stock");
//   }
// });






// // --- GET: Edit Stock Page ---
// router.get("/stock/edit/:id", async (req, res) => {
//   try {
//     const stock = await Stock.findById(req.params.id);
//     if (!stock) return res.status(404).send("Stock item not found");
//     res.render("editStock", { stock }); // send stock data to edit page
//   } catch (error) {
//     console.error("❌ Error fetching stock for edit:", error);
//     res.status(500).send("Error fetching stock");
//   }
// });

// // --- POST: Update Stock ---
// router.post("/stock/edit/:id", async (req, res) => {
//   try {
//     const {
//       productName,
//       productType,
//       costPrice,
//       quantity,
//       productPrice,
//       supplierName,
//       date,
//       quality,
//       color,
//       measurements,
//       totalValue,
//       expectedProfit,
//       costTotal
//     } = req.body;

//     const stock = await Stock.findById(req.params.id);
//     if (!stock) return res.status(404).send("Stock item not found");

//     // Update fields
//     stock.productName = productName;
//     stock.productType = productType;
//     stock.costPrice = parseFloat(costPrice);
//     stock.quantity = parseInt(quantity);
//     stock.productPrice = parseFloat(productPrice);
//     stock.supplierName = supplierName;
//     stock.date = new Date(date);
//     stock.quality = quality;
//     stock.color = color;
//     stock.measurements = measurements;
//     stock.totalValue = totalValue ? parseFloat(totalValue) : undefined;
//     stock.expectedProfit = expectedProfit ? parseFloat(expectedProfit) : undefined;
//     stock.costTotal = costTotal ? parseFloat(costTotal) : undefined;

//     await stock.save();
//     console.log("✅ Stock updated:", stock);

//     res.redirect("/viewstock"); // go back to stock list
//   } catch (error) {
//     console.error("❌ Error updating stock:", error);
//     res.status(500).send("Error updating stock");
//   }
// });








// module.exports = router;







const express = require("express");
const router = express.Router();
const Stock = require("../models/stockModel"); // Import model

// --- GET: Add Stock Page ---
router.get("/stock", (req, res) => {
  res.render("addStock");
});

// --- POST: Add New Stock ---
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




// router.delete("/stock/delete/:id", async (req, res) => {
//   try {
//     const stock = await Stock.findByIdAndDelete(req.params.id);
//     if (!stock) return res.status(404).send("Stock item not found");
//     res.status(200).send("Stock deleted");
//   } catch (error) {
//     console.error("❌ Error deleting stock:", error);
//     res.status(500).send("Error deleting stock");
//   }
// });


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



















module.exports = router;







