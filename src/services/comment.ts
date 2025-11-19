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
    }


}
export default CommentService;