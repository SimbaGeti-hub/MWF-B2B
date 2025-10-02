// models/ToDo.js
const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
  taskName: { type: String, required: true },         // Task title/name
  location: { type: String, required: true },         // Where the task happens
  date: { type: Date, required: true },               // Date of task
  time: { type: String, required: true },             // Time (HH:MM)
  assignedPerson: { type: String, required: true },   // Person responsible
  description: { type: String, required: true },      // Task details/notes
}, { timestamps: true });

module.exports = mongoose.model('ToDo', ToDoSchema);
