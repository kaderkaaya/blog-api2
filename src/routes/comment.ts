import express from "express";
const router = express.Router();
import CommentController from "../controllers/comment.js";
import CommentSchema from "../schemas/comment.js";
import SchemaHelper from "../helpers/schemaHelper.js";

router.post("/create-comment",
    SchemaHelper.validateSchemaBody(CommentSchema.createComment),
    (CommentController.createComment));
router.post("/update-comment-status",
    SchemaHelper.validateSchemaBody(CommentSchema.updateCommentStatus),
    (CommentController.updateCommentStatus));
router.post("/update-comment",
    SchemaHelper.validateSchemaBody(CommentSchema.updateComment),
    (CommentController.updateComment));
router.get("/get-comments",
    SchemaHelper.validateSchemaQuery(CommentSchema.getComments),
    (CommentController.getComments));
router.get("/get-comment",
    SchemaHelper.validateSchemaQuery(CommentSchema.getCommentWithBlog),
    (CommentController.getCommentWithBlog));

export default router;