import { UserModel } from "../models/user.js";
class UserData {
    static async register(name: string, mail: string, phoneNumber: string, password: string) {
        return await UserModel.create({ name, mail, phoneNumber, password })
    }
}
export default UserData;