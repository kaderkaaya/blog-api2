import LikeData from "../data/like.js";
import ERROR_CODES from "../utils/error.js";
import ApiError from "../helpers/apiError.js";
import BlogData from "../data/blog.js";

class LikeService {
    static async likeBlog(userId: string, blogId: string) {
        const existingLike = await LikeData.getLike(userId, blogId);
        if (!existingLike) {
            return await LikeData.likeBlog(userId, blogId);
        }
        throw new ApiError(ERROR_CODES.LIKE_AGAIN_ERROR.message, ERROR_CODES.LIKE_AGAIN_ERROR.statusCode)

    }

    static async unlikeBlog(userId: string, blogId: string, likeId: string) {
        const like = await LikeData.getExistingLike(likeId);
        if (!like) {
            throw new ApiError(ERROR_CODES.LIKE_ERROR.message, ERROR_CODES.LIKE_ERROR.statusCode)
        }
        return await LikeData.unlikeBlog(userId, blogId, likeId);
    }

    static async getLikedPosts(userId: string) {
        const likes = await LikeData.getLikes(userId);
        const likedPosts = await Promise.all(likes.map( async like => {
            const blogid: object = like.blogId;
            const blog = await BlogData.getBlogWithId(blogid);
            return {
                ...blog?.toJSON(),
                like
            }
            
        }));
        return likedPosts;
    }
}
export default LikeService;