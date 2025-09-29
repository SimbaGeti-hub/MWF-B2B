
const express = require("express");
const router = express.Router();
const Employee = require("../models/employeeModel");
const Supplier = require("../models/supplierModel");

// Render Add Employee Form
router.get("/employees", (req, res) => {
  res.render("employees"); // employees.pug
});

router.post("/employee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeDob,
      employeeNIN,
      employeePosition,
      employeeContact,
      employeeEmail,
      employeeRole,
      nokName,
      nokContact,
      nokRelation
    } = req.body;

    const newEmployee = new Employee({
      employeeName,
      employeeDob,
      employeeNIN,
      employeePosition,
      employeeContact,
      employeeEmail,
      employeeRole,
      nokName,
      nokContact,
      nokRelation
    });

    await newEmployee.save();
    console.log("✅ Employee added:", newEmployee);
    res.redirect("/viewEmployees");
  } catch (error) {
    console.error("❌ Error saving employee:", error);

    if (error.code === 11000) {
      // Duplicate key error
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res.status(400).send(`Error: ${duplicateField} already exists.`);
    }

    res.status(500).send("Error saving employee");
  }
});


// View Employees
// router.get("/viewEmployees", async (req, res) => {
//   try {
//     const employees = await Employee.find().sort({ createdAt: -1 });
//     res.render("viewEmployees", { employees });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error fetching employees");
//   }
// });

//This route is for getting both the supplier and the employee.
router.get("/viewEmployees", async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    const suppliers = await Supplier.find().sort({ createdAt: -1 });

    res.render("viewEmployees", { employees, suppliers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});



// Render Edit Employee Form
router.get("/employees/edit/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send("Employee not found");
    res.render("editEmployee", { employee });
  } catch (err) {
    console.error("❌ Error fetching employee:", err);
    res.status(500).send("Error fetching employee data");
  }
});

// Update Employee
router.post("/employees/edit/:id", async (req, res) => {
  try {
    const {
      employeeName,
      employeeDob,
      employeeNIN,
      employeePosition,
      employeeContact,
      employeeEmail,
      employeeRole,
      nokName,
      nokContact,
      nokRelation
    } = req.body;

    const employeeId = req.params.id;

    // Check for duplicate NIN
    const existingNIN = await Employee.findOne({ employeeNIN, _id: { $ne: employeeId } });
    if (existingNIN) {
      return res.status(400).send("Error: NIN already exists for another employee.");
    }

    // Check for duplicate Email
    const existingEmail = await Employee.findOne({ employeeEmail, _id: { $ne: employeeId } });
    if (existingEmail) {
      return res.status(400).send("Error: Email already exists for another employee.");
    }

    // Update employee
    await Employee.findByIdAndUpdate(employeeId, {
      employeeName,
      employeeDob,
      employeeNIN,
      employeePosition,
      employeeContact,
      employeeEmail,
      employeeRole,
      nokName,
      nokContact,
      nokRelation
    }, { new: true, runValidators: true });

    res.redirect("/viewEmployees");
  } catch (err) {
    console.error("❌ Error updating employee:", err);
    res.status(500).send("Error updating employee");
  }
});




// DELETE Employee Route
// router.delete("/employees/delete/:id", async (req, res) => {
//   try {
//     const employeeId = req.params.id;

//     // Find and delete employee by ID
//     const deletedEmployee = await Employee.findByIdAndDelete(employeeId);

//     if (!deletedEmployee) {
//       return res.status(404).json({ message: "Employee not found" });
//     }

//     res.status(200).json({ message: "Employee deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     res.status(500).json({ message: "Server error while deleting employee" });
//   }
// });

router.delete('/employees/delete/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.status(200).send('Employee deleted');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting employee');
  }
});





























module.exports = router;
