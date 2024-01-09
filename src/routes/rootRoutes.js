import express from 'express';
import userRoutes from './userRoutes.js';
import restaurantRoutes from './restaurantRoutes.js';
import foodRoutes from './foodRoutes.js';

const rootRoutes = express.Router();

rootRoutes.use("/user", userRoutes);
rootRoutes.use("/restaurant", restaurantRoutes);
rootRoutes.use("/food", foodRoutes);

export default rootRoutes;