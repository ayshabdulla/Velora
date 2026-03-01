const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type:String,
        required: true
    },
    email: {
        type: String,
    },
    password: {
        type:String,
    },
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref:'Product' }] //Reference to product model
});

const User = mongoose.model('User', userSchema);
module.exports = User;