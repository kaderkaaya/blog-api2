import express from "express";
const router = express.Router();
import LikeController from "../controllers/like.js";
import LikeSchema from "../schemas/like.js";
import SchemaHelper from "../helpers/schemaHelper.js";

router.post("/create-comment",
    SchemaHelper.validateSchemaBody(LikeSchema.likeBlog),
    (LikeController.likeBlog));
router.post("/update-comment-status",
    SchemaHelper.validateSchemaBody(LikeSchema.unlikeBlog),
    (LikeController.unlikeBlog));

export default router;