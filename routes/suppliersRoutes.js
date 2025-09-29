const express = require("express");
const router = express.Router();
const Supplier = require("../models/supplierModel");

// GET suppliers page (optional if you want to list them)
router.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.render("suppliers", { suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// POST add supplier
router.post("/suppliers", async (req, res) => {
  try {
    const { name, location, phone, email, product } = req.body;
    if (!name || !location || !phone || !email || !product) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newSupplier = new Supplier({ name, location, phone, email, product });
    const savedSupplier = await newSupplier.save();

    // ✅ Log to terminal
    console.log("New supplier added:", savedSupplier);

    res.status(201).json(savedSupplier);

  } catch (err) {
    console.error("Error adding supplier:", err);
    res.status(500).json({ error: "Server error. Could not add supplier." });
  }
});



// // Get all suppliers (for view page)
// router.get('/viewEmployees', async (req, res) => {
//   try {
//     const suppliers = await Supplier.find();
//     // employees will come from your employee route/controller
//     res.render('viewEmployees', { suppliers });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error fetching suppliers');
//   }
// });

// // Delete supplier
// router.delete('/suppliers/delete/:id', async (req, res) => {
//   try {
//     await Supplier.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: 'Supplier deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to delete supplier' });
//   }
// });



// GET: Render edit supplier form
router.get("/suppliers/edit/:id", async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (!supplier) return res.status(404).send("Supplier not found");

    // Render editSupplier.pug and pass supplier data
    res.render("editSupplier", { supplier });
  } catch (err) {
    console.error("❌ Error fetching supplier:", err);
    res.status(500).send("Server error");
  }
});

// POST: Handle form submission to update supplier
router.post("/suppliers/edit/:id", async (req, res) => {
  try {
    const { supplierName, supplierLocation, supplierPhone, supplierEmail, supplierProduct } = req.body;
    const supplierId = req.params.id;

    // Optional: Check for duplicate email
    const existingEmail = await Supplier.findOne({ email: supplierEmail, _id: { $ne: supplierId } });
    if (existingEmail) {
      return res.status(400).send("Error: Email already exists for another supplier.");
    }

    // Update supplier
    await Supplier.findByIdAndUpdate(
      supplierId,
      {
        name: supplierName,
        location: supplierLocation,
        phone: supplierPhone,
        email: supplierEmail,
        product: supplierProduct
      },
      { new: true, runValidators: true }
    );

    // Redirect back to the combined view page
    res.redirect("/viewEmployees");
  } catch (err) {
    console.error("❌ Error updating supplier:", err);
    res.status(500).send("Error updating supplier");
  }
});




//Delete
router.delete('/suppliers/delete/:id', async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).send('Supplier deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting supplier');
  }
});








module.exports = router;
