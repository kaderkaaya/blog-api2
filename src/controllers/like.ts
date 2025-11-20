import { Request, Response } from "express";
import ResponseHelper from "../helpers/responseHelper.js";
import LikeService from "../services/like.js";

class LikeController {
    static async likeBlog(req: Request, res: Response): Promise<void> {
        try {
            const { userId, blogId } = req.body;

            const like = await LikeService.likeBlog(userId, blogId);
            ResponseHelper.success(res, { like }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async unlikeBlog(req: Request, res: Response): Promise<void> {
        try {
            const { userId, blogId, likeId } = req.body;

            const like = await LikeService.unlikeBlog(userId, blogId, likeId);
            ResponseHelper.success(res, { like }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async getLikedPosts(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.query;
            const posts = await LikeService.getLikedPosts(userId as string);
            ResponseHelper.success(res, { posts }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };
}
export default LikeController;