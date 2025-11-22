import { Schema, model, Document, Types } from "mongoose";
import { UserModel } from "./user.js";

interface ILog extends Document {
    userid: Types.ObjectId,
    type: string,
    message: string,
    context: string,
    timestamp: number,
}

const LogSchema = new Schema<ILog>({
    userid: { type: Schema.Types.ObjectId, ref: UserModel },
    type: { type: String },
    message: { type: String },
    context: { type: String },
    timestamp: { type: Number }
},
    { timestamps: true })

export const LogModel = model<ILog>("logs", LogSchema)