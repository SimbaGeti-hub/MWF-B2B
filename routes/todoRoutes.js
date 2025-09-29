// const express = require('express');
// const router = express.Router();
// const Delivery = require('../models/deliveryModel');
// const Task = require('../models/taskModel');

// // Render To-Do page (initially empty, tables will be populated from DB)
// router.get('/toDo', async (req, res) => {
//   try {
//     const deliveries = await Delivery.find().sort({ createdAt: -1 }).lean();
//     const tasks = await Task.find().sort({ createdAt: -1 }).lean();
//     res.render('todo', { deliveries, tasks });
//   } catch (err) {
//     console.error(err);
//     res.render('todo', { deliveries: [], tasks: [] });
//   }
// });

// // Create a new delivery
// router.post('/delivery', async (req, res) => {
//   try {
//     const delivery = new Delivery({
//       deliveryCustomerName: req.body.deliveryCustomerName,
//       deliveryProduct: req.body.deliveryProduct,
//       deliveryLocation: req.body.deliveryLocation,
//       deliveryDate: req.body.deliveryDate,
//       deliveryTime: req.body.deliveryTime,
//       deliveryAssignedPerson: req.body.deliveryAssignedPerson,
//       deliveryCustomerNumber: req.body.deliveryCustomerNumber,
//       deliveryNumberOfItems: req.body.deliveryNumberOfItems
//     });

//     await delivery.save();
//     res.redirect('/toDo'); // redirect to show updated table
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving delivery: ' + err.message);
//   }
// });

// // Create a new task
// router.post('/task', async (req, res) => {
//   try {
//     const task = new Task({
//       taskName: req.body.taskName,
//       taskDate: req.body.taskDate,
//       taskTime: req.body.taskTime,
//       taskLocation: req.body.taskLocation,
//       taskAssignedPerson: req.body.taskAssignedPerson
//     });

//     await task.save();
//     res.redirect('/toDo'); // redirect to show updated table
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving task: ' + err.message);
//   }
// });

// module.exports = router;






// const express = require('express');
// const router = express.Router();
// const Delivery = require('../models/deliveryModel');
// const Task = require('../models/taskModel');

// // Render To-Do page with deliveries and tasks from DB
// router.get('/toDo', async (req, res) => {
//   try {
//     const deliveries = await Delivery.find().sort({ createdAt: -1 }).lean();
//     const tasks = await Task.find().sort({ createdAt: -1 }).lean();
//     res.render('todo', { deliveries, tasks }); // Pass data to Pug
//   } catch (err) {
//     console.error(err);
//     res.render('todo', { deliveries: [], tasks: [] }); // fallback
//   }
// });

// // Add a new delivery
// router.post('/delivery', async (req, res) => {
//   try {
//     const delivery = new Delivery(req.body);
//     await delivery.save();
//     res.redirect('/toDo'); // Redirect to page to show updated table
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving delivery: ' + err.message);
//   }
// });

// // Add a new task
// router.post('/task', async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.redirect('/toDo'); // Redirect to page to show updated table
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error saving task: ' + err.message);
//   }
// });

// // Delete a delivery
// router.get('/delivery/delete/:id', async (req, res) => {
//   try {
//     await Delivery.findByIdAndDelete(req.params.id);
//     res.redirect('/toDo');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error deleting delivery');
//   }
// });

// // Delete a task
// router.get('/task/delete/:id', async (req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);
//     res.redirect('/toDo');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Error deleting task');
//   }
// });

// // Edit a delivery (render edit page)
// router.get('/delivery/edit/:id', async (req, res) => {
//   try {
//     const delivery = await Delivery.findById(req.params.id).lean();
//     res.render('editDelivery', { delivery });
//   } catch (err) {
//     console.error(err);
//     res.redirect('/toDo');
//   }
// });

// // Edit a task (render edit page)
// router.get('/task/edit/:id', async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id).lean();
//     res.render('editTask', { task });
//   } catch (err) {
//     console.error(err);
//     res.redirect('/toDo');
//   }
// });

// module.exports = router;







// const express = require('express');
// const router = express.Router();
// const Delivery = require('../models/deliveryModel');
// const Task = require('../models/taskModel');

// // Render To-Do page
// router.get('/toDo', (req, res) => {
//   res.render('todo'); // Make sure todo.pug is in views/
// });

// // Get all deliveries and tasks (AJAX)
// router.get('/data', async (req, res) => {
//   try {
//     const deliveries = await Delivery.find().lean();
//     const tasks = await Task.find().lean();
//     res.json({ deliveries, tasks });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add delivery
// router.post('/delivery', async (req, res) => {
//   try {
//     const delivery = new Delivery(req.body);
//     await delivery.save();
//     res.json({ success: true, delivery });
//   } catch (err) {
//     res.json({ success: false, error: err.message });
//   }
// });

// // Add task
// router.post('/task', async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.json({ success: true, task });
//   } catch (err) {
//     res.json({ success: false, error: err.message });
//   }
// });


// // Route to fetch and render deliveries
// // Render To-Do page with deliveries and tasks
// router.get('/data', async (req, res) => {
//   try {
//     const deliveries = await Delivery.find().sort({ createdAt: -1 }).lean();
//     const tasks = await Task.find().sort({ createdAt: -1 }).lean();
//     res.json({ deliveries, tasks });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// module.exports = router;

















// const express = require('express');
// const router = express.Router();
// const Delivery = require('../models/deliveryModel');
// const Task = require('../models/taskModel');

// // Render To-Do page with data
// router.get('/toDo', async (req, res) => {
//   try {
//     // Fetch deliveries and tasks from DB
//     const deliveries = await Delivery.find().sort({ createdAt: -1 }).lean();
//     const tasks = await Task.find().sort({ createdAt: -1 }).lean();

//     // Render the Pug template and pass the data
//     res.render('todo', { deliveries, tasks });
//   } catch (err) {
//     console.error(err);
//     // If error, send empty arrays to avoid Pug crash
//     res.render('todo', { deliveries: [], tasks: [] });
//   }
// });

// // Optional: Get all deliveries and tasks via AJAX
// router.get('/data', async (req, res) => {
//   try {
//     const deliveries = await Delivery.find().lean();
//     const tasks = await Task.find().lean();
//     res.json({ deliveries, tasks });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // Add delivery
// router.post('/delivery', async (req, res) => {
//   try {
//     const delivery = new Delivery(req.body);
//     await delivery.save();
//     res.json({ success: true, delivery });
//   } catch (err) {
//     res.json({ success: false, error: err.message });
//   }
// });

// // Add task
// router.post('/task', async (req, res) => {
//   try {
//     const task = new Task(req.body);
//     await task.save();
//     res.json({ success: true, task });
//   } catch (err) {
//     res.json({ success: false, error: err.message });
//   }
// });

// module.exports = router;







const express = require("express");
const router = express.Router();
const Delivery = require("../models/deliveryModel");
const Task = require("../models/taskModel");

// =======================
// POST /delivery - Add a new delivery
// =======================
router.post("/delivery", async (req, res) => {
  try {
    const newDelivery = new Delivery(req.body);
    await newDelivery.save();
    res.json({ success: true, delivery: newDelivery });
  } catch (err) {
    console.error("Error adding delivery:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// =======================
// POST /task - Add a new task
// =======================
router.post("/task", async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.json({ success: true, task: newTask });
  } catch (err) {
    console.error("Error adding task:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
