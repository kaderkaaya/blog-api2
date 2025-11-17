import { Schema, model, Document } from "mongoose";
import { UserModel } from "./user.js";
import { BlogModel } from "./blog.js";

interface IComment extends Document {
    userId: string,
    blogId: string,
    comment: string,
    commentStatus: number,
}

const CommentShema = new Schema<IComment>({
    userId: { type: String, ref: UserModel },
    blogId: { type: String, ref: BlogModel },
    comment: { type: String },
    commentStatus: { type: Number },
},
    { timestamps: true });

const CommentModel = model<IComment>("Comments", CommentShema);

export default CommentModel;