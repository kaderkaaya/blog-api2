import { UserModel } from "../models/user.js";
class UserData {
    static async register(name: string, mail: string, phoneNumber: string, password: string) {
        return await UserModel.create({ name, mail, phoneNumber, password })
    }
    static async getUser(mail: string, phoneNumber: string) {
        const user = await UserModel.findOne({
            phoneNumber,
            mail
        });
        return user;
    }
}
export default UserData;