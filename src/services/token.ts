import jwt from "jsonwebtoken";
import TokenData from "../data/token.js";
const JWT_KEY = process.env.JWT_KEY;

class TokenService {
    static async accessToken(userId: string): Promise<string> {
        const token = jwt.sign(
            { userId },
            JWT_KEY!,
            { expiresIn: '15m' }
        )
        return token;
    }
    static async refreshToken(userId: string): Promise<string> {
        const token = jwt.sign(
            { userId },
            JWT_KEY!,
            { expiresIn: '7d' }
        )
        await TokenData.refreshToken(token, userId);
        return token;
    }
    static async getUserToken(userId: string) {
        const token = await TokenData.getUserToken(userId)
        return token;
    }
    static async verifyUserToken(uToken: string) {
        jwt.verify(uToken, JWT_KEY!) as any;

    }
    static async reRefreshToken(refreshToken: string, tokenId: string) {
        await TokenData.reRefreshToken(refreshToken, tokenId)
    }
}
export default TokenService;