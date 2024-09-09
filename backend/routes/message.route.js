import express from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const messageRoutes = express.Router();

messageRoutes.post("/send/:id", verifyToken, sendMessage);
messageRoutes.get("/:id", verifyToken, getMessage);
