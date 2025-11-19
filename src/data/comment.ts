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
    }

}
export default CommentData;