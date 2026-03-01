const mongoose = require('mongoose');

const PaymentDetailSchema = new  mongoose.Schema({
    paymentId: String,
    amount: Number,
    currency: String,
    status: String,
    method: String,
    description: String,
    customer: String, //Reference to your user model if you have one 
    created:{
        type: Date,
        default: Date.now
    }
});

const paymentDetail = mongoose.model('paymentDetail', PaymentDetailSchema)
module.exports = paymentDetail