import express from "express";
import {
  createFood,
  delFood,
  getFood,
  getFoodById,
  updateFood,
} from "../controllers/foodControllers.js";

const foodRoutes = express.Router();

foodRoutes.get("/get-list-food", getFood);
foodRoutes.get("/get-food-by-id/:foodId", getFoodById);
foodRoutes.post("/create-food", createFood);
foodRoutes.put("/update-food/:foodId", updateFood);
foodRoutes.delete("/delete-food/:foodId", delFood);

export default foodRoutes;
