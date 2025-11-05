import express from "express";
const router = express.Router();
import UserController from "../controllers/user.js";

router.post("/register", (UserController.register));

export default router;