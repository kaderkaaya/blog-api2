import express from "express";
const router = express.Router();
import UserController from "../controllers/user.js";
import UserSchema from "../schemas/user.js";
import SchemaHelper from "../helpers/schemaHelper.js";
import authLimiter from "../helpers/limiter.js";

router.post("/register",
    authLimiter,
    SchemaHelper.validateSchemaBody(UserSchema.register),
    (UserController.register));

router.post("/login",
    authLimiter,
    SchemaHelper.validateSchemaBody(UserSchema.login),
    (UserController.login));

router.post("/verify-code",
    SchemaHelper.validateSchemaBody(UserSchema.verifyCode),
    (UserController.verifyCode));

router.get("/get-user",
    SchemaHelper.validateSchemaQuery(UserSchema.getself),
    (UserController.getself));

router.post("/update",
    SchemaHelper.validateSchemaBody(UserSchema.update),
    (UserController.update));

router.post("/log-out",
    SchemaHelper.validateSchemaBody(UserSchema.logOut),
    (UserController.logOut));



export default router;