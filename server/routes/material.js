const express 					= require('express');

// Load controllers
const material					= require('../controllers/material_controller.js');

// Initiate routing
const materialRoute			= express.Router();

// Material management
materialRoute.get('/', material.print);
materialRoute.post('/add', material.add);
materialRoute.get('/show/:id', material.show);
materialRoute.post('/edit', material.edit);
materialRoute.post('/adjust', material.adjust);
materialRoute.post('/restock', material.restock);
materialRoute.delete('/remove/:id', material.remove);

module.exports = materialRoute;