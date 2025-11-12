import { Schema, model, Document } from "mongoose";

interface IToken extends Document {
    userId: string,
    token: string,
}

const TokenSchema = new Schema<IToken>({
    userId: { type: String },
    token: { type: String },
},
    { timestamps: true });

export const TokenModel = model<IToken>("Tokens", TokenSchema)