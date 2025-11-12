import { Schema, model, Document } from "mongoose";
import { UserModel } from "./user.js";

interface IBlog extends Document {
    title: string,
    content: string,
    authorId: string,
    tags?: string[],
    likes: number,
    imgUrl?: string,
    isDraft: boolean,
    isPublished: boolean,
    blogStatus: number,
}

const BlogSchema = new Schema<IBlog>({
    title: { type: String },
    content: { type: String },
    authorId: { type: String, ref: UserModel },
    tags: { type: [String] },
    likes: { type: Number },
    imgUrl: { type: String },
    isDraft: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
    blogStatus: { type: Number, default: 0 }
},
    { timestamps: true })
export const BlogModel = model<IBlog>("Blogs", BlogSchema)