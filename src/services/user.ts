import zxcvbn from "zxcvbn";
import UserData from "../data/user.js";
import HashHelper from "../helpers/hashHelper.js"
import { generateCode } from "../utils/code.js";
import { verifyUserCode, hashCode } from "../utils/code.js"
import TokenService from "./token.js";
import ERROR_CODES from "../utils/error.js";
import ApiError from "../helpers/apiError.js";

class UserService {
    static async register(name: string, mail: string, phoneNumber: string, password: string, role:string) {
        const user = await UserData.getUser(mail, phoneNumber);
        if (user) {
            throw new ApiError(ERROR_CODES.EXISTING_USER.message, ERROR_CODES.EXISTING_USER.statusCode);
        }
        const regexPass = zxcvbn(password);
        if (regexPass.score < 3) {
            throw new ApiError(ERROR_CODES.PASSWORD_ERROR.message, ERROR_CODES.PASSWORD_ERROR.statusCode);
        }
        const hashPass = await HashHelper.hashPassword(password);
        const code = generateCode();
        const userC = await hashCode(code);
        return await UserData.register(name, mail, phoneNumber, hashPass, userC, role)
    };

    static async login(phoneNumber: string, password: string) {
        const user = await UserData.getUserByNumber(phoneNumber);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);

        }
        if (user.verifyCode === false) {
            throw new ApiError(ERROR_CODES.VERIFY_ERROR.message, ERROR_CODES.VERIFY_ERROR.statusCode);

        }
        const userPassword = user.password;
        const isMatch = await HashHelper.verifyPassword(userPassword, password);
        if (!isMatch) {
            throw new ApiError(ERROR_CODES.PASS_ERROR.message, ERROR_CODES.PASS_ERROR.statusCode);

        }
        const userId = user._id as string;
        let accessToken: string = '';
        let refreshToken: string = '';
        accessToken = await TokenService.accessToken(userId);
        const userToken = await TokenService.getUserToken(userId);
        const tokenId = userToken?._id as string;
        const now = Math.floor(Date.now() / 1000);
        if (userToken) {
            const decoded = userToken?.token as any;
            await TokenService.verifyUserToken(decoded)
            if (decoded.exp < now) {
                refreshToken = await TokenService.refreshToken(userId);
                await TokenService.reRefreshToken(tokenId, refreshToken);
            }
            else {
                refreshToken = userToken.token
            }
            return {
                ...user.toJSON(),
                accessToken,
                refreshToken
            }
        }
        else {
            refreshToken = await TokenService.refreshToken(userId);
        }

        return {
            ...user.toJSON(),
            accessToken,
            refreshToken
        };
    };

    static async getself(userId: string) {
        const user = await UserData.getUserById(userId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        return user;
    };
    static async verifyCode(code: string, userId: string) {
        const user = await UserData.getUserById(userId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        const userCode = user.code;
        const verify = await verifyUserCode(code, userCode)
        if (user.verifyCode === true) {
            throw new ApiError(ERROR_CODES.VERIFY_CODE_ERROR.message, ERROR_CODES.VERIFY_CODE_ERROR.statusCode)
        }
        if (verify === false) {
            throw new ApiError(ERROR_CODES.CODE_ERROR.message, ERROR_CODES.CODE_ERROR.statusCode);

        }
        await UserData.verifiedUserCode(userId)
        return user;
    };

    static async update(userId: string, name: string, mail: string, phoneNumber: string): Promise<object> {
        const user = await UserData.getUserById(userId);
        if (!user) {
            throw new ApiError(ERROR_CODES.USER_ERROR.message, ERROR_CODES.USER_ERROR.statusCode);
        }
        const updatedUser = await UserData.updateUser(userId, name, mail, phoneNumber)
        return { user: updatedUser };
    };
    static async logOut(userId: string) {
        const user = await UserData.getUserById(userId);
        const userToken = await TokenService.getUserToken(userId);
        if (!user || !userToken) {
            throw new ApiError(ERROR_CODES.EXIT_ERROR.message, ERROR_CODES.EXIT_ERROR.statusCode);
        }
        await TokenService.logOutUser(userId);
        return user;
    };

}
export default UserService;