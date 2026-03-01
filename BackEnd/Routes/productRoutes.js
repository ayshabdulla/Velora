const express = require('express');
const { getAllProducts, singleProduct, CreateProduct, updateProduct, deleteProduct } = require('../Controllers/productCtrl');
const AuthMiddleware = require('../Middleware/AuthMiddleware');
const { addtoCart, getUserCart, deleteFormCart } = require('../Controllers/cartCtrl');
const upload =require('../Middleware/upload')

const productRoutes = express.Router();

//Product routes
productRoutes.get('/', getAllProducts); // open route
productRoutes.get('/single/:id', singleProduct); //open route


//2.ADMIN ACTIONS (Protected by AuthMiddleware.authAdmin)
productRoutes.post('/create', CreateProduct);
productRoutes.put('/update/:id',updateProduct);
productRoutes.delete('/delete/:productId',AuthMiddleware.authAdmin,deleteProduct);

//CART ROUTES[for user]
productRoutes.post('/addtocart', AuthMiddleware.authUser,addtoCart);
productRoutes.get('/getusercart',AuthMiddleware.authUser,getUserCart);
productRoutes.delete('/cart/delete/:productId',AuthMiddleware.authUser,deleteFormCart);

module.exports = productRoutes;