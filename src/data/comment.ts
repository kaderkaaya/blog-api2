import mongoose from "mongoose";
import CommentModel from "../models/comment.js";
import COMMENT from "../utils/constant.js"
class CommentData {
    static async createComment(userId: string, comment: string, blogId: string) {
        const createdComment = await CommentModel.create({
            userId,
            comment,
            blogId,
            commentStatus: COMMENT.COMMENT_STATUS.ACTIVE,
        });
        return createdComment;
    };

    static async getComment(commentId: string) {
        const existingComment = await CommentModel.findById({
            _id: commentId
        });
        return existingComment;
    };

    static async updateCommentStatus(commentId: string) {
        const updatedComment = await CommentModel.findByIdAndUpdate(
            { _id: commentId },
            { commentStatus: COMMENT.COMMENT_STATUS.PASSIVE },
            { new: true }
        );
        return updatedComment;
    };

    static async updateComment(commentId: string, comment: string) {
        const updatedFields: Partial<{
            comment: string
        }> = {};
        if (comment) {
            updatedFields.comment = comment
        }
        const updatedComment = await CommentModel.findByIdAndUpdate(
            { _id: commentId },
            updatedFields,
            { new: true },
        );
        return updatedComment;
    };

    static async getComments(userId: string, blogId: string) {
        const comments = await CommentModel.find({
            userId,
            blogId,
            commentStatus: COMMENT.COMMENT_STATUS.ACTIVE,
        });
        return comments;
    };

    static async getAllComments(userId: string) {
        const comments = await CommentModel.find({
            userId,
            commentStatus: COMMENT.COMMENT_STATUS.ACTIVE,
        });
        return comments;
    };

    static async getCommentWithBlog(commentId: string, blogId: string) {
        const commentObjId = new mongoose.Types.ObjectId(commentId);
        const comment = await CommentModel.aggregate([
            {
                $match: { _id: commentObjId }
            },
            {
                $lookup: {
                    from: "blogs",
                    let: { blogObjId: { $toObjectId: "$blogId" } },
                    pipeline: [
                        {
                            $match:
                                { $expr: { $eq: ["$_id", "$$blogObjId"] } }
                        }
                    ],
                    as: "blog",
                }
            },
            { $unwind: "$blog" }
        ]);
        return comment;
    }

}
export default CommentData;