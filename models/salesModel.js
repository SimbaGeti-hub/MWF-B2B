const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const salesSchema = new mongoose.Schema({
    saleId:{
        type:String,
        required:true
    },
    saleDate:{
        type:String,
        required:true,
        // unique:true,
        // trim:true
    },
    customerName:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    // salesAgent:{
    //     type : mongoose.Schema.Types.ObjectId,
    //     ref : "UserModel",
    //     requireq:true
    // },
    quantity:{
        type:String,
        required:true
    },
    overallTotal:{
        type:String,
        required:true
    },
    // salesperson:{
    //     type:String,
    //     required:true
    // }
    
});


module.exports = mongoose.model('SalesModel',salesSchema)