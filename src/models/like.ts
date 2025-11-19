import mongoose, { Schema, model, Document,Types } from "mongoose";
import { BlogModel } from "./blog.js";
import { UserModel } from "./user.js";

interface ILike extends Document {
    userId: Types.ObjectId,
    blogId: Types.ObjectId,
}

const LikeSchema = new Schema<ILike>({
    userId: { type: Schema.Types.ObjectId, ref: UserModel },
    blogId: { type: Schema.Types.ObjectId, ref: BlogModel }
},
    { timestamps: true })

export const LikeModel = model<ILike>("Likes", LikeSchema)