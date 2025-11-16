import express from "express";
const router = express.Router();
import BlogController from "../controllers/blog.js";
import BlogSchema from "../schemas/blog.js";
import SchemaHelper from "../helpers/schemaHelper.js";

router.post("/create-blog",
    SchemaHelper.validateSchemaBody(BlogSchema.createBlog),
    (BlogController.createBlog));
router.post("/update-blog",
    SchemaHelper.validateSchemaBody(BlogSchema.updateBlog),
    (BlogController.updateBlog));
router.post("/publish-blog",
    SchemaHelper.validateSchemaBody(BlogSchema.publishBlog),
    (BlogController.publishBlog));
router.post("/add-tags",
    SchemaHelper.validateSchemaBody(BlogSchema.addTags),
    (BlogController.addTags));            
router.post("/upload-blog-image",
    SchemaHelper.validateSchemaBody(BlogSchema.uploadBlogImage),
    (BlogController.uploadBlogImage));    

export default router;