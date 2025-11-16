import { Request, Response } from "express";
import BlogService from "../services/blog.js";
import ResponseHelper from "../helpers/responseHelper.js";

class BlogController {

    static async createBlog(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, title, content, isDraft, tags } = req.body;
            const blog = await BlogService.createBlog(authorId, title, content, isDraft, tags);
            console.log('blog', blog);

            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            console.log('error', error);

            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async updateBlog(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, title, content, isDraft, blogId, isPublished } = req.body;

            const blog = await BlogService.updateBlog(
                authorId,
                blogId,
                title,
                content,
                isDraft,
                isPublished
            );

            ResponseHelper.success(res, { blog }, 200);
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500);
        }
    };

    static async addTags(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, blogId, tags, } = req.body;
            const blog = await BlogService.addTags(authorId, tags, blogId);
            console.log('blog', blog);

            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            console.log('error', error);

            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async uploadBlogImage(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, blogId, imageUrl, } = req.body;
            const blog = await BlogService.uploadBlogImage(authorId, blogId, imageUrl,);
            console.log('blog', blog);

            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            console.log('error', error);

            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async publishBlog(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, blogId, isPublished } = req.body;
            const blog = await BlogService.publishBlog(authorId, blogId, isPublished);
            console.log('blog', blog);

            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            console.log('error', error);

            ResponseHelper.sendError(res, error.message, 500)
        }
    };

}
export default BlogController;