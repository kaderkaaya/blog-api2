import { Request, Response } from "express";
import ResponseHelper from "../helpers/responseHelper.js";
import LikeService from "../services/like.js";

class LikeController {
    static async likeBlog(req: Request, res: Response): Promise<void> {
        try {
            const { userId, blogId } = req.body;

            const blog = await LikeService.likeBlog(userId, blogId);
            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async unlikeBlog(req: Request, res: Response): Promise<void> {
        try {
            const { userId, blogId } = req.body;

            const blog = await LikeService.unlikeBlog(userId, blogId);
            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };
}
export default LikeController;