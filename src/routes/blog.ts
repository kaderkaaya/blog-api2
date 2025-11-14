import express from "express";
const router = express.Router();
import BlogController from "../controllers/blog.js";
import BlogSchema from "../schemas/blog.js";
import SchemaHelper from "../helpers/schemaHelper.js";

router.post("/create-blog",
    SchemaHelper.validateSchemaBody(BlogSchema.createBlog),
    (BlogController.createBlog));

export default router;