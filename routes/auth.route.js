import express from "express";

import { getUserProfile, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", registerUser);

authRoutes.post("/login", loginUser);

authRoutes.get("/profile", authMiddleware, getUserProfile);

authRoutes.post('/logout', authMiddleware, logoutUser);


export default authRoutes;
