import { Schema, model, Document,Types, SchemaType } from "mongoose";

interface IToken extends Document {
    userId: Types.ObjectId,
    token: string,
}

const TokenSchema = new Schema<IToken>({
    userId: { type: Schema.Types.ObjectId },
    token: { type: String },
},
    { timestamps: true });

export const TokenModel = model<IToken>("Tokens", TokenSchema)