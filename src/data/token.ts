import { TokenModel } from "../models/token.js";


class TokenData {
    static async refreshToken(token: string, userId: string) {
        await TokenModel.create({
            token,
            userId
        })
    }
    static async getUserToken(userId: string) {
        const token = await TokenModel.findOne({ userId }).sort({ createdAt: -1 });
        return token;
    }
    static async reRefreshToken(refreshToken: string, tokenId: string) {
        await TokenModel.findByIdAndUpdate(
            { _id: tokenId },
            { token: refreshToken },
            { new: true }

        )
    }

}
export default TokenData;