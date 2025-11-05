import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    name?: string,
    mail: string,
    phoneNumber: number,
    password: string,
    role: string,
    status: number,
    profileImg?: string,
}
const UserSchema = new Schema<IUser>({
    name: { type: String },
    mail: { type: String, required: true, unique: true },
    phoneNumber: { type: Number },
    password: { type: String },
    role: { type: String },
    status: { type: Number, default: 1 },
    profileImg: { type: String }
},
    { timestamps: true });

export const UserModel = model<IUser>("Users", UserSchema)