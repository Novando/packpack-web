const express 					= require('express');

// Load controllers
const cart  						= require('../controllers/cart_controller.js');

// Initiate routing
const cartRoute			= express.Router();

// User management
cartRoute.get('/show/user/:id', cart.showUser);
cartRoute.post('/add', cart.add);

module.exports = cartRoute;