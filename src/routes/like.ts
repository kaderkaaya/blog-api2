import express from "express";
const router = express.Router();
import LikeController from "../controllers/like.js";
import LikeSchema from "../schemas/like.js";
import SchemaHelper from "../helpers/schemaHelper.js";

router.post("/like-blog",
    SchemaHelper.validateSchemaBody(LikeSchema.likeBlog),
    (LikeController.likeBlog));
router.post("/unlike-blog",
    SchemaHelper.validateSchemaBody(LikeSchema.unlikeBlog),
    (LikeController.unlikeBlog));

export default router;