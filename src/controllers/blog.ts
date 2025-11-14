import { Request, Response } from "express";
import BlogService from "../services/blog.js";
import ResponseHelper from "../helpers/responseHelper.js";

class BlogController {
    static async createBlog(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, title, content, isDraft, tags, isPublished } = req.body;
            const blog = await BlogService.createBlog(authorId, title, content, isDraft, tags, isPublished);
            console.log('blog', blog);

            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            console.log('error', error);

            ResponseHelper.sendError(res, error.message, 500)
        }
    };

}
export default BlogController;