import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    name?: string,
    mail: string,
    phoneNumber: string,
    password: string,
    role: string,
    status: number,
    profileImg?: string,
    code: string
    verifyCode: boolean
}
const UserSchema = new Schema<IUser>({
    name: { type: String },
    mail: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    password: { type: String },
    role: { type: String },
    status: { type: Number, default: 1 },
    profileImg: { type: String },
    code: { type: String },
    verifyCode: { type: Boolean, default: false }
},
    { timestamps: true });

export const UserModel = model<IUser>("Users", UserSchema)