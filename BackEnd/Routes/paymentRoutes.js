const express = require('express');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const { CreatePayment } = require('../Controllers/paymentCtrl');


const paymentRoutes = express.Router();

//Protect the payment route
paymentRoutes.post('/create-payment', AuthMiddleware.authUser,CreatePayment);

module.exports = paymentRoutes;