import { Schema, model, Document } from "mongoose";
import { BlogModel } from "./blog.js";
import { UserModel } from "./user.js";

interface ILike extends Document {
    userId: string,
    blogId: string,
}

const LikeSchema = new Schema<ILike>({
    userId: { type: String, ref: UserModel },
    blogId: { type: String, ref: BlogModel }
},
    { timestamps: true })

export const LikeModel = model<ILike>("Likes", LikeSchema)