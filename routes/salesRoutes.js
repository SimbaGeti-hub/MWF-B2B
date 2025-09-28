// // const express = require('express');
// // const router = express.Router();

// // router.get("/sales", (req, res) =>{
// //     res.render("addSales");
// // })

// // router.post("/sales", (req, res) =>{
// //     console.log(req.body);
// // });



// // router.get("/viewsales", (req, res) =>{
// //     res.render("viewSales");
// // })




// const express = require('express');
// const router = express.Router();
// const Sale = require('../models/salesModel');

// // Render Add Sales page
// router.get('/sales', (req, res) => {
//   res.render('addSales');
// });

// // Handle sales form submission
// router.post('/sales', async (req, res) => {
//   try {
//     console.log('Form data received:', req.body); // log to terminal

//     const {
//       customerName,
//       productType,
//       productName,
//       quantity,
//       unitPrice,
//       totalPrice,
//       transportCharge,
//       overallTotal,
//       paymentType,
//       salesAgent,
//       saleDate,
//       transportProvided
//     } = req.body;

//     const newSale = new Sale({
//       customerName: customerName.trim(),
//       productType: productType.trim(),
//       productName: productName.trim(),
//       quantity: parseFloat(quantity),
//       unitPrice: parseFloat(unitPrice),
//       totalPrice: parseFloat(totalPrice),
//       transportCharge: parseFloat(transportCharge) || 0,
//       overallTotal: parseFloat(overallTotal),
//       paymentType: paymentType.trim(),
//       salesAgent: salesAgent.trim(),
//       saleDate: saleDate ? new Date(saleDate) : new Date(),
//       transportProvided: transportProvided === 'on' || transportProvided === true
//     });

//     await newSale.save();

//     console.log('Sale saved:', newSale); // log saved sale
//     res.redirect('/sales'); // redirect back to add sales page
//   } catch (err) {
//     console.error('Error saving sale:', err);
//     res.status(500).send('Failed to record sale');
//   }
// });

// // View all sales
// router.get('/viewSales', async (req, res) => {
//   try {
//     const sales = await Sale.find().sort({ saleDate: -1 });
//     res.render('viewSales', { sales });
//   } catch (err) {
//     console.error('Error fetching sales:', err);
//     res.status(500).send('Failed to fetch sales');
//   }
// });

// module.exports = router;








// const express = require('express');
// const router = express.Router();
// const Sale = require('../models/salesModel');

// // Render Add Sales page
// router.get('/sales', (req, res) => {
//   res.render('addSales');
// });

// // Handle form submission
// router.post('/sales', async (req, res) => {
//   try {
//     if (!req.body) {
//       console.log('Form data received: undefined');
//       return res.status(400).send('No form data received');
//     }

//     console.log('Form data received:', req.body);

//     const {
//       customerName,
//       productType,
//       productName,
//       quantity,
//       unitPrice,
//       totalPrice,
//       transportCharge,
//       overallTotal,
//       paymentType,
//       salesAgent,
//       saleDate,
//       transportProvided
//     } = req.body;

//     const newSale = new Sale({
//       customerName: customerName.trim(),
//       productType: productType.trim(),
//       productName: productName.trim(),
//       quantity: parseFloat(quantity),
//       unitPrice: parseFloat(unitPrice),
//       totalPrice: parseFloat(totalPrice),
//       transportCharge: parseFloat(transportCharge) || 0,
//       overallTotal: parseFloat(overallTotal),
//       paymentType: paymentType.trim(),
//       salesAgent: salesAgent.trim(),
//       saleDate: saleDate ? new Date(saleDate) : new Date(),
//       transportProvided: transportProvided === 'on' || transportProvided === true
//     });

//     await newSale.save();
//     console.log('Sale saved:', newSale);

//     res.redirect('/sales'); // redirect back to form
//   } catch (err) {
//     console.error('Error saving sale:', err);
//     res.status(500).send('Failed to record sale');
//   }
// });

// module.exports = router;













// const express = require('express');
// const router = express.Router();
// const Sale = require('../models/salesModel');

// // Render Add Sales page
// router.get('/sales', (req, res) => {
//   res.render('addSales');
// });

// // Handle form submission
// router.post('/sales', async (req, res) => {
//   try {
//     if (!req.body) {
//       console.log('Form data received: undefined');
//       return res.status(400).send('No form data received');
//     }

//     console.log('Form data received:', req.body);

//     const {
//       customerName,
//       productType,
//       productName,
//       quantity,
//       unitPrice,
//       totalPrice,
//       transportCharge,
//       overallTotal,
//       paymentType,
//       salesAgent,
//       saleDate,
//       transportProvided
//     } = req.body;

//     const newSale = new Sale({
//       customerName: customerName.trim(),
//       productType: productType.trim(),
//       productName: productName.trim(),
//       quantity: parseFloat(quantity),
//       unitPrice: parseFloat(unitPrice),
//       totalPrice: parseFloat(totalPrice),
//       transportCharge: parseFloat(transportCharge) || 0,
//       overallTotal: parseFloat(overallTotal),
//       paymentType: paymentType.trim(),
//       salesAgent: salesAgent.trim(),
//       saleDate: saleDate ? new Date(saleDate) : new Date(),
//       transportProvided: transportProvided === 'on' || transportProvided === true
//     });

//     await newSale.save();
//     console.log('Sale saved:', newSale);

//     // Redirect back to the same form
//     res.redirect('/sales');
//   } catch (err) {
//     console.error('Error saving sale:', err);
//     res.status(500).send('Failed to record sale');
//   }
// });

// module.exports = router;








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



// Delete a sale
// router.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedSale = await Sale.findByIdAndDelete(id);
//     if (!deletedSale) {
//       return res.status(404).json({ error: "Sale not found." });
//     }
//     res.json({ message: "Sale deleted successfully." });
//   } catch (err) {
//     console.error("Delete sale error:", err);
//     res.status(500).json({ error: "Could not delete sale." });
//   }
// });




// router.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;

//   // Validate MongoDB ObjectId format
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ error: "Invalid sale ID." });
//   }

//   try {
//     const deletedSale = await Sale.findByIdAndDelete(id);
//     if (!deletedSale) {
//       return res.status(404).json({ error: "Sale not found." });
//     }
//     res.json({ message: "Sale deleted successfully." });
//   } catch (err) {
//     console.error("Delete sale error:", err);
//     res.status(500).json({ error: "Could not delete sale." });
//   }
// });


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















module.exports = router;





