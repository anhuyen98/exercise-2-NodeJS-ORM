import express from 'express';
import { createRes, delRes, getLikeByResId, getRateByResId, getResById, getRestaurant, updateRes } from '../controllers/restaurantControllers.js';

const restaurantRoutes = express.Router();

restaurantRoutes.get("/get-list-restaurant", getRestaurant)
restaurantRoutes.get("/get-res-by-id/:resId", getResById)
restaurantRoutes.post("/create-restaurant", createRes)
restaurantRoutes.put("/update-restaurant/:resId", updateRes)
restaurantRoutes.delete("/delete-restaurant/:resId", delRes)

// Get List-like base on Res-Id
restaurantRoutes.get("/get-like-by-resId/:resId", getLikeByResId)
// Get List-rate base on Res-Id
restaurantRoutes.get("/get-rate-by-resId/:resId", getRateByResId)

export default restaurantRoutes;