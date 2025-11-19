import mongoose, { Schema, model, Document } from "mongoose";
import { UserModel } from "./user.js";
import { BlogModel } from "./blog.js";

interface IComment extends Document {
    userId: mongoose.Types.ObjectId,
    blogId: mongoose.Types.ObjectId,
    comment: string,
    commentStatus: number,
}

const CommentShema = new Schema<IComment>({
    userId: { type: Schema.Types.ObjectId, ref: UserModel },
    blogId: { type: Schema.Types.ObjectId, ref: BlogModel },
    comment: { type: String },
    commentStatus: { type: Number },
},
    { timestamps: true });

const CommentModel = model<IComment>("Comments", CommentShema);

export default CommentModel;