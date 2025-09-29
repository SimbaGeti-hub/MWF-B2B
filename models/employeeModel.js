// const mongoose = require("mongoose");

// const employeeSchema = new mongoose.Schema({
//   employeeName: { type: String, required: true },
//   employeeDob: { type: Date, required: true },
//   employeeNIN: { type: String, required: true, unique: true },
//   employeePosition: { type: String, required: true },
//   employeeContact: { type: String, required: true },
//   employeeEmail: { type: String, required: true, unique: true },
//   employeeRole: { type: String, required: true },
//   nokName: { type: String, required: true },
//   nokContact: { type: String, required: true },
//   nokRelation: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model("Employee", employeeSchema);


const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  employeeDob: { type: Date, required: true },
  employeeNIN: { type: String, required: true, unique: true },
  employeePosition: { type: String, required: true },
  employeeContact: { type: String, required: true },
  employeeEmail: { type: String, required: true, unique: true },
  employeeRole: { type: String, required: true },
  nokName: { type: String, required: true },
  nokContact: { type: String, required: true },
  nokRelation: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
