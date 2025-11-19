import mongoose, { Schema, model, Document } from "mongoose";
import { UserModel } from "./user.js";

interface IBlog extends Document {
    title: string,
    content: string,
    authorId: mongoose.Types.ObjectId,
    tags?: string[],
    likes: number,
    imageUrl?: string,
    isDraft: boolean,
    isPublished: boolean,
    blogStatus: number,
}

const BlogSchema = new Schema<IBlog>({
    title: { type: String },
    content: { type: String },
    authorId: { type: Schema.Types.ObjectId, ref: UserModel },
    tags: { type: [String] },
    likes: { type: Number },
    imageUrl: { type: String },
    isDraft: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    blogStatus: { type: Number, default: 0 }
},
    { timestamps: true })
export const BlogModel = model<IBlog>("Blogs", BlogSchema)