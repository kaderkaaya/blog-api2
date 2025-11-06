import express from "express";
const router = express.Router();
import UserController from "../controllers/user.js";

router.post("/register", (UserController.register));
router.post("/login", (UserController.login));
router.post("/verifyCode", (UserController.verifyCode));
router.get("/getMe", (UserController.getMe));
// router.post("/update", (UserController.update));
// router.post("/logOut", (UserController.logOut));



export default router;