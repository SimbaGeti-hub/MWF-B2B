
const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
  customerName: { type: String, required: true, trim: true },
  productType: { type: String, required: true, trim: true },
  productName: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, min: 0 },
  unitPrice: { type: Number, required: true, min: 0 },
  totalPrice: { type: Number, required: true, min: 0 },
  transportCharge: { type: Number, default: 0, min: 0 },
  overallTotal: { type: Number, required: true, min: 0 },
  paymentType: { type: String, required: true, trim: true },
  salesAgent: { type: String, required: true, trim: true },
  saleDate: { type: Date, required: true, default: Date.now },
  transportProvided: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Sale', saleSchema);

