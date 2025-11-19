import UserData from "../data/user.js";
import ERROR_CODES from "../utils/error.js";
import ApiError from "../helpers/apiError.js";
import BlogData from "../data/blog.js";
import CommentData from "../data/comment.js";

class CommentService {
    static async createComment(userId: string, comment: string, blogId: string) {
        const user = await UserData.getUserById(userId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        const existingBlog = await BlogData.getBlog(blogId);
        if (!existingBlog) {
            throw new ApiError(ERROR_CODES.BLOG_ERROR.message, ERROR_CODES.BLOG_ERROR.statusCode)
        }
        const createdComment = await CommentData.createComment(userId, comment, blogId);

        return createdComment;
    };

    static async updateCommentStatus(commentId: string, blogId: string, userId: string) {
        const user = await UserData.getUserById(userId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        const existingBlog = await BlogData.getBlog(blogId);
        if (!existingBlog) {
            throw new ApiError(ERROR_CODES.BLOG_ERROR.message, ERROR_CODES.BLOG_ERROR.statusCode)
        }
        const existingComment = await CommentData.getComment(commentId);
        if (!existingComment) {
            throw new ApiError(ERROR_CODES.COMMENT_ERROR.message, ERROR_CODES.COMMENT_ERROR.statusCode)
        }
        await CommentData.updateCommentStatus(commentId);
    };

    static async updateComment(commentId: string, userId: string, comment: string) {
        const user = await UserData.getUserById(userId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        const existingComment = await CommentData.getComment(commentId);
        if (!existingComment) {
            throw new ApiError(ERROR_CODES.COMMENT_ERROR.message, ERROR_CODES.COMMENT_ERROR.statusCode)
        }
        const updatedComment = await CommentData.updateComment(commentId, comment);
        return updatedComment;
    };

    static async getComments(userId: string, blogId: string) {
        if (blogId) {
            const comments = await CommentData.getComments(userId, blogId);
            const blogWithComments = await Promise.all(comments.map(async comment => {
                const blogid = comment.blogId;
                const blog = await BlogData.getBlogWithId(blogid);
                return {
                    ...comment.toJSON(),
                    blog
                }

            }))
            return blogWithComments;
        }
        const comments = await CommentData.getAllComments(userId);
        const blogWithComments = await Promise.all(comments.map(async comment => {
            const blogid = comment.blogId;
            const blog = await BlogData.getBlogWithId(blogid);
            return {
                ...comment.toJSON(),
                blog
            }

        }))
        return blogWithComments;
    }

    static async getCommentWithBlog(commentId: string, blogId: string) {
        const comment = await CommentData.getCommentWithBlog(commentId, blogId);
        return comment;
    }



}
export default CommentService;