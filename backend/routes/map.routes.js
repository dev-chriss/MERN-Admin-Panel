import jwt from '../middleware/auth';
import { Router } from "express";
const mapRouter = Router();
const mapController = require('../controllers/map.controller.js');

// Retrieve All data
mapRouter.get('/list', jwt, mapController.findAll);

// Retrieve data with pagination
mapRouter.get('/', jwt, mapController.findPagination);

// Find one by ID
mapRouter.get('/:id', jwt, mapController.findOne);

// Create
mapRouter.post('/', jwt, mapController.create);

// Update
mapRouter.put('/:id', jwt, mapController.update);

// Delete
mapRouter.delete('/:id', jwt, mapController.delete);

export default mapRouter;
