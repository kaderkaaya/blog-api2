import { Request, Response } from "express";
import BlogService from "../services/blog.js";
import ResponseHelper from "../helpers/responseHelper.js";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';

class BlogController {

    static async createBlog(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, title, content, isDraft, tags } = req.body;

            const blog = await BlogService.createBlog(authorId, title, content, isDraft, tags);
            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
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
            const blog = await BlogService.addTags(authorId, blogId, tags);
            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async uploadBlogImage(req: Request, res: Response): Promise<void> {
        try {
            cloudinary.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET
            });
            const storage = multer.memoryStorage();
            const upload = multer({ storage: storage });
            const uploadImage = upload.single('imageUrl');
            uploadImage(req, res, async (err) => {
                cloudinary.uploader.upload_stream({ resource_type: 'auto' }, async (result) => {
                    if (err) return   ResponseHelper.sendError(res, err.message, 400)
                    const imagePath: string = req.file?.originalname!;
                    const { authorId, blogId } = req.body;
                    await BlogService.uploadBlogImage(authorId, blogId, imagePath);
                    res.json({ public_id: result?.public_id, url: result?.secure_url });
                }).end(req.file?.buffer)
            });
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async publishBlog(req: Request, res: Response): Promise<void> {
        try {
            const { authorId, blogId, isPublished } = req.body;

            const blog = await BlogService.publishBlog(authorId, blogId, isPublished);
            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            ResponseHelper.sendError(res, error.message, 500)
        }
    };

    static async getBlogs(req: Request, res: Response): Promise<void> {
        try {
            console.log('req.qqq',req.query);
            
            const { token } = req.query;
           if (typeof token !== "string") {
              ResponseHelper.sendError(res, 'token is required', 500);
              return;
           }
            const blog = await BlogService.getBlogs(token);
            ResponseHelper.success(res, { blog }, 200)
        } catch (error: any) {
            console.log('error',error);
            
            ResponseHelper.sendError(res, error.message, 500)
        }
    };
    

}
export default BlogController;