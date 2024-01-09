import express from 'express';
import { createRateByUserId, createUser, delUser, getLikeByUserId, getRateByUserId, getUser, getUserById, handleLike, handleOrder, handleUnlike, updateUser } from '../controllers/userControllers.js';

const userRoutes = express.Router();

userRoutes.get("/get-list-user", getUser)
userRoutes.get("/get-user-by-id/:userId", getUserById)
userRoutes.post("/create-user", createUser)
userRoutes.delete("/delete-user/:userId", delUser)
userRoutes.put("/update-user/:userId", updateUser)

// Handle "LIKE"
userRoutes.post("/like-res", handleLike)
// Handle "UNLIKE"
userRoutes.delete("/dislike-res", handleUnlike)
// Handle "CREATE-RATE"
userRoutes.post("/create-rate", createRateByUserId)
// Handle "ORDER"
userRoutes.post("/order", handleOrder)
// Get List-like base on User-Id
userRoutes.get("/get-like-by-userId/:userId", getLikeByUserId)
// Get List-rate base on User-Id
userRoutes.get("/get-rate-by-userId/:userId", getRateByUserId)

export default userRoutes;