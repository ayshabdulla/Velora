const adminRoutes = require('express').Router();
const adminCtrl = require('../Controllers/adminCtrl');


adminRoutes.post('/login', adminCtrl.login);

module.exports = adminRoutes;