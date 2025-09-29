
const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  productName: { 
    type: String, 
    required: true 
  },
  productType: { 
    type: String, 
    required: true 
  },
  costPrice: { 
    type: Number, 
    required: true 
  },
  quantity: { 
    type: Number, 
    required: true 
  },
  productPrice: { 
    type: Number, 
    required: true 
  },
  supplierName: { 
    type: String, 
    required: true 
  },
  date: { 
    type: Date, 
    required: true 
  },
  quality: { 
    type: String, 
    required: true 
  },
  color: { 
    type: String 
  },
  measurements: { 
    type: String 
  },
  costTotal: { 
    type: Number 
  },
  totalValue: { 
    type: Number 
  },
  expectedProfit: { 
    type: Number 
  }
}, { timestamps: true });

module.exports = mongoose.model("Stock", stockSchema);

