import zxcvbn from "zxcvbn";
import UserData from "../data/user.js";
import { hashPassword, verifyPassword } from "../helpers/hashHelper.js"
import { generateCode } from "../utils/code.js";
import { verifyUserCode, hashCode } from "../utils/code.js"
import TokenService from "./token.js";
class UserService {
    static async register(name: string, mail: string, phoneNumber: string, password: string) {
        const user = await UserData.getUser(mail, phoneNumber);
        if (user) {
            throw new Error('This user already exists');
        }
        const regexPass = zxcvbn(password);
        if (regexPass.score < 3) {
            throw new Error(
                `The password must meet the following requirements:
                         - At least 1 lowercase letter
                         - At least 1 uppercase letter
                         - At least 1 number
                         - At least 1 special character (@.#$!%*?&)
                         - At least 8 characters long`
            );
        }
        const hashPass = await hashPassword(password);
        const code = generateCode();
        const userC = await hashCode(code);
        return await UserData.register(name, mail, phoneNumber, hashPass, userC)
    };
    static async login(phoneNumber: string, password: string) {
        const user = await UserData.getUserWithPhoneNum(phoneNumber);
        if (!user) {
            throw new Error('invalid User');
        }
        if (user.verifyCode === false) {
            throw new Error('verify edinizz')
        }
        const userPassword = user.password;
        const isMatch = await verifyPassword(userPassword, password);
        if (!isMatch) {
            throw new Error('your password is wrong');
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
    static async getMe(userId: string) {
        const user = await UserData.getMe(userId);
        if (!user) {
            throw new Error('invalid User');
        }
        return user;
    };
    static async verifyCode(code: string, userId: string) {
        const user = await UserData.getMe(userId);
        if (!user) {
            throw new Error('invalid User');
        }
        const userCode = user.code;
        const verify = await verifyUserCode(code, userCode)
        if (verify === true && user.verifyCode !== true) {
            await UserData.verifiedUserCode(userId)
        }
        else {
            throw new Error('bu kod yok');
        }
        return user;
    }
    static async update(userId: string, name: string, mail: string, phoneNumber: string): Promise<object> {
        const user = await UserData.updateUser(userId, name, mail, phoneNumber)
        return { user };
    }
    // static async logOut(userId: string) { }
}
export default UserService;