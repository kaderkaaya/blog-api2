import mongoose from "mongoose";
import LikeModel from "../models/like.js";
import LIKE from "../utils/constant.js";
class LikeData {
    static async likeBlog(userId: string, blogId: string) {
        const like = await LikeModel.create({
            userId,
            blogId,
            likeStatus: LIKE.LIKE_STATUS.LIKE,

        });
        return like;
    }

    static async unlikeBlog(userId: string, blogId: string, likeId: string) {
        const likeObjId = new mongoose.Types.ObjectId(likeId);
        const like = await LikeModel.findByIdAndUpdate(
            { _id: likeObjId },
            { likeStatus: LIKE.LIKE_STATUS.UNLIKE },
            { new: true }

        );
        return like;
    }

    static async getExistingLike(likeId: string) {
        const likeObjId = new mongoose.Types.ObjectId(likeId);
        const like = await LikeModel.findById(
            { _id: likeObjId }
        );
        return like;
    }

    static async getLike(userId: string, blogId: string) {
        const blogObjId = new mongoose.Types.ObjectId(blogId);
        const userObjId = new mongoose.Types.ObjectId(userId);
        const like = await LikeModel.findOne(
            {
                userId: userObjId,
                blogId: blogObjId
            }
        ).sort({ createdAt: -1 });
        return like;
    };

    static async getLikes(userId: string) {
        const userObjId = new mongoose.Types.ObjectId(userId);
        const likes = await LikeModel.find(
            {
                userId: userObjId,
                likeStatus: LIKE.LIKE_STATUS.LIKE,
            }
        );
        return likes;
    };
    static async getTotalLikes(blogId: object) {
        const totalLikes = await LikeModel.aggregate([
            { $match: { blogId: blogId } },
            { $count: 'totalLikes' },
        ]);
        return totalLikes[0];

    }

}
export default LikeData;