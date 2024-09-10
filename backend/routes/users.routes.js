import express from "express";
import {
	getUserForSidebar,
	updateUser,
} from "../controllers/users.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const userRoutes = express.Router();

userRoutes.get("/", verifyToken, getUserForSidebar);
userRoutes.patch("/", verifyToken, updateUser);
