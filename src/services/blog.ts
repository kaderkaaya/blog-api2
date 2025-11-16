import UserData from "../data/user.js";
import ERROR_CODES from "../utils/error.js";
import ApiError from "../helpers/apiError.js";
import USER_ROLES from "../utils/constant.js";
import BlogData from "../data/blog.js";

class BlogService {

    static async createBlog(authorId: string, title: string, content: string, isDraft: boolean, tags: any) {
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
        const blog = await BlogData.createBlog(authorId, title, content, isDraft, tags);
        return blog;
    };

    static async publishBlog(authorId: string, blogId: string, isPublished: boolean) {
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
        const blog = await BlogData.publishBlog(authorId, blogId, isPublished);
        return blog;
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
        console.log('user', user);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        if (user.role === USER_ROLES.ROLES.READER) {
            throw new Error('no');
        }
        // const blog = await BlogData.addTags(authorId, blogId, tags);
        // return blog;
    };

    static async uploadBlogImage(authorId: string, blogId: string, imageUrl: string,) {
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
        // const blog = await BlogData.uploadBlogImage(authorId, blogId, imageUrl);
        // return blog;
    };
}
export default BlogService;