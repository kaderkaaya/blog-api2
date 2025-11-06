import UserData from "../data/user.js";
import hashPassword from "../helpers/hashHelper.js"
class UserService {
    static async register(name: string, mail: string, phoneNumber: string, password: string) {
        const user = await UserData.getUser(mail, phoneNumber);
        if (user) {
            throw new Error('This user already exists');
        }
        const hashPassw = await hashPassword(password)
        return await UserData.register(name, mail, phoneNumber, hashPassw)
    };
    static async login(phoneNumber: string, password: string) {
        const user = await UserData.getUserWithPhoneNum(phoneNumber);
        console.log('********** ->user', user);
        if (!user) {
            throw new Error('invalid User');
        }
        return user;
    };
    static async getMe(userId: string) {
        const user = await UserData.getMe(userId);
        console.log('********** ->user', user);
        if (!user) {
            throw new Error('invalid User');
        }
        return user;
    };
    // static async update(userId: string, name: string, mail: string, phoneNumber: string) { }
    // static async logOut(userId: string) { }
}
export default UserService;