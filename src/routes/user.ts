import express from "express";
const router = express.Router();
import UserController from "../controllers/user.js";
import UserSchema from "../schemas/user.js";
import SchemaHelper from "../helpers/schemaHelper.js";

router.post("/register",
    SchemaHelper.validateSchemaBody(UserSchema.register),
    (UserController.register));

router.post("/login",
    SchemaHelper.validateSchemaBody(UserSchema.login),
    (UserController.login));

router.post("/verifyCode",
    SchemaHelper.validateSchemaBody(UserSchema.verifyCode),
    (UserController.verifyCode));

router.get("/getMe",
   SchemaHelper.validateSchemaQuery(UserSchema.getMe),
    (UserController.getMe));

router.post("/update",
    SchemaHelper.validateSchemaBody(UserSchema.update),
    (UserController.update));

router.post("/logOut",
    SchemaHelper.validateSchemaBody(UserSchema.logOut),
    (UserController.logOut));



export default router;