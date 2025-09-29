const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: { type: String, required: true },       // from <input name="taskName">
  taskDate: { type: Date, required: true },
  taskTime: { type: String }, // store as "HH:mm"
  taskLocation: { type: String },
  taskAssignedPerson: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
