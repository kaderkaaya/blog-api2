import UserData from "../data/user.js";
import ERROR_CODES from "../utils/error.js";
import ApiError from "../helpers/apiError.js";
import USER_ROLES from "../utils/constant.js";
import BlogData from "../data/blog.js";

class BlogService {
    static async createBlog(authorId: string, title: string, content: string, isDraft: boolean, tags: any, isPublished: boolean) {
        const user = await UserData.getUserByAuthorId(authorId);
        console.log('user', user);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        if (user.verifyCode === false) {
            throw new ApiError(ERROR_CODES.VERIFY_ERROR.message, ERROR_CODES.VERIFY_ERROR.statusCode)
        }
        if (user.role === USER_ROLES.ROLES.READER) {
            throw new Error('no');
        }
        const blog = await BlogData.createBlog(authorId, title, content, isDraft, tags, isPublished);
        return blog;
    }
}
export default BlogService;