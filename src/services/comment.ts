import UserData from "../data/user.js";
import ERROR_CODES from "../utils/error.js";
import ApiError from "../helpers/apiError.js";
import BlogData from "../data/blog.js";
import CommentData from "../data/comment.js";

class CommentService {
    static async createComment(userId: string, comment: string, blogId: string) {
        const authorId: string = userId;
        const user = await UserData.getUserByAuthorId(authorId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        const existingBlog = await BlogData.getBlog(blogId);
        if (!existingBlog) {
            throw new ApiError(ERROR_CODES.BLOG_ERROR.message, ERROR_CODES.BLOG_ERROR.statusCode)
        }
        const createdComment = await CommentData.createComment(userId, comment, blogId);
        return  createdComment 

    }

}
export default CommentService;