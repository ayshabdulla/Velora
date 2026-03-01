const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],

  totalAmount: Number,
  stripeSessionId: String,
  paymentStatus: {
    type: String,
    default: "pending",
  },

  shippingAddress: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pincode: String,
  },

}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);