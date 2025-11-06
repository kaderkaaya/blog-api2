import zxcvbn from "zxcvbn";
import UserData from "../data/user.js";
import { hashPassword, verifyPassword } from "../helpers/hashHelper.js"

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
        const hashPass = await hashPassword(password)
        return await UserData.register(name, mail, phoneNumber, hashPass)
    };
    static async login(phoneNumber: string, password: string) {
        const user = await UserData.getUserWithPhoneNum(phoneNumber);
        if (!user) {
            throw new Error('invalid User');
        }
        const userPassword = user.password;
        const isMatch = await verifyPassword(userPassword, password);
        if(!isMatch){
             throw new Error('your password is wrong');
        }
        return user;
    };
    static async getMe(userId: string) {
        const user = await UserData.getMe(userId);
        if (!user) {
            throw new Error('invalid User');
        }
        return user;
    };
    // static async update(userId: string, name: string, mail: string, phoneNumber: string) { }
    // static async logOut(userId: string) { }
}
export default UserService;