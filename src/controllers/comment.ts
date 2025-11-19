import { Request, Response } from "express";
import ResponseHelper from "../helpers/responseHelper.js";
import CommentService from "../services/comment.js";

class CommentController {
    static async createComment(req: Request, res: Response): Promise<void> {
        try {
            const { userId, comment, blogId } = req.body;

            const createdComment = await CommentService.createComment(userId, comment, blogId);
            ResponseHelper.success(res, { createdComment }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async updateComment(req: Request, res: Response): Promise<void> {
        try {
            const { commentId, userId, comment } = req.body;

            // const updatedComment = await CommentService.updateComment(commentId, userId, comment,);
            // ResponseHelper.success(res, { updatedComment }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async updateCommentStatus(req: Request, res: Response): Promise<void> {
        try {
            const { commentId, blogId, userId } = req.body;

            const comment = await CommentService.updateCommentStatus(commentId, blogId, userId);
            ResponseHelper.success(res, { comment }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async getComments(req: Request, res: Response): Promise<void> {
        try {
            const { userId, blogId } = req.body;

            // const comments = await CommentService.getComments(userId, blogId,);
            // ResponseHelper.success(res, { comments }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async getCommentWithBlog(req: Request, res: Response): Promise<void> {
        try {
            const { commentId, blogId } = req.body;

            // const comment = await CommentService.getCommentWithBlog(commentId, blogId,);
            // ResponseHelper.success(res, { comment }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };
}

export default CommentController;