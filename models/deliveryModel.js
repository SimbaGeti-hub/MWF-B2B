const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  deliveryCustomerName: { type: String, required: true }, // from <input name="deliveryCustomerName">
  deliveryProduct: { type: String, required: true },      // from <input name="deliveryProduct">
  deliveryLocation: { type: String },
  deliveryDate: { type: Date, required: true },
  deliveryTime: { type: String }, // store as string "HH:mm"
  deliveryAssignedPerson: { type: String },
  deliveryCustomerNumber: { type: String },
  deliveryNumberOfItems: { type: Number }
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);
