const express =require('express')
const { Register, Login, Logout } = require('../Controllers/userCtrl')


const userRoutes = express.Router()

userRoutes.post('/register',Register)
userRoutes.post('/login',Login)
userRoutes.post('/logout',Logout)

module.exports = userRoutes;