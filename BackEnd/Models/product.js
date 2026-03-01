const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    discount: {          // ✅ also fix spelling here
        type: Number
    },
    outOfStock: {
        type: Boolean
    },
    img: {
        type: String
    }
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

module.exports = Product