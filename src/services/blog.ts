import UserData from "../data/user.js";
import ERROR_CODES from "../utils/error.js";
import ApiError from "../helpers/apiError.js";
import USER_ROLES from "../utils/constant.js";
import BlogData from "../data/blog.js";
import TokenService from "./token.js";
import CommentData from "../data/comment.js";
import LikeData from "../data/like.js";
import mongoose from "mongoose";

class BlogService {

    static async createBlog(authorId: string, title: string, content: string, isDraft: boolean, tags: any) {
        const user = await UserData.getUserByAuthorId(authorId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        if (user.verifyCode === false) {
            throw new ApiError(ERROR_CODES.VERIFY_ERROR.message, ERROR_CODES.VERIFY_ERROR.statusCode)
        }
        if (user.role === USER_ROLES.ROLES.READER) {
            throw new ApiError(ERROR_CODES.ROLE_ERROR.message, ERROR_CODES.ROLE_ERROR.statusCode);
        }
        const blog = await BlogData.createBlog(authorId, title, content, isDraft, tags);
        return blog;
    };

    static async publishBlog(authorId: string, blogId: string, isPublished: boolean) {
        const user = await UserData.getUserByAuthorId(authorId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        if (user.role === USER_ROLES.ROLES.READER) {
            throw new ApiError(ERROR_CODES.ROLE_ERROR.message, ERROR_CODES.ROLE_ERROR.statusCode);
        }
        const existingBlog = await BlogData.getBlog(blogId);
        if (!existingBlog) {
            throw new ApiError(ERROR_CODES.BLOG_ERROR.message, ERROR_CODES.BLOG_ERROR.statusCode)
        }
        if (existingBlog.isPublished === false) {
            await BlogData.publishBlog(authorId, blogId, isPublished);
        }
        await BlogData.unpublishBlog(authorId, blogId, isPublished);
        return existingBlog;
    };

    static async updateBlog(authorId: string, blogId: string, title: string, content: string, isDraft: boolean, isPublished: boolean) {
        const user = await UserData.getUserByAuthorId(authorId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        if (user.role === USER_ROLES.ROLES.READER) {
            throw new ApiError(ERROR_CODES.ROLE_ERROR.message, ERROR_CODES.ROLE_ERROR.statusCode);
        }
        const existingBlog = await BlogData.getBlog(blogId);
        if (!existingBlog) {
            throw new ApiError(ERROR_CODES.BLOG_ERROR.message, ERROR_CODES.BLOG_ERROR.statusCode)
        }
        const blog = await BlogData.updateBlog(blogId, title, content, isDraft, isPublished);
        return blog;
    }

    static async addTags(authorId: string, blogId: string, tags: any) {
        const user = await UserData.getUserByAuthorId(authorId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        if (user.role === USER_ROLES.ROLES.READER) {
            throw new ApiError(ERROR_CODES.ROLE_ERROR.message, ERROR_CODES.ROLE_ERROR.statusCode);
        }
        const existingBlog = await BlogData.getBlog(blogId);
        if (!existingBlog) {
            throw new ApiError(ERROR_CODES.BLOG_ERROR.message, ERROR_CODES.BLOG_ERROR.statusCode)
        }
        const blog = await BlogData.addTags(authorId, blogId, tags);
        return blog;
    };

    static async uploadBlogImage(authorId: string, blogId: string, imagePath: string,) {
        const user = await UserData.getUserByAuthorId(authorId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        if (user.verifyCode === false) {
            throw new ApiError(ERROR_CODES.VERIFY_ERROR.message, ERROR_CODES.VERIFY_ERROR.statusCode)
        }
        if (user.role === USER_ROLES.ROLES.READER) {
            throw new ApiError(ERROR_CODES.ROLE_ERROR.message, ERROR_CODES.ROLE_ERROR.statusCode);
        }
        const blog = await BlogData.uploadBlogImage(authorId, blogId, imagePath);
        return blog;
    };

    static async getBlogs(token: string) {
        const uToken: string = token;
        const userToken = await TokenService.verifyToken(uToken);
        const blogs = await BlogData.getBlogs();
        const blgs = await Promise.all(blogs.map(async blog => {
            const blogId = blog._id as mongoose.Types.ObjectId;
            const totalLikes = await LikeData.getTotalLikes(blogId);
            return {
                ...blog.toJSON(),
                totalLikes
            }
        }))
        if (userToken.role === 'reader') {
            return blgs.filter(blog =>
                blog.isPublished === true)
        }
        if (userToken.role === 'writer') {
            return blgs.filter(blog => blog.authorId === userToken.userId)
        }
        return blgs;

    }

    static async getBlog(token: string, blogId: string) {
        const blog = await BlogData.getUserWithBlog(blogId);
        if (!blog) {
            throw new ApiError(ERROR_CODES.BLOG_ERROR.message, ERROR_CODES.BLOG_ERROR.statusCode)
        }
        return blog;
    }

    static async getBlogWithComments(userId: string) {
        const user = await UserData.getUserByAuthorId(userId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        const blogs = await BlogData.getBlogs();
        const blogWithComments = await Promise.all(blogs.map(async blog => {
            const blogId = blog._id;
            const comments = await CommentData.getComments(userId, blogId as string);
            return {
                ...blog.toJSON(),
                comments,
            }
        }))
        return blogWithComments;

    }
}
export default BlogService;