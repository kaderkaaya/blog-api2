import CommentModel from "../models/comment.js";
import COMMENT from "../utils/constant.js"
class CommentData {
    static async createComment(userId:string,comment:string,blogId:string){
        const createdComment = await CommentModel.create({
            userId,
            comment,
            blogId,
            commentStatus:COMMENT.COMMENT_STATUS.ACTIVE,
        });
        return createdComment;
    }

}
export default CommentData;