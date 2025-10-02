// server.js or routes/todo.js
const express = require("express");
const router = express.Router();
const ToDo = require("../models/toDoModel");

// GET - render tasks
router.get("/toDo", async (req, res) => {
  const todos = await ToDo.find().sort({ createdAt: -1 });
  res.render("toDo", { todos });
});

// POST - add new task
router.post("/toDo", async (req, res) => {
  try {
    const { taskName, location, date, time, assignedPerson, description } = req.body;

    if (!taskName || !location || !date || !time || !assignedPerson || !description) {
      return res.status(400).send("Missing required fields");
    }

    await ToDo.create({ taskName, location, date, time, assignedPerson, description });
    res.redirect("/toDo");
  } catch (err) {
    res.status(500).send("Error saving task");
  }
});


// THE EDIT ROUTES
// GET edit form (prefilled with task data)
// GET edit form (prefilled with task data)
// router.get("/toDo/edit/:id", async (req, res) => {
//   try {
//     const todo = await ToDo.findById(req.params.id);
//     if (!todo) return res.redirect("/toDo");

//     // render the editToDo.pug with the task data
//     res.render("editToDo", { todo });
//   } catch (err) {
//     console.error(err);
//     res.redirect("/toDo");
//   }
// });



router.get("/toDo/edit/:id", async (req, res) => {
  try {
    const todo = await ToDo.findById(req.params.id);
    if (!todo) return res.redirect("/toDo");
    res.render("editToDo", { todo });
  } catch (err) {
    console.error(err);
    res.redirect("/toDo");
  }
});

// POST updated data from edit form (save changes)
router.post("/toDo/edit/:id", async (req, res) => {
  try {
    await ToDo.findByIdAndUpdate(req.params.id, {
      taskName: req.body.taskName,
      location: req.body.location,
      date: req.body.date,
      time: req.body.time,
      assignedPerson: req.body.assignedPerson,
      description: req.body.description,
    });
    res.redirect("/toDo");  // redirect to task list after successful update
  } catch (err) {
    console.error(err);
    res.redirect("/toDo");
  }
});


// DELETE ROUTE
router.delete("/toDo/:id", async (req, res) => {
  try {
    await ToDo.findByIdAndDelete(req.params.id);
    res.redirect("/toDo");
  } catch (err) {
    console.error(err);
    res.redirect("/toDo");
  }
});



module.exports = router;
